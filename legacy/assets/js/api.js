// API handling functions
class TourAPI {
    static #nonce = null;

    static async #getNonce() {
        if (this.#nonce) return this.#nonce;
        
        try {
            const response = await fetch(`${config.wordPressUrl}/wp-json`, {
                credentials: 'include'
            });
            if (!response.ok) throw new Error('Failed to fetch nonce');
            const data = await response.json();
            this.#nonce = data.nonce;
            return this.#nonce;
        } catch (error) {
            // Ignore extension communication errors
            if (error.message.includes('Receiving end does not exist')) {
                console.warn('Extension communication error ignored');
                return null;
            }
            console.error('Error fetching nonce:', error);
            throw new Error('Failed to get authentication token');
        }
    }

    static #getHeaders() {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
    }

    static async #getAuthenticatedHeaders() {
        try {
            const nonce = await this.#getNonce();
            return {
                ...this.#getHeaders(),
                ...(nonce ? { 'Nonce': nonce } : {})
            };
        } catch (error) {
            // Fall back to unauthenticated headers if extension error occurs
            if (error.message.includes('Receiving end does not exist')) {
                return this.#getHeaders();
            }
            throw error;
        }
    }

    static #showLoading(containerId) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `
                <div class="loading fade-in">
                    <div class="w-16 h-16 mb-4 border-4 border-gray-200 border-t-[#E6A532] rounded-full animate-spin"></div>
                    <p class="text-gray-600 text-lg animate-pulse">Loading...</p>
                </div>
            `;
        }
    }

    static #showError(containerId, message) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `
                <div class="text-center py-10 fade-in">
                    <i class="fas fa-exclamation-circle text-red-500 text-4xl mb-4"></i>
                    <p class="text-gray-600">${message}</p>
                </div>
            `;
        }
    }

    static async getTours() {
        try {
            this.#showLoading('tours-container');
            
            const response = await fetch(`${config.apiBase}/tour_package?_embed`, {
                headers: this.#getHeaders()
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error:', {
                    status: response.status,
                    statusText: response.statusText,
                    responseText: errorText
                });
                throw new Error(`Failed to fetch tours: ${response.status} ${response.statusText}`);
            }
            
            const tours = await response.json();
            
            return tours.map(tour => ({
                id: tour.id,
                title: tour.title,
                content: tour.content,
                featured_image_url: tour._embedded?.['wp:featuredmedia']?.[0]?.source_url || '../assets/images/default-tour.jpg',
                acf: tour.acf || {},
                categories: tour.categories
            }));
        } catch (error) {
            console.error('Error fetching tours:', error);
            this.#showError('tours-container', 'Failed to load tours. Please try again later.');
            return [];
        }
    }

    static async getTourById(id) {
        try {
            const tourDetailContainer = document.querySelector('#tour-detail > div > div:first-child');
            this.#showLoading('tour-detail');
            
            const response = await fetch(`${config.apiBase}/tour_package/${id}?_embed`, {
                headers: this.#getHeaders()
            });
            
            if (!response.ok) throw new Error('Failed to fetch tour');
            const tour = await response.json();
            
            // Clear loading state
            if (tourDetailContainer) {
                tourDetailContainer.innerHTML = '';
            }
            
            return {
                ...tour,
                featured_image_url: tour._embedded?.['wp:featuredmedia']?.[0]?.source_url || '../assets/images/default-tour.jpg'
            };
        } catch (error) {
            console.error('Error fetching tour:', error);
            return null;
        }
    }

    static async getPosts() {
        try {
            this.#showLoading('posts-container');
            const response = await fetch(`${config.apiBase}/posts?per_page=${config.postsPerPage}&_embed`, {
                headers: {
                    'Accept': 'application/json'
                },
                mode: 'cors',
                credentials: 'include'
            });
            
            if (!response.ok) throw new Error('Failed to fetch posts');
            const posts = await response.json();
            
            return posts.map(post => ({
                ...post,
                featured_image_url: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '../assets/images/default-blog.jpg'
            }));
        } catch (error) {
            console.error('Error fetching posts:', error);
            this.#showError('posts-container', 'Failed to load blog posts. Please try again later.');
            return [];
        }
    }
    static async getRelatedPosts(tags, limit = 3) {
        try {
            // Simple approach: get all posts and filter by tags
            const response = await fetch(`${config.apiBase}/posts?per_page=10&_embed`);
            
            if (!response.ok) throw new Error('Failed to fetch posts');
            
            const posts = await response.json();
            const searchTags = Array.isArray(tags) ? tags : tags.split(',');
            const cleanTags = searchTags.map(tag => tag.trim().toLowerCase());

            // Filter posts that have matching categories or tags by name or slug
            const filteredPosts = posts.filter(post => {
                const terms = post._embedded?.['wp:term']?.flat() || [];
                return terms.some(term => {
                    const termName = term.name?.toLowerCase() || '';
                    const termSlug = term.slug?.toLowerCase() || '';
                    return cleanTags.some(cleanTag => {
                        const tagNoHash = cleanTag.replace('#', '');
                        return termName.includes(tagNoHash) || termSlug.includes(tagNoHash);
                    });
                });
            }).slice(0, limit);

            return filteredPosts.map(post => ({
                ...post,
                featured_image_url: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '../assets/images/default-blog.jpg'
            }));
        } catch (error) {
            console.error('Error fetching related posts:', error);
            return [];
        }
    }

    static async getRelatedPackages(limit = 3) {
        try {
            const response = await fetch(`${config.apiBase}/tour_package?per_page=${limit}&_embed`, {
                headers: this.#getHeaders()
            });
            
            if (!response.ok) throw new Error('Failed to fetch related packages');
            
            const packages = await response.json();
            return packages.map(pkg => ({
                id: pkg.id,
                title: pkg.title,
                featured_image_url: pkg._embedded?.['wp:featuredmedia']?.[0]?.source_url || '../assets/images/default-tour.jpg',
                acf: pkg.acf || {}
            }));
        } catch (error) {
            console.error('Error fetching related packages:', error);
            return [];
        }
    }

    static async getPostById(id) {
        try {
            this.#showLoading('blog-post');
            const response = await fetch(`${config.apiBase}/posts/${id}?_embed`, {
                headers: {
                    'Accept': 'application/json'
                },
                mode: 'cors',
                credentials: 'include'
            });
            
            if (!response.ok) throw new Error('Failed to fetch post');
            const post = await response.json();
            
            return {
                ...post,
                featured_image_url: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '../assets/images/default-blog.jpg'
            };
        } catch (error) {
            console.error('Error fetching post:', error);
            this.#showError('blog-post', 'Failed to load blog post. Please try again later.');
            return null;
        }
    }

    static async submitBooking(formData) {
        try {
            const response = await fetch(`${config.wordPressUrl}/wp-json/tourism/v1/submit-booking`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include',
                mode: 'cors',
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    tour: formData.tour,
                    date: formData.date,
                    quantity: formData.quantity,
                    total: formData.total.replace(/[^0-9.]/g, ''), // Remove currency symbols and formatting
                    message: formData.message || ''
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to submit booking');
            }

            return await response.json();
        } catch (error) {
            console.error('Error submitting booking:', error);
            throw error;
        }
    }

    static async directCheckout(productId, quantity = 1) {
        try {
            const headers = await this.#getAuthenticatedHeaders();
            
            // First add to cart
            const addToCartResponse = await fetch(`${config.wcStoreApiBase}/cart/add-item`, {
                method: 'POST',
                credentials: 'include',
                headers: headers,
                body: JSON.stringify({
                    id: productId,
                    quantity: quantity
                })
            });

            if (!addToCartResponse.ok) {
                const errorData = await addToCartResponse.json();
                throw new Error(errorData.message || 'Failed to add item to cart');
            }

            // Then proceed to checkout
            const checkoutResponse = await fetch(`${config.wcStoreApiBase}/cart/checkout`, {
                method: 'GET',
                credentials: 'include',
                headers: headers
            });

            if (!checkoutResponse.ok) {
                const errorData = await checkoutResponse.json();
                throw new Error(errorData.message || 'Failed to proceed to checkout');
            }
            
            const result = await checkoutResponse.json();
            window.location.href = result.checkout_url;
            return result;
        } catch (error) {
            console.error('Error proceeding to checkout:', error);
            throw error;
        }
    }
}

const CartAPI = {
    directCheckout: async (tourId, quantity) => {
        return TourAPI.directCheckout(tourId, quantity);
    }
};




// Make CartAPI available globally
window.CartAPI = CartAPI;

// Global Language Switcher & Google Translate Syncing
(function() {
    // 1. Sync cookie immediately on script load so Google Translate picks it up on page load
    var savedLang = localStorage.getItem('incan_site_lang') || 'it';
    if (savedLang && savedLang !== 'it') {
        var langPair = '/it/' + savedLang;
        document.cookie = 'googtrans=' + langPair + '; path=/;';
        document.cookie = 'googtrans=' + langPair + '; domain=' + window.location.hostname + '; path=/;';
    }

    // 2. Define global handlers
    window.googleTranslateElementInit = function() {
        if (window.google && google.translate) {
            new google.translate.TranslateElement({
                pageLanguage: 'it',
                includedLanguages: 'it,en,es',
                autoDisplay: false
            }, 'google_translate_element');
        }
        setTimeout(function() {
            var currentLang = localStorage.getItem('incan_site_lang') || 'it';
            if (window.updateLangUI) window.updateLangUI(currentLang);
        }, 300);
    };

    window.toggleLangMenu = function(e) {
        if (e) e.stopPropagation();
        var menu = document.getElementById('lang-menu');
        var arrow = document.getElementById('lang-arrow');
        if (menu) {
            var isHidden = menu.classList.contains('hidden');
            if (isHidden) {
                menu.classList.remove('hidden');
                if (arrow) arrow.style.transform = 'rotate(180deg)';
            } else {
                menu.classList.add('hidden');
                if (arrow) arrow.style.transform = 'rotate(0deg)';
            }
        }
    };

    window.setSiteLanguage = function(langCode) {
        var currentLang = localStorage.getItem('incan_site_lang') || 'it';
        localStorage.setItem('incan_site_lang', langCode);
        
        if (langCode === 'it') {
            document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=' + window.location.hostname + '; path=/;';
            document.cookie = 'googtrans=/it/it; path=/;';
        } else {
            var langPair = '/it/' + langCode;
            document.cookie = 'googtrans=' + langPair + '; path=/;';
            document.cookie = 'googtrans=' + langPair + '; domain=' + window.location.hostname + '; path=/;';
        }
        
        if (window.updateLangUI) window.updateLangUI(langCode);
        
        var select = document.querySelector('.goog-te-combo');
        if (select) {
            select.value = langCode;
            select.dispatchEvent(new Event('change'));
        }
        
        var menu = document.getElementById('lang-menu');
        var arrow = document.getElementById('lang-arrow');
        if (menu) menu.classList.add('hidden');
        if (arrow) arrow.style.transform = 'rotate(0deg)';
        
        if (currentLang !== langCode) {
            setTimeout(function() {
                window.location.reload();
            }, 150);
        }
    };

    window.updateLangUI = function(langCode) {
        var langText = document.getElementById('current-lang-text');
        if (langText) langText.innerText = langCode.toUpperCase();
        
        document.querySelectorAll('.lang-option').forEach(function(opt) {
            var check = opt.querySelector('.active-check');
            if (opt.getAttribute('data-lang') === langCode) {
                opt.classList.add('bg-amber-50', 'text-amber-700', 'font-bold');
                if (check) check.classList.remove('hidden');
            } else {
                opt.classList.remove('bg-amber-50', 'text-amber-700', 'font-bold');
                if (check) check.classList.add('hidden');
            }
        });
    };

    // 3. Document event listener for closing dropdown when clicking outside & initializing Google Translate
    var initLangModule = function() {
        document.addEventListener('click', function(e) {
            var menu = document.getElementById('lang-menu');
            var btn = document.getElementById('lang-switcher-btn');
            if (menu && !menu.contains(e.target) && btn && !btn.contains(e.target)) {
                menu.classList.add('hidden');
                var arrow = document.getElementById('lang-arrow');
                if (arrow) arrow.style.transform = 'rotate(0deg)';
            }
        });

        // Ensure google translate script element is present
        if (!document.getElementById('google-translate-script')) {
            var gtScript = document.createElement('script');
            gtScript.id = 'google-translate-script';
            gtScript.type = 'text/javascript';
            gtScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            document.body.appendChild(gtScript);
        }

        var savedLang = localStorage.getItem('incan_site_lang') || 'it';
        if (window.updateLangUI) window.updateLangUI(savedLang);
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLangModule);
    } else {
        initLangModule();
    }
})();

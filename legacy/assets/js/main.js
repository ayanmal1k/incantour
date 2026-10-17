// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', () => {
    const pathname = window.location.pathname;
    const currentPage = pathname.split('/').pop() || 'index.html'; // Default to index.html if root path

    // Initialize page-specific functionality
    switch (currentPage) {
        case 'index.html':
            initHomePage();
            break;
        case 'tours.html':
            initToursPage();
            break;
        case 'tour-detail.html':
            initTourDetailPage();
            break;
        case 'blog.html':
            initBlogPage();
            break;
        case 'blog-post.html':
            initBlogPostPage();
            break;
        case 'booking.html':
            initBookingPage();
            break;
    }

    // Initialize common functionality
    initNavbar();
    initSlideshow();
});

// Get base path based on current page location
function getBasePath() {
    const path = window.location.pathname;
    return path.includes('/src/') ? '' : 'src/';
}

// Initialize navbar functionality
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');

    // Navbar scroll behavior
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            // Toggle icon between bars and times
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target) && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
    }

    // Mobile dropdowns
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');
    mobileDropdowns.forEach(dropdown => {
        const button = dropdown.querySelector('button');
        const content = dropdown.querySelector('div');
        
        if (button && content) {
            button.addEventListener('click', () => {
                dropdown.classList.toggle('active');
                content.classList.toggle('hidden');
            });
        }
    });
}

// Homepage initialization
async function initHomePage() {
    try {
        // Load featured tours
        const featuredToursContainer = document.getElementById('tours-container');
        if (featuredToursContainer) {
            const tours = await TourAPI.getTours();
            
            // Get exactly 2 outgoing tours and up to 2 incoming tours
            const outgoingTours = tours
                .filter(tour => tour.acf?.type?.toLowerCase() === 'outgoing')
                .slice(0, 2);
            
            if (outgoingTours.length < 2) {
                console.warn('Warning: Less than 2 outgoing tours available');
            }
            
            const incomingTours = tours
                .filter(tour => tour.acf?.type?.toLowerCase() === 'incoming')
                .slice(0, 2);
            
            // Combine tours with incoming first
            const featuredTours = [...incomingTours, ...outgoingTours];
            displayTours(featuredTours);
        }

        // Load blog posts
        const postsContainer = document.getElementById('posts-container');
        if (postsContainer) {
            const posts = await TourAPI.getPosts();
            displayBlogPosts(posts.slice(0, 3));
        }

        // Initialize counters
        initCounters();
    } catch (error) {
        console.error('Error initializing homepage:', error);
    }
}

// Tours page initialization
async function initToursPage() {
    try {
        const toursContainer = document.getElementById('tours-container');
        if (toursContainer) {
            const tours = await TourAPI.getTours();
            displayTours(tours, toursContainer);
        }
    } catch (error) {
        console.error('Error initializing tours page:', error);
    }
}

// Tour detail page initialization
async function initTourDetailPage() {
    try {
        const tourDetailContainer = document.getElementById('tour-detail');
        if (tourDetailContainer) {
            const urlParams = new URLSearchParams(window.location.search);
            const tourId = urlParams.get('id');
            
            if (!tourId) {
                throw new Error('No tour ID provided');
            }

            const tour = await TourAPI.getTourById(tourId);
            displayTourDetail(tour, tourDetailContainer);
        }
    } catch (error) {
        console.error('Error initializing tour detail page:', error);
        // Show error message to user
        if (document.getElementById('tour-detail')) {
            document.getElementById('tour-detail').innerHTML = `
                <div class="error-message">
                    <h2>Oops! Something went wrong</h2>
                    <p>${error.message}</p>
                    <a href="tours.html" class="cta-button">
                        <i class="fas fa-arrow-left"></i>
                        Back to Tours
                    </a>
                </div>
            `;
        }
    }
}

// Blog page initialization
async function initBlogPage() {
    try {
        const blogPostsContainer = document.getElementById('posts-container');
        if (blogPostsContainer) {
            const posts = await TourAPI.getPosts();
            displayBlogPosts(posts);
        }
    } catch (error) {
        console.error('Error initializing blog page:', error);
        // Show error message
        const container = document.getElementById('posts-container');
        if (container) {
            container.innerHTML = `
                <div class="error-message">
                    <h2>Oops! Something went wrong</h2>
                    <p>Failed to load blog posts. Please try again later.</p>
                </div>
            `;
        }
    }
}

// Blog post detail page initialization
async function initBlogPostPage() {
    try {
        const blogPostContainer = document.getElementById('blog-post');
        if (blogPostContainer) {
            const urlParams = new URLSearchParams(window.location.search);
            const postId = urlParams.get('id');
            
            if (!postId) {
                throw new Error('No post ID provided');
            }

            const post = await TourAPI.getPostById(postId);
            displayBlogPost(post, blogPostContainer);
        }
    } catch (error) {
        console.error('Error initializing blog post page:', error);
    }
}

// Booking page initialization
async function initBookingPage() {
    try {
        const form = document.getElementById('booking-form');
        const tourSelect = document.getElementById('tour');
        const toast = document.getElementById('toast');

        // Load tours and populate select
        if (tourSelect) {
            const tours = await TourAPI.getTours();
            tourSelect.classList.remove('loading-select');
            tourSelect.innerHTML = `
                <option value="">Select a tour package</option>
                ${tours.map(tour => `
                    <option value="${tour.id}" data-price="${tour.acf?.Price || 0}">${tour.title.rendered}</option>
                `).join('')}
            `;

            // Handle tour selection change
            tourSelect.addEventListener('change', function() {
                const selectedOption = this.options[this.selectedIndex];
                const price = selectedOption.dataset.price || '0';
                const quantity = parseInt(document.getElementById('quantity').value) || 1;
                const total = parseFloat(price) * quantity;
                document.getElementById('total-price').value = total.toLocaleString('de-DE', {
                    style: 'currency',
                    currency: 'EUR'
                });
            });

            // Check URL parameters
            const urlParams = new URLSearchParams(window.location.search);
            const tourId = urlParams.get('tour');
            if (tourId) {
                tourSelect.value = tourId;
                tourSelect.dispatchEvent(new Event('change'));
            }
        }

        // Handle form submission
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const submitButton = form.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                
                try {
                    submitButton.disabled = true;
                    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Submitting...';

                    const formData = {
                        name: document.getElementById('name').value,
                        email: document.getElementById('email').value,
                        tour: document.getElementById('tour').value,
                        quantity: document.getElementById('quantity').value,
                        date: document.getElementById('date').value,
                        message: document.getElementById('message').value,
                        total: document.getElementById('total-price').value
                    };

                    const result = await TourAPI.submitBooking(formData);
                    
                    if (result.success) {
                        showToast('Booking submitted successfully! We will contact you soon.');
                        form.reset();
                    } else {
                        throw new Error(result.message || 'Booking submission failed');
                    }
                } catch (error) {
                    console.error('Booking submission error:', error);
                    showToast(error.message || 'Failed to submit booking. Please try again.', true);
                } finally {
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalText;
                }
            });
        }
    } catch (error) {
        console.error('Error initializing booking page:', error);
    }
}

// Slideshow functionality
function initSlideshow() {
    const slides = document.querySelectorAll('.slideshow-image');
    if (!slides.length) return;

    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Show first slide initially
    showSlide(0);

    // Change slide every 3 seconds
    setInterval(nextSlide, 3000);
}

// Tour display template
function displayTours(tours) {
    const container = document.getElementById('tours-container');
    const basePath = getBasePath();
    container.innerHTML = '';

    tours.forEach(tour => {
        const price = tour.acf?.Price ? parseFloat(tour.acf.Price) : 0;
        const formattedPrice = price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
        
        const tourCard = `
            <div class="bg-white rounded-2xl overflow-hidden shadow-lg transform transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-2xl">
                <div class="relative h-64 w-full overflow-hidden">
                    <img src="${tour.featured_image_url}" 
                         alt="${tour.title.rendered}" 
                         class="w-full h-full object-cover transition-transform duration-300 hover:scale-110">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <div class="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-semibold" 
                         style="background: ${tour.acf?.type?.toLowerCase() === 'incoming' ? 'var(--gradient-cool)' : 'var(--gradient-warm)'}">
                        ${tour.acf?.type || 'Tour'}
                    </div>
                    <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                        <span class="text-orange-500 font-bold">${formattedPrice}</span>
                    </div>
                </div>
                
                <div class="p-6">
                    <h3 class="text-xl font-bold text-gray-800 mb-4">${tour.title.rendered}</h3>
                    <p class="text-gray-600 mb-6 line-clamp-2">${tour.acf?.description || ''}</p>
                    <div class="flex space-x-3">
                        <a href="${basePath}tour-detail.html?id=${tour.id}" 
                           class="flex-1 text-center text-white px-4 py-3 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg" 
                           style="background: var(--gradient-cool);">
                            <i class="fas fa-eye mr-2"></i>View Details
                        </a>
                        <a href="${basePath}booking.html?tour=${tour.id}" 
                           class="flex-1 text-center text-white px-4 py-3 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg" 
                           style="background: var(--gradient-warm);">
                            <i class="fas fa-calendar-check mr-2"></i>Book Now
                        </a>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', tourCard);
    });
}

// Blog display template
function displayBlogPosts(posts) {
    const container = document.getElementById('posts-container');
    if (!container) return;
    
    const basePath = getBasePath();
    // Remove loading state
    container.innerHTML = '';

    posts.forEach(post => {
        // Strip HTML tags and shorten description text
        let rawExcerpt = post.excerpt?.rendered ? post.excerpt.rendered.replace(/<[^>]*>?/gm, '').trim() : '';
        if (rawExcerpt.length > 90) {
            rawExcerpt = rawExcerpt.substring(0, 90) + '...';
        }

        const blogCard = `
            <div class="blog-card">
                <div class="blog-card-image">
                    <img src="${post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'assets/images/default-blog.jpg'}" 
                         alt="${post.title.rendered}"
                         loading="lazy">
                </div>
                <div class="blog-card-content">
                    <h3 class="blog-card-title">${post.title.rendered}</h3>
                    <div class="blog-card-excerpt">${rawExcerpt}</div>
                    <div class="blog-card-meta">
                        <div class="blog-card-date">
                            <i class="far fa-calendar-alt text-orange-300"></i>
                            <span>${new Date(post.date).toLocaleDateString('it-IT')}</span>
                        </div>
                        <a href="${basePath}blog-post.html?id=${post.id}" class="blog-card-read-more">
                            Leggi di più
                            <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', blogCard);
    });
}

function displayTourDetail(tour, container) {
    if (!container) return;

    const price = tour.acf?.Price ? parseFloat(tour.acf.Price) : 0;
    const formattedPrice = price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
    const gallery = tour.acf.gallery || [];
    const basePath = getBasePath();
    
    container.innerHTML = `
        <div class="tour-header relative overflow-hidden rounded-3xl mb-12">
            <img src="${tour._embedded?.['wp:featuredmedia']?.[0]?.source_url || '../assets/images/default-tour.jpg'}" 
                 alt="${tour.title.rendered}"
                 class="w-full h-[60vh] object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div class="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h1 class="text-4xl md:text-5xl font-bold mb-4">${tour.title.rendered}</h1>
                <div class="flex flex-wrap gap-4">
                    <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                        <i class="fas fa-map-marker-alt text-orange-300"></i>
                        <span>${tour.acf?.Location || 'Location TBA'}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
            <div class="md:col-span-2">
                <div class="bg-white rounded-2xl p-8 mb-8 shadow-lg">
                    <h2 class="text-2xl font-bold text-primary-teal mb-6">Tour Overview</h2>
                    <div class="prose max-w-none">
                        ${tour.acf?.description || tour.content.rendered}
                    </div>
                </div>

                ${gallery.length ? `
                <div class="bg-white rounded-2xl p-8 shadow-lg">
                    <h2 class="text-2xl font-bold text-primary-teal mb-6">Tour Gallery</h2>
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                        ${gallery.map(image => `
                            <img src="${image.url}" 
                                 alt="${image.alt || tour.title.rendered}"
                                 class="w-full h-48 object-cover rounded-lg transition-transform hover:scale-105 cursor-pointer"
                                 loading="lazy">
                        `).join('')}
                    </div>
                </div>` : ''}
            </div>

            <div class="md:col-span-1">
                <div class="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
                    <div class="text-center mb-6">
                        <div class="text-sm text-gray-600 mb-2">Starting from</div>
                        <div class="text-4xl font-bold text-primary-orange">${formattedPrice}</div>
                        <div class="text-sm text-gray-600">per person</div>
                    </div>

                    <a href="${basePath}booking.html?tour=${tour.id}" 
                       class="block w-full py-4 px-6 text-center text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg mb-4"
                       style="background: var(--gradient-warm);">
                        <i class="fas fa-calendar-check mr-2"></i>
                        Book Now
                    </a>

                    <button class="w-full py-4 px-6 text-primary-teal border-2 border-primary-teal rounded-full font-semibold transition-all duration-300 hover:bg-primary-teal hover:text-white">
                        <i class="far fa-heart mr-2"></i>
                        Save to Wishlist
                    </button>
                </div>
            </div>
        </div>
    `;

    // Add click handlers for gallery images if needed
    const galleryImages = container.querySelectorAll('.tour-gallery img');
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            // Implement lightbox functionality here if needed
        });
    });
}

function displayBlogPost(post, container) {
    const formattedDate = new Date(post.date).toLocaleDateString('it-IT', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    container.innerHTML = `
        <article class="blog-article space-y-8">
            <!-- Header section -->
            <div class="blog-header mb-8 text-center max-w-4xl mx-auto">
                <span class="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
                    <i class="fas fa-feather-alt mr-1"></i> Incantour Blog
                </span>
                <h1 class="text-3xl md:text-5xl font-extrabold text-teal-900 leading-tight mb-6">${post.title.rendered}</h1>
                
                <div class="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 font-medium border-y border-gray-100 py-4">
                    <div class="flex items-center gap-2">
                        <i class="far fa-calendar-alt text-amber-500 text-base"></i>
                        <span>Pubblicato il ${formattedDate}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="far fa-user text-amber-500 text-base"></i>
                        <span>Redazione Incantour</span>
                    </div>
                </div>
            </div>
            
            ${post._embedded?.['wp:featuredmedia']?.[0]?.source_url ?
                `<div class="overflow-hidden rounded-3xl shadow-2xl mb-10 border border-gray-100">
                    <img src="${post._embedded['wp:featuredmedia'][0].source_url}" 
                         alt="${post.title.rendered}" 
                         class="w-full max-h-[550px] object-cover">
                 </div>` :
                ''
            }
            
            <!-- Article Body -->
            <div class="blog-content prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                ${post.content.rendered}
            </div>

            <!-- Footer Share & CTA -->
            <div class="pt-10 border-t border-gray-100 mt-12 flex flex-wrap items-center justify-between gap-4">
                <a href="blog.html" class="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold px-6 py-3 rounded-full shadow hover:opacity-95 transition">
                    <i class="fas fa-arrow-left"></i> Torna a tutti gli articoli
                </a>

                <div class="flex items-center gap-3">
                    <span class="text-xs font-bold text-gray-500 uppercase">Condividi:</span>
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" target="_blank" class="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:opacity-90 transition">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(post.title.rendered + ' ' + window.location.href)}" target="_blank" class="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center hover:opacity-90 transition">
                        <i class="fab fa-whatsapp"></i>
                    </a>
                </div>
            </div>
        </article>
        
        <!-- Related Packages Section -->
        <div class="mt-20 pt-12 border-t border-gray-200">
            <h2 class="text-3xl font-extrabold text-teal-900 mb-8 text-center">Proposte di Viaggio Correlate</h2>
            <div id="related-packages" class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="loading col-span-3">
                    <div class="loading-spinner"></div>
                    <p class="text-gray-600 text-sm font-medium">Caricamento proposte correlate in corso...</p>
                </div>
            </div>
        </div>
    `;

    // Load related packages after the blog post content is displayed
    loadRelatedPackages();
}

async function loadRelatedPackages() {
    try {
        const packages = await TourAPI.getRelatedPackages();
        const relatedPackagesContainer = document.getElementById('related-packages');
        if (!relatedPackagesContainer) return;

        if (!packages || packages.length === 0) {
            relatedPackagesContainer.innerHTML = '<p class="text-center text-gray-600">No related packages found.</p>';
            return;
        }

        relatedPackagesContainer.innerHTML = packages.map(pkg => `
            <a href="tour-detail.html?id=${pkg.id}" class="block bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
                <img src="${pkg.featured_image_url}" alt="${pkg.title.rendered}" class="w-full h-48 object-cover">
                <div class="p-6">
                    <h3 class="text-xl font-bold text-primary-teal mb-2">${pkg.title.rendered}</h3>
                    <p class="text-gray-600 mb-4">${pkg.acf?.description?.substring(0, 150) || ''}...</p>
                    <div class="flex justify-between items-center">
                        <span class="text-primary-orange font-bold text-xl">${parseFloat(pkg.acf?.Price || 0).toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}</span>
                        <span class="bg-primary-teal text-white px-4 py-2 rounded">Scopri di più</span>
                    </div>
                </div>
            </a>
        `).join('');
    } catch (error) {
        console.error('Error loading related packages:', error);
        const relatedPackagesContainer = document.getElementById('related-packages');
        if (relatedPackagesContainer) {
            relatedPackagesContainer.innerHTML = '<p class="text-center text-red-500">Failed to load related packages.</p>';
        }
    }
}

function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.style.backgroundColor = isError ? '#dc3545' : '#28a745';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
}

function initCounters() {
    const counters = document.querySelectorAll('.counter-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        entry.target.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target)) {
                mobileMenu.classList.remove('active');
            }
        });
    }
});

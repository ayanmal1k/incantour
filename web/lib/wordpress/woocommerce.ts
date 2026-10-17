import "server-only";

/**
 * WooCommerce Store API Integration Boundary.
 *
 * NOTE: The legacy system in `legacy/assets/js/api.js` made calls to `CartAPI.directCheckout`:
 *   1. POST `${config.wcStoreApiBase}/cart/add-item`
 *   2. GET  `${config.wcStoreApiBase}/cart/checkout`
 *
 * This boundary requires an explicitly configured `WORDPRESS_WOOCOMMERCE_STORE_API_BASE`.
 * If not set, it does NOT guess or fabricate an API URL.
 */

export function getWooCommerceStoreApiBase(): string {
  const base = process.env.WORDPRESS_WOOCOMMERCE_STORE_API_BASE?.replace(/\/$/, "");
  if (!base) {
    throw new Error(
      "WooCommerce Store API integration is not enabled. WORDPRESS_WOOCOMMERCE_STORE_API_BASE is not configured in .env."
    );
  }
  return base;
}

export function isWooCommerceEnabled(): boolean {
  return Boolean(process.env.WORDPRESS_WOOCOMMERCE_STORE_API_BASE?.trim());
}

export type DirectCheckoutResult = {
  checkout_url: string;
  order_id?: number;
  [key: string]: unknown;
};

/**
 * Direct checkout boundary for purchasing a tour directly via WooCommerce Store API.
 */
export async function directCheckout(
  productId: number | string,
  quantity = 1,
  nonce?: string
): Promise<DirectCheckoutResult> {
  const apiBase = getWooCommerceStoreApiBase();

  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (nonce) {
    headers.Nonce = nonce;
  }

  // 1. Add item to cart
  const addItemRes = await fetch(`${apiBase}/cart/add-item`, {
    method: "POST",
    headers,
    body: JSON.stringify({ id: Number(productId), quantity }),
    cache: "no-store",
  });

  if (!addItemRes.ok) {
    const errorData = await addItemRes.json().catch(() => ({}));
    throw new Error(errorData.message || `WooCommerce add-item failed with status ${addItemRes.status}`);
  }

  // 2. Retrieve checkout URL
  const checkoutRes = await fetch(`${apiBase}/cart/checkout`, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  if (!checkoutRes.ok) {
    const errorData = await checkoutRes.json().catch(() => ({}));
    throw new Error(errorData.message || `WooCommerce checkout failed with status ${checkoutRes.status}`);
  }

  return (await checkoutRes.json()) as DirectCheckoutResult;
}

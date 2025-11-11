/**
 * Google Analytics 4 tracking utilities
 * Measurement ID: G-FY3VWE3KYB
 */

// GA4 Event parameters types
export interface GAEventParams {
  [key: string]: string | number | boolean | undefined
}

export interface GAProductParams {
  product_id: string
  product_name: string
  marca?: string | null
  tipo_de_moto?: string | null
  price?: number
  currency?: string
  year?: number | null
}

export interface GASearchParams {
  search_term: string
  filter_brand?: string
  filter_type?: string
  filter_price_range?: string
  results_count: number
}

export interface GAScrollParams {
  percent: number
  page_path: string
}

// Declare gtag function for TypeScript
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

/**
 * Initialize GA4 tracking
 */
export function initGA() {
  if (typeof window === "undefined") return

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag("js", new Date())
  window.gtag("config", "G-FY3VWE3KYB")
}

/**
 * Track a custom GA4 event
 */
export function trackEvent(eventName: string, params?: GAEventParams) {
  if (typeof window === "undefined" || !window.gtag) return

  try {
    window.gtag("event", eventName, params)
    console.log(`[GA4] Event tracked: ${eventName}`, params)
  } catch (error) {
    console.error("[GA4] Error tracking event:", error)
  }
}

/**
 * Track product view (view_item)
 */
export function trackViewItem(product: GAProductParams) {
  trackEvent("view_item", {
    currency: product.currency || "ARS",
    value: product.price || 0,
    items: [
      {
        item_id: product.product_id,
        item_name: product.product_name,
        item_brand: product.marca || "Sin marca",
        item_category: product.tipo_de_moto || "Custom",
        price: product.price || 0,
        quantity: 1,
      },
    ],
  })
}

/**
 * Track lead generation (generate_lead)
 */
export function trackGenerateLead(product: GAProductParams, method: string = "whatsapp") {
  trackEvent("generate_lead", {
    currency: product.currency || "ARS",
    value: product.price || 0,
    method,
    product_id: product.product_id,
    product_name: product.product_name,
    marca: product.marca || "Sin marca",
    tipo_de_moto: product.tipo_de_moto || "Custom",
  })
}

/**
 * Track form submission (form_submit)
 */
export function trackFormSubmit(formName: string, params?: GAEventParams) {
  trackEvent("form_submit", {
    form_name: formName,
    ...params,
  })
}

/**
 * Track search (search)
 */
export function trackSearch(searchParams: GASearchParams) {
  trackEvent("search", {
    search_term: searchParams.search_term,
    filter_brand: searchParams.filter_brand,
    filter_type: searchParams.filter_type,
    filter_price_range: searchParams.filter_price_range,
    results_count: searchParams.results_count,
  })
}

/**
 * Track scroll depth
 */
export function trackScroll(scrollParams: GAScrollParams) {
  trackEvent(`scroll_${scrollParams.percent}_percent`, {
    percent: scrollParams.percent,
    page_path: scrollParams.page_path,
  })
}

/**
 * Track item list view (view_item_list)
 */
export function trackViewItemList(listName: string, items: GAProductParams[]) {
  trackEvent("view_item_list", {
    item_list_name: listName,
    items: items.map((item, index) => ({
      item_id: item.product_id,
      item_name: item.product_name,
      item_brand: item.marca || "Sin marca",
      item_category: item.tipo_de_moto || "Custom",
      price: item.price || 0,
      index,
    })),
  })
}

// Analytics event tracking utilities for storefront

// GA4 event tracking
export function trackGA4Event(
  eventName: string,
  params?: Record<string, unknown>
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}

// Meta Pixel event tracking
export function trackMetaEvent(
  eventName: string,
  params?: Record<string, unknown>
) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, params);
  }
}

export interface AnalyticsItem {
  id: string;
  name: string;
  price: number;
  currency: string;
  quantity?: number;
}

// Combined analytics tracking utilities for storefront
export const analytics = {
  /**
   * Track when a list of items is viewed (e.g., storefront page load)
   * GA4: view_item_list
   * Meta: ViewContent
   */
  viewItemList: (items: AnalyticsItem[]) => {
    trackGA4Event("view_item_list", {
      items: items.map((item) => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        currency: item.currency,
      })),
    });
    trackMetaEvent("ViewContent", {
      content_ids: items.map((i) => i.id),
      content_type: "product_group",
    });
  },

  /**
   * Track when a customer selects/clicks on a product (initiates checkout)
   * GA4: select_item
   * Meta: InitiateCheckout
   */
  selectItem: (item: AnalyticsItem) => {
    trackGA4Event("select_item", {
      items: [
        {
          item_id: item.id,
          item_name: item.name,
          price: item.price,
          currency: item.currency,
        },
      ],
    });
    trackMetaEvent("InitiateCheckout", {
      content_ids: [item.id],
      value: item.price,
      currency: item.currency,
      num_items: item.quantity || 1,
    });
  },
};

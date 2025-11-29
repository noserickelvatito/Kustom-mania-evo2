# Google Analytics 4 Integration

This document describes the Google Analytics 4 (GA4) implementation in Kustom Mania website.

## Overview

GA4 tracking has been integrated across the website with the measurement ID: `G-FY3VWE3KYB`

## Tracked Events

### 1. view_item
Tracks when users view a motorcycle detail page.

**When triggered:** Automatically on motorcycle detail page load  
**Parameters:**
- `currency`: "ARS"
- `value`: Price of motorcycle
- `items`: Array containing:
  - `item_id`: Motorcycle ID
  - `item_name`: Motorcycle name
  - `item_brand`: Brand (e.g., "Harley Davidson")
  - `item_category`: Motorcycle type (e.g., "Chopper")
  - `price`: Motorcycle price
  - `quantity`: 1

**Location:** `/app/coleccion/[slug]/motorcycle-detail-client.tsx`

### 2. generate_lead
Tracks when users click the "Consultar por WhatsApp" button.

**When triggered:** On WhatsApp button click  
**Parameters:**
- `currency`: "ARS"
- `value`: Price of motorcycle
- `method`: "whatsapp"
- `product_id`: Motorcycle ID
- `product_name`: Motorcycle name
- `marca`: Brand
- `tipo_de_moto`: Motorcycle type

**Location:** `/components/whatsapp-button.tsx`

### 3. search
Tracks when users search or filter motorcycles in the collection.

**When triggered:** When search query or filters change (debounced 1 second)  
**Parameters:**
- `search_term`: Search query string
- `filter_brand`: Selected brand filter
- `filter_type`: Selected type filter
- `filter_price_range`: Selected price range
- `results_count`: Number of results found

**Location:** `/components/collection-client.tsx`

### 4. scroll_XX_percent
Tracks scroll depth at key milestones.

**When triggered:** When user scrolls to 25%, 50%, 75%, or 100% of page  
**Parameters:**
- `percent`: Scroll percentage (25, 50, 75, or 100)
- `page_path`: Current page path

**Location:** `/app/coleccion/[slug]/motorcycle-detail-client.tsx`

### 5. view_item_list
Tracks when users view the image gallery.

**When triggered:** Once when image gallery loads (if multiple images exist)  
**Parameters:**
- `item_list_name`: "Image Gallery"
- `items`: Array containing product information

**Location:** `/components/image-gallery.tsx`

### 6. form_submit (prepared for future use)
Track form submissions.

**When triggered:** When contact/quotation forms are submitted  
**Parameters:**
- `form_name`: Name of the form
- Additional custom parameters

**Implementation:** Available in `/lib/analytics.ts` but not yet used (no forms exist)

## File Structure

\`\`\`
/lib/analytics.ts              # Core GA4 tracking functions
/hooks/use-analytics.ts        # React hooks for tracking
/app/layout.tsx                # GA4 script injection
/app/coleccion/[slug]/
  motorcycle-detail-client.tsx # Product view & scroll tracking
/components/
  whatsapp-button.tsx          # Lead generation tracking
  collection-client.tsx        # Search tracking
  image-gallery.tsx            # Item list tracking
\`\`\`

## Usage Examples

### Track a custom event
\`\`\`typescript
import { useAnalytics } from "@/hooks/use-analytics"

function MyComponent() {
  const { trackEvent } = useAnalytics()
  
  const handleClick = () => {
    trackEvent("custom_event", {
      custom_param: "value",
      another_param: 123
    })
  }
  
  return <button onClick={handleClick}>Track Event</button>
}
\`\`\`

### Track product view
\`\`\`typescript
import { useProductView } from "@/hooks/use-analytics"

function ProductPage({ product }) {
  useProductView({
    product_id: product.id,
    product_name: product.name,
    marca: product.brand,
    tipo_de_moto: product.type,
    price: product.price,
    currency: "ARS"
  })
  
  return <div>Product Details</div>
}
\`\`\`

### Track scroll depth
\`\`\`typescript
import { useScrollTracking } from "@/hooks/use-analytics"

function ArticlePage() {
  useScrollTracking("/blog/my-article")
  
  return <article>Long content...</article>
}
\`\`\`

### Track search
\`\`\`typescript
import { useSearchTracking } from "@/hooks/use-analytics"

function SearchComponent() {
  const trackSearch = useSearchTracking()
  
  const handleSearch = (query: string, results: number) => {
    trackSearch({
      search_term: query,
      results_count: results
    })
  }
  
  return <input onChange={(e) => handleSearch(e.target.value, 10)} />
}
\`\`\`

## GA4 Dashboard Setup

To view the tracked events in GA4:

1. Go to Google Analytics 4 dashboard
2. Navigate to **Reports** → **Engagement** → **Events**
3. You should see these events:
   - `view_item`
   - `generate_lead`
   - `search`
   - `scroll_25_percent`, `scroll_50_percent`, etc.
   - `view_item_list`

### Creating Custom Reports

#### Conversion Funnel
Track the user journey from viewing products to generating leads:

1. **View Item** → Users viewing motorcycle details
2. **View Item List** → Users browsing galleries
3. **Generate Lead** → Users clicking WhatsApp button

#### Popular Products
See which motorcycles get the most views and conversions:
- Filter by `item_name` in `view_item` events
- Compare with `generate_lead` events for same products

#### Search Analysis
Understand what users are looking for:
- Most common `search_term` values
- Popular `filter_brand` and `filter_type` combinations
- Correlation between filters and conversion

#### Engagement Metrics
Track user engagement depth:
- Percentage of users reaching scroll milestones
- Average scroll depth per page
- Correlation between scroll depth and lead generation

## Testing

To test GA4 tracking in development:

1. Install [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger) Chrome extension
2. Open browser console
3. Navigate through the website
4. Check console for GA4 events: `[GA4] Event tracked: event_name`
5. Verify events in GA4 DebugView (Real-time reports)

## Best Practices

1. **Don't track PII**: Never send personally identifiable information
2. **Use consistent naming**: Follow GA4 recommended event names when possible
3. **Test before deploying**: Always test new tracking in development
4. **Document custom events**: Add new events to this documentation
5. **Monitor event limits**: GA4 has limits on custom dimensions and events

## Troubleshooting

### Events not showing in GA4
- Check that GA4 measurement ID is correct in `/app/layout.tsx`
- Verify GA4 script is loading in browser DevTools
- Check browser console for GA4 event logs
- Wait 24-48 hours for data to appear in standard reports (use DebugView for real-time)

### TypeScript errors
- Ensure all parameters match the interfaces in `/lib/analytics.ts`
- Check that `window.gtag` is properly declared in the global interface

### Events firing multiple times
- Check that tracking hooks are not called multiple times
- Verify `useRef` is used to prevent duplicate tracking
- Review React component lifecycle and re-renders

## Future Enhancements

- [ ] Add enhanced e-commerce tracking for complete purchase funnel
- [ ] Track comparator tool usage
- [ ] Add user engagement score calculation
- [ ] Implement A/B testing with GA4 experiments
- [ ] Track video views (if videos are added)
- [ ] Add custom dimensions for user segments
- [ ] Implement cross-domain tracking if needed

## Resources

- [GA4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Recommended Events](https://developers.google.com/analytics/devguides/collection/ga4/reference/events)
- [GA4 Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/ga4)

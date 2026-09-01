# WEGE — Web (Next.js)

Product gallery with variant-aware image viewer. Built against the [assessment brief](../WEGE_Frontend_Technical_Assessment.md).

## Setup

```bash
npm install
npm run dev   # http://localhost:3000
```

Live demo: https://wage-gallery.vercel.app/

## Architecture

- **`domain/products/`** — everything product-related, isolated from `app/`:
  - `hooks/` — `useVariantSelection` (selected color per product, keyed by id), `useImageViewer` (which product/image is open), `useZoomPan` (pointer-driven zoom/pan/swipe), `useFavorites`.
  - `components/` — `ProductCard`, `ColorSwatches`, `PriceDisplay`, `ProductImage`, `ImageViewer`, `ProductsGrid`/`ProductsGallery`.
  - `utils/` — variant/image lookup helpers (`product.ts`) and zoom-transform math (`geometry.ts`).
- **Variant state lives above the viewer** (`useVariantSelection`, owned by `ProductsGallery`), not inside `ProductCard`. The card and the viewer both read/write it, so the selected color survives opening and closing the viewer.
- **Zoom/pan/swipe is hand-rolled on the Pointer Events API** (`use-zoom-pan.ts`), not a library. Pointer Events unify mouse and touch, so the same code path drives desktop drag-to-pan/wheel-zoom and mobile-web pinch/swipe. A `resetKey` (`productId:variantIndex:imageIndex`) resets scale and pan synchronously on render whenever the variant or image changes, so no stale frame at the old zoom level ever paints.
- **Design tokens** live in `app/globals.css` (`@theme`) — colors, radii, shadows, and the `3.5/6` product-image aspect ratio are all tokens, not hardcoded per-component values.

## Libraries

No non-core runtime libraries. Next.js/React/Tailwind only — gestures and the image viewer are hand-rolled per the assessment's custom-implementation intent.

## Completed

- 12 products, 6/2-column responsive grid, 3.5:6 image frame with no layout shift.
- Color swatches switch the card image instantly; selection persists across viewer open/close.
- Image viewer: swipe (drag), pinch/wheel/double-click zoom, pan while zoomed, dot indicator, arrow nav.
- Variant change while viewer is open resets to image 1, default zoom, centered pan.
- Loading spinner and broken-image fallback, keyed per-`src` so variant switches re-enter loading state cleanly.

## Known limitations / trade-offs

- No automated tests — time budget went to gesture correctness and visual polish instead.
- Zoom/pan is pointer-based, not a true native touch-gesture stack; verified on Chrome DevTools device emulation and a real Android device, not exhaustively cross-browser.
- Favorites state is in-memory only (no persistence across reloads) — out of scope per the brief.

## Time spent

~3 hours, within the 6-hour budget (shared with `/mobile` setup, which reuses the same domain logic).

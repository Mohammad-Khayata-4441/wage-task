# WEGE — Mobile (Expo / React Native)

Same product gallery and variant-aware image viewer as `/web`, ported to native. Built against the [assessment brief](../WEGE_Frontend_Technical_Assessment.md).

## Setup

```bash
npm install
npx expo start   # scan the QR with Expo Go, or press i / a
```

Two ways to run it live, no local machine needed:

- **Installable APK (Android)** — download and install directly, no Expo Go required:
  https://expo.dev/accounts/mohammadkhayata/projects/mobile/builds/01edc7af-bb95-4a01-aaec-ee4de48c1f1e
- **EAS Update preview (Expo Go, iOS or Android)** — open the link with Expo Go installed:
  https://expo.dev/preview/update?message=Preview%20build%20for%20WEGE%20assessment&updateRuntimeVersion=1.0.0&createdAt=2026-09-01T17%3A22%3A55.000Z&slug=mobile&projectId=09c05cb1-1f60-420b-b2be-c6293976aa8c&group=e6ca5949-1c2c-434d-9a68-31761e572749

Project is EAS-linked (`@mohammadkhayata/mobile`). The APK was built with `eas build -p android --profile preview` (internal distribution, `eas.json`); the update was published with `eas update --branch preview`. Re-run either after future changes to refresh the links.

## Architecture

- **`src/domain/products/`** mirrors the web app's structure — `hooks/`, `components/`, `utils/` — same variant-selection and image-viewer hook logic ported 1:1 (`use-variant-selection.ts`, `use-image-viewer.ts`, `use-favorites.ts`), so variant state architecture is identical to web: selection lives above the viewer and survives open/close.
- **`image-pager.tsx`** is the gesture core: `react-native-gesture-handler` composes `Pinch`, `Pan`, and a double-tap into one `Gesture.Race(doubleTap, Gesture.Simultaneous(pinch, pan))`, driven entirely by `react-native-reanimated` shared values on the UI thread — no bridge traffic per frame. A single-finger pan swipes between images when unzoomed and pans the image when zoomed; the same gesture tree handles both without a mode switch.
- **`ImageViewer`** wraps `ImagePager` in a `Modal`. `GestureHandlerRootView` is placed *inside* the `Modal`, not just at the app root — RN's `Modal` renders into a separate native view hierarchy, so a `GestureHandlerRootView` only at the top of `App.tsx` doesn't reach content inside the modal and silently swallows all gestures. This was the one real platform gotcha during the port.
- **`resetKey`** (`productId:variantIndex`) drives the same zoom/pan/index reset behavior as web, via a `useEffect` on the shared values.
- **`src/theme/tokens.ts`** mirrors the web design tokens (colors, radii, the `3.5:6` aspect ratio) as plain JS constants, since RN has no CSS custom properties.

## Libraries

| Library | Why |
|---|---|
| `expo-image` | Disk/memory caching + `onLoad`/`onError` for loading and fallback states |
| `react-native-gesture-handler` | Native pinch/pan/tap recognizers |
| `react-native-reanimated` | UI-thread-driven zoom/pan, avoids per-frame JS bridge cost |
| `react-native-svg` | Icon set (heart, close, chevron, zoom, broken-image) |
| `react-native-safe-area-context` | Safe-area-aware layout in the full-screen viewer |

No off-the-shelf gallery/zoom package — built from gesture primitives since the assessment weights gesture and variant-state architecture directly.

## Completed

- 12 products, 2-column `FlatList` grid, 3.5:6 image frame.
- Color swatches switch the card image instantly; selection persists across viewer open/close.
- Real pinch-to-zoom, pan while zoomed, single-finger swipe between images, double-tap zoom toggle.
- Variant change while viewer is open resets to image 1, default zoom, centered pan.
- Loading spinner and broken-image fallback per image.

## Known limitations / trade-offs

- No automated tests — time budget went to gesture correctness on-device.
- Tested on Android (Expo Go + installed APK) and iOS Simulator; not tested on a physical iOS device.
- The installable build is Android-only (internal-distribution APK); iOS is Expo Go/EAS Update preview only, since an installable iOS build needs an Apple Developer account for ad-hoc/TestFlight distribution.
- Favorites state is in-memory only, no persistence.

## Time spent

~1.5–2 hours (on top of `/web`'s ~3 hours), reusing ported domain logic and design tokens from the web implementation.

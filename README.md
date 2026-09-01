# WEGE — Product Gallery & Variant Experience

Implementation of the [assessment brief](./WEGE_Frontend_Technical_Assessment.md): the same product-gallery/variant experience built twice — Next.js (`/web`) and Expo/React Native (`/mobile`).

## Live demo

- Web: https://wage-gallery.vercel.app/
- Mobile — installable Android APK: https://expo.dev/accounts/mohammadkhayata/projects/mobile/builds/01edc7af-bb95-4a01-aaec-ee4de48c1f1e
- Mobile — EAS Update preview (Expo Go, iOS or Android): https://expo.dev/preview/update?message=Preview%20build%20for%20WEGE%20assessment&updateRuntimeVersion=1.0.0&createdAt=2026-09-01T17%3A22%3A55.000Z&slug=mobile&projectId=09c05cb1-1f60-420b-b2be-c6293976aa8c&group=e6ca5949-1c2c-434d-9a68-31761e572749

## Setup

```bash
cd web && npm install && npm run dev      # Next.js — http://localhost:3000
cd mobile && npm install && npx expo start # Expo — scan QR with Expo Go, or press i/a
```

Each app has its own README ([`/web`](./web/README.md), [`/mobile`](./mobile/README.md)) with architecture notes, trade-offs, and known limitations.

## Non-core libraries

Both apps are built on their framework's default toolchain (Next.js/React/Tailwind for web; Expo/React Native/TypeScript for mobile) plus these additions:

### `/web`

No non-core runtime libraries — gestures, zoom/pan, and the image viewer are hand-rolled with native pointer events, per the assessment's own custom-implementation intent.

### `/mobile`

| Library | Why |
|---|---|
| `expo-image` | Disk/memory caching + `onLoad`/`onError` callbacks for the loading/fallback states |
| `react-native-gesture-handler` | Native pinch/pan/tap recognizers for the image viewer |
| `react-native-reanimated` | UI-thread-driven zoom/pan so gestures don't hit the JS bridge per frame |
| `react-native-svg` | Icon set (heart, close, chevron, zoom, broken-image) |
| `react-native-safe-area-context` | Safe-area-aware layout in the full-screen viewer |

No off-the-shelf gallery/zoom package on either platform — the assessment weights gesture and variant-state architecture, so both viewers are built from primitives rather than a monolithic library.

# WEGE — Product Gallery & Variant Experience


## Setup

```bash
cd web && npm install && npm run dev      # Next.js — http://localhost:3000
cd mobile && npm install && npx expo start # Expo — scan QR with Expo Go, or press i/a
```

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

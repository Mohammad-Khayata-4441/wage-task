import { useCallback, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ProductImage } from "./product-image";

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const DOUBLE_TAP_SCALE = 2.5;
const ZOOM_EPSILON = 1.01;
const SWIPE_DISTANCE_THRESHOLD = 60;
const SWIPE_VELOCITY_THRESHOLD = 800;

interface ImagePagerProps {
  images: Array<string | undefined>;
  index: number;
  onIndexChange: (index: number) => void;
  onZoomChange: (zoomed: boolean) => void;
  frameWidth: number;
  frameHeight: number;
  resetKey: string;
}

export function ImagePager({
  images,
  index,
  onIndexChange,
  onZoomChange,
  frameWidth,
  frameHeight,
  resetKey,
}: ImagePagerProps) {
  const total = images.length;

  const rowX = useSharedValue(-index * frameWidth);
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const imageX = useSharedValue(0);
  const imageY = useSharedValue(0);
  const savedImageX = useSharedValue(0);
  const savedImageY = useSharedValue(0);

  useEffect(() => {
    rowX.value = withTiming(-index * frameWidth);
  }, [index, frameWidth, rowX]);

  useEffect(() => {
    rowX.value = -index * frameWidth;
    scale.value = 1;
    savedScale.value = 1;
    imageX.value = 0;
    imageY.value = 0;
    savedImageX.value = 0;
    savedImageY.value = 0;
  }, [resetKey]);

  useAnimatedReaction(
    () => scale.value > ZOOM_EPSILON,
    (zoomed, previous) => {
      if (zoomed !== previous) runOnJS(onZoomChange)(zoomed);
    },
    [onZoomChange]
  );

  const commitIndex = useCallback((next: number) => onIndexChange(next), [onIndexChange]);

  const clampImagePan = (x: number, y: number, s: number) => {
    "worklet";
    const maxX = (frameWidth * (s - 1)) / 2;
    const maxY = (frameHeight * (s - 1)) / 2;
    return {
      x: Math.min(Math.max(x, -maxX), maxX),
      y: Math.min(Math.max(y, -maxY), maxY),
    };
  };

  const pinch = Gesture.Pinch()
    .onUpdate((event) => {
      const next = Math.min(Math.max(savedScale.value * event.scale, MIN_SCALE), MAX_SCALE);
      scale.value = next;
      const clamped = clampImagePan(imageX.value, imageY.value, next);
      imageX.value = clamped.x;
      imageY.value = clamped.y;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
      savedImageX.value = imageX.value;
      savedImageY.value = imageY.value;
      if (scale.value <= MIN_SCALE) {
        scale.value = withTiming(MIN_SCALE);
        savedScale.value = MIN_SCALE;
        imageX.value = withTiming(0);
        imageY.value = withTiming(0);
        savedImageX.value = 0;
        savedImageY.value = 0;
      }
    });

  const pan = Gesture.Pan()
    .maxPointers(1)
    .onUpdate((event) => {
      if (scale.value > MIN_SCALE) {
        const clamped = clampImagePan(
          savedImageX.value + event.translationX,
          savedImageY.value + event.translationY,
          scale.value
        );
        imageX.value = clamped.x;
        imageY.value = clamped.y;
      } else {
        rowX.value = -index * frameWidth + event.translationX;
      }
    })
    .onEnd((event) => {
      if (scale.value > MIN_SCALE) {
        savedImageX.value = imageX.value;
        savedImageY.value = imageY.value;
        return;
      }
      const shouldAdvance =
        total > 1 &&
        (Math.abs(event.translationX) > SWIPE_DISTANCE_THRESHOLD ||
          Math.abs(event.velocityX) > SWIPE_VELOCITY_THRESHOLD);
      const next = shouldAdvance
        ? (index + (event.translationX < 0 ? 1 : -1) + total) % total
        : index;
      rowX.value = withTiming(-next * frameWidth);
      if (next !== index) runOnJS(commitIndex)(next);
    });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scale.value > MIN_SCALE) {
        scale.value = withTiming(MIN_SCALE);
        savedScale.value = MIN_SCALE;
        imageX.value = withTiming(0);
        imageY.value = withTiming(0);
        savedImageX.value = 0;
        savedImageY.value = 0;
      } else {
        scale.value = withTiming(DOUBLE_TAP_SCALE);
        savedScale.value = DOUBLE_TAP_SCALE;
      }
    });

  const gesture = Gesture.Race(doubleTap, Gesture.Simultaneous(pinch, pan));

  const rowStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: rowX.value }],
  }));

  const activeImageStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: imageX.value },
      { translateY: imageY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <GestureDetector gesture={gesture}>
      <View style={{ width: frameWidth, height: frameHeight, overflow: "hidden" }}>
        <Animated.View style={[styles.row, { height: frameHeight }, rowStyle]}>
          {images.map((source, i) => (
            <Animated.View
              key={`${source ?? "empty"}-${i}`}
              style={[
                { width: frameWidth, height: frameHeight },
                i === index ? activeImageStyle : undefined,
              ]}
            >
              <ProductImage source={source} />
            </Animated.View>
          ))}
        </Animated.View>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row" },
});

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  clampOffset,
  contentPointAt,
  distance,
  IDENTITY,
  midpoint,
  MIN_SCALE,
  transformAround,
  type Point,
  type Transform,
} from "../utils/geometry";

const DOUBLE_TAP_SCALE = 2.5;
const SWIPE_THRESHOLD = 50;
const ZOOM_STEP = 1.5;

interface UseZoomPanOptions {
  onSwipe: (direction: 1 | -1) => void;
  /** Any change resets zoom to default and pan to centre (variant/image switch). */
  resetKey: string;
}

export function useZoomPan({ onSwipe, resetKey }: UseZoomPanOptions) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<Transform>(IDENTITY);
  const [swipeDx, setSwipeDx] = useState(0);
  const [isInteracting, setInteracting] = useState(false);

  const pointers = useRef(new Map<number, Point>());
  const pinch = useRef<{ anchor: Point; startDistance: number; startScale: number } | null>(null);
  const drag = useRef<{ start: Point; startOffset: Point; scale: number } | null>(null);

  // Pointer handlers fire after paint, so an effect-synced mirror is always
  // current and avoids re-binding native listeners on every transform change.
  const transformRef = useRef(transform);
  useEffect(() => {
    transformRef.current = transform;
  }, [transform]);

  // Adjusted during render rather than in an effect so the new image never
  // paints a frame at the previous zoom level before snapping back.
  const [appliedResetKey, setAppliedResetKey] = useState(resetKey);
  if (resetKey !== appliedResetKey) {
    setAppliedResetKey(resetKey);
    setTransform(IDENTITY);
    setSwipeDx(0);
  }

  const getRect = () => frameRef.current?.getBoundingClientRect() ?? null;

  const applyZoom = useCallback((next: (scale: number) => number, at?: Point) => {
    const rect = getRect();
    if (!rect) return;
    const point = at ?? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    setTransform((prev) =>
      transformAround(contentPointAt(prev, rect, point), next(prev.scale), rect, point)
    );
  }, []);

  const zoomIn = useCallback(() => applyZoom((s) => s * ZOOM_STEP), [applyZoom]);
  const zoomOut = useCallback(() => applyZoom((s) => s / ZOOM_STEP), [applyZoom]);
  const reset = useCallback(() => setTransform(IDENTITY), []);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      applyZoom((s) => s * Math.exp(-event.deltaY * 0.002), {
        x: event.clientX,
        y: event.clientY,
      });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [applyZoom]);

  /**
   * Controls layered over the frame (arrows, dots) must be left alone:
   * setPointerCapture below retargets pointerup to the frame, which makes the
   * browser dispatch the resulting click on the frame instead of the button.
   */
  const isControl = (target: EventTarget | null) =>
    target instanceof Element && target.closest("button") !== null;

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || isControl(event.target)) return;
    const rect = getRect();
    if (!rect) return;

    frameRef.current?.setPointerCapture(event.pointerId);
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    const active = [...pointers.current.values()];
    if (active.length === 2) {
      const mid = midpoint(active[0], active[1]);
      pinch.current = {
        anchor: contentPointAt(transformRef.current, rect, mid),
        startDistance: distance(active[0], active[1]) || 1,
        startScale: transformRef.current.scale,
      };
      drag.current = null;
      setSwipeDx(0);
    } else if (active.length === 1) {
      drag.current = {
        start: { x: event.clientX, y: event.clientY },
        startOffset: transformRef.current.offset,
        scale: transformRef.current.scale,
      };
      setInteracting(true);
    }
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    const rect = getRect();
    if (!rect) return;

    const active = [...pointers.current.values()];
    if (active.length >= 2 && pinch.current) {
      const ratio = distance(active[0], active[1]) / pinch.current.startDistance;
      setTransform(
        transformAround(
          pinch.current.anchor,
          pinch.current.startScale * ratio,
          rect,
          midpoint(active[0], active[1])
        )
      );
      return;
    }

    const current = drag.current;
    if (!current) return;

    if (current.scale > MIN_SCALE) {
      const offset = {
        x: current.startOffset.x + (event.clientX - current.start.x),
        y: current.startOffset.y + (event.clientY - current.start.y),
      };
      setTransform({ scale: current.scale, offset: clampOffset(offset, current.scale, rect) });
    } else {
      setSwipeDx(event.clientX - current.start.x);
    }
  };

  const endPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.delete(event.pointerId)) return;
    frameRef.current?.releasePointerCapture(event.pointerId);

    const current = drag.current;
    const shouldSwipe =
      current && current.scale === MIN_SCALE && pointers.current.size === 0;

    if (shouldSwipe) {
      const dx = event.clientX - current.start.x;
      const dy = event.clientY - current.start.y;
      if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
        onSwipe(dx < 0 ? 1 : -1);
      }
    }

    setSwipeDx(0);

    if (pointers.current.size === 0) {
      pinch.current = null;
      drag.current = null;
      setInteracting(false);
      return;
    }

    // Lifting one finger mid-pinch hands control back to the survivor without
    // snapping the image, by re-anchoring the drag to the live transform.
    pinch.current = null;
    const [survivor] = [...pointers.current.values()];
    drag.current = {
      start: survivor,
      startOffset: transformRef.current.offset,
      scale: transformRef.current.scale,
    };
  };

  const onDoubleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isControl(event.target)) return;
    applyZoom((s) => (s > MIN_SCALE ? MIN_SCALE : DOUBLE_TAP_SCALE), {
      x: event.clientX,
      y: event.clientY,
    });
  };

  return {
    frameRef,
    transform,
    swipeDx,
    isInteracting,
    isZoomed: transform.scale > MIN_SCALE,
    zoomIn,
    zoomOut,
    reset,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endPointer,
      onPointerCancel: endPointer,
      onDoubleClick,
    },
  };
}

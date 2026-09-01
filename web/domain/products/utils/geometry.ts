export interface Point {
  x: number;
  y: number;
}

export interface Transform {
  scale: number;
  offset: Point;
}

export const MIN_SCALE = 1;
export const MAX_SCALE = 4;

export const IDENTITY: Transform = { scale: MIN_SCALE, offset: { x: 0, y: 0 } };

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

export const distance = (a: Point, b: Point): number =>
  Math.hypot(a.x - b.x, a.y - b.y);

export const midpoint = (a: Point, b: Point): Point => ({
  x: (a.x + b.x) / 2,
  y: (a.y + b.y) / 2,
});

const centerOf = (rect: DOMRect): Point => ({
  x: rect.left + rect.width / 2,
  y: rect.top + rect.height / 2,
});

/**
 * At scale s the content overflows its frame by (s - 1), so the pannable range
 * is half that overflow either way. Clamping here is what keeps the image from
 * drifting out of the 3.5:6 frame and leaving dead space on screen.
 */
export const clampOffset = (offset: Point, scale: number, rect: DOMRect): Point => {
  const maxX = (rect.width * (scale - 1)) / 2;
  const maxY = (rect.height * (scale - 1)) / 2;
  return {
    x: clamp(offset.x, -maxX, maxX),
    y: clamp(offset.y, -maxY, maxY),
  };
};

/** Content-space coordinate currently sitting under a viewport point. */
export const contentPointAt = (
  transform: Transform,
  rect: DOMRect,
  viewportPoint: Point
): Point => {
  const center = centerOf(rect);
  return {
    x: (viewportPoint.x - center.x - transform.offset.x) / transform.scale,
    y: (viewportPoint.y - center.y - transform.offset.y) / transform.scale,
  };
};

/**
 * Builds the transform that pins content-space point `anchor` underneath
 * viewport point `at` while scaling. Used by wheel zoom, the zoom buttons and
 * pinch alike, so every zoom path behaves identically.
 */
export const transformAround = (
  anchor: Point,
  scale: number,
  rect: DOMRect,
  at: Point
): Transform => {
  const next = clamp(scale, MIN_SCALE, MAX_SCALE);
  const center = centerOf(rect);
  const offset = {
    x: at.x - center.x - anchor.x * next,
    y: at.y - center.y - anchor.y * next,
  };
  return { scale: next, offset: clampOffset(offset, next, rect) };
};

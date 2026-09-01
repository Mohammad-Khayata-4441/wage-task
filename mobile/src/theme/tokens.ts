export const colors = {
  canvas: "#fafafa",
  surface: "#ffffff",
  surfaceMuted: "#f4f4f5",
  ink: "#18181b",
  inkMuted: "#71717a",
  inkSubtle: "#a1a1aa",
  line: "#e4e4e7",
  lineStrong: "#d4d4d8",
  accent: "#18181b",
  sale: "#be123c",
  saleMuted: "rgba(190, 18, 60, 0.1)",
  viewerBackdrop: "rgba(9, 9, 11, 0.96)",
  white: "#ffffff",
} as const;

export const radii = {
  card: 12,
  control: 999,
} as const;

export const shadows = {
  card: {
    shadowColor: "#09090b",
    shadowOpacity: 0.08,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
} as const;

export const PRODUCT_ASPECT_RATIO = 3.5 / 6;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
} as const;

import Svg, { Circle, Path } from "react-native-svg";

interface IconProps {
  size?: number;
  color?: string;
  filled?: boolean;
}

export function HeartIcon({ size = 18, color = "#18181b", filled }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20.8 5.6a5.2 5.2 0 0 0-7.4 0L12 7l-1.4-1.4a5.2 5.2 0 1 0-7.4 7.4l8.8 8.8 8.8-8.8a5.2 5.2 0 0 0 0-7.4Z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={filled ? color : "none"}
      />
    </Svg>
  );
}

export function CloseIcon({ size = 20, color = "#ffffff" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M6 6l12 12M18 6L6 18" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

export function ChevronIcon({
  size = 20,
  color = "#ffffff",
  direction,
}: IconProps & { direction: "left" | "right" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d={direction === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ZoomIcon({ size = 16, color = "#ffffff", variant }: IconProps & { variant: "in" | "out" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={11} cy={11} r={7} stroke={color} strokeWidth={1.8} />
      <Path d="M20 20l-3.5-3.5M8 11h6" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      {variant === "in" && <Path d="M11 8v6" stroke={color} strokeWidth={1.8} strokeLinecap="round" />}
    </Svg>
  );
}

export function ImageOffIcon({ size = 28, color = "#a1a1aa" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 15l4.5-4.5 4 4M14 13.5l2.5-2.5L21 15M3 4h18v16H3Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={15} cy={8.5} r={1.2} fill={color} />
    </Svg>
  );
}

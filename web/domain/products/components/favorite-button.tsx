"use client";

import { cn } from "@/lib/cn";
import { HeartIcon } from "./icons";

interface FavoriteButtonProps {
  isFavorite: boolean;
  productName: string;
  onToggle: () => void;
}

export function FavoriteButton({ isFavorite, productName, onToggle }: FavoriteButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={isFavorite}
      aria-label={`${isFavorite ? "Remove" : "Add"} ${productName} ${isFavorite ? "from" : "to"} favourites`}
      onClick={(event) => {
        event.stopPropagation();
        onToggle();
      }}
      className={cn(
        "absolute right-2.5 top-2.5 z-10 grid h-8 w-8 place-items-center rounded-control",
        "bg-surface/85 shadow-control backdrop-blur-sm transition-colors",
        isFavorite ? "text-sale" : "text-ink-muted hover:text-ink"
      )}
    >
      <HeartIcon className="h-4 w-4" filled={isFavorite} />
    </button>
  );
}

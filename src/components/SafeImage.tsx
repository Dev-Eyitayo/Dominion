"use client";

import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";

export const DEFAULT_PLACEHOLDER = "/images/placeholder.svg";

export interface SafeImageProps extends Omit<ImageProps, "src"> {
  src?: string | null;
  fallbackSrc?: string;
}

export default function SafeImage({
  src,
  fallbackSrc = DEFAULT_PLACEHOLDER,
  alt,
  ...rest
}: SafeImageProps) {
  const cleanSrc = (src && typeof src === "string" && src.trim() !== "") ? src : fallbackSrc;
  const [currentSrc, setCurrentSrc] = useState<string>(cleanSrc);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const valid = (src && typeof src === "string" && src.trim() !== "") ? src : fallbackSrc;
    setCurrentSrc(valid);
    setHasError(false);
  }, [src, fallbackSrc]);

  return (
    <Image
      {...rest}
      src={currentSrc}
      alt={alt || "Dominion Engineering Asset"}
      onError={() => {
        if (!hasError) {
          setHasError(true);
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}

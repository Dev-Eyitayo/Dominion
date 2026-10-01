export const DEFAULT_PLACEHOLDER_IMAGE = "/images/placeholder.svg";

/**
 * Returns a valid image URL, falling back to the Dominion branded SVG placeholder
 * if the given URL is null, undefined, empty, or unresolvable.
 */
export function getValidImageUrl(url?: string | null, fallback = DEFAULT_PLACEHOLDER_IMAGE): string {
  if (!url || typeof url !== "string" || url.trim() === "") {
    return fallback;
  }
  return url.trim();
}

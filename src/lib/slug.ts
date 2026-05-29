/**
 * Generate a clean, URL-safe slug from any title.
 * - Strips accents/diacritics
 * - Removes dots, special characters, and emoji
 * - Collapses multiple dashes/spaces
 * - Trims leading/trailing dashes
 * - Limits to 100 characters
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")       // strip diacritics
    .replace(/[.]+/g, " ")                  // dots → spaces
    .replace(/[''""`]/g, "")                // remove quotes
    .replace(/[^a-z0-9\s-]/g, "")           // keep only alphanumeric, spaces, dashes
    .replace(/[\s-]+/g, "-")                // collapse spaces/dashes into single dash
    .replace(/^-+|-+$/g, "")               // trim leading/trailing dashes
    .slice(0, 100);
}

/**
 * Ensure slug uniqueness by appending a timestamp if needed.
 */
export function makeUniqueSlug(slug: string, existingSlug: boolean): string {
  if (!slug) {
    return `article-${Date.now()}`;
  }
  return existingSlug ? `${slug}-${Date.now()}` : slug;
}

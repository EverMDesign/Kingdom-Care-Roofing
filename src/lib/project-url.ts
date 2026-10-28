/** URL-safe city segment used in the `/[city]/[slug]` project route. */
export function citySlug(city: string): string {
  return city.toLowerCase().replace(/\s+/g, '-');
}

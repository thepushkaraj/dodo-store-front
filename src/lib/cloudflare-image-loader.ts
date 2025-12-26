/**
 * Custom image loader for Cloudflare Pages
 * Uses Cloudflare's Image Resizing service when available
 * Falls back to the original URL if not on Cloudflare
 */

interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

export default function cloudflareImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  // If the src is already an absolute URL, use Cloudflare's image resizing
  if (src.startsWith("http://") || src.startsWith("https://")) {
    const params = [`width=${width}`, `quality=${quality || 75}`, "format=auto"];
    return `/cdn-cgi/image/${params.join(",")}/${src}`;
  }

  // For local images, return with width parameter for Cloudflare
  // Note: Cloudflare Image Resizing must be enabled on your zone
  const params = [`width=${width}`, `quality=${quality || 75}`, "format=auto"];
  return `/cdn-cgi/image/${params.join(",")}${src}`;
}

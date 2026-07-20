// parseContent dengan locale

export function parseContent(content: string, locale: string = "id"): string {
  if (!content) return ""
  
  return content
    // [hotel:slug] -> /en/hotels/slug
    .replace(/\$hotel:([^\$]+)\$/g, `<a href="/${locale}/hotels/$1" class="text-blue-600 hover:underline">$1</a>`)
    
    // [location:slug] -> /en/locations/slug
    .replace(/\$location:([^\$]+)\$/g, `<a href="/${locale}/locations/$1" class="text-blue-600 hover:underline">$1</a>`)
    
    // [article:slug] -> /en/articles/slug
    .replace(/\$article:([^\$]+)\$/g, `<a href="/${locale}/articles/$1" class="text-blue-600 hover:underline">$1</a>`)
    
    // [url:...] -> external
    .replace(/\$url:([^\$]+)\$/g, `<a href="$1" class="text-blue-600 hover:underline" target="_blank">$1</a>`)
}
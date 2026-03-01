/** Lightweight HTML sanitizer for client-side rendering.
 *  Strips <script>, <iframe>, <object>, <embed>, <form>, on* event handlers. */
export function sanitizeHtml(html: string): string {
  if (!html) return '';
  return html
    // Remove script/iframe/object/embed/form tags and content
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
    .replace(/<object[\s\S]*?<\/object>/gi, '')
    .replace(/<embed[\s\S]*?\/?>/gi, '')
    .replace(/<form[\s\S]*?<\/form>/gi, '')
    // Remove self-closing variants
    .replace(/<script[^>]*\/?>/gi, '')
    .replace(/<iframe[^>]*\/?>/gi, '')
    // Remove on* event handlers from all tags
    .replace(/\s+on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    // Remove javascript: URLs
    .replace(/href\s*=\s*(?:"javascript:[^"]*"|'javascript:[^']*')/gi, '')
    .replace(/src\s*=\s*(?:"javascript:[^"]*"|'javascript:[^']*')/gi, '');
}

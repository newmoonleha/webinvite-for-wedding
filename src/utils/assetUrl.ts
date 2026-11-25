/**
 * Преобразует пути вида `/images/hero.jpg` с учётом `import.meta.env.BASE_URL`,
 * чтобы локальные медиафайлы работали как на корневом домене (`/`),
 * так и в подпапке GitHub Pages (`/repo-name/`).
 */
export function resolveAssetUrl(src: string | null | undefined): string | undefined {
  if (!src) return undefined;

  if (/^(https?:)?\/\//i.test(src) || src.startsWith('data:')) {
    return src;
  }

  const normalizedPath = src.startsWith('/') ? src.slice(1) : src;
  return `${import.meta.env.BASE_URL}${normalizedPath}`;
}

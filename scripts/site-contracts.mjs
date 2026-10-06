export function clampProgress(scrollY, scrollable) {
  if (scrollable <= 0) return 0;
  return Math.min(1, Math.max(0, scrollY / scrollable));
}

export function hasAttribute(html, tag, attribute) {
  const pattern = new RegExp(`<${tag}\\b[^>]*\\b${attribute}(?:\\s|=|>)`, "i");
  return pattern.test(html);
}

export function countOccurrences(text, pattern) {
  return (text.match(pattern) ?? []).length;
}

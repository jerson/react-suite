export function getDefaultLocale(): string {
  if (navigator.language) {
    return navigator.language;
  } else {
    return '';
  }
}

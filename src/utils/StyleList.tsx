export default function StyleList<T>(...styles: T[]): T[] {
  let styleList: T[] = [];

  for (let style of styles) {
    if (style instanceof Array) {
      styleList.push(...style);
    } else if (style) {
      styleList.push(style);
    }
  }

  return styleList;
}

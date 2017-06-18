export default class SEO {
  static isSEORequest(): boolean {
    return typeof window.callPhantom === 'function';
  }
}

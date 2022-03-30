export function interceptRequest(cb: (payload: XMLHttpRequest) => void) {
  // @ts-ignore
  function inject(cb) {
    const open = window.XMLHttpRequest.prototype.open

    window.XMLHttpRequest.prototype.open = function() {
      this.addEventListener('load', function() {
        cb(this)
      })
      // @ts-ignore
      open.apply(this, arguments)
    }
  }

  const actualCode = "("+inject+")("+cb+")";

  document.documentElement.setAttribute('onreset', actualCode);
  document.documentElement.dispatchEvent(new CustomEvent('reset'));
  document.documentElement.removeAttribute('onreset');
}

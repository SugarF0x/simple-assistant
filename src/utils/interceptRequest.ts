export function interceptRequest(cb: (payload: string) => void) {
  function inject(cb: (arg: XMLHttpRequest["response"]) => void) {
    const open = window.XMLHttpRequest.prototype.open

    type Signatures = {
      (method: string, url: string | URL): void
      (
        method: string,
        url: string | URL,
        async: boolean,
        username?: string | null | undefined,
        password?: string | null | undefined
      ): void
    }

    window.XMLHttpRequest.prototype.open = function (this: XMLHttpRequest, ...args) {
      this.addEventListener("load", function () {
        cb(this.response)
      })
      open.apply(this, args as [string, string | URL, boolean, string | null | undefined, string | null | undefined])
    } as Signatures
  }

  const actualCode = "(" + inject + ")(" + cb + ")"

  document.documentElement.setAttribute("onreset", actualCode)
  document.documentElement.dispatchEvent(new CustomEvent("reset"))
  document.documentElement.removeAttribute("onreset")
}

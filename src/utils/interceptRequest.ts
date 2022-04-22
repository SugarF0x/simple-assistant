export function interceptRequest(cb: (payload: string) => void) {
  function inject(cb: (arg: XMLHttpRequest["response"]) => void) {
    const { fetch: originalFetch } = window

    window.fetch = async (...args) => {
      const [resource, config] = args
      const response = await originalFetch(resource, config)
      cb(await response.clone().json())
      return response
    }
  }

  const actualCode = "(" + inject + ")(" + cb + ")"

  document.documentElement.setAttribute("onreset", actualCode)
  document.documentElement.dispatchEvent(new CustomEvent("reset"))
  document.documentElement.removeAttribute("onreset")
}

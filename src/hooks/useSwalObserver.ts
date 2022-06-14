export function useSwalObserver(resolve: () => void, reject?: () => void) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.removedNodes.length) return

      const swalContainer = (Array.from(mutation.addedNodes) as HTMLDivElement[]).find((e) =>
        e.classList.contains("swal2-container")
      )
      if (!swalContainer) return

      if (swalContainer.querySelector('.swal2-success[style="display: flex;"]')) resolve()
      else if (swalContainer.querySelector('.swal2-error[style="display: flex;"]')) reject?.()
    })
  })

  observer.observe(document.body, { childList: true })
}

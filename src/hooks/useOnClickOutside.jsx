import React from "react"
import arePassiveEventsSupported from "are-passive-events-supported"
import useLatest from "use-latest"

const MOUSEDOWN = "mousedown"
const TOUCHSTART = "touchstart"


const events = [MOUSEDOWN, TOUCHSTART]

const getAddOptions = (event) => {
  if (event === TOUCHSTART && arePassiveEventsSupported()) {
    return { passive: true }
  }
}

const currentDocument = typeof document !== "undefined" ? document : undefined

const useOnClickOutside = ( ref, handler, { document = currentDocument } = {} ) => {
  if (typeof document === "undefined") {
    return
  }

  const handlerRef = useLatest(handler)

  React.useEffect(() => {
    if (!handler) {
      return
    }

    const listener = (event) => {
      if (!ref.current || !handlerRef.current || ref.current.contains(event.target)) {
        return
      }

      handlerRef.current(event)
    }

    events.forEach((event) => {
      document.addEventListener(event, listener, getAddOptions(event))
    })

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, listener)
      })
    }
  }, [!handler])
}

export default useOnClickOutside

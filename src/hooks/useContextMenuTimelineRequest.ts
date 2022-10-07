import { useContext } from "react"
import { DesignEditorContext } from "@app/contexts/DesignEditor"

const useContextMenuTimelineRequest = () => {
  const { contextMenuTimelineRequest } = useContext(DesignEditorContext)
  return contextMenuTimelineRequest
}

export default useContextMenuTimelineRequest

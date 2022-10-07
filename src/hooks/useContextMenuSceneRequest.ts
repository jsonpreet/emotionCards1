import { useContext } from "react"
import { DesignEditorContext } from "@app/contexts/DesignEditor"

const useContextMenuSceneRequest = () => {
  const { contextMenuSceneRequest } = useContext(DesignEditorContext)
  return contextMenuSceneRequest
}

export default useContextMenuSceneRequest

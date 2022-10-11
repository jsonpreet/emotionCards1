import { useContext } from "react"
import { DesignEditorContext } from "@app/contexts/DesignEditor"

const useIsSidebarOpen = () => {
  const { isSidebarOpen } = useContext(DesignEditorContext)
  return isSidebarOpen
}

export default useIsSidebarOpen

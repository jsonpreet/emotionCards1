import { useContext } from "react"
import { DesignEditorContext } from "@app/contexts/DesignEditor"

const useSetIsSidebarOpen = () => {
  const { setIsSidebarOpen } = useContext(DesignEditorContext)
  return setIsSidebarOpen
}

export default useSetIsSidebarOpen

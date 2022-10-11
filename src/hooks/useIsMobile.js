import { AppContext } from "@app/contexts/AppContext"
import { useContext } from "react"

const useIsMobile = () => {
  const { isMobile } = useContext(AppContext)
  return isMobile
}

export default useIsMobile

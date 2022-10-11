import React from "react"
import CloudCheck from "@components/Icons/CloudCheck"
import useDesignEditorContext from "@app/hooks/useDesignEditorContext"
import { Tooltip } from "@nextui-org/react";

const DesignTitle = () => {
  const [state, setState] = React.useState({ name: "My first design.", width: 0 })
  const { currentDesign, setCurrentDesign } = useDesignEditorContext()
  const inputTitleRef = React.useRef(null)
  const spanRef = React.useRef(null)

  const handleInputChange = (name) => {
    setState({ ...state, name: name, width: spanRef.current?.clientWidth })
    setCurrentDesign({ ...currentDesign, name })
  }

  React.useEffect(() => {
    const name = currentDesign.name
    if (name || name === "") {
      spanRef.current.innerHTML = name
      setState({ ...state, name: name, width: spanRef.current?.clientWidth + 20 })
    }
  }, [currentDesign.name])

  React.useEffect(() => {
    setState({ ...state, width: spanRef.current?.clientWidth + 20 })
  }, [state.name])

  return (
    <div className="flex items-center justify-center text-white opacity-100 relative">
      
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "50%",
            right: "0",
            margin: "auto",
            fontSize: "14px",
            fontWeight: 500,
          }}
          ref={spanRef}
        >
          {state.name}
        </div>
      <div style={{ width: `${state.width}px`, display: 'flex'}}>
        <input
          onChange={(e) => handleInputChange(e.target.value)}
          value={state.name}
          className="bg-transparent text-white text-xl w-full outline-none focus:border-none"
        />
      </div>

      <Tooltip content="All changes are saved." color="invert"  placement="bottom">
        <div
          style={{
            cursor: "pointer",
            padding: "10px",
            display: "flex",
            color: "#ffffff",
          }}  
        >
          <CloudCheck size={24} />
        </div>
      </Tooltip>
    </div>
  )
}

export default DesignTitle

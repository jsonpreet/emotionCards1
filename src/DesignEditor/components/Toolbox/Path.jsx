import React from "react"
import Common from "./Common"
import Flip from "./Shared/Flip"
import useAppContext from "@app/hooks/useAppContext"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import { Tooltip } from "@nextui-org/react";

const Path = () => {
  const [state, setState] = React.useState({ fill: "#000000" })
  const { setActiveSubMenu } = useAppContext()
  const editor = useEditor()
  const activeObject = useActiveObject()

  React.useEffect(() => {
    if (activeObject && activeObject.type === "StaticPath") {
      setState({ fill: activeObject.fill })
    }
  }, [activeObject])

  React.useEffect(() => {
    let watcher = async () => {
      if (activeObject && activeObject.type === "StaticPath") {
        setState({ fill: activeObject.fill })
      }
    }
    if (editor) {
      editor.on("history:changed", watcher)
    }
    return () => {
      if (editor) {
        editor.off("history:changed", watcher)
      }
    }
  }, [editor, activeObject])

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        padding: "0 12px",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Tooltip content="Fill Path" color="invert"  placement="bottom">
        <div onClick={() => setActiveSubMenu("PathFill")}>
          <div
            style={{
              height: "24px",
              width: "24px",
              marginRight: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backgroundColor: state.fill,
              border: "1px solid #dedede",
            }}
          />
          </div>
        </Tooltip>
        <Flip />
      </div>
      <Common />
    </div>
  )
}

export default Path

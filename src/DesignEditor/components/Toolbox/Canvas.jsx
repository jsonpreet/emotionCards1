import React from "react"
import Common from "./Common"
import useAppContext from "@app/hooks/useAppContext"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import { Tooltip } from "@nextui-org/react";

const Canvas = () => {
  const [state, setState] = React.useState({ fill: "#000000" })
  const { setActiveSubMenu } = useAppContext()
  const editor = useEditor()
  const activeObject = useActiveObject()

  React.useEffect(() => {
    if (editor) {
      setState({ fill: editor.canvas.backgroundColor })
    }
  }, [editor])

  React.useEffect(() => {
    let watcher = async () => {
      setState({ fill: editor.canvas.backgroundColor })
    }
    if (editor) {
      editor.on("canvas:updated", watcher)
    }
    return () => {
      if (editor) {
        editor.off("canvas:updated", watcher)
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
        <div onClick={() => setActiveSubMenu("CanvasFill")}>
          <Tooltip content="Background" color="invert" placement="bottom">
            <div
              style={{
                height: "24px",
                width: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                backgroundColor: state.fill,
                border: "1px solid #dedede",
              }}
            />
            </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default Canvas

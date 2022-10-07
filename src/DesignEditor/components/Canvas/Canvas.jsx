import { Canvas as LayerhubCanvas } from "@layerhub-io/react"
import ContextMenu from "../ContextMenu"

const Canvas = () => {
  return (
    <div className="flex flex-1 relative">
      <ContextMenu />
       <LayerhubCanvas
        config={{
          background: "#ecf0f1",
          shadow: {
            blur: 2,
            color: "#bdc3c7",
            offsetX: 0,
            offsetY: 0,
          },
        }}
      />
    </div>
  )
}

export default Canvas

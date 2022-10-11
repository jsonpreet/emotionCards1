import Scrollable from "@components/Scrollable"
import { HexColorPicker } from "react-colorful"
import { FaTimes } from 'react-icons/fa';
import { throttle } from "lodash"
import { useEditor } from "@layerhub-io/react"
import useAppContext from "@app/hooks/useAppContext";

const PRESET_COLORS = [
  "#f44336",
  "#ff9800",
  "#ffee58",
  "#66bb6a",
  "#26a69a",
  "#03a9f4",
  "#3f51b5",
  "#673ab7",
  "#9c27b0",
  "#ec407a",
  "#8d6e63",
  "#d9d9d9",
]

const CanvasFill = () => {
  const editor = useEditor()
  const { setActiveSubMenu } = useAppContext()

  const updateCanvasBackground = throttle((color) => {
    editor.canvas.setBackgroundColor(color)
  }, 100)

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
          justifyContent: "space-between",
          padding: "1.5rem",
        }}
      >
        <div className="font-semibold text-lg">Canvas Fill</div>

        <div onClick={() => setActiveSubMenu("Templates")} style={{ cursor: "pointer", display: "flex" }}>
          <FaTimes size={24} />
        </div>
      </div>
      <Scrollable>
        <div style={{ padding: "0 1.5rem" }}>
          <HexColorPicker onChange={updateCanvasBackground} style={{ width: "100%" }} />
          <div>
            <div style={{ padding: "0.75rem 0", fontWeight: 500, fontSize: "14px" }}>Preset colors</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr", gap: "0.25rem" }}>
              {PRESET_COLORS.map((color, index) => (
                <div
                  style={{
                    cursor: "pointer",
                    backgroundColor: `${ color }`,
                    height:"38px"
                  }}
                  onClick={() => updateCanvasBackground(color)}
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>
      </Scrollable>
    </div>
  )
}

export default CanvasFill

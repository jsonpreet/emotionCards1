import React from "react"
import { HexColorPicker } from "react-colorful"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import ReactSlider from "react-slider";
import { Popover } from "@headlessui/react"


const Outline = () => {
  const editor = useEditor()
  const activeObject = useActiveObject()

  const [options, setOptions] = React.useState({
    enabled: true,
    stroke: "#000000",
    strokeWidth: 1,
  })

  React.useEffect(() => {
    if (activeObject) {
      updateOptions(activeObject)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeObject])

  const updateOptions = (object) => {
    const { stroke, strokeWidth } = object
    setOptions({ ...options, stroke, strokeWidth, enabled: !!strokeWidth })
  }

  const handleChange = (type, value) => {
    setOptions({ ...options, [type]: value })
    if (type === "enabled") {
      if (value) {
        editor.objects.update(options)
      } else {
        editor.objects.update({ strokeWidth: 0 })
      }
    } else {
      if (editor && options.enabled) {
      editor.objects.update({ [type]: value })
      }
    }
  }

  return (
    <div style={{ padding: "2rem 2rem 0" }}>
      <div>
        <div
          style={{
            margin: "0 0 0.5rem",
            fontSize: "14px",
            background: "rgba(0,0,0,0.05)",
            padding: "10px 8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <input type="checkbox" checked={options.enabled} onChange={(e) => handleChange("enabled", (e.target).checked)} />
            Outline
          </div>
          <Popover>
            <Popover.Button>
              <div>
                <div
                  style={{
                    height: "28px",
                    width: "28px",
                    backgroundSize: "100% 100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    backgroundColor: options.stroke,
                  }}
                />
              </div>
            </Popover.Button>
            <Popover.Panel className="absolute p-4 bg-white shadow-md border border-gray-300 rounded-lg flex flex-col text-center gap-1">
              <div
                style={{
                  padding: "1rem",
                  background: "#ffffff",
                  width: "200px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  textAlign: "center",
                }}
              >
                <HexColorPicker onChange={(color) => handleChange("stroke", color)} />
                <input
                  value={options.stroke}
                  onChange={(e) => handleChange("color", (e.target).value)}
                  placeholder="#000000"
                  className='w-full border border-gray-300 rounded-md mt-2 shadow p-2' 
                />
              </div>
            </Popover.Panel>
          </Popover>
        </div>
      </div>
      <div style={{ height: "10px" }} />

      <div style={{ padding: "0 8px" }}>
        <div>
          <div style={{ fontSize: "14px" }}>Size</div>
          <div className="custom-slider">
            <ReactSlider
              min={0}
              max={100}
              value={Math.round(options.strokeWidth)}
              onChange={({ value }) => handleChange("strokeWidth", value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Outline

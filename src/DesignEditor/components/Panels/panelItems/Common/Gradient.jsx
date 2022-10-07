import React from "react"
import { HexColorPicker } from "react-colorful"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import Slider from "rsuite/esm/Slider"
import { Popover } from "@headlessui/react"


const Gradient = () => {
  const editor = useEditor()
  const activeObject = useActiveObject()
  const [options, setOptions] = React.useState({
    angle: 0,
    colors: ["#24C6DC", "#514A9D"],
    enabled: false,
  })

  const handleChange = (key, value) => {
    setOptions({ ...options, [key]: value })

    if (key === "enabled") {
      if (value) {
        editor.objects.setGradient({ ...options, [key]: value })
      } else {
        editor.objects.update({
          fill: "#000000",
        })
      }
    } else {
      if (options.enabled) {
      editor.objects.setGradient({ ...options, [key]: value })
    }
  }
  }
  const initialOptions = {
    angle: 0,
    colors: ["#24C6DC", "#514A9D"],
    enabled: false,
  }

  const getGradientOptions = (object) => {
    const isNotGradient = typeof object?.fill === "string" || object?.fill instanceof String
    if (!isNotGradient) {
      const colorStops = object.fill.colorStops
      const colors = [colorStops[0].color, colorStops[1].color]
      return {
        angle: 0,
        colors: colors,
        enabled: true,
      }
    } else {
    return initialOptions
    }
  }

  React.useEffect(() => {
    if (activeObject) {
      const initialOptions = getGradientOptions(activeObject)
      setOptions({ ...options, ...initialOptions })
    }
  }, [activeObject])

  const handleGradientColorChange = (index, color) => {
    const updatedColors = [...options.colors]
    updatedColors[index] = color
    handleChange("colors", updatedColors)
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
            Gradient
          </div>
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
                background: `linear-gradient(${options.angle + 90}deg, ${options.colors[0]}, ${options.colors[1]})`,
              }}
            />
          </div>
        </div>
      </div>
      <div style={{ height: "10px" }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 8px" }}>
        <div style={{ fontSize: "14px" }}>Colors</div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
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
                    backgroundColor: options.colors[0],
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
                    }}>
                    <HexColorPicker onChange={(color) => handleGradientColorChange(0, color)} />
                    <input
                      value={options.colors[0]}
                      onChange={(e) => handleGradientColorChange(0, (e.target).value)}
                      placeholder="#000000"
                      className='w-full border border-gray-300 rounded-md mt-2 shadow p-2' 
                    />
                  </div>
            </Popover.Panel>
          </Popover>
          
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
                    backgroundColor: options.colors[1],
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
                }} >
                <HexColorPicker onChange={(color) => handleGradientColorChange(1, color)} />
                <input
                  value={options.colors[1]}
                  onChange={(e) => handleGradientColorChange(1, (e.target).value)}
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
          <div style={{ fontSize: "14px" }}>Direction</div>
          <div className=' custom-slider' style={{ width: "200px", position: "relative", }}>
            <Slider
              progress
              step={1}
              defaultValue={[options.angle]}
              min={zoomMin}
              max={zoomMax}
              vertical={false}
              marks="false"
              value={[options.angle]}
              onChange={(value) => handleChange("angle", value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Gradient

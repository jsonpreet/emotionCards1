import React from "react"
import Icons from "@components/Icons"
import { useEditor, useZoomRatio } from "@layerhub-io/react"
 import ReactSlider from "react-slider";

const Common = () => {
  const zoomMin = 10
  const zoomMax = 240
  const [options, setOptions] = React.useState({
    zoomRatio: 20,
  })
  const [ zoom, setZoomRatio ] = React.useState(options.zoomRatio)
  const editor = useEditor()
  const zoomRatio = useZoomRatio()

  React.useEffect(() => {
    setOptions({ ...options, zoomRatio: Math.round(zoomRatio * 100) })
    setZoomRatio(Math.round(zoomRatio * 100))
  }, [zoomRatio])

  const handleChange = (type, value) => {
    if (value < 0) {
      editor.zoom.zoomToRatio(zoomMin / 100)
    } else if (value > zoomMax) {
      editor.zoom.zoomToRatio(zoomMax / 100)
    } else {
      editor.zoom.zoomToRatio(value / 100)
    }
  }
  return (
    <div style={{ height: "50px",
      background: '#fff',
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center", }}>
      <div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <button className="mr-2 bg-white text-black hover:bg-gray-200 p-2 rounded delay-75 duration-75">
          <Icons.Expand size={16} />
        </button>
        <button className="mr-2 bg-white text-black hover:bg-gray-200 p-2 rounded delay-75 duration-75">
          <Icons.Compress size={16} />
        </button>
        <button onClick={() => editor.zoom.zoomOut()} className="mr-2 bg-white text-black hover:bg-gray-200 p-2 rounded delay-75 duration-75">
          <Icons.RemoveCircleOutline size={24} />
        </button>
        <div className=' custom-slider' style={{ width: "200px", position: "relative", }}>
        <ReactSlider
          progress
          step={1}
          defaultValue={zoom}
          min={zoomMin}
          max={zoomMax}
          vertical={false}
          value={zoom}
          onChange={(value) => handleChange("zoomRatio", value)}
        />
        </div>
        <button onClick={() => editor.zoom.zoomIn()} className="mr-2 bg-white text-black hover:bg-gray-200 p-2 rounded delay-75 duration-75">
          <Icons.AddCircleOutline size={24} />
        </button>
        <div className="flex flex-row justify-center items-center">
          <input
            type="number"
            value={zoom}
            max={zoomMax}
            min={zoomMin}
            className="text-black bg-gray-200 py-1 px-0 text-center ring-0 focus:ring-0 focus:rign-opacity-0 focus:outline-none"
            onChange={(e) => handleChange("zoomRatio", e.target.value)}
          />
          <span className="text-black bg-gray-200 -ml-2 py-1 pr-2 text-center">%</span>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "end" }}>
        <button className="mr-2 bg-white text-black hover:bg-gray-200 p-2 rounded delay-75 duration-75">
          <Icons.Refresh size={16} />
        </button>
        <button className="mr-2 bg-white text-black hover:bg-gray-200 p-2 rounded delay-75 duration-75">
          <Icons.Undo size={16} />
        </button>
        <button className="mr-2 bg-white text-black hover:bg-gray-200 p-2 rounded delay-75 duration-75">
          <Icons.Redo size={16} />
        </button>
        <button className="mr-2 bg-white text-black hover:bg-gray-200 p-2 rounded delay-75 duration-75">
          <Icons.TimePast size={16} />
        </button>
      </div>
    </div>
  )
}

export default Common

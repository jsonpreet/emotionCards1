import React from "react"
import AngleDoubleLeft from "@components/Icons/AngleDoubleLeft"
import Scrollable from "@components/Scrollable"
import { vectors } from "@app/constants/mock-data"
import { useEditor } from "@layerhub-io/react"
import useSetIsSidebarOpen from "@app/hooks/useSetIsSidebarOpen"

const Graphics = () => {
  const inputFileRef = React.useRef<HTMLInputElement>(null)

  const editor = useEditor()
  const setIsSidebarOpen = useSetIsSidebarOpen()

  const addObject = React.useCallback(
    (url) => {
      if (editor) {
        const options = {
          type: "StaticVector",
          src: url,
        }
        editor.objects.add(options)
      }
    },
    [editor]
  )

  const handleDropFiles = (files) => {
    const file = files[0]
    const url = URL.createObjectURL(file)
    editor.objects.add({
      src: url,
      type: "StaticVector",
    })
  }

  const handleFileInput = (e) => {
    handleDropFiles(e.target.files)
  }

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click()
  }

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
        <div className="font-semibold text-lg">Graphics</div>

        <div onClick={() => setIsSidebarOpen(false)} style={{ cursor: "pointer", display: "flex" }}>
          <AngleDoubleLeft size={18} />
        </div>
      </div>

      <div className="w-full flex flex-row items-center justify-center px-6">
        <button
          onClick={handleInputFileRefClick} className='bg-black w-full text-white px-2 py-2 rounded cursor-pointer hover:bg-pink-500 delay-75 duration-75'
        >
          Computer
        </button>
      </div>
      <Scrollable>
        <input onChange={handleFileInput} type="file" id="file" ref={inputFileRef} style={{ display: "none" }} />
        <div>
          <div style={{ display: "grid", gap: "8px", padding: "1.5rem", gridTemplateColumns: "1fr 1fr" }}>
            {vectors.map((vector, index) => (
              <GraphicItem onClick={() => addObject(vector)} key={index} preview={vector} />
            ))}
          </div>
        </div>
      </Scrollable>
    </div>
  )
}

const GraphicItem = ({ preview, onClick }) => {
  return (
    <div
      onClick={onClick}
      // onClick={() => onClick(component.layers[0])}
      style={{
        position: "relative",
        height: "84px",
        background: "#f8f8fb",
        cursor: "pointer",
        padding: "12px",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom,
          rgba(0, 0, 0, 0) 0,
          rgba(0, 0, 0, 0.006) 8.1%,
          rgba(0, 0, 0, 0.022) 15.5%,
          rgba(0, 0, 0, 0.047) 22.5%,
          rgba(0, 0, 0, 0.079) 29%,
          rgba(0, 0, 0, 0.117) 35.3%,
          rgba(0, 0, 0, 0.158) 41.2%,
          rgba(0, 0, 0, 0.203) 47.1%,
          rgba(0, 0, 0, 0.247) 52.9%,
          rgba(0, 0, 0, 0.292) 58.8%,
          rgba(0, 0, 0, 0.333) 64.7%,
          rgba(0, 0, 0, 0.371) 71%,
          rgba(0, 0, 0, 0.403) 77.5%,
          rgba(0, 0, 0, 0.428) 84.5%,
          rgba(0, 0, 0, 0.444) 91.9%,
          rgba(0, 0, 0, 0.45) 100%)`,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0,
          transition: "opacity 0.3s ease-in-out",
          height: "100%",
          width: "100%",
        }}
      />
      <img
        src={preview}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          pointerEvents: "none",
          verticalAlign: "middle",
        }}
      />
    </div>
  )
}

export default Graphics

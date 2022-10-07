import React from "react"
import AngleDoubleLeft from "@components/Icons/AngleDoubleLeft"
import Scrollable from "@components/Scrollable"
import DropZone from "@components/Dropzone"
import { useEditor } from "@layerhub-io/react"
import useSetIsSidebarOpen from "@app/hooks/useSetIsSidebarOpen"
import { nanoid } from "nanoid"

const Uploads = () => {
  const inputFileRef = React.useRef<HTMLInputElement>(null)
  const [uploads, setUploads] = React.useState([])
  const editor = useEditor()
  const setIsSidebarOpen = useSetIsSidebarOpen()

  const handleDropFiles = (files) => {
    const file = files[0]
    const url = URL.createObjectURL(file)
    const upload = {
      id: nanoid(),
      url,
    }
    setUploads([...uploads, upload])
  }

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click()
  }

  const handleFileInput = (e) => {
    handleDropFiles(e.target.files)
  }

  const addImageToCanvas = (url) => {
    const options = {
      type: "StaticImage",
      src: url,
    }
    editor.objects.add(options)
  }
  return (
    <DropZone handleDropFiles={handleDropFiles}>
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
          <div className="font-semibold text-lg">Uploads</div>

          <div onClick={() => setIsSidebarOpen(false)} style={{ cursor: "pointer", display: "flex" }}>
            <AngleDoubleLeft size={18} />
          </div>
        </div>
        <Scrollable>
          <div className="w-full flex flex-row items-center justify-center px-6">
            <button onClick={handleInputFileRefClick} className='bg-black w-full text-white px-2 py-2 rounded cursor-pointer hover:bg-pink-500 delay-75 duration-75'>
              Computer
            </button>
            <input onChange={handleFileInput} type="file" id="file" ref={inputFileRef} style={{ display: "none" }} />

            <div
              style={{
                marginTop: "1rem",
                display: "grid",
                gap: "0.5rem",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              {uploads.map((upload) => (
                <div
                  key={upload.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => addImageToCanvas(upload.url)}
                >
                  <div>
                    <img width="100%" src={upload.url} alt="preview" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Scrollable>
      </div>
    </DropZone>
  )
}

export default Uploads

import React from "react"
import { useEditor, useObjects } from "@layerhub-io/react"
import AngleDoubleLeft from "@components/Icons/AngleDoubleLeft"
import Scrollable from "@components/Scrollable"
import Locked from "@components/Icons/Locked"
import Unlocked from "@components/Icons/Unlocked"
import Eye from "@components/Icons/Eye"
import EyeCrossed from "@components/Icons/EyeCrossed"
import Delete from "@components/Icons/Delete"
import useSetIsSidebarOpen from "@app/hooks/useSetIsSidebarOpen"

const Layers = () => {
  const editor = useEditor()
  const objects = useObjects()
  const [layerObjects, setLayerObjects] = React.useState([])
  const setIsSidebarOpen = useSetIsSidebarOpen()

  React.useEffect(() => {
    if (objects) {
      setLayerObjects(objects)
    }
  }, [objects])

  React.useEffect(() => {
    let watcher = async () => {
      if (objects) {
        setLayerObjects([...objects])
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
  }, [editor, objects])

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
        <div>Layers</div>

        <div onClick={() => setIsSidebarOpen(false)} style={{ cursor: "pointer", display: "flex" }}>
          <AngleDoubleLeft size={18} />
        </div>
      </div>
      <Scrollable>
        <div style={{padding:"0 1.5rem" }}>
          {layerObjects.map((object) => (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 90px",
                fontSize: "14px",
                alignItems: "center",
                borderBottom: '1px solid #eaeaea',
                paddingBottom: '8px',
                marginBottom: '8px'
              }}
              key={object.id}
            >
              <div style={{ cursor: "pointer" }} onClick={() => editor.objects.select(object.id)}>
                {object.name}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                {object.locked ? (
                  <button
                    onClick={() => editor.objects.unlock(object.id)} className='bg-gray-200 text-black mr-2  px-2 py-1 rounded cursor-pointer hover:bg-pink-500 delay-75 duration-75'
                  >
                    <Locked size={24} />
                  </button>
                ) : (
                  <button
                    onClick={() => editor.objects.lock(object.id)} className='bg-gray-200 text-black mr-2  px-2 py-1 rounded cursor-pointer hover:bg-pink-500 delay-75 duration-75'
                  >
                    <Unlocked size={24} />
                  </button>
                )}

                {object.visible ? (
                  <button
                    onClick={() => editor.objects.update({ visible: false }, object.id)} className='bg-gray-200 text-black mr-2 px-2 py-1 rounded cursor-pointer hover:bg-pink-500 delay-75 duration-75'
                  >
                    <Eye size={24} />
                  </button>
                ) : (
                  <button
                    onClick={() => editor.objects.update({ visible: true }, object.id)} className='bg-gray-200 text-black mr-2 px-2 py-1 rounded cursor-pointer hover:bg-pink-500 delay-75 duration-75'
                  >
                    <EyeCrossed size={24} />
                  </button>
                )}
                <button
                  onClick={() => editor.objects.remove(object.id)} className='bg-gray-200 text-black px-2 py-1 rounded cursor-pointer hover:bg-pink-500 delay-75 duration-75'
                >
                  <Delete size={24} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Scrollable>
    </div>
  )
}

export default Layers

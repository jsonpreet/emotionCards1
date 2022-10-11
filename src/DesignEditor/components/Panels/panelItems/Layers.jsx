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
import { Tooltip } from "@nextui-org/react";

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
              <div className="flex flex-row items-center justify-end">
                {object.locked ? (
                  <Tooltip content="Unlock" color="invert" placement="bottom">
                    <button onClick={() => editor.objects.unlock(object.id)} className='text-black mr-2 cursor-pointer hover:text-pink-500 delay-75 duration-75'>
                      <Locked size={24} />
                    </button>
                  </Tooltip>
                ) : (
                  <Tooltip content="Lock" color="invert" placement="bottom">
                    <button onClick={() => editor.objects.lock(object.id)} className='text-black mr-2 cursor-pointer hover:text-pink-500 delay-75 duration-75'>
                      <Unlocked size={24} />
                    </button>
                  </Tooltip>
                )}

                {object.visible ? (
                  <Tooltip content="Hide" color="invert" placement="bottom">
                    <button onClick={() => editor.objects.update({ visible: false }, object.id)} className='text-black mr-2 cursor-pointer hover:text-pink-500 delay-75 duration-75'>
                      <Eye size={24} />
                    </button>
                  </Tooltip>
                ) : (
                  <Tooltip content="Show" color="invert" placement="bottom">
                    <button onClick={() => editor.objects.update({ visible: true }, object.id)} className='text-black mr-2 cursor-pointer hover:text-pink-500 delay-75 duration-75'>
                      <EyeCrossed size={24} />
                    </button>
                  </Tooltip>
                )}
                <Tooltip content="Delete" color="invert" placement="bottom">
                  <button onClick={() => editor.objects.remove(object.id)} className='text-black cursor-pointer hover:text-pink-500 delay-75 duration-75'>
                    <Delete size={24} />
                  </button>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
      </Scrollable>
    </div>
  )
}

export default Layers

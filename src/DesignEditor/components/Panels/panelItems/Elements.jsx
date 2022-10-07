import React from "react"
import { useEditor } from "@layerhub-io/react"
import AngleDoubleLeft from "@components/Icons/AngleDoubleLeft"
import Scrollable from "@components/Scrollable"
import { graphics } from "@app/constants/mock-data"
import useSetIsSidebarOpen from "@app/hooks/useSetIsSidebarOpen"

const Elements = () => {
  const editor = useEditor()
  const setIsSidebarOpen = useSetIsSidebarOpen()

  const addObject = React.useCallback(
    (item) => {
      if (editor) {
        editor.objects.add(item)
      }
    },
    [editor]
  )

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
        <div className="font-semibold text-lg">Elements</div>

        <div onClick={() => setIsSidebarOpen(false)} style={{ cursor: "pointer", display: "flex" }}>
          <AngleDoubleLeft size={18} />
        </div>
      </div>
      <Scrollable>
        {/* <Block padding={"0 1.5rem"}>
          <Button
            size={SIZE.compact}
            overrides={{
              Root: {
                style: {
                  width: "100%",
                },
              },
            }}
          >
            Computer
          </Button>
        </Block> */}
        <div>
          <div style={{ display: "grid", gap: "8px", padding: "1.5rem", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
            {graphics.map((graphic, index) => (
              <ImageItem onClick={() => addObject(graphic)} key={index} preview={graphic.preview} />
            ))}
          </div>
        </div>
      </Scrollable>
    </div>
  )
}

const ImageItem = ({ preview, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        position: "relative",
        background: "#f8f8fb",
        cursor: "pointer",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
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

export default Elements

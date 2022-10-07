import React from "react"
import { useEditor } from "@layerhub-io/react"
import { loadFonts } from "@app/utils/fonts"
import Scrollable from "@components/Scrollable"
import AngleDoubleLeft from "@components/Icons/AngleDoubleLeft"
import { SAMPLE_TEMPLATES } from "@app/constants/editor"
import useSetIsSidebarOpen from "@app/hooks/useSetIsSidebarOpen"
import useDesignEditorContext from "@app/hooks/useDesignEditorContext"

const Templates = () => {
  const editor = useEditor()
  const setIsSidebarOpen = useSetIsSidebarOpen()
  const { setCurrentScene, currentScene } = useDesignEditorContext()

  const loadTemplate = React.useCallback(
    async (template) => {
      if (editor) {
        const fonts = []
        template.layers.forEach((object) => {
          if (object.type === "StaticText" || object.type === "DynamicText") {
            fonts.push({
              name: object.fontFamily,
              url: object.fontURL,
              options: { style: "normal", weight: 400 },
            })
          }
        })
        const filteredFonts = fonts.filter((f) => !!f.url)
        if (filteredFonts.length > 0) {
          await loadFonts(filteredFonts)
        }

        setCurrentScene({ ...template, id: currentScene?.id })
      }
    },
    [editor, currentScene]
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
        <div>Templates</div>

        <div onClick={() => setIsSidebarOpen(false)} style={{ cursor: "pointer", display: "flex" }}>
          <AngleDoubleLeft size={18} />
        </div>
      </div>
      <Scrollable>
        <div style={{ padding: "0 1.5rem" }}>
          <div style={{ display: "grid", gap: "0.5rem", gridTemplateColumns: "1fr 1fr" }}>
            {SAMPLE_TEMPLATES.map((item, index) => {
              return <ImageItem onClick={() => loadTemplate(item)} key={index} preview={`${item.preview}?tr=w-320`} />
            })}
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

export default Templates

import { textComponents } from "@app/constants/editor"
import { useEditor } from "@layerhub-io/react"
import { loadFonts } from "@app/utils/fonts"
import { nanoid } from "nanoid"
import AngleDoubleLeft from "@components/Icons/AngleDoubleLeft"
import Scrollable from "@components/Scrollable"
import useSetIsSidebarOpen from "@app/hooks/useSetIsSidebarOpen"

const Text = () => {
  const editor = useEditor()
  const setIsSidebarOpen = useSetIsSidebarOpen()

  const addObject = async () => {
    if (editor) {
      const font = {
        name: "OpenSans-Regular",
        url: "https://fonts.gstatic.com/s/opensans/v27/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0C4nY1M2xLER.ttf",
      }
      await loadFonts([font])
      const options = {
        id: nanoid(),
        type: "StaticText",
        width: 420,
        text: "Add some text",
        fontSize: 92,
        fontFamily: font.name,
        textAlign: "center",
        fontStyle: "normal",
        fontURL: font.url,
        fill: "#333333",
        metadata: {},
      }
      editor.objects.add(options)
    }
  }
  const addComponent = async (component) => {
    if (editor) {
      const fontItemsList = []
      if (component.objects) {
        component.objects.forEach((object) => {
          if (object.type === "StaticText" || object.type === "DynamicText") {
            fontItemsList.push({
              name: object.fontFamily,
              url: object.fontURL,
            })
          }
        })
        const filteredFonts = fontItemsList.filter((f) => !!f.url)
        await loadFonts(filteredFonts)
      } else {
        if (component.type === "StaticText" || component.type === "DynamicText") {
        fontItemsList.push({
          name: component.fontFamily,
          url: component.fontURL,
        })
        await loadFonts(fontItemsList)
      }
      }
      editor.objects.add(component)
    }
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
        <div className="font-semibold text-lg">Text</div>

        <div onClick={() => setIsSidebarOpen(false)} style={{ cursor: "pointer", display: "flex" }}>
          <AngleDoubleLeft size={18} />
        </div>
      </div>
      <Scrollable>
        <div style={{ padding: "0 1.5rem" }}>
          <button onClick={addObject} className='bg-black w-full text-white px-2 py-2 rounded cursor-pointer hover:bg-pink-500 delay-75 duration-75'>
            Add text
          </button>

          <div
            style={{
              paddingTop: "1rem",
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "8px",
            }}
          >
            {[...textComponents].map((tc) => (
              <TextComponentItem onClick={addComponent} key={tc.id} component={tc} />
            ))}
          </div>
        </div>
      </Scrollable>
    </div>
  )
}


const TextComponentItem = ({ component, onClick }) => {
  return (
    <div
      onClick={() => onClick(component.layers[0])}
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
        src={component.preview}
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

export default Text

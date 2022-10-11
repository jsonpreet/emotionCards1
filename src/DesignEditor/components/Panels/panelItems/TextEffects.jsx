import React from "react"
import Scrollable from "@components/Scrollable"
import { FaTimes } from "react-icons/fa"
import { throttle } from "lodash"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import { TEXT_EFFECTS } from "@app/constants/design-editor"
import Outline from "./Common/Outline"
import Shadow from "./Common/Shadow"
import useAppContext from "@app/hooks/useAppContext"

const EFFECTS = {
  None: {
    fill: "#333333",
    strokeWidth: 0,
    shadow: {
      blur: 2,
      color: "#afafaf",
      offsetX: 10,
      offsetY: 10,
      enabled: false,
    },
  },
  Shadow: {
    fill: "#333333",
    shadow: {
      blur: 2,
      color: "#afafaf",
      offsetX: 10,
      offsetY: 10,
      enabled: true,
    },
  },
  Lift: {
    fill: "#333333",
    shadow: {
      blur: 25,
      color: "rgba(0,0,0,0.45)",
      offsetX: 0,
      offsetY: 0,
      enabled: true,
    },
  },
  Hollow: {
    stroke: "#000000",
    fill: null,
    strokeWidth: 2,
    shadow: {
      blur: 25,
      color: "rgba(0,0,0,0.45)",
      offsetX: 0,
      offsetY: 0,
      enabled: false,
    },
  },
  Splice: {
    stroke: "#000000",
    fill: null,
    strokeWidth: 2,
    shadow: {
      blur: 0,
      color: "#afafaf",
      offsetX: 10,
      offsetY: 10,
      enabled: true,
    },
  },
  Neon: {
    stroke: "#e84393",
    fill: "#fd79a8",
    strokeWidth: 2,
    shadow: {
      blur: 25,
      color: "#fd79a8",
      offsetX: 0,
      offsetY: 0,
      enabled: true,
    },
  },
}
const TextEffects = () => {
  const [color, setColor] = React.useState("#b32aa9")
  const activeObject = useActiveObject()
  const editor = useEditor()
  const { setActiveSubMenu } = useAppContext()

  const updateObjectFill = throttle((color) => {
    if (activeObject) {
      editor.objects.update({ fill: color })
    }

    setColor(color)
  }, 100)

  const applyEffect = (name) => {
    if (editor) {
      //  @ts-ignore
      const effect = EFFECTS[name]
      if (effect) {
        editor.objects.update(effect)
      }
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
        <div>Effects</div>

        <div onClick={() => setActiveSubMenu("Templates")} style={{ cursor: "pointer", display: "flex" }}>
          <FaTimes size={24} />
        </div>
      </div>
      <Scrollable>
        <div style={{ padding: "0 1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "80px 80px 80px", gap: "0.5rem" }}>
            {TEXT_EFFECTS.map((effect, index) => {
              return (
                <div style={{ cursor: "pointer" }} key={index}>
                  <div
                    onClick={() => applyEffect(effect.name)}
                    style={{
                      border: "1px solid #afafaf",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "80px",
                    }}
                  >
                    <img style={{ width: "70px" }} src={effect.preview} />
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      padding: "0.5rem",
                      fontSize: "14px",
                    }}
                  >
                    {effect.name}
                  </div>
                </div>
              )
            })}
          </div>
          {/* <Block>
            <Outline />
            <Shadow />
          </Block> */}
        </div>
      </Scrollable>
    </div>
  )
}

export default TextEffects

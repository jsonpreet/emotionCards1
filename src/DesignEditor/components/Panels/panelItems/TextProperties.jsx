// @ts-nocheck
import React from "react"
import InformationCircleOutline from "@components/Icons/InformationCircleOutline"
import Underline from "@components/Icons/Underline"
import Spacing from "@components/Icons/Spacing"

import Shadow from "./Common/Shadow"
import { FaChevronRight } from "react-icons/fa"
import useAppContext from "@app/hooks/useAppContext"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import { getTextOptions } from "@app/utils/object-options"
import { fontStyleLabels } from "@app/constants/fonts"
import { loadFonts } from "@app/utils/fonts"
import { defaultTextOptions } from "@app/constants/contants"
import { useFontsStore } from "@stores/fonts"
import { Listbox } from '@headlessui/react'

const TextProperties = () => {
  const { fonts } = useFontsStore()
  const [state, setState] = React.useState(defaultTextOptions)
  const { setActiveSubMenu } = useAppContext()
  const activeObject = useActiveObject()
  const editor = useEditor()

  React.useEffect(() => {
    if (activeObject) {
      const textOptions = getTextOptions(activeObject)
      const isGroup = textOptions.isGroup
      const active = textOptions.fontFamily.split("__")[1]
      const font = fonts.find((f) => f.family === textOptions.fontFamily.split("__")[0].split("_").join(" "))
      if (!font) {
        setState(defaultTextOptions)
        return
      }
      const isNotGradient = typeof activeObject.value?.fill === "string" || activeObject.value?.fill instanceof String
      const styles = Object.keys(font.files)
        .map((file) => ({
          value: file,
          label: fontStyleLabels[file].label,
          id: fontStyleLabels[file].id,
          url: font.files[file],
          family: font.family,
        }))
        .sort((a, b) => (a.id > b.id ? 1 : -1))

      setState({
        ...textOptions,
        font,
        styles,
        fontFamily: font.family,
        activeStyle: {
          label: fontStyleLabels[active].label,
          id: fontStyleLabels[active].id,
        },
        fill: isGroup ? "#000000" : isNotGradient ? textOptions.fill : "#000000",
      })
    } else {
      setState(defaultTextOptions)
    }
  }, [activeObject])

  const handleChange = async (key, value) => {
    if (key === "fontStyle") {
      const selected = value[0]
      const updatedFamily = `${selected.family.split(" ").join("_")}__${selected.value}`
      const font = {
        name: updatedFamily,
        url: selected.url,
      }
      await loadFonts([font])
      editor.objects.update({
        fontFamily: updatedFamily,
        metadata: {
          fontURL: font.url,
        },
      })
      setState({ ...state, activeStyle: selected })
    } else {
      editor.objects.update({
        [key]: value,
      })
      setState({ ...state, [key]: value })
    }
  }
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
          justifyContent: "space-between",
          padding: "1.5rem",
        }}
      >
        <div>Text properties</div>
        <InformationCircleOutline size={24} />
      </div>
      <div style={{ display: "grid", gap: "0.5rem" }}>
        <div style={{ padding: "0 1.5rem" }}>
          <input
            onFocus={() => setActiveSubMenu("FontSelector")}
            value={state.fontFamily}
            placeholder="Controlled Input"
          />
          <FaChevronRight size="18px" />
        </div>
        <div style={{ padding: "0 1.5rem", display: "grid", gridTemplateColumns: "1fr 2fr", gap: "0.5rem" }}>
          <input value={24} />
          <Listbox value={[state.activeStyle]} onChange={(params) => {
              // @ts-ignore
              handleChange("fontStyle", params.value)
          }}>
            <Listbox.Button>{state.activeStyle.label}</Listbox.Button>
            <Listbox.Options>
              {styles.map((font) => (
                <Listbox.Option
                  key={font.id}
                  value={font}
                  disabled={font.unavailable}
                >
                  {font.label}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>
      </div>
      <div style={{ padding: "0 1.5rem" }}>
        <button onClick={() => handleChange("underline", !activeObject.underline)} className='bg-gray-200 text-black mr-2 px-2 py-1 rounded cursor-pointer hover:bg-pink-500 delay-75 duration-75'>
          <Spacing size={24} />
        </button>
        <button onClick={() => handleChange("underline", !activeObject.underline)} className='bg-gray-200 text-black px-2 py-1 rounded cursor-pointer hover:bg-pink-500 delay-75 duration-75'>
          <Underline size={24} />
        </button>
      </div>
      <div>
        <Shadow />
      </div>
    </div>
  )
}

export default TextProperties

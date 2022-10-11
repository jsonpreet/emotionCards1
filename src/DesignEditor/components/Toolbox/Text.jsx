import React from "react"
import { useActiveObject, useEditor } from "@layerhub-io/react"
// import getSelectionType from "~/utils/get-selection-type"

import Common from "./Common"
import TextColor from "@components/Icons/TextColor"
import Bold from "@components/Icons/Bold"
import Italic from "@components/Icons/Italic"
import Underline from "@components/Icons/Underline"
import TextAlignCenter from "@components/Icons/TextAlignCenter"
import { FaChevronDown as ChevronDown } from "react-icons/fa";
import { Popover, RadioGroup } from '@headlessui/react'
import LetterCase from "@components/Icons/LetterCase"
import Spacing from "@components/Icons/Spacing"
import TextAlignJustify from "@components/Icons/TextAlignJustify"
import TextAlignLeft from "@components/Icons/TextAlignLeft"
import TextAlignRight from "@components/Icons/TextAlignRight"
import useAppContext from "@app/hooks/useAppContext"
import { FONT_SIZES, SAMPLE_FONTS } from "@app/constants/editor"
import { getTextProperties } from "../../utils/text"
import { loadFonts } from "@app/utils/fonts"
import Scrollbar from "@layerhub-io/react-custom-scrollbar"
import ReactSlider from "react-slider";
import { Tooltip } from "@nextui-org/react";
import { useRef } from "react"
import useOnClickOutside from "@app/hooks/useOnClickOutside"

const initialOptions = {
  family: "CoreLang",
  bold: false,
  italic: false,
  underline: false,
  color: "#00000",
  styleOptions: {
    hasBold: true,
    hasItalic: true,
    options: [],
  },
}

const Text = () => {
  const [state, setState] = React.useState(initialOptions)
  const activeObject = useActiveObject()
  const { setActiveSubMenu } = useAppContext()
  const editor = useEditor()

  React.useEffect(() => {
    if (activeObject && activeObject.type === "StaticText") {
      const textProperties = getTextProperties(activeObject, SAMPLE_FONTS)
      setState({ ...state, ...textProperties })
    }
  }, [activeObject])

  React.useEffect(() => {
    let watcher = async () => {
      if (activeObject && activeObject.type === "StaticText") {
        const textProperties = getTextProperties(activeObject, SAMPLE_FONTS)
        setState({ ...state, ...textProperties })
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
  }, [editor, activeObject])

  const makeBold = React.useCallback(async () => {
    if (state.bold) {
      let desiredFont

      if (state.italic) {
        // look for regular italic
        desiredFont = state.styleOptions.options.find((option) => {
          const postscript_names = option.postscript_name.split("-")
          return postscript_names[postscript_names.length - 1].match(/^Italic$/)
        })
      } else {
        // look for  regular
        desiredFont = state.styleOptions.options.find((option) => {
          const postscript_names = option.postscript_name.split("-")
          return postscript_names[postscript_names.length - 1].match(/^Regular$/)
        })
      }

      const font = {
        name: desiredFont.postscript_name,
        url: desiredFont.url,
      }
      await loadFonts([font])

      editor.objects.update({
        fontFamily: desiredFont.postscript_name,
        fontURL: font.url,
      })
      setState({ ...state, bold: false })
    } else {
      let desiredFont
      if (state.italic) {
        // look for bold italic
        desiredFont = state.styleOptions.options.find((option) => {
          const postscript_names = option.postscript_name.split("-")
          return postscript_names[postscript_names.length - 1].match(/^BoldItalic$/)
        })
      } else {
        // look for bold
        desiredFont = state.styleOptions.options.find((option) => {
          const postscript_names = option.postscript_name.split("-")
          return postscript_names[postscript_names.length - 1].match(/^Bold$/)
        })
      }

      const font = {
        name: desiredFont.postscript_name,
        url: desiredFont.url,
      }
      await loadFonts([font])

      editor.objects.update({
        fontFamily: desiredFont.postscript_name,
        fontURL: font.url,
      })
      setState({ ...state, bold: true })
    }
  }, [editor, state])

  const makeItalic = React.useCallback(async () => {
    if (state.italic) {
      let desiredFont
      if (state.bold) {
        // Search bold regular
        desiredFont = state.styleOptions.options.find((option) => {
          const postscript_names = option.postscript_name.split("-")
          return postscript_names[postscript_names.length - 1].match(/^Bold$/)
        })
      } else {
        // Search regular
        desiredFont = state.styleOptions.options.find((option) => {
          const postscript_names = option.postscript_name.split("-")
          return postscript_names[postscript_names.length - 1].match(/^Regular$/)
        })
      }

      const font = {
        name: desiredFont.postscript_name,
        url: desiredFont.url,
      }
      await loadFonts([font])

      editor.objects.update({
        fontFamily: desiredFont.postscript_name,
        fontURL: font.url,
      })
      setState({ ...state, italic: false })
    } else {
      let desiredFont

      if (state.bold) {
        // search italic bold
        desiredFont = state.styleOptions.options.find((option) => {
          const postscript_names = option.postscript_name.split("-")
          return postscript_names[postscript_names.length - 1].match(/^BoldItalic$/)
        })
      } else {
        // search regular italic
        desiredFont = state.styleOptions.options.find((option) => {
          const postscript_names = option.postscript_name.split("-")
          return postscript_names[postscript_names.length - 1].match(/^Italic$/)
        })
      }

      const font = {
        name: desiredFont.postscript_name,
        url: desiredFont.url,
      }
      await loadFonts([font])

      editor.objects.update({
        fontFamily: desiredFont.postscript_name,
        fontURL: font.url,
      })
      setState({ ...state, italic: true })
    }
  }, [editor, state])

  const makeUnderline = React.useCallback(() => {
    editor.objects.update({
      underline: !state.underline,
    })
    setState({ ...state, underline: !state.underline })
  }, [editor, state])

  return (
    <div style={{ flex: 1, display: "flex", alignItems: "center", padding: "0 12px", justifyContent: "space-between" }}>
      <div style={{ display:"flex", gridGap:"0.5rem", alignItems:"center" }}>
        <div onClick={() => setActiveSubMenu("FontSelector")} className="border border-gray-400 rounded p-3 min-w-[150px] cursor-pointer font-semibold gap-[0.5rem] flex items-center justify-between h-[30px]">
          <div>{state.family}</div>
          <div style={{ display:"flex" }}>
            <ChevronDown size={11} />
          </div>
        </div>
        <TextFontSize />
        <div className="flex flex-row justify-between items-center">
          <Tooltip content="Text Color" color="invert"  placement="bottom">
            <button className="px-1" onClick={() => setActiveSubMenu("TextFill")}>
              <TextColor color={state.color} size={22} />
            </button>
          </Tooltip>
          
          <Tooltip content="Bold" color="invert"  placement="bottom">
            <button
              className="px-1"
              style={{ ...(!state.bold && { color: "rgb(169,169,169)" }) }}
              disabled={!state.styleOptions.hasBold}
              onClick={makeBold}>
              <Bold size={20} />
            </button>
          </Tooltip>
          
          <Tooltip content="Italic" color="invert"  placement="bottom">
            <button
              className="px-1"
              style={{ ...(!state.italic && { color: "rgb(169,169,169)" }) }}
              disabled={!state.styleOptions.hasItalic}
              onClick={makeItalic}>
              <Italic size={20} />
            </button>
          </Tooltip>  

          
          <Tooltip content="Underline" color="invert"  placement="bottom">
            <button
              className="px-1"
              style={{ ...(!state.underline && { color: "rgb(169,169,169)" }) }}
              onClick={makeUnderline}>
              <Underline size={24} />
            </button>
          </Tooltip>

          
          <Tooltip content="LetterCase" color="invert"  placement="bottom">
            <TextLetterCase />
          </Tooltip>

          <div style={{ width:"1px", height:"24px", backgroundColor:"rgb(213,213,213)", margin:"0 4px" }} />

          <TextAlign />

          <div style={{ width:"1px", height:"24px", backgroundColor:"rgb(213,213,213)", margin:"0 4px" }} />

          <TextSpacing />

          <div style={{ width: "1px", height: "24px", backgroundColor: "rgb(213,213,213)", margin: "0 4px" }} />
          
          <Tooltip content="Effects" color="invert"  placement="bottom">
            <button className='font-medium text-md' onClick={() => setActiveSubMenu("TextEffects")}>
              Effects
            </button>
          </Tooltip>
        </div>
      </div>
      <Common />
    </div>
  )
}

const TextFontSize = () => {
  const ref = useRef(null)
  const editor = useEditor()
  const activeObject = useActiveObject()
  const [value, setValue] = React.useState(12)
  const [dropDown, setDropDown] = React.useState(false)
  useOnClickOutside(ref, () => {
    setDropDown(false)
  })

  React.useEffect(() => {
    // @ts-ignore
    if (activeObject && activeObject.type === "StaticText") {
      // @ts-ignore
      setValue(activeObject.fontSize)
    }
  }, [activeObject])
  const onChange = (size) => {
    editor.objects.update({ fontSize: size })
    setValue(size)
  }

  return (
    <div className="relative" ref={ref}>
      <div className='flex flex-row justify-between rounded items-center border border-gray-400 w-[80px] font-semibold h-[30px]'>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onClick={() => setDropDown(true)}
          type="number"
          className="bg-white font-semibold h-[28px] px-2 ml-[1px] w-[60px]"
        />
        <ChevronDown size={14} className='mr-2' />
      </div>
      {dropDown && <div className="absolute top-8 z-10 bg-white shadow-lg rounded">
        <Scrollbar style={{ height: "320px", width: "90px" }}>
          <div className="bg-white py-2">
            {FONT_SIZES.map((size, index) => (
              <div
                onClick={() => {
                  onChange(size)
                  setDropDown(false)
                }}
                className="cursor-pointer h-[32px] font-medium px-3 items-center hover:bg-gray-200 flex"
                key={index}>
                {size}
              </div>
            ))}
          </div>
        </Scrollbar>
      </div>}
    </div>
  )
}

const TextLetterCase = () => {
  const [state, setState] = React.useState({ upper: false })
  const editor = useEditor()
  return (
    <button className="px-1"
        onClick={() => {
          if (!state.upper) {
            setState({ upper: true })
            editor.objects.toUppercase()
          } else {
            setState({ upper: false })
            editor.objects.toLowerCase()
          }
        }}
      >
      <LetterCase size={24} />
    </button>
  )
}

const TextSpacing = () => {
  const editor = useEditor()
  const activeObject = useActiveObject()
  const [state, setState] = React.useState({ charSpacing: 0, lineHeight: 0 })

  React.useEffect(() => {
    if (activeObject) {
      // @ts-ignore
      const { charSpacing, lineHeight } = activeObject
      setState({ ...state, charSpacing: charSpacing / 10, lineHeight: lineHeight * 10 })
    }
  }, [activeObject])

  const handleChange = (type, value) => {
    if (editor) {
      if (type === "charSpacing") {
        setState({ ...state, [type]: value })

        // @ts-ignore
        editor.objects.update({
          [type]: value * 10,
        })
      } else {
        setState({ ...state, [type]: value })
        // @ts-ignore

        editor.objects.update({
          [type]: value / 10,
        })
      }
    }
  }
  return (
    <Popover className="relative px-1">
      <Popover.Button className='flex items-center justify-center'><Tooltip content="Spacing" color="invert" placement="bottom"><Spacing size={24} /></Tooltip></Popover.Button>
      <Popover.Panel className="absolute z-10 bg-white w-[300px] p-4 rounded shadow-lg">
        <div className="flex flex-col mb-3">
          <div className="flex flex-row justify-between items-center mb-3">
            <div className="text-black text-md font-medium">Line height</div>
            <div className="w-[60px]">
              <input className="w-full border text-center border-gray-300 py-1"
                onChange={() => {}}
                value={Math.round(state.lineHeight)}
              />
            </div>
          </div>

          <div className="custom-slider">
            <ReactSlider
              min={0}
              max={100}
              value={Math.round(state.lineHeight)}
              onChange={({ value }) => handleChange("lineHeight", value)}
            />
          </div>
        </div>
        <div className="flex flex-row justify-between items-center mb-3">
          <div className="text-black text-md font-medium">Char spacing</div>
            <div className="w-[60px]">
            <input className="w-full border text-center border-gray-300 py-1"
              onChange={() => {}}
              value={Math.round(state.charSpacing)}
            />
          </div>
        </div>
        <div className="custom-slider">
          <ReactSlider
            min={-20}
            max={100}
            value={Math.round(state.charSpacing)}
            onChange={({ value }) => handleChange("charSpacing", value)}
          />
        </div>
      </Popover.Panel>
    </Popover>
  )
}

const TEXT_ALIGNS = ["left", "center", "right", "justify"]

const TextAlign = () => {
  const editor = useEditor()
  const activeObject = useActiveObject()
  const [state, setState] = React.useState({ align: "left" })

  React.useEffect(() => {
    if (activeObject) {
      // @ts-ignore
      setState({ align: activeObject.textAlign })
    }
  }, [activeObject])

  const handleChange = (align) => {
    setState({ align })
    editor.objects.update({ textAlign: align })
  }

  return (
    <Popover className="relative px-1">
      <Popover.Button className='flex items-center justify-center'><Tooltip content="Align" color="invert" placement="bottom"><TextAlignCenter size={24} /></Tooltip></Popover.Button>
      <Popover.Panel className="absolute z-10 bg-white px-2 py-2 w-[200px] shadow-lg rounded border border-gray-300">
        <RadioGroup value={state.align} onChange={handleChange} className='flex justify-between items-center flex-row'>
          <RadioGroup.Option value="left" className='hover:bg-gray-200 cursor-pointer p-1 rounded'>
            {({ checked }) => (
              <span className={checked ? 'bg-blue-200 p-1 rounded' : ''}><Tooltip content="Align Left" color="invert" placement="bottom"><TextAlignLeft size={24} /></Tooltip></span>
            )}
          </RadioGroup.Option>
          <RadioGroup.Option value="center" className='hover:bg-gray-200 cursor-pointer p-1 rounded'>
            {({ checked }) => (
              <span className={checked ? 'bg-blue-200' : ''}><Tooltip content="Align Center" color="invert" placement="bottom"><TextAlignCenter size={24} /></Tooltip></span>
            )}
          </RadioGroup.Option>
          <RadioGroup.Option value="right" className='hover:bg-gray-200 cursor-pointer p-1 rounded'>
            {({ checked }) => (
              <span className={checked ? 'bg-blue-200' : ''}><Tooltip content="Align Right" color="invert" placement="bottom"><TextAlignRight size={24} /></Tooltip></span>
            )}
          </RadioGroup.Option>
          <RadioGroup.Option value="justify" className='hover:bg-gray-200 cursor-pointer p-1 rounded'>
            {({ checked }) => (
              <span className={checked ? 'bg-blue-200' : ''}><Tooltip content="Align Justify" color="invert" placement="bottom"><TextAlignJustify size={24} /></Tooltip></span>
            )}
          </RadioGroup.Option>
        </RadioGroup>
      </Popover.Panel>
    </Popover>
  )
}

export default Text

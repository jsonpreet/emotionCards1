import React from "react"
import Logo from "@components/Icons/Logo"
import useDesignEditorContext from "@app/hooks/useDesignEditorContext"
import Play from "@components/Icons/Play"
import { useEditor } from "@layerhub-io/react"
import useEditorType from "@app/hooks/useEditorType"
import { loadTemplateFonts } from "@app/utils/fonts"
import { loadVideoEditorAssets } from "@app/utils/video"
import DesignTitle from "./DesignTitle"
import { Tooltip } from "@nextui-org/react";

const Navbar = () => {
  const { setDisplayPreview, setScenes, setCurrentDesign, currentDesign, scenes } = useDesignEditorContext()
  const editorType = useEditorType()
  const editor = useEditor()
  const inputFileRef = React.useRef(null)

  const parseGraphicJSON = () => {
    const currentScene = editor.scene.exportToJSON()

    const updatedScenes = scenes.map((scn) => {
      if (scn.id === currentScene.id) {
        return {
          id: currentScene.id,
          layers: currentScene.layers,
          name: currentScene.name,
        }
      }
      return {
        id: scn.id,
        layers: scn.layers,
        name: scn.name,
      }
    })

    if (currentDesign) {
      const graphicTemplate = {
        id: currentDesign.id,
        type: "GRAPHIC",
        name: currentDesign.name,
        frame: currentDesign.frame,
        scenes: updatedScenes,
        metadata: {},
        preview: "",
      }
      makeDownload(graphicTemplate)
    } else {
      console.log("NO CURRENT DESIGN")
    }
  }

  const makeDownload = (data) => {
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`
    const a = document.createElement("a")
    a.href = dataStr
    a.download = "template.json"
    a.click()
  }

  const makeDownloadTemplate = async () => {
    return parseGraphicJSON()
  }

  const loadGraphicTemplate = async (payload) => {
    const scenes = []
    const { scenes: scns, ...design } = payload

    for (const scn of scns) {
      const scene = {
        name: scn.name,
        frame: payload.frame,
        id: scn.id,
        layers: scn.layers,
        metadata: {},
      }
      const loadedScene = await loadVideoEditorAssets(scene)
      await loadTemplateFonts(loadedScene)

      const preview = (await editor.renderer.render(loadedScene))
      scenes.push({ ...loadedScene, preview })
    }

    return { scenes, design }
  }

  const handleImportTemplate = React.useCallback(
    async (data) => {
      let template
      template = await loadGraphicTemplate(data)
     
      //   @ts-ignore
      setScenes(template.scenes)
      //   @ts-ignore
      setCurrentDesign(template.design)
    },
    [editor]
  )

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click()
  }

  const handleFileInput = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (res) => {
        const result = res.target.result
        const design = JSON.parse(result)
        handleImportTemplate(design)
      }
      reader.onerror = (err) => {
        console.log(err)
      }

      reader.readAsText(file)
    }
  }

  return (
    // @ts-ignore
    <div className="h-[64px] bg-black px-4 justify-center align-center items-center box-border">
      <div className="h-[64px] flex w-full items-center align-center justify-between flex-row">
        <div className="text-white mr-2">
          <Logo size={36} />
        </div>
        <DesignTitle />
        <div className="flex flex-row justify-end items-center">
          <input
            multiple={false}
            onChange={handleFileInput}
            type="file"
            id="file"
            ref={inputFileRef}
            style={{ display: "none" }}
          />
          <button
            className="text-white mr-3"
            onClick={handleInputFileRefClick}
          >
            Import
          </button>

          <button
            className="text-white mr-3"
            onClick={makeDownloadTemplate}
          >
            Export
          </button>
          <Tooltip content="Display Preview" color="invert"  placement="bottom">
            <button
              className="text-white"
              onClick={() => setDisplayPreview(true)}
            >
              <Play size={24} />
            </button>
          </Tooltip>
          </div>
        </div>
    </div>
  )
}

export default Navbar

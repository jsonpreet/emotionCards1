import useEditorType from "@app/hooks/useEditorType"
import GraphicEditor from "./GraphicEditor"
import useDesignEditorContext from "@app/hooks/useDesignEditorContext"
import Preview from "./components/Preview"

const DesignEditor = () => {
  const editorType = useEditorType()
  const { displayPreview, setDisplayPreview } = useDesignEditorContext()

  return (
    <>
      {displayPreview && <Preview isOpen={displayPreview} setIsOpen={setDisplayPreview} />}
      {
        <GraphicEditor />
      }
    </>
  )
}

export default DesignEditor

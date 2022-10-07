import Navbar from "./components/Navbar"
import Panels from "./components/Panels"
import Canvas from "./components/Canvas"
import Footer from "./components/Footer"
import Toolbox from "./components/Toolbox"
import EditorContainer from "./components/EditorContainer"

const GraphicEditor = () => {
  return (
    <EditorContainer>
      <Navbar />
      <div className="flex h-screen flex-row flex-1">
        <Panels />
        <div className="flex-1 flex flex-col relative">
          <Toolbox />
          <Canvas />
          <Footer />
        </div>
      </div>
    </EditorContainer>
  )
}

export default GraphicEditor

import React from "react"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import { Popover } from '@headlessui/react'
import FlipHorizontal from "@components/Icons/FlipHorizontal"
import FlipVertical from "@components/Icons/FlipVertical"

const Flip = () => {
  const editor = useEditor()
  const activeObject = useActiveObject()
  const [state, setState] = React.useState({ flipX: false, flipY: false })

  React.useEffect(() => {
    if (activeObject) {
      setState({
        flipX: activeObject.flipX,
        flipY: activeObject.flipY,
      })
    }
  }, [activeObject])

  const flipHorizontally = React.useCallback(() => {
    editor.objects.update({ flipX: !state.flipX })
    setState({ ...state, flipX: !state.flipX })
  }, [editor, state])

  const flipVertically = React.useCallback(() => {
    editor.objects.update({ flipY: !state.flipY })
    setState({ ...state, flipY: !state.flipY })
  }, [editor, state])

  return (
    <Popover className="relative">
      <Popover.Button>Flip</Popover.Button>
      <Popover.Panel className="absolute z-10 w-32 bg-white rounded-md shadow-lg p-2">
        <div>
          <button
            style={{ width: "100%", justifyContent: "flex-start" }}
            onClick={flipHorizontally}
          >
            <FlipHorizontal size={24} /> Flip horizontally
          </button>
        </div>
        <button
          style={{ width: "100%", justifyContent: "flex-start" }}
          onClick={flipVertically}
        >
          <FlipVertical size={24} /> Flip vertically
        </button>
      </Popover.Panel>
    </Popover>
  )
}

export default Flip

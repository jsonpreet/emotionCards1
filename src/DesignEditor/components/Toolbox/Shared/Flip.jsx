import React from "react"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import { Popover } from '@headlessui/react'
import FlipHorizontal from "@components/Icons/FlipHorizontal"
import FlipVertical from "@components/Icons/FlipVertical"
import { Tooltip } from "@nextui-org/react";

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
      <Popover.Button><Tooltip content="Flip Layers" color="invert" placement="bottom">Flip</Tooltip></Popover.Button>
      <Popover.Panel className="absolute z-10 w-52 bg-white rounded-md shadow-lg p-2">
        <div className="flex flex-col items-start justify-center">
          <button onClick={flipHorizontally} className='hover:bg-gray-100 w-full p-2 duration-75 delay-75 rounded flex items-center flex-row'>
            <FlipHorizontal size={24} /> <span className="text-sm font-semibold">Flip horizontally</span>
          </button>
        <button onClick={flipVertically} className='hover:bg-gray-100 w-full p-2 duration-75 delay-75 rounded flex items-center flex-row'>
          <FlipVertical size={24} /> <span className="text-sm font-semibold">Flip vertically</span>
          </button>
        </div>
      </Popover.Panel>
    </Popover>
  )
}

export default Flip

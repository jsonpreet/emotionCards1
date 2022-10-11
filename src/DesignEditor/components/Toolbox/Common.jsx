import React from "react"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import { Popover } from '@headlessui/react'
import DeleteIcon from "@components/Icons/Delete"
import UnlockedIcon from "@components/Icons/Unlocked"
import LockedIcon from "@components/Icons/Locked"
import DuplicateIcon from "@components/Icons/Duplicate"
import LayersIcon from "@components/Icons/Layers"
import AlignCenter from "@components/Icons/AlignCenter"
import AlignLeft from "@components/Icons/AlignLeft"
import AlignRight from "@components/Icons/AlignRight"
import AlignTop from "@components/Icons/AlignTop"
import AlignMiddle from "@components/Icons/AlignMiddle"
import BringToFront from "@components/Icons/BringToFront"
import SendToBack from "@components/Icons/SendToBack"
import AlignBottom from "@components/Icons/AlignBottom"
import Opacity from "./Shared/Opacity"
import { Tooltip } from "@nextui-org/react";

const Common = () => {
  const [state, setState] = React.useState({ isGroup: false, isMultiple: false })
  const activeObject = useActiveObject()

  const editor = useEditor()

  React.useEffect(() => {
    if (activeObject) {
      setState({ isGroup: activeObject.type === "group", isMultiple: activeObject.type === "activeSelection" })
    }
  }, [activeObject])

  React.useEffect(() => {
    let watcher = async () => {
      if (activeObject) {
        // @ts-ignore
        setState({ isGroup: activeObject.type === "group", isMultiple: activeObject.type === "activeSelection" })
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

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {state.isGroup ? (
        
        <Tooltip content="Ungroup" color="invert"  placement="bottom">
          <button className="px-2"
            onClick={() => {
              editor.objects.ungroup()
              setState({ ...state, isGroup: false })
            }}
          >
            Ungroup
          </button>
        </Tooltip>
      ) : state.isMultiple ? (
        <Tooltip content="Group" color="invert"  placement="bottom">
          <button className="px-2"
            onClick={() => {
              editor.objects.group()
              setState({ ...state, isGroup: true })
            }}
          >
            Group
          </button>
        </Tooltip>
      ) : null}

      {(state.isGroup || !state.isMultiple) && <CommonLayers />}

      
      
        <CommonAlign />
      
        <Opacity />
      <LockUnlock />
      <Tooltip content="Duplicate" color="invert" placement="bottom">
      <button className='px-2 flex flex-row justify-center' onClick={() => editor.objects.clone()} >
        <DuplicateIcon size={22} />
        </button>
      </Tooltip>
      <Tooltip content="Delete" color="invert" placement="bottom">
        <button className='px-2 flex flex-row justify-center' onClick={() => editor.objects.remove()} >
          <DeleteIcon size={24} />
        </button>
      </Tooltip>
    </div>
  )
}

const CommonLayers = () => {
  const editor = useEditor()
  const [checked, setChecked] = React.useState(true)
  const activeObject = useActiveObject()

  React.useEffect(() => {
    if (activeObject) {
      //  @ts-ignore
      setChecked(!!activeObject.clipPath)
    }
  }, [activeObject])
  return (
    <Popover className="relative">
      <Popover.Button className='px-2 flex flex-row justify-center'><Tooltip content="Layers" color="invert" placement="bottom"><LayersIcon size={19} /></Tooltip></Popover.Button>
      <Popover.Panel className="absolute top-9 p-2 z-10 w-[300px] bg-white shadow-lg rounded right-0">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gridGap:"8px" }}>
          <button className="flex flex-row hover:bg-gray-100 py-1 delay-75 duration-75 px-2 rounded" onClick={() => editor.objects.bringToFront()}>
            <BringToFront size={24} />
            <span className="font-medium text-sm text-black">Bring to front</span>
          </button>
          <button className="flex flex-row hover:bg-gray-100 py-1 delay-75 duration-75 px-2 rounded" onClick={() => editor.objects.sendToBack()}>
            <SendToBack size={24} />
            <span className="font-medium text-sm text-black">Send to back</span>
          </button>
        </div>
        <div className="flex flex-row items-center cursor-pointer gap-1 px-4 py-2">
          <input
            className="w-4 h-4 text-black bg-gray-100 rounded border-gray-300 focus:ring-black focus:ring-0"
            type="checkbox"
            checked={checked}
            onChange={() => {
              editor.objects.update({ clipToFrame: !checked })
              setChecked(!checked)
            }}
          />
          <div className="font-medium text-sm text-black">Clip to frame</div>
        </div>
      </Popover.Panel>
    </Popover>
  )
}

const CommonAlign = () => {
  const editor = useEditor()
  return (
    <Popover className="relative">
      <Popover.Button className='px-2 flex flex-row justify-center'><Tooltip content="Align" color="invert" placement="bottom"><AlignCenter size={24} /></Tooltip></Popover.Button>
      <Popover.Panel className="absolute top-9 p-2 z-10  bg-white shadow-lg rounded right-0">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gridGap:"8px" }}>
          <button onClick={() => editor.objects.alignLeft()} className="flex flex-row mr-1 hover:bg-gray-100 py-1 delay-75 duration-75 px-2 rounded">
            <AlignLeft size={24} />
          </button>
          <button onClick={() => editor.objects.alignCenter()} className="flex flex-row mr-1 hover:bg-gray-100 py-1 delay-75 duration-75 px-2 rounded">
            <AlignCenter size={24} />
          </button>
          <button onClick={() => editor.objects.alignRight()} className="flex flex-row hover:bg-gray-100 py-1 delay-75 duration-75 px-2 rounded">
            <AlignRight size={24} />
          </button>
          <button onClick={() => editor.objects.alignTop()} className="flex flex-row mr-1 hover:bg-gray-100 py-1 delay-75 duration-75 px-2 rounded">
            <AlignTop size={24} />
          </button>
          <button onClick={() => editor.objects.alignMiddle()} className="flex flex-row mr-1 hover:bg-gray-100 py-1 delay-75 duration-75 px-2 rounded">
            <AlignMiddle size={24} />
          </button>
          <button onClick={() => editor.objects.alignBottom()} className="flex flex-row hover:bg-gray-100 py-1 delay-75 duration-75 px-2 rounded">
            <AlignBottom size={24} />
          </button>
        </div>
      </Popover.Panel>
    </Popover>
  )
}

const LockUnlock = () => {
  const [state, setState] = React.useState({ locked: false })
  const editor = useEditor()
  const activeObject = useActiveObject()

  React.useEffect(() => {
    if (activeObject) {
      // @ts-ignore
      setState({ locked: !!activeObject.locked })
    }
  }, [activeObject])

  return state.locked ? (
    <Tooltip content="Unlock" color="invert" placement="bottom">
      <button className='px-2 flex flex-row justify-center'
        onClick={() => {
          editor.objects.unlock()
          setState({ locked: false })
        }}
      >
        <UnlockedIcon size={24} />
        </button>
    </Tooltip>
  ) : (
    <Tooltip content="Lock" color="invert" placement="bottom">
      <button className='px-2 flex flex-row justify-center'
        onClick={() => {
          editor.objects.lock()
          setState({ locked: true })
        }}
      >
        <LockedIcon size={24} />
      </button>
    </Tooltip>
  )
}

export default Common

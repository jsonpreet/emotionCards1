import React from "react"
import { useActiveObject, useEditor } from "@layerhub-io/react"
import OpacityIcon from "@components/Icons/Opacity."
import { Popover } from '@headlessui/react'
import ReactSlider from "react-slider";

const Opacity = () => {
  const editor = useEditor()
  const [opacity, setOpacity] = React.useState(1)
  const activeObject = useActiveObject()

  React.useEffect(() => {
    if (activeObject) {
      setOpacity(activeObject.opacity * 100)
    }
  }, [activeObject])

  const onChange = React.useCallback(
    (value) => {
      setOpacity(value)
      editor.objects.update({ opacity: value / 100 })
    },
    [editor]
  )

  return (
    <Popover className="relative">
      <Popover.Button className='px-2 flex flex-row justify-center'><OpacityIcon size={22}/></Popover.Button>
        <Popover.Panel className="absolute top-9 p-4 z-10 w-[300px] bg-white shadow-lg rounded right-0">
          <div className="flex flex-row justify-between items-center mb-3">
            <div className="text-black text-md font-medium">Opacity</div>
            <div className="w-[60px]">
              <input className="w-full border text-center border-gray-300 py-1"
                onChange={() => {}}
                value={Math.round(opacity)}
              />
            </div>
          </div>

          <div className="custom-slider">
            <ReactSlider
              min={0}
              max={100}
              value={Math.round(opacity)}
              onChange={(value) => onChange(value)}
            />
          </div>
        </Popover.Panel>
    </Popover>
  )
}

export default Opacity

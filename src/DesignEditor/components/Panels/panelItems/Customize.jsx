import React from "react"
import { HexColorPicker } from "react-colorful"
import { useEditor, useFrame } from "@layerhub-io/react"
import AngleDoubleLeft from "@components/Icons/AngleDoubleLeft"
import Scrollable from "@components/Scrollable"
import { sampleFrames } from "@app/constants/editor"
import Scrollbar from "@layerhub-io/react-custom-scrollbar"
import useSetIsSidebarOpen from "@app/hooks/useSetIsSidebarOpen"
import useDesignEditorContext from "@app/hooks/useDesignEditorContext"
import { FaPlus } from "react-icons/fa";
import { Dialog, Tab, Popover, Transition } from '@headlessui/react'
import { classNames } from '@lib/functions'

const colors = ["#ffffff", "#9B9B9B", "#4A4A4A", "#000000", "#A70C2C", "#DA9A15", "#F8E71D", "#47821A", "#4990E2"]

const Customize = () => {
  const editor = useEditor()
  const setIsSidebarOpen = useSetIsSidebarOpen()

  const [state, setState] = React.useState({
    backgroundColor: "#000000",
  })

  const changeBackgroundColor = (color) => {
    if (editor) {
      editor.frame.setBackgroundColor(color)
    }
  }
  const handleChange = (type, value) => {
    setState({ ...state, [type]: value })
    changeBackgroundColor(value)
  }

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.5rem",
        }}
      >
        <div className="font-semibold text-lg">Customize</div>

        <div onClick={() => setIsSidebarOpen(false)} style={{ cursor: "pointer", display: "flex" }}>
          <AngleDoubleLeft size={18} />
        </div>
      </div>
      <Scrollable>
        <div style={{ padding: "0 1.5rem" }}>
          <div>
            <ResizeTemplate />
            <div className="text-md text-center py-2">1080 x 1920px</div>
          </div>
          <div className="bg-gray-50 border border-gray-300 rounded-md p-4 mt-4 text-[14px] shadow-md">
              <div className="mb-2">Background color</div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 1fr)",
                  gap: "0.5rem",
                  paddingTop: "0.25rem",
                }}
              >
                <Popover>
                  <Popover.Button>
                    <div>
                      <div
                        style={{
                          height: "40px",
                          width: "40px",
                          backgroundSize: "100% 100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          backgroundImage:
                            'url("https://static.canva.com/web/images/788ee7a68293bd0264fc31f22c31e62d.png")',
                        }}
                      >
                        <div
                          style={{
                            height: "32px",
                            width: "32px",
                            background: "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "1.3rem",
                          }}
                        >
                          <FaPlus size={24} />
                        </div>
                      </div>
                    </div>
                  </Popover.Button>
                  <Popover.Panel className="absolute p-4 bg-white shadow-md border border-gray-300 rounded-lg flex flex-col text-center gap-1">
                    <HexColorPicker onChange={(v) => handleChange("backgroundColor", v)} />
                    <input
                      value={state.backgroundColor}
                      onChange={(e) => handleChange("backgroundColor", (e.target).value)}
                      placeholder="#000000"
                      className='w-full border border-gray-300 rounded-md mt-2 shadow p-2' 
                    />
                  </Popover.Panel>
                </Popover>
                  {colors.map((color) => (
                    <div
                      onClick={() => handleChange("backgroundColor", color)}
                      key={color}
                      style={{
                        background: color,
                        borderRadius: "4px",
                        border: "1px solid #d7d8e3",
                        height: "34px",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
      </Scrollable>
    </div>
  )
}

const ResizeTemplate = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [activeKey, setActiveKey] = React.useState("0")
  const { currentDesign, setCurrentDesign } = useDesignEditorContext()
  const editor = useEditor()
  const [desiredFrame, setDesiredFrame] = React.useState({
    width: 0,
    height: 0,
  })
  const [selectedFrame, setSelectedFrame] = React.useState({
    id: 0,
    width: 0,
    height: 0,
  })
  const frame = useFrame()

  React.useEffect(() => {
    if (frame) {
      setDesiredFrame({
        width: frame.width,
        height: frame.height,
      })
    }
  }, [frame])

  const applyResize = () => {
    // @ts-ignore
    const size = activeKey === "0" ? selectedFrame : desiredFrame
    if (editor) {
      editor.frame.resize({
        width: parseInt(size.width),
        height: parseInt(size.height),
      })
      setCurrentDesign({
        ...currentDesign,
        frame: {
          width: parseInt(size.width),
          height: parseInt(size.height),
        },
      })
    }
    setIsOpen(false)
  }
  const isEnabled =
    // @ts-ignore
    (selectedFrame.id !== 0) ||
    // @ts-ignore
    (!!parseInt(desiredFrame.width) && !!parseInt(desiredFrame.height))

  return (
    <>
      <div className="w-full flex flex-col items-center">
      <button
        onClick={() => setIsOpen(true)} className='bg-black w-full text-white px-2 py-2 rounded cursor-pointer hover:bg-pink-500 delay-75 duration-75'>
        Resize Template
        </button>
      </div>
      <Transition appear show={isOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" open={isOpen} onClose={() => setIsOpen(false)}>
           <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium text-center leading-6 text-gray-900">Choose a format and resize your template.</Dialog.Title>
                <div className="w-full max-w-2xl px-2 pt-4 sm:px-0">
                  <Tab.Group>
                    <Tab.List className="flex align-center items-center justify-center space-x-1 rounded-xl">
                      <Tab className={({ selected }) =>
                          classNames(
                            'w-32 py-2.5 text-sm font-medium leading-5 text-black',
                            'border-b-2 border-transparent',
                            selected
                              ? 'border-black'
                              : 'border-transparent'
                          )
                        }>Preset Size</Tab>
                      <Tab className={({ selected }) =>
                          classNames(
                            'w-32 py-2.5 text-sm font-medium leading-5 text-black',
                            'border-b-2 border-transparent',
                            selected
                              ? 'border-black'
                              : 'border-transparent'
                          )
                        }>Custom Size</Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                        <div style={{ width: "100%", height: "400px" }}>
                          <Scrollbar>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
                              {sampleFrames.map((sampleFrame, index) => (
                                <div
                                  className={`hover:bg-gray-100 p-1 delay-75 duration-75 cursor-pointer ${(selectedFrame.id === sampleFrame.id) ? "bg-gray-100" : "bg-white"}`}
                                  onClick={() => setSelectedFrame(sampleFrame)}
                                  key={index}
                                >
                                  <div
                                    style={{
                                      height: "120px",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <img src={sampleFrame.preview} />
                                  </div>
                                  <div style={{ fontSize: "13px", textAlign: "center" }}>
                                    <div style={{ fontWeight: 500 }}>{sampleFrame.name}</div>
                                    <div style={{ color: "rgb(119,119,119)" }}>
                                      {sampleFrame.width} x {sampleFrame.height}px
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </Scrollbar>
                        </div>
                      </Tab.Panel>
                      <Tab.Panel>
                        <div style={{ padding: "2rem 0" }}>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", alignItems: "end", fontSize: "14px" }}>
                            <div className="flex flex-row justify-center items-center">
                              <span className="mr-2 text-black text-md">W</span>  
                              <input
                                onChange={(e) => setDesiredFrame({ ...desiredFrame, width: e.target.value })}
                                value={desiredFrame.width}
                                placeholder="Width"
                                className="w-full p-2 rounded-lg bg-white text-black focus:outline-none ring-2 ring-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white"
                                  />
                            </div>
                            <div className="flex flex-row justify-center items-center">
                              <span className="mr-2 text-black text-md">H</span>  
                              <input
                                onChange={(e) => setDesiredFrame({ ...desiredFrame, height: e.target.value })}
                                value={desiredFrame.height}
                                placeholder="Height"
                                className="w-full p-2 rounded-lg bg-white text-black focus:outline-none ring-2 ring-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white"
                              />
                            </div>
                          </div>
                        </div>
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem 0 0" }}>
                  <button disabled={!isEnabled} onClick={applyResize} style={{ width: "190px" }} className='bg-black text-white px-2 py-1 rounded cursor-pointer hover:bg-pink-500 delay-75 duration-75'>
                    Resize template
                  </button>
                </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Customize

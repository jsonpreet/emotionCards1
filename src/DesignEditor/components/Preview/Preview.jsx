import useEditorType from "@app/hooks/useEditorType"
import { Dialog, Tab, Popover, Transition } from '@headlessui/react'
import { classNames } from '@lib/functions'
import Graphic from "./Graphic"

const Preview = ({ isOpen, setIsOpen }) => {
  const editorType = useEditorType()
  return (
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
                  <Graphic />
                </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  )
}

export default Preview

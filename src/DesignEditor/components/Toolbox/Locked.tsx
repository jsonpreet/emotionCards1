import React from "react"
import { useEditor } from "@layerhub-io/react"
import UnlockedIcon from "@components/Icons/Unlocked"

const Locked = () => {
  const editor = useEditor()

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        padding: "0 12px",
        justifyContent: "flex-end",
      }}
    >
      <button
        onClick={() => {
          editor.objects.unlock()
        }}
      >
        <UnlockedIcon size={24} />
      </button>
    </div>
  )
}

export default Locked

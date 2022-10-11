import React from "react"
import { useEditor } from "@layerhub-io/react"
import UnlockedIcon from "@components/Icons/Unlocked"
import { Tooltip } from "@nextui-org/react";

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
      <Tooltip content="Unlock" color="invert"  placement="bottom">
      <button
        onClick={() => {
          editor.objects.unlock()
        }}
      >
        <UnlockedIcon size={24} />
        </button>
      </Tooltip>
    </div>
  )
}

export default Locked

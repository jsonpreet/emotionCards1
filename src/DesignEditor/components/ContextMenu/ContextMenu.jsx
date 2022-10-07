import { useActiveObject, useContextMenuRequest, useEditor } from "@layerhub-io/react"
import BringToFront from "@components/Icons/BringToFront"
import Delete from "@components/Icons/Delete"
import Duplicate from "@components/Icons/Duplicate"
import Elements from "@components/Icons/Elements"
import Locked from "@components/Icons/Locked"
import Paste from "@components/Icons/Paste"
import SendToBack from "@components/Icons/SendToBack"
import Unlocked from "@components/Icons/Unlocked"

const ContextMenu = () => {
  const contextMenuRequest = useContextMenuRequest()
  const editor = useEditor()
  const activeObject = useActiveObject()
  const handleAsComponentHandler = async () => {
    if (editor) {
      const component = await editor.scene.exportAsComponent()
      if (component) {
        console.log({ component })
      }
    }
  }
  if (!contextMenuRequest || !contextMenuRequest.target) {
    return <></>
  }

  if (contextMenuRequest.target.type === "Background") {
    return (
      <div // @ts-ignore
        onContextMenu={(e) => e.preventDefault()}
        style={{
          position: "absolute",
          top: `${contextMenuRequest.top}px`,
          left: `${contextMenuRequest.left}px`,
          zIndex: 129,
          width: "240px",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0.5px 2px 7px rgba(0, 0, 0, 0.1)",
          padding: "0.5rem 0",
        }}
      >
        <ContextMenuItem
          disabled={true}
          onClick={() => {
            editor.objects.copy()
            editor.cancelContextMenuRequest()
          }}
          icon="Duplicate"
          label="Copy"
        >
          <Duplicate size={24} />
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => {
            editor.objects.paste()
            editor.cancelContextMenuRequest()
          }}
          icon="Paste"
          label="Paste"
        >
          <Paste size={24} />
        </ContextMenuItem>
        <ContextMenuItem
          disabled={true}
          onClick={() => {
            editor.objects.remove()
            editor.cancelContextMenuRequest()
          }}
          icon="Delete"
          label="Delete"
        >
          <Delete size={24} />
        </ContextMenuItem>
      </div>
    )
  }
  return (
    <>
      {!contextMenuRequest.target.locked ? (
        <div // @ts-ignore
          onContextMenu={(e) => e.preventDefault()}
          style={{
            position: "absolute",
            top: `${contextMenuRequest.top}px`,
            left: `${contextMenuRequest.left}px`,
            zIndex: 129,
            width: "240px",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            boxShadow: "0.5px 2px 7px rgba(0, 0, 0, 0.1)",
            padding: "0.5rem 0",
          }}
        >
          <ContextMenuItem
            onClick={() => {
              editor.objects.copy()
              editor.cancelContextMenuRequest()
            }}
            icon="Duplicate"
            label="Copy"
          >
            <Duplicate size={24} />
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => {
              editor.objects.paste()
              editor.cancelContextMenuRequest()
            }}
            icon="Paste"
            label="Paste"
          >
            <Paste size={24} />
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => {
              editor.objects.remove()
              editor.cancelContextMenuRequest()
            }}
            icon="Delete"
            label="Delete"
          >
            <Delete size={24} />
          </ContextMenuItem>
          <div style={{ margin: "0.5rem 0" }} />
          <ContextMenuItem
            onClick={() => {
              editor.objects.bringForward()
              editor.cancelContextMenuRequest()
            }}
            icon="Forward"
            label="Bring Forward"
          >
            <BringToFront size={24} />
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => {
              editor.objects.sendBackwards()
              editor.cancelContextMenuRequest()
            }}
            icon="Backward"
            label="Send Backward"
          >
            <SendToBack size={24} />
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => {
              handleAsComponentHandler()
              editor.cancelContextMenuRequest()
            }}
            icon="Elements"
            label="Save as Component"
          >
            <Elements size={24} />
          </ContextMenuItem>
          <div style={{ margin: "0.5rem 0" }} />
          <ContextMenuItem
            onClick={() => {
              editor.objects.lock()
              editor.cancelContextMenuRequest()
            }}
            icon="Locked"
            label="Lock"
          >
            <Locked size={24} />
          </ContextMenuItem>
          {activeObject?.type === "StaticImage" && (
            <ContextMenuItem
              onClick={() => {
                // handleAsComponentHandler()
                editor.objects.setAsBackgroundImage()
                editor.cancelContextMenuRequest()
              }}
              icon="Images"
              label="Set as background image"
            >
              <Elements size={24} />
            </ContextMenuItem>
          )}
        </div>
      ) : (
        <div // @ts-ignore
          onContextMenu={(e) => e.preventDefault()}
          style={{
            position: "absolute",
            top: `${contextMenuRequest.top}px`,
            left: `${contextMenuRequest.left}px`,
            zIndex: 129,
            width: "240px",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            boxShadow: "0.5px 2px 7px rgba(0, 0, 0, 0.1)",
            padding: "0.5rem 0",
          }}
        >
          <ContextMenuItem
            onClick={() => {
              editor.objects.unlock()
              editor.cancelContextMenuRequest()
            }}
            icon="Unlocked"
            label="Unlock"
          >
            <Unlocked size={24} />
          </ContextMenuItem>
        </div>
      )}
    </>
  )
}

const ContextMenuItem = ({
  label,
  onClick,
  children,
  disabled = false,
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        height: "32px",
        fontSize: "14px",
        alignItems: "center",
        padding: "0 1rem",
        gap: "1rem",
        cursor: "pointer",
        pointerEvents: disabled ? "none" : "auto",
        opacity: disabled ? 0.4 : 1,
      }}
    >
      {children} {label}
    </div>
  )
}

export default ContextMenu

import { BASE_ITEMS } from "@app/constants/app-options"
import useAppContext from "@app/hooks/useAppContext"
import Icons from "@components/Icons"
import { useTranslation } from "react-i18next"
import useSetIsSidebarOpen from "@app/hooks/useSetIsSidebarOpen"
import useEditorType from "@app/hooks/useEditorType"
import Scrollable from "@components/Scrollable"

const PanelsList = () => {
  const { activePanel } = useAppContext()
  const { t } = useTranslation("editor")
  const editorType = useEditorType()
  const PANEL_ITEMS = BASE_ITEMS
  return (
    <div className="w-[80px] flex overflow-x-hidden bg-gray-200">
      <Scrollable >
        {PANEL_ITEMS.map((panelListItem) => (
          <PanelListItem
            label={t(`panels.panelsList.${panelListItem.id}`)}
            name={panelListItem.name}
            key={panelListItem.name}
            icon={panelListItem.name}
            activePanel={activePanel}
          />
        ))}
      </Scrollable>
    </div>
  )
}

const PanelListItem = ({ label, icon, activePanel, name }) => {
  const { setActivePanel } = useAppContext()
  const setIsSidebarOpen = useSetIsSidebarOpen()
  // @ts-ignore
  const Icon = Icons[icon]
  return (
    <div
      id="EditorPanelList"
      onClick={() => {
        setIsSidebarOpen(true)
        setActivePanel(name)
      }}
      style={{
        width: "80px",
        height: "80px",
        backgroundColor: name === activePanel ? '#fff' : 'rgb(229 231 235)',
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        fontWeight: 500,
        fontSize: "0.8rem",
        userSelect: "none",
        transition: "all 0.5s",
        gap: "0.1rem",
      }}
    >
      <Icon size={24} />
      <div>{label}</div>
    </div>
  )
}

export default PanelsList

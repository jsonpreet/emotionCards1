import React from "react"
import ArrowBackOutline from "@components/Icons/ArrowBackOutline"
import Search from "@components/Icons/Search"
import useAppContext from "@app/hooks/useAppContext"
import { useEditor } from "@layerhub-io/react"
import { loadFonts } from "@app/utils/fonts"
import { SAMPLE_FONTS } from "@app/constants/editor"
import { groupBy } from "lodash"
import Scrollable from "@components/Scrollable"
import AngleDoubleLeft from "@components/Icons/AngleDoubleLeft"
import useSetIsSidebarOpen from "@app/hooks/useSetIsSidebarOpen"

const FontSelector = () => {
  const [query, setQuery] = React.useState("")
  const { setActiveSubMenu } = useAppContext()
  const setIsSidebarOpen = useSetIsSidebarOpen()
  const [activeFont, setActiveFont] = React.useState("")

  const [commonFonts, setCommonFonts] = React.useState([])
  const editor = useEditor()

  React.useEffect(() => {
    const grouped = groupBy(SAMPLE_FONTS, "family")
    const standardFonts = Object.keys(grouped).map((key) => {
      const familyFonts = grouped[key]
      const standardFont = familyFonts.find((familyFont) => familyFont.postscript_name.includes("-Regular"))
      if (standardFont) {
        return standardFont
      }
      return familyFonts[familyFonts.length - 1]
    })
    setCommonFonts(standardFonts)
  }, [])

  const handleFontFamilyChange = async (x) => {
    if (editor) {
      const font = {
        name: x.postscript_name,
        url: x.url,
      }
      await loadFonts([font])
      // @ts-ignore
      editor.objects.update({
        fontFamily: x.postscript_name,
        fontURL: font.url,
      })
      setActiveFont(x.postscript_name)
    }
  }

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
          justifyContent: "space-between",
          padding: "1.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <ArrowBackOutline size={24} />
          <div className="font-semibold text-lg">Choose font</div>
        </div>
        <div onClick={() => setIsSidebarOpen(false)} style={{ cursor: "pointer", display: "flex" }}>
          <AngleDoubleLeft size={18} />
        </div>
      </div>

      {/* <div className="flex flex-row justify-between items-center px-6 pb-3 relative">
        <input className="w-full p-2 bg-gray-100" placeholder="Search font" onChange={(e) => setQuery(e.target.value)} />
        <div className='right-10 absolute'><Search size={18} /></div>
      </div> */}

      <Scrollable>
        <div style={{ padding: "0 1.5rem", display: "grid", gap: "0.2rem" }}>
          {commonFonts.map((font, index) => {
            return (
              <div
                key={index}
                onClick={() => handleFontFamilyChange(font)}
                className={`h-[40px] flex items-center justify-between px-4 cursor-pointer ${activeFont == font.postscript_name ? 'bg-gray-100': ''} hover:bg-gray-100`}
                id={font.id}>
                <img src={font.preview} />
              </div>
            )
          })}
        </div>
      </Scrollable>
    </div>
  )
}

export default FontSelector

import Link from 'next/link'
import { MENU_ITEMS } from '@app/lib/constants'
import MenuItem from './menuItem'

const Sidebar = () => {
  return (
    <>
        {/* <div className="flex flex-col w-60 fixed h-screen bg-gradient-to-br order-2 lg:order-1 from-red-300/20 to-yellow-100/10 dark:from-gray-800/70 dark:to-gray-900 border-r border-gray-200 dark:border-gray-700/50"/> */}
        <div className="flex flex-col w-60 fixed pt-14 h-screen overflow-y-auto overflow-x-hidden bg-white">
        {Object.keys(MENU_ITEMS).map((item, index) => {
          const menu = MENU_ITEMS[item];
          return (
            <MenuItem key={index} title={menu.title} Icon={menu.Icon} link={menu.link}/>
          )
        })}
        </div>
    </>
  )
}

export default Sidebar
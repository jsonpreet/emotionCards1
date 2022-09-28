import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  return (
    <>
        {/* <div className="flex flex-col w-60 fixed h-screen bg-gradient-to-br order-2 lg:order-1 from-red-300/20 to-yellow-100/10 dark:from-gray-800/70 dark:to-gray-900 border-r border-gray-200 dark:border-gray-700/50"/> */}
        <div className="flex flex-col w-60 fixed pt-14 h-screen overflow-y-auto overflow-x-hidden bg-white">
            <div className="flex flex-col justify-center w-full border-b border-gray-200 dark:border-gray-700/50">
                <Link href='/' passHref><a className='cursor-pointer px-4 hover:text-pink-600 py-2 text-left'>Dashboard</a></Link>
            </div>
        </div>
    </>
  )
}

export default Sidebar
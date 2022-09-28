import { Header } from '@app/components/user/header'
import { Sidebar } from '@app/components/user/sidebar'

const Layout = ({children}) => {
    return (
        <>
            <div className='min-h-screen mx-auto flex-col flex bg-gray-200 text-black dark:bg-black dark:text-white'>
                <Header />
                <div className='content w-full'>
                    <Sidebar />
                    <main className='flex-grow container mx-auto px-4 sm:px-6'>
                        <div className='flex flex-col py-20 items-center overflow-hidden justify-center h-screen'>
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </>
  )
}

export default Layout
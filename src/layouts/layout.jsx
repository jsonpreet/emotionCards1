import { Header } from '@app/components/user/header'
import { Sidebar } from '@app/components/user/sidebar'

const Layout = ({children}) => {
    return (
        <>
            <div className='min-h-screen mx-auto flex-col flex bg-gray-200 text-black dark:bg-black dark:text-white'>
                <Header />
                <div className='content w-full flex flex-row'>
                    <Sidebar />
                    <main className='w-2/3 flex-1 container-fluid mx-auto px-4 ml-60'>
                        <div className='flex flex-col py-20'>
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </>
  )
}

export default Layout
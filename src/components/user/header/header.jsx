import { useState, Fragment } from 'react'
import { Menu, Transition, Switch } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { classNames } from '@app/lib/functions'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import Link from 'next/link'

const Header = () => {
  const router = useRouter()
  const [enabled, setEnabled] = useState(false)
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
      setEnabled(true)
    } else {
      setTheme('light')
      setEnabled(false)
    }
  }

  const logout = () => {
    supabaseClient.auth.signOut()
    router.push('/')
  }
  return (
    <div className='z-10 flex flex-row bg-white dark:bg-gray-900 bg-opacity-75 fixed backdrop-blur-3xl w-full px-4 py-2'>
      <div className="w-full px-4 mx-auto flex flex-row justify-between items-center">
        <div className='logo'>
            <Link href='/' passHref><a className='cursor-pointer'><img src='/logo-icon.png' alt='logo' className='w-10 h-10' /></a></Link>
        </div>   
        <div className='headerRight flex flex-row justify-between items-center'>
          <div className='themeSwitch mr-4'>
            <Switch
              checked={enabled}
              onChange={toggleTheme}
              className={`${
                enabled ? 'bg-pink-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">{(theme == 'light') ? 'Dark' : 'Light'}</span>
              <span
                className={`${
                  enabled ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
          <div className='userMenu'>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center items-center dark:text-white shadow-none text-sm font-medium text-gray-700 focus:outline-none">
                   <div className="flex items-center justify-center mr-2 w-7 h-7 bg-white rounded-full shadow-lg">
                        <img className="w-6 h-6 rounded-full" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="avatar" />
                    </div> <span>Hey, User</span>
                  <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y dark:bg-black dark:text-white dark:divide-gray-700 divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link href="/">
                          <a
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900 dark:text-gray-700' : 'dark:text-white text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}>Account settings</a>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link href="/">
                          <a
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900 dark:text-gray-700' : 'dark:text-white text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}>Support</a>
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button onClick={() => logout()}
                          type="submit"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900 dark:text-gray-700' : 'dark:text-white text-gray-700',
                            'block px-4 py-2 w-full text-left text-sm'
                          )}
                        >
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
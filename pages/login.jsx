import Head from "next/head"
import { useRouter } from 'next/router'
import { Auth } from '@app/components/auth'
import { useUser } from '@supabase/supabase-auth-helpers/react'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { useEffect } from "react"

const Login = () => {
  const router = useRouter()
  const { user, error } = useUser()
  useEffect(() => {
    if (user) router.push('/')
  }, [user])
  return (
    <>
      <Head>
        <title>Emotion Cards</title>
      </Head>
      <div className="min-h-screen mx-auto flex-col flex bg-white text-black dark:bg-black dark:text-white">
        <main className="flex-grow container mx-auto px-4 sm:px-6">
          <div className="flex flex-col py-20 items-center overflow-hidden justify-center h-screen">
            <Auth />
          </div>
        </main>
      </div>
    </>
  )
}

export default Login
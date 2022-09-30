import Head from "next/head"
import { useRouter } from 'next/router'
import { SignUp } from '@app/components/auth'
import { useUser } from '@supabase/supabase-auth-helpers/react'
import { useEffect } from "react"

const Register = () => {
  const router = useRouter()
  const { user, error } = useUser()
  useEffect(() => {
    if (user) router.push('/')
  }, [user])
  return (
    <>
      <Head>
        <title>Sign Up - Emotion Cards</title>
      </Head>
      <div className="min-h-screen mx-auto flex-col flex bg-white text-black dark:bg-black dark:text-white">
        <main className="flex-grow container mx-auto px-4 sm:px-6">
          <div className="flex flex-col py-20 items-center overflow-hidden relative justify-center h-screen">
            <SignUp />
          </div>
        </main>
      </div>
    </>
  )
}

export default Register
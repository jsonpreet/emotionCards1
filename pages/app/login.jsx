import { useEffect } from "react"
import Head from "next/head"
import { useRouter } from 'next/router'
import { supabase } from "@lib/supabaseClient"
import { Auth } from "@app/components/auth"
import { useAuthStore } from "@stores/auth"

const Login = () => {
  const router = useRouter()
  const { session, isLoggedIn, setUser, setIsLoggedIn, setSession, setIsError, setError } = useAuthStore()

  useEffect(() => {
    onAuthStatueChange()
    getSession()
  }, [])

  const onAuthStatueChange = async () => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event !== 'SIGNED_OUT') {
        router.push('/')
      } else {
        router.push('/login')
      }
    });
  }

  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession()
    // if (error) {
    //   setError(error)
    //   setIsError(true)
    // } else {
    //   if (data) {
    //     setUser(data.user)
    //     setSession(data)
    //     setIsLoggedIn(true)
    //   }
    // }
  }

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
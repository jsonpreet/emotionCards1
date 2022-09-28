import Head from "next/head"
import { useRouter } from 'next/router'
import { useAuthStore } from "@stores/auth"

const Home = () => {
  const router = useRouter()
  const { session, isLoggedIn, setUser, setIsLoggedIn, setSession, setIsError, setError } = useAuthStore()

  return (
    <>
      <Head>
        <title>Emotion Cards</title>
      </Head>
      <div className="min-h-screen mx-auto flex-col flex bg-white text-black dark:bg-black dark:text-white">
        <main className="flex-grow container mx-auto px-4 sm:px-6">
          <div className="flex flex-col py-20 items-center overflow-hidden justify-center h-screen">
            <div className="absolute z-0 top-0 right-0 w-full h-full p-4 blurBG" />
            <h1 className="text-5xl relative font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500">Welcome</h1>
          </div>
        </main>
      </div>
    </>
  )
}

export default Home
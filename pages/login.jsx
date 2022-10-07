import Head from "next/head"
import { SignIn } from '@app/components/auth'

const Login = () => {
  return (
    <>
      <Head>
        <title>Sign In - Emotion Cards</title>
      </Head>
      <div className="min-h-screen mx-auto flex-col flex bg-white text-black ">
        <main className="flex-grow container mx-auto px-4 sm:px-6">
          <div className="flex flex-col py-20 items-center overflow-hidden relative justify-center h-screen">
            <SignIn />
          </div>
        </main>
      </div>
    </>
  )
}

export default Login
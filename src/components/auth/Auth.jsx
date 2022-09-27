import { useState } from 'react'
import { supabase } from '@lib/supabaseClient'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (email) => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signInWithOtp({ email, emailRedirectTo: 'http://localhost:3000/dashboard' })
      console.log(data);
      if (error) throw error
      setSuccess(true)
      setError(false)
    } catch (error) {
      setSuccess(false)
      console.log(error.error_description || error.message)
      setErrorMsg(error.message)
      setError(true);
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="absolute z-0 top-0 right-0 w-full h-full p-4" style={{ backgroundImage: `linear-gradient(180deg,hsla(0,0%,100%,.92),hsla(0,0%,100%,.92)),url("/assets/bg-blur-hero.svg")`, backgroundRepeat: 'no-repeat', backgroundPosition: '0 0, 50% 100%', backgroundSize: 'auto' }} />
      <h1 className="text-4xl font-bold text-center relative">Sign In</h1>
      <div className="auth w-full max-w-md">
        <div className="form-widget w-full mx-auto flex flex-col items-center justify-center h-full py-5 lg:py-8 relative">
          <p className="description w-full text-center">
              Sign in via magic link with your email below
          </p>
          <div className='w-full pt-4'>
              <label className='mb-px text-sm hidden font-semibold md:text-base dark:text-white'>Email</label>
              <input
              className="duration-200 border-gray-300 px-4 py-[10px] rounded-full my-1 outline-none w-full dark:bg-gray-900 dark:text-white dark:border-gray-600 border dark:placeholder-gray-500 dark:hover:border-blue-700 dark:focus:border-blue-700 hover:border-blue-400 focus:border-blue-400"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
          </div>
          <div className='w-full'>
              <button
              onClick={(e) => {
                  e.preventDefault()
                  handleLogin(email)
              }}
              className="flex items-center justify-center duration-200 capitalize w-full px-6 py-3 text-lg font-medium text-white md:text-lg md:py-3 bg-blue-600 rounded-full mt-5 hover:bg-blue-500"
              disabled={loading}>
                  <span>{loading ? 'Loading' : 'Send magic link'}</span>
              </button>
          </div>
          {success && <div className='w-full bg-green-700 rounded-full mt-5 px-4 py-3 text-white text-center'>
            <p className='text-sm'>Check your email for the login link!</p>
          </div>}
          {error && <div className='w-full bg-red-700 rounded-full mt-5 px-4 py-3 text-white text-center'>
            <p className='text-sm'>{errorMsg || `Something went wrong. Please try again.`}</p>
          </div>}
        </div>
      </div>
    </>
  )
}
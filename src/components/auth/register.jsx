import { useState } from 'react'
import { supabase } from '@lib/supabaseClient'
import { Spinner } from '@app/lib/icons'
import { Gradient1, Gradient2 } from '@components/ui/backgrounds'
import Link from 'next/link'

const SignUp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [success, setSuccess] = useState(false)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (email, password, name) => {
    try {
        setLoading(true)
        const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { name: name } } })
        console.log(data), console.log(error)
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
        <Gradient2/>
        <div className="auth relative z-20 w-full max-w-md py-4 rounded-lg backdrop-blur-3xl bg-opacity-50 shadow-xl shadow-slate-200 border-2 border-white bg-white px-4">
            <h1 className="text-4xl relative z-20 font-bold text-center">Sign Up</h1>
            <div className="form-widget w-full mx-auto flex flex-col items-center justify-center h-full relative">
                <p className="description w-full text-center">
                    Get started for free. No credit card required.
                </p>
                <div className='w-full pt-4'>
                    <label className='mb-px text-sm hidden font-semibold md:text-base dark:text-white'>Name</label>
                    <input
                    className="duration-200 border-gray-300 px-4 py-[10px] rounded-full my-1 outline-none w-full dark:bg-gray-900 dark:text-white dark:border-gray-600 border dark:placeholder-gray-500 dark:hover:border-blue-700 dark:focus:border-blue-700 hover:border-blue-400 focus:border-blue-400"
                    type="text"
                    placeholder="Full Name"
                    value={name}
                        onChange={(e) => setName( e.target.value )}
                    />
                </div>
                <div className='w-full pt-4'>
                    <label className='mb-px text-sm hidden font-semibold md:text-base dark:text-white'>Email</label>
                    <input
                    className="duration-200 border-gray-300 px-4 py-[10px] rounded-full my-1 outline-none w-full dark:bg-gray-900 dark:text-white dark:border-gray-600 border dark:placeholder-gray-500 dark:hover:border-blue-700 dark:focus:border-blue-700 hover:border-blue-400 focus:border-blue-400"
                    type="email"
                    placeholder="Email Address"
                    value={email}
                        onChange={(e) => setEmail( e.target.value )}
                    />
                </div>
                <div className='w-full pt-4'>
                    <label className='mb-px text-sm hidden font-semibold md:text-base dark:text-white'>Password</label>
                    <input
                    className="duration-200 border-gray-300 px-4 py-[10px] rounded-full my-1 outline-none w-full dark:bg-gray-900 dark:text-white dark:border-gray-600 border dark:placeholder-gray-500 dark:hover:border-blue-700 dark:focus:border-blue-700 hover:border-blue-400 focus:border-blue-400"
                    type="password"
                    placeholder="Password"
                    value={password}
                        onChange={(e) => setPassword( e.target.value )}
                    />
                </div>
                <div className='w-full'>
                    <button
                    onClick={(e) => {
                        e.preventDefault()
                        handleLogin(email, password, name)
                    }}
                    className="flex items-center justify-center duration-200 capitalize w-full px-6 py-3 text-lg font-medium text-white md:text-lg md:py-3 bg-pink-600 rounded-full mt-5 hover:bg-pink-700"
                    disabled={loading}>
                    {loading ? <Spinner /> : <span>Sign Up</span>}
                    </button>
                </div>
                <div className='w-full full py-4 text-center'>
                    Already registered? <Link href="/login" passHerf><a className='font-bold hover:text-pink-600'>Sign in</a></Link> to your account..
                </div>
            </div>
        </div>
        {success && <div className='w-full bg-green-700 relative max-w-md z-10 rounded-full mt-10 px-4 py-3 text-white text-center'>
            <p className='text-sm'>Check your email for the login link!</p>
        </div>}
        {error && <div className='w-full bg-red-700 rounded-full max-w-md relative z-10 mt-10 px-4 py-3 text-white text-center'>
            <p className='text-sm'>{errorMsg || `Something went wrong. Please try again.`}</p>
        </div>}
    </>
    )
}

export default SignUp
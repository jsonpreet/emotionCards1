import { supabase } from '@lib/supabaseClient'
import { useAuthStore } from '@stores/auth'
import React from 'react'

const Dashboard = () => {
    const { setUser, setIsLoggedIn, setSession, setIsError, setError } = useAuthStore()
    const logout = async () => {
        const { data, error } = await supabase.auth.signOut()
        console.log(error)
        setIsLoggedIn(false)
        setSession(null)
        setUser(null)
        setError(null)
        setIsError(false)
    }
    return (
    <div><button onClick={() => logout()}>Logout</button></div>
    )
}

export default Dashboard
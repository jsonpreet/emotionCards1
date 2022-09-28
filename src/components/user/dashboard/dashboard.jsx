import { supabase } from '@lib/supabaseClient'
import { useAuthStore } from '@stores/auth'

const Dashboard = () => {
  
  const { setUser, setIsLoggedIn, setSession, setIsError, setError } = useAuthStore()
  const logout = async () => {
      const { data, error } = await supabase.auth.signOut()
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
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Layout } from '@app/layouts'
import { Dashboard } from '@app/components/user/dashboard'
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useAuthStore } from '@app/stores/auth'

export default function Home () {
  const router = useRouter()
  const { setUser, setIsLoggedIn } = useAuthStore()
  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user]);
  return (
    <>
      <Head>
        <title>Dashboard - Emotion Cards</title>
      </Head>
      <Layout>
        <Dashboard/>
      </Layout>
    </>
  )
}

// export const getServerSideProps = withPageAuth({ redirectTo: '/login' });
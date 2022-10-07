import Head from 'next/head'
import { useRouter } from 'next/router'
import { Layout } from '@app/layouts'
import { Dashboard } from '@app/components/user/dashboard'
import { User } from '@supabase/supabase-js';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useEffect } from 'react'
import { useAuthStore } from '@app/stores/auth'

export default function Home ({user}) {
  //const { user, error } = useUser();
  const router = useRouter()
  const { setUser, setIsLoggedIn } = useAuthStore()
  console.log(user);
  return (
    <>
      <Head>
        <title>Dashboard - Emotion Cards</title>
      </Head>
      <Layout>
        {/* <Dashboard/> */}
      </Layout>
    </>
  )
}

// export const getServerSideProps = withPageAuth({ redirectTo: '/login' });
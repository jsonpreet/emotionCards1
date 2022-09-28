import Head from 'next/head'
import { useRouter } from 'next/router'
import { Layout } from '@app/layouts'
import { Dashboard } from '@app/components/user/dashboard'
import { useUser } from '@supabase/supabase-auth-helpers/react'
import { supabaseServerClient, withPageAuth } from '@supabase/supabase-auth-helpers/nextjs'

const Home = () => {
  return (
    <>
      <Head>
        <title>Emotion Cards</title>
      </Head>
      <Layout>
        <Dashboard/>
      </Layout>
    </>
  )
}

export default Home

export const getServerSideProps = withPageAuth({
  redirectTo: '/login',
  async getServerSideProps(ctx) {
    const { data } = await supabaseServerClient(ctx).getUser('profiles').select('*');
    return { props: { data } };
  }
});
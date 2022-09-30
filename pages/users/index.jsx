import Head from 'next/head'
import { Layout } from '@app/layouts'

function Users() {
  return (
    <>
      <Head>
        <title>Users - Emotion Cards</title>
      </Head>
      <Layout>
        <div>Users</div>
      </Layout>
    </>
  )
}

export default Users
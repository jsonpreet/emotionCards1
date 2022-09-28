
import '@styles/globals.css';
import '@styles/app.scss';
import NextNProgress from 'nextjs-progressbar';
import { ThemeProvider } from "next-themes";
import { UserProvider } from '@supabase/supabase-auth-helpers/react'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'


function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress color="#cb0038" showOnShallow={true} />
      <ThemeProvider enableSystem={true} attribute="class">
        <UserProvider supabaseClient={supabaseClient}>
          <Component {...pageProps} />
        </UserProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp

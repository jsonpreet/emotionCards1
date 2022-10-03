
import '@styles/globals.css';
import '@styles/app.scss';
import NextNProgress from 'nextjs-progressbar';
import { ThemeProvider } from "next-themes";
import { UserProvider } from '@supabase/supabase-auth-helpers/react'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import '@app/libs/fontawesome-5.2.0/css/all.css';
import '@styles/index.scss';
import '@styles/canvas/canvas.scss';
import '@styles/canvas/contextmenu.scss';
import '@styles/canvas/fabricjs.scss';
import '@styles/canvas/tooltip.scss';


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


import NextNProgress from 'nextjs-progressbar'
import { ThemeProvider } from "next-themes"
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Provider as ScenifyProvider } from "@layerhub-io/react"
import { AppProvider } from "@app/contexts/AppContext"
import { DesignEditorProvider } from "@app/contexts/DesignEditor"
import { I18nextProvider } from "react-i18next"
import { TimerProvider } from "@layerhub-io/use-timer"
import i18next from "i18next"
import "@app/translations"
import '@styles/globals.css'
import '@styles/app.scss'
import { useState } from 'react';


function MyApp({ Component, pageProps }) {
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient()
  );
  return (
    <>
      <NextNProgress color="#cb0038" showOnShallow={true} />
      <ThemeProvider enableSystem={true} attribute="class">
        <SessionContextProvider supabaseClient={supabaseClient}>
          <DesignEditorProvider>
            <TimerProvider>
              <AppProvider>
                <ScenifyProvider>
                    <I18nextProvider i18n={i18next}><Component {...pageProps} /></I18nextProvider>
                </ScenifyProvider>
              </AppProvider>
            </TimerProvider>
          </DesignEditorProvider>
        </SessionContextProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp

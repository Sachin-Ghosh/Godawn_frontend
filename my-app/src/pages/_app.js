import '@/styles/globals.css'
import Layout from '@/components/Layout'

// import { AuthProvider } from '@/context/AuthContext';

import { ThemeProvider } from 'next-themes'
import NextNProgress from 'nextjs-progressbar';
// import { DataProvider } from '@/context/DataContext';


export default function App({ Component, pageProps }) {
  return( 
    <>
  <NextNProgress />

    
  <ThemeProvider >
    <Layout>
    <Component {...pageProps} />
    </Layout>
  </ThemeProvider>
  </>
  )
}
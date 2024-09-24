import "@styles/globals.css"
import { Londrina_Outline } from 'next/font/google'

import Provider from "@components/Provider"
import Nav from "@components/Nav"
import Head from 'next/head'
import { LoadingProvider } from '@components/LoadingContext.js'

const londrina = Londrina_Outline({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-londrina-outline'
})

const RootLayout = ({ children }) => (
  <html lang='en'>
    <Head>
      <title>Kom ihåg</title>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Londrina+Outline&display=swap" rel="stylesheet" />
    </Head>
    <body>
      <Provider>
        <LoadingProvider>
          <main className='app bg-a-yellow h-screen'>
            <div className={`h-full ${londrina.className}`}>
              <Nav />
              {children}
            </div>
          </main>
        </LoadingProvider>
      </Provider>
    </body>
  </html>
);

export default RootLayout;

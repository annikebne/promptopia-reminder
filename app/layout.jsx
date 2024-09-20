import "@styles/globals.css"

import  Provider from "@components/Provider"
import Nav from "@components/Nav"
import Head from 'next/head'

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
        <main className='app bg-a-yellow h-full'>
          <Nav />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;

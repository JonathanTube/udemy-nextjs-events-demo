import Head from "next/head"
import Layout from "@/components/layout/layout"
import "@/styles/globals.css"

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>All Events</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, minimum-scale=1.0, maximum-scale=2.0"
        />
        <meta
          name="description"
          content="This is a demo project created with nextjs"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

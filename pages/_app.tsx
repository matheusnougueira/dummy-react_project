import type { AppProps } from 'next/app'
import '../styles/globals.css'

interface IMyApp {
  Component: any;
  pageProps: AppProps;
}

function MyApp({ Component, pageProps }: IMyApp) {
  return <Component {...pageProps} />
}

export default MyApp

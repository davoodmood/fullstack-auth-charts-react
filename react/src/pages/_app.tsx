import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import AuthProvider from '../context/AuthContext'
import SearchProvider from '../context/SearchContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <SearchProvider>
        <Component {...pageProps} />
      </SearchProvider>
    </AuthProvider>
  )
}

export default MyApp

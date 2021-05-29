import '../styles/global.css'
import Header from '../components/header'
import { Auth0Provider } from '@auth0/auth0-react'

export default function MyApp({ Component, pageProps }) {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      redirectUri={process.env.NEXT_PUBLIC_URL}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
    >
      <div className="antialiased text-gray-800">
        <Header />
        <main className="mt-6 mb-10">
          <Component {...pageProps} />
        </main>
      </div>
    </Auth0Provider>
  )
}

//Burasi next.js için bir master page

//http://127.0.0.1:5500/

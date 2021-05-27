import '../styles/global.css'
import Header from '../components/header/header'

export default function MyApp({ Component, pageProps }) {
  return (
    <div className="antialiased text-gray-800">
      <Header />
      <main className="mt-6 mb-10">
        <Component {...pageProps} />
      </main>
    </div>
  )
}

//Burasi next.js için bir master page

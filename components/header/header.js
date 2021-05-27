import Link from 'next/link'

export default function Header() {
  return (
    <header className="site-container py-5">
      <nav className="space-x-4">
        <Link href="/">
          <a>About</a>
        </Link>
        <Link href="/posts">
          <a>Post</a>
        </Link>
      </nav>
    </header>
  )
}

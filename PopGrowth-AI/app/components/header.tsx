import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold hover:text-purple-200 transition-colors duration-300">
            PopGrowth AI
          </Link>
          <div className="space-x-6">
            <Link href="/" className="hover:text-purple-200 transition-colors duration-300">Home</Link>
            <Link href="/exponential-growth" className="hover:text-purple-200 transition-colors duration-300">Exponential Growth</Link>
            <Link href="/logistic-growth" className="hover:text-purple-200 transition-colors duration-300">Logistic Growth</Link>
            <Link href="/login" className="hover:text-purple-200 transition-colors duration-300">Login</Link>
            <Link href="/register" className="hover:text-purple-200 transition-colors duration-300">Register</Link>
          </div>
        </div>
      </nav>
    </header>
  )
}


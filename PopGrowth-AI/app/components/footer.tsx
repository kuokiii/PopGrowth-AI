import Link from 'next/link'
import { Github, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0">© 2024 - PopGrowth AI. All rights reserved. Developed by Nirupam Thapa a.k.a kuoki.</p>
          <div className="flex space-x-6">
            <Link href="https://github.com/kuokiii" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors duration-300">
              <Github size={24} />
            </Link>
            <Link href="https://instagram.com/_kuoki/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors duration-300">
              <Instagram size={24} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}


'use client'

import Link from 'next/link'
import { BookOpen } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="bg-orange-500 text-white p-2 rounded-lg">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-gray-900">EducAI</span>
          </Link>

          {/* Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="#como-funciona" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              Cómo funciona
            </Link>
            <Link href="#precios" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              Precios
            </Link>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900 font-medium hidden sm:inline">
              Iniciar sesión
            </Link>
            <Link
              href="/dashboard"
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Empezar gratis
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

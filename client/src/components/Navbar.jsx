import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAuthDropdown, setShowAuthDropdown] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800 backdrop-blur-lg bg-opacity-95 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img src="/logo.png" alt="Charity Logo" className="h-12 w-auto mr-3 transform group-hover:scale-105 transition-transform duration-300" />
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-purple-200 group-hover:from-pink-100 group-hover:to-purple-100 transition-all duration-300">
              HopeHarbor
            </span>
          </Link>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-purple-200 hover:text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-300 transition-all duration-300"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/" className="text-purple-200 hover:text-white px-3 py-2 text-sm font-medium hover:scale-105 transition-all duration-300">
              Home
            </Link>
            <Link to="/campaigns" className="text-purple-200 hover:text-white px-3 py-2 text-sm font-medium hover:scale-105 transition-all duration-300">
              Campaigns
            </Link>
            <Link to="/donate" className="relative inline-flex items-center px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-pink-600 to-purple-600 rounded-full overflow-hidden hover:from-pink-500 hover:to-purple-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <span className="absolute inset-0 bg-white/20 animate-shimmer"></span>
              <span className="relative">Donate Now</span>
            </Link>
            <Link to="/volunteer" className="text-purple-200 hover:text-white px-3 py-2 text-sm font-medium hover:scale-105 transition-all duration-300">
              Volunteer
            </Link>
            <Link to="/about" className="text-purple-200 hover:text-white px-3 py-2 text-sm font-medium hover:scale-105 transition-all duration-300">
              About Us
            </Link>
            <Link to="/contact" className="text-purple-200 hover:text-white px-3 py-2 text-sm font-medium hover:scale-105 transition-all duration-300">
              Contact
            </Link>

            {/* Search */}
            <form onSubmit={handleSearch} className="relative group">
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 px-4 py-2 text-sm text-white bg-purple-700/50 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-300 focus:bg-purple-800/50 placeholder-purple-300 transition-all duration-300"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 group-hover:scale-110 transition-transform duration-300">
                <svg className="h-5 w-5 text-purple-300 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>

            {/* Auth Button with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowAuthDropdown(!showAuthDropdown)}
                onBlur={() => setTimeout(() => setShowAuthDropdown(false), 200)}
                className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-full text-sm font-medium backdrop-blur-sm hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20 flex items-center"
              >
                <span>Account</span>
                <svg
                  className={`ml-2 h-4 w-4 transition-transform duration-200 ${showAuthDropdown ? 'transform rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {showAuthDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 z-50">
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-purple-900 hover:bg-purple-50 transition-all duration-300"
                  >
                    <div className="flex items-center">
                      <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Login
                    </div>
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 text-purple-900 hover:bg-purple-50 transition-all duration-300"
                  >
                    <div className="flex items-center">
                      <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      Register
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-purple-900/95 backdrop-blur-lg border-t border-purple-700`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link to="/" className="block px-3 py-2 text-purple-200 hover:text-white hover:bg-purple-700/50 rounded-lg text-base font-medium transition-all duration-300">
            Home
          </Link>
          <Link to="/campaigns" className="block px-3 py-2 text-purple-200 hover:text-white hover:bg-purple-700/50 rounded-lg text-base font-medium transition-all duration-300">
            Campaigns
          </Link>
          <Link to="/donate" className="block px-3 py-2 text-white bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg text-base font-medium shadow-lg">
            Donate Now
          </Link>
          <Link to="/volunteer" className="block px-3 py-2 text-purple-200 hover:text-white hover:bg-purple-700/50 rounded-lg text-base font-medium transition-all duration-300">
            Volunteer
          </Link>
          <Link to="/about" className="block px-3 py-2 text-purple-200 hover:text-white hover:bg-purple-700/50 rounded-lg text-base font-medium transition-all duration-300">
            About Us
          </Link>
          <Link to="/contact" className="block px-3 py-2 text-purple-200 hover:text-white hover:bg-purple-700/50 rounded-lg text-base font-medium transition-all duration-300">
            Contact
          </Link>

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="px-3 py-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 text-sm text-white bg-purple-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:bg-purple-800/50 placeholder-purple-300"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="h-5 w-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          {/* Mobile Auth Buttons */}
          <div className="px-3 py-2">
            <button
              onClick={() => setShowAuthDropdown(!showAuthDropdown)}
              className="w-full text-center px-3 py-2 bg-white/10 text-white rounded-lg text-base font-medium backdrop-blur-sm border border-white/20 flex items-center justify-center"
            >
              <span>Account</span>
              <svg
                className={`ml-2 h-4 w-4 transition-transform duration-200 ${showAuthDropdown ? 'transform rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showAuthDropdown && (
              <div className="mt-2 bg-white rounded-lg shadow-lg py-1">
                <Link
                  to="/login"
                  className="block px-4 py-2 text-purple-900 hover:bg-purple-50 transition-all duration-300"
                >
                  <div className="flex items-center">
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Login
                  </div>
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 text-purple-900 hover:bg-purple-50 transition-all duration-300"
                >
                  <div className="flex items-center">
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Register
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Add shimmer animation
const style = document.createElement('style');
style.textContent = `
  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
  .animate-shimmer {
    animation: shimmer 2s infinite;
  }
`;
document.head.appendChild(style);

export default Navbar;
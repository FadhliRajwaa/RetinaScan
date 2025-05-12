function Header({ title, toggleMobileMenu, isMobileMenuOpen }) {
  return (
    <header className="bg-white shadow-md p-3 sm:p-4 md:p-6 flex justify-between items-center sticky top-0 z-20">
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">{title}</h2>
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden p-1 sm:p-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
    </header>
  );
}

export default Header;
function Header({ title, toggleMobileMenu, isMobileMenuOpen }) {
  return (
    <header className="bg-white shadow-md p-4 sm:p-6 flex justify-between items-center">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">{title}</h2>
      {toggleMobileMenu && (
        <button
          className="lg:hidden p-2 rounded-md bg-gray-200 text-gray-800"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      )}
    </header>
  );
}

export default Header;
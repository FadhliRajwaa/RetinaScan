function Header({ title }) {
    return (
      <header className="bg-white shadow-md p-4">
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
      </header>
    );
  }
  
  export default Header;
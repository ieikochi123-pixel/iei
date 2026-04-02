const Navbar = () => {
  return (
    <nav className="bg-[#003366] text-white p-4 flex justify-between items-center shadow-lg">
      <div className="flex items-center gap-4">
        <img src="/iei-logo.png" alt="IEI Kochi" className="h-12" />
        <h1 className="text-[#FFCC00] font-bold text-xl">IEI Kochi Local Centre</h1>
      </div>
      <ul className="flex gap-6 font-medium">
        <li>Home</li>
        <li>About</li>
        <li>Gallery</li>
        <li className="bg-[#FFCC00] text-[#003366] px-4 py-1 rounded">Apply</li>
      </ul>
    </nav>
  );
};

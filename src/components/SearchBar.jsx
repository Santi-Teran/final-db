import { CiSearch } from "react-icons/ci";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="pb-2 pr-1">
      <div className="w-96 flex items-center justify-between py-1 px-4 rounded-full border-2 border-dark-gray shadow-1 shadow-yellow">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Escribe el nombre del libro o autor..."
          className="w-full focus:outline-none"
        />
        <CiSearch className="text-2xl text-black" />
      </div>
    </div>
  );
};

export default SearchBar;

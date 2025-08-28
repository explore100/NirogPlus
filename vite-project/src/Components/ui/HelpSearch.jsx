import { FaSearch } from "react-icons/fa";

export default function HelpSearch({ query, setQuery }) {
  return (
    <div className="flex items-center bg-gray-900/20 backdrop-blur-md shadow-lg rounded-xl px-4 py-2 mb-6 max-w-xl mx-auto">
      <FaSearch className="text-green-400 mr-3 text-xl" />
      <input
        type="text"
        placeholder="Search health topics, guides, or doctors..."
        className="w-full bg-transparent text-white placeholder-gray-700 outline-none"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}

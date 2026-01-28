import React, { useState, useCallback } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

const SearchBar = ({ onSearch, initialValue = '' }) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback((e) => {
    const newValue = e.target.value;
    setValue(newValue);
    // Debounce de búsqueda
    setTimeout(() => {
      onSearch(newValue);
    }, 500);
  }, [onSearch]);

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  return (
    <div className="relative">
      <div className="flex items-center bg-gray-800 border border-gray-700 rounded-lg overflow-hidden focus-within:border-primary transition">
        <FiSearch className="text-gray-400 ml-4 text-xl" />
        <input
          type="text"
          placeholder="Buscar personaje..."
          value={value}
          onChange={handleChange}
          className="flex-1 bg-transparent px-4 py-3 text-white placeholder-gray-400 outline-none"
        />
        {value && (
          <button
            onClick={handleClear}
            className="pr-4 text-gray-400 hover:text-white transition"
          >
            <FiX className="text-xl" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

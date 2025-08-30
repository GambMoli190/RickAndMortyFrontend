import React, { useState, useRef, useEffect } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onFiltersChange: (filters: FilterOptions) => void;
}

interface FilterOptions {
  character: 'All' | 'Starred' | 'Others';
  species: 'All' | 'Human' | 'Alien';
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  onSearchChange,
  onFiltersChange
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    character: 'All',
    species: 'All'
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown cuando se hace click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFilterToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCharacterFilter = (value: 'All' | 'Starred' | 'Others') => {
    const newFilters = { ...filters, character: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleSpeciesFilter = (value: 'All' | 'Human' | 'Alien') => {
    const newFilters = { ...filters, species: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const applyFilters = () => {
    onFiltersChange(filters);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Search Bar */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search or filter results"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent bg-white focus:bg-white transition-colors"
        />
        <div
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-md cursor-pointer transition-colors ${
            isDropdownOpen
              ? 'bg-primary-100 text-primary-700'
              : 'text-primary-600 hover:bg-primary-50 hover:text-primary-700'
          }`}
          onClick={handleFilterToggle}
        >
          <SlidersHorizontal/>
        </div>
      </div>

      {/* Dropdown Filter */}
      {isDropdownOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-6 space-y-6">
            {/* Character Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Character</h4>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleCharacterFilter('All')}
                  className={`py-3 px-4 text-sm font-medium rounded-md transition-colors ${
                    filters.character === 'All'
                      ? 'bg-purple-100 text-purple-700 border border-purple-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => handleCharacterFilter('Starred')}
                  className={`py-3 px-4 text-sm font-medium rounded-md transition-colors ${
                    filters.character === 'Starred'
                      ? 'bg-purple-100 text-purple-700 border border-purple-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  Starred
                </button>
                <button
                  onClick={() => handleCharacterFilter('Others')}
                  className={`py-3 px-4 text-sm font-medium rounded-md transition-colors ${
                    filters.character === 'Others'
                      ? 'bg-purple-100 text-purple-700 border border-purple-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  Others
                </button>
              </div>
            </div>

            {/* Species Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Species</h4>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleSpeciesFilter('All')}
                  className={`py-3 px-4 text-sm font-medium rounded-md transition-colors ${
                    filters.species === 'All'
                      ? 'bg-purple-100 text-purple-700 border border-purple-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => handleSpeciesFilter('Human')}
                  className={`py-3 px-4 text-sm font-medium rounded-md transition-colors ${
                    filters.species === 'Human'
                      ? 'bg-purple-100 text-purple-700 border border-purple-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  Human
                </button>
                <button
                  onClick={() => handleSpeciesFilter('Alien')}
                  className={`py-3 px-4 text-sm font-medium rounded-md transition-colors ${
                    filters.species === 'Alien'
                      ? 'bg-purple-100 text-purple-700 border border-purple-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  Alien
                </button>
              </div>
            </div>

            {/* Filter Button */}
            <button
              onClick={applyFilters}
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors"
            >
              Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
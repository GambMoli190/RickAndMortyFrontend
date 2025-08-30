import React, { useState, useRef, useEffect } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onFiltersChange: (filters: FilterOptions) => void;
  onSearch: () => void;
  resultsCount?: number;
  appliedFilters: FilterOptions;
}

interface FilterOptions {
  character: 'All' | 'Starred' | 'Others';
  species: 'All' | 'Human' | 'Alien';
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  onSearchChange,
  onFiltersChange,
  onSearch,
  resultsCount,
  appliedFilters
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // Eliminar localFilters - usar directamente appliedFilters

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

  // Modificar filtros directamente sin estado local
  const handleCharacterFilter = (value: 'All' | 'Starred' | 'Others') => {
    const newFilters = { ...appliedFilters, character: value };
    onFiltersChange(newFilters);
  };

  const handleSpeciesFilter = (value: 'All' | 'Human' | 'Alien') => {
    const newFilters = { ...appliedFilters, species: value };
    onFiltersChange(newFilters);
  };

  // Eliminar applyFilters - ya no es necesario porque los filtros se aplican inmediatamente

  const clearFilters = () => {
    const defaultFilters = { character: 'All' as const, species: 'All' as const };
    onFiltersChange(defaultFilters);
    setIsDropdownOpen(false);
  };

  const hasActiveFilters = appliedFilters.character !== 'All' || appliedFilters.species !== 'All';

  const getActiveFiltersCount = () => {
    let count = 0;
    if (appliedFilters.character !== 'All') count++;
    if (appliedFilters.species !== 'All') count++;
    return count;
  };

  return (
    <div className="space-y-3">
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
            onKeyPress={(e) => e.key === 'Enter' && onSearch()}
            className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent bg-white focus:bg-white transition-colors"
          />
          <div
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-md cursor-pointer transition-colors ${
              isDropdownOpen
                ? 'bg-primary-100 text-primary-700'
                : 'text-primary-600 hover:bg-primary-50 hover:text-primary-700'
            } ${hasActiveFilters ? 'bg-primary-100 text-primary-700' : ''}`}
            onClick={handleFilterToggle}
          >
            <SlidersHorizontal size={16} />
            {/* Mostrar indicador de filtros activos */}
            {hasActiveFilters && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">{getActiveFiltersCount()}</span>
              </div>
            )}
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
                      appliedFilters.character === 'All'
                        ? 'bg-purple-100 text-purple-700 border border-purple-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => handleCharacterFilter('Starred')}
                    className={`py-3 px-4 text-sm font-medium rounded-md transition-colors ${
                      appliedFilters.character === 'Starred'
                        ? 'bg-purple-100 text-purple-700 border border-purple-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
                    }`}
                  >
                    Starred
                  </button>
                  <button
                    onClick={() => handleCharacterFilter('Others')}
                    className={`py-3 px-4 text-sm font-medium rounded-md transition-colors ${
                      appliedFilters.character === 'Others'
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
                      appliedFilters.species === 'All'
                        ? 'bg-purple-100 text-purple-700 border border-purple-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => handleSpeciesFilter('Human')}
                    className={`py-3 px-4 text-sm font-medium rounded-md transition-colors ${
                      appliedFilters.species === 'Human'
                        ? 'bg-purple-100 text-purple-700 border border-purple-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
                    }`}
                  >
                    Human
                  </button>
                  <button
                    onClick={() => handleSpeciesFilter('Alien')}
                    className={`py-3 px-4 text-sm font-medium rounded-md transition-colors ${
                      appliedFilters.species === 'Alien'
                        ? 'bg-purple-100 text-purple-700 border border-purple-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
                    }`}
                  >
                    Alien
                  </button>
                </div>
              </div>

              {/* Clear Filters Button - Solo mostrar si hay filtros activos */}
              {hasActiveFilters && (
                <div>
                  <button
                    onClick={clearFilters}
                    className="w-full bg-gray-600 text-white py-3 px-4 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between text-xs text-gray-600 mt-2">
        <span>
          {resultsCount !== undefined ? `${resultsCount} Results` : ''}
        </span>
        {hasActiveFilters && (
          <div className="flex items-center gap-2">
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md">
              {getActiveFiltersCount()} Filter{getActiveFiltersCount() !== 1 ? 's' : ''}
            </span>
            <button
              onClick={clearFilters}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              title="Clear filters"
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
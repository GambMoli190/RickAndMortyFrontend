import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSidebarCharacters } from './../../hooks';
import { CharacterCard } from '../CharacterCard';
import { SearchFilter } from '../SearchFilter';
import { useFavorites } from '../../context/FavoritesContext';
import { useSelection } from '../../context/SelectionContex';

interface FilterOptions {
  character: 'All' | 'Starred' | 'Others';
  species: 'All' | 'Human' | 'Alien';
}

const CharactersList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    character: 'All',
    species: 'All'
  });

  const navigate = useNavigate();
  const { selectedCharacterId, setSelectedCharacter } = useSelection();
  const { getFavoritesList } = useFavorites();
  const { characters, loading, error } = useSidebarCharacters();

  // Función para manejar el click en un personaje
  const handleCharacterClick = (characterId: string) => {
    setSelectedCharacter(characterId);
    // En tablet/mobile, navegar al detalle
    if (window.innerWidth < 1024) { // lg breakpoint
      navigate(`/characters-detail/${characterId}`);
    }
  };

  // Obtener personajes favoritos
  const favoriteIds = getFavoritesList();
  const favoriteCharacters = characters.filter((char: any) =>
    favoriteIds.includes(char.id)
  );

  // Aplicar filtros de búsqueda y filtros avanzados
  const getFilteredCharacters = () => {
    let filtered = characters;

    // Filtro por texto de búsqueda
    if (searchTerm) {
      filtered = filtered.filter((char: any) =>
        char.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por tipo de personaje
    if (filters.character === 'Starred') {
      filtered = filtered.filter((char: any) => favoriteIds.includes(char.id));
    } else if (filters.character === 'Others') {
      filtered = filtered.filter((char: any) => !favoriteIds.includes(char.id));
    }

    // Filtro por especie
    if (filters.species !== 'All') {
      filtered = filtered.filter((char: any) =>
        char.species.toLowerCase() === filters.species.toLowerCase()
      );
    }

    return filtered;
  };

  const filteredCharacters = getFilteredCharacters();
  const displayedFavorites = favoriteCharacters.filter((char: { name: string; }) =>
    searchTerm ? char.name.toLowerCase().includes(searchTerm.toLowerCase()) : true
  );

  if (loading) return (
    <div className="w-full lg:w-96 bg-gray-50 border-r-0 lg:border-r border-gray-200 h-screen flex items-center justify-center">
      <div className="text-gray-500">Cargando personajes...</div>
    </div>
  );

  if (error) return (
    <div className="w-full lg:w-96 bg-gray-50 border-r-0 lg:border-r border-gray-200 h-screen flex items-center justify-center">
      <div className="text-red-500">Error: {error.message}</div>
    </div>
  );

  return (
    <div className="w-full lg:w-96 bg-gray-50 border-r-0 lg:border-r border-gray-200 h-screen flex flex-col">
      {/* Header */}
      <div className="p-4 pb-3">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Rick and Morty list
        </h2>

        {/* Search and Filter Component */}
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onFiltersChange={setFilters}
        />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Starred Characters - Solo mostrar si no hay filtros aplicados o si el filtro permite starred */}
        {displayedFavorites.length > 0 && filters.character !== 'Others' && (
          <div className="bg-primary-100 mb-1">
            <div className="px-4 py-2.5 border-b border-primary-200/50">
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                STARRED CHARACTERS ({displayedFavorites.length})
              </h3>
            </div>
            <div className="pb-2">
              {displayedFavorites.map((character: any) => (
                <CharacterCard
                  key={`starred-${character.id}`}
                  character={character}
                  onClick={handleCharacterClick}
                  isSelected={selectedCharacterId === character.id}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Characters - Solo mostrar si el filtro no es exclusivamente "Starred" */}
        {filters.character !== 'Starred' && (
          <div>
            <div className="px-4 py-2.5 border-b border-gray-100">
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                CHARACTERS ({filteredCharacters.length})
              </h3>
            </div>
            <div className="pb-4">
              {filteredCharacters.map((character: any) => (
                <CharacterCard
                  key={character.id}
                  character={character}
                  onClick={handleCharacterClick}
                  isSelected={selectedCharacterId === character.id}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharactersList;
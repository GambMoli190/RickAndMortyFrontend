import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCharactersWithFilters, useSidebarCharacters } from './../../hooks';
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
  const [appliedFilters, setAppliedFilters] = useState<FilterOptions>({
    character: 'All',
    species: 'All'
  });
  const [isSearchMode, setIsSearchMode] = useState(false);

  const navigate = useNavigate();
  const { selectedCharacterId, setSelectedCharacter } = useSelection();
  const { getFavoritesList } = useFavorites();

  // Hook para los primeros 15 personajes (vista por defecto)
  const { characters: defaultCharacters, loading: defaultLoading, error: defaultError } = useSidebarCharacters();

  // Hook para búsqueda con filtros
  const {
    executeSearch,
    loading: searchLoading,
    error: searchError,
    characters: searchCharacters
  } = useCharactersWithFilters();

  // Función para manejar el click en un personaje
  const handleCharacterClick = (characterId: string) => {
    setSelectedCharacter(characterId);
    if (window.innerWidth < 1024) { // lg breakpoint
      navigate(`/characters-detail/${characterId}`);
    }
  };

  // Función para manejar cambios en los filtros (ahora aplica inmediatamente)
  const handleFiltersChange = (newFilters: FilterOptions) => {
    setAppliedFilters(newFilters);

    // Ejecutar búsqueda inmediatamente con los nuevos filtros
    const hasSearchTerm = searchTerm.trim().length > 0;
    const hasFilters = newFilters.character !== 'All' || newFilters.species !== 'All';

    if (hasSearchTerm || hasFilters) {
      // Construir filtros para GraphQL
      const graphqlFilters: any = {};

      if (hasSearchTerm) {
        graphqlFilters.name = searchTerm.trim();
      }

      if (newFilters.species !== 'All') {
        graphqlFilters.species = newFilters.species;
      }

      console.log('Applying filters immediately:', graphqlFilters);
      setIsSearchMode(true);

      // Ejecutar búsqueda con useLazyQuery
      executeSearch({ variables: { filters: graphqlFilters } })
        .catch((error) => {
          console.error('Search error:', error);
        });
    } else {
      // Si no hay filtros ni búsqueda, volver a la vista por defecto
      setIsSearchMode(false);
    }
  };

  // Función para ejecutar búsqueda (ahora solo maneja búsqueda por texto)
  const handleSearch = async () => {
    const hasSearchTerm = searchTerm.trim().length > 0;
    const hasFilters = appliedFilters.character !== 'All' || appliedFilters.species !== 'All';

    if (hasSearchTerm || hasFilters) {
      // Construir filtros para GraphQL
      const graphqlFilters: any = {};

      if (hasSearchTerm) {
        graphqlFilters.name = searchTerm.trim();
      }

      if (appliedFilters.species !== 'All') {
        graphqlFilters.species = appliedFilters.species;
      }

      console.log('Searching with filters:', graphqlFilters);
      setIsSearchMode(true);
      try {
        await executeSearch({ variables: { filters: graphqlFilters } });
      } catch (error) {
        console.error('Search error:', error);
      }
    } else {
      // Si no hay filtros ni búsqueda, volver a la vista por defecto
      setIsSearchMode(false);
    }
  };

  // Auto-reset cuando no hay término de búsqueda ni filtros
  useEffect(() => {
    const hasSearchTerm = searchTerm.trim().length > 0;
    const hasFilters = appliedFilters.character !== 'All' || appliedFilters.species !== 'All';

    if (!hasSearchTerm && !hasFilters && isSearchMode) {
      setIsSearchMode(false);
    }
  }, [searchTerm, appliedFilters, isSearchMode]);

  // Obtener personajes favoritos
  const favoriteIds = getFavoritesList();

  // Determinar qué datos usar
  const getCurrentData = () => {
    if (isSearchMode) {
      return {
        characters: searchCharacters || [],
        loading: searchLoading,
        error: searchError
      };
    } else {
      return {
        characters: defaultCharacters,
        loading: defaultLoading,
        error: defaultError
      };
    }
  };

  const { characters, loading, error } = getCurrentData();

  // Filtrar personajes según el filtro de character (este filtro se aplica localmente)
  const getDisplayCharacters = () => {
    let baseCharacters = characters;

    // Siempre excluir los favoritos de la lista principal, excepto cuando el filtro es "Starred"
    if (appliedFilters.character !== 'Starred') {
      baseCharacters = characters.filter((char: any) => !favoriteIds.includes(char.id));
    }

    if (appliedFilters.character === 'Starred') {
      return characters.filter((char: any) => favoriteIds.includes(char.id));
    } else if (appliedFilters.character === 'Others') {
      return baseCharacters; // Ya están filtrados arriba
    }
    return baseCharacters;
  };

  const filteredCharacters = getDisplayCharacters();
  const favoriteCharacters = characters.filter((char: any) => favoriteIds.includes(char.id));

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
          onFiltersChange={handleFiltersChange}
          onSearch={handleSearch}
          resultsCount={isSearchMode ? filteredCharacters.length : undefined}
          appliedFilters={appliedFilters}
        />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Starred Characters - Solo mostrar si hay favoritos y el filtro lo permite */}
        {favoriteCharacters.length > 0 && appliedFilters.character !== 'Others' && (
          <div className="bg-gray-50 mb-1">
            <div className="px-4 py-2.5 border-b border-gray-200/50">
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                STARRED CHARACTERS ({favoriteCharacters.length})
              </h3>
            </div>
            <div className="pb-2">
              {favoriteCharacters.map((character: any) => (
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
        {appliedFilters.character !== 'Starred' && (
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

        {/* No results message */}
        {filteredCharacters.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <p className="text-sm mb-2">No characters found</p>
            {(searchTerm || appliedFilters.character !== 'All' || appliedFilters.species !== 'All') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setAppliedFilters({ character: 'All', species: 'All' });
                  setIsSearchMode(false);
                }}
                className="text-xs text-primary-600 hover:text-primary-700 underline"
              >
                Clear search and filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CharactersList;
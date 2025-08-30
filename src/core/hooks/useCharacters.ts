import { useQuery } from "@apollo/client/react";
import { GET_CHARACTER_BY_ID, GET_CHARACTERS_WITH_FILTERS, GET_FIRST_15_CHARACTERS } from "../services";

// Interfaces para tipear las respuestas
interface Character {
  id: string;
  name: string;
  species: string;
  status: string;
  gender: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
  image: string;
}

interface GetCharacterByIdResponse {
  character: Character;
}

interface GetCharactersWithFiltersResponse {
  characters: {
    results: Character[];
  };
}

interface GetFirst15CharactersResponse {
  characters: {
    results: Character[];
  };
}

// Tu query devuelve first15Characters directamente
interface GetFirst15CharactersResponse {
  first15Characters: Character[];
}

export const useCharacterById = (id: string | null | undefined) => {
  return useQuery<GetCharacterByIdResponse>(GET_CHARACTER_BY_ID, {
    variables: { id },
    skip: !id,
  });
};

export const useCharactersWithFilters = (filters: Record<string, any> = {}) => {
  return useQuery<GetCharactersWithFiltersResponse>(GET_CHARACTERS_WITH_FILTERS, {
    variables: { filters },
    fetchPolicy: "cache-and-network",
  });
};

interface GetFirst15CharactersResponse {
  characters: {
    results: Character[];
  };
}

export const useFirst15Characters = () => {
  return useQuery<GetFirst15CharactersResponse>(GET_FIRST_15_CHARACTERS, {
    fetchPolicy: "cache-first",
  });
};

// Hook específico para personajes del sidebar
export const useSidebarCharacters = () => {
  const { data, loading, error } = useFirst15Characters();

  return {
    // Usando la estructura correcta de tu query
    characters: data?.first15Characters || [],
    loading,
    error
  };
};

// Hook para filtrar personajes favoritos
export const useStarredCharacters = (starredIds: string[] = []) => {
  const { characters, loading, error } = useSidebarCharacters();

  const starredCharacters = characters.filter((char: Character) =>
    starredIds.includes(char.id)
  );

  return {
    starredCharacters,
    loading,
    error
  };
};
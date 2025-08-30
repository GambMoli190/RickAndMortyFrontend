import { useQuery, useLazyQuery } from "@apollo/client/react";
import { GET_CHARACTER_BY_ID, GET_CHARACTERS_WITH_FILTERS, GET_FIRST_15_CHARACTERS } from "../services";

// Interfaces para tipear las respuestas
interface Character {
  id: number;
  name: string;
  species: string;
  status: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
}

interface GetCharacterByIdResponse {
  character: Character;
}

interface GetCharactersWithFiltersResponse {
  characters: Character[];
}

interface GetFirst15CharactersResponse {
  first15Characters: Character[];
}

export const useCharacterById = (id: number | null | undefined) => {
  return useQuery<GetCharacterByIdResponse>(GET_CHARACTER_BY_ID, {
    variables: { id },
    skip: !id,
  });
};

export const useCharactersWithFilters = () => {
  const [executeSearch, { data, loading, error }] = useLazyQuery<GetCharactersWithFiltersResponse>(
    GET_CHARACTERS_WITH_FILTERS,
    {
      fetchPolicy: "cache-and-network",
    }
  );

  return {
    executeSearch,
    data,
    loading,
    error,
    characters: data?.characters || [],
    totalCount: data?.characters?.length || 0,
  };
};

export const useFirst15Characters = () => {
  return useQuery<GetFirst15CharactersResponse>(GET_FIRST_15_CHARACTERS, {
    fetchPolicy: "cache-first",
  });
};

// Hook específico para personajes del sidebar (vista por defecto)
export const useSidebarCharacters = () => {
  const { data, loading, error } = useFirst15Characters();

  return {
    characters: data?.first15Characters || [],
    loading,
    error
  };
};

// Hook para filtrar personajes favoritos
export const useStarredCharacters = (starredIds: string[] = []) => {
  const { characters, loading, error } = useSidebarCharacters();

  const starredCharacters = characters.filter((char: Character) =>
    starredIds.includes(char.id.toString())
  );

  return {
    starredCharacters,
    loading,
    error
  };
};
import { useQuery } from "@apollo/client/react";
import { GET_CHARACTER_BY_ID,  GET_CHARACTERS_WITH_FILTERS, GET_FIRST_15_CHARACTERS} from "../services";

export const useCharacterById = (id: any) => {
  return useQuery(GET_CHARACTER_BY_ID, {
    variables: { id },
    skip: !id,
  });
};

export const useCharactersWithFilters = (filters = {}) => {
  return useQuery(GET_CHARACTERS_WITH_FILTERS, {
    variables: { filters },
    fetchPolicy: "cache-and-network",
  });
};

export const useFirst15Characters = () => {
  return useQuery(GET_FIRST_15_CHARACTERS, {
    fetchPolicy: "cache-first",
  });
};

// Hook específico para personajes del sidebar
export const useSidebarCharacters = () => {
  const { data, loading, error } = useFirst15Characters();

  return {
    characters: data?.first15Characters || [],
    loading,
    error
  };
};

// Hook para filtrar personajes favoritos
export const useStarredCharacters = (starredIds = []) => {
  const { characters, loading, error } = useSidebarCharacters();

  const starredCharacters = characters.filter(char =>
    starredIds.includes(char.id)
  );

  return {
    starredCharacters,
    loading,
    error
  };
};
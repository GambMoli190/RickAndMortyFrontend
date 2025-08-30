import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface FavoritesContextType {
  favorites: Set<string>;
  toggleFavorite: (characterId: string) => void;
  isFavorite: (characterId: string) => boolean;
  getFavoritesList: () => string[];
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (characterId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(characterId)) {
        newFavorites.delete(characterId);
      } else {
        newFavorites.add(characterId);
      }
      return newFavorites;
    });
  };

  const isFavorite = (characterId: string) => {
    return favorites.has(characterId);
  };

  const getFavoritesList = () => {
    return Array.from(favorites);
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      toggleFavorite,
      isFavorite,
      getFavoritesList
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
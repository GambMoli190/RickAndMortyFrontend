import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface SelectionContextType {
  selectedCharacterId: string | null;
  setSelectedCharacter: (characterId: string | null) => void;
}

const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

interface SelectionProviderProps {
  children: ReactNode;
}

export const SelectionProvider: React.FC<SelectionProviderProps> = ({ children }) => {
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);

  const setSelectedCharacter = (characterId: string | null) => {
    setSelectedCharacterId(characterId);
  };

  return (
    <SelectionContext.Provider value={{
      selectedCharacterId,
      setSelectedCharacter
    }}>
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => {
  const context = useContext(SelectionContext);
  if (context === undefined) {
    throw new Error('useSelection must be used within a SelectionProvider');
  }
  return context;
};
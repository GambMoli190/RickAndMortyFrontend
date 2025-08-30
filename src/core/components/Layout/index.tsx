import React from 'react';
import { useLocation } from 'react-router-dom';
import CharactersList from '../CharactersList';
import { CharacterDetail } from '../CharacterDetail';
import { useSelection } from '../../context/SelectionContex';
import { useSidebarCharacters } from '../../hooks';

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { selectedCharacterId } = useSelection();
  const { characters } = useSidebarCharacters();
  const location = useLocation();

  // Encontrar el personaje seleccionado
  const selectedCharacter = characters.find((char: any) => char.id === selectedCharacterId) || null;

  // Determinar si estamos en vista de detalle en mobile
  const isDetailView = location.pathname.includes('/characters-detail/');

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Oculto en tablet/mobile cuando estamos en detail view */}
      <div className={`${isDetailView ? 'hidden lg:block' : 'block'} w-full lg:w-96`}>
        <CharactersList />
      </div>

      {/* Main Content Area - Oculto en tablet/mobile cuando NO estamos en detail view */}
      <div className={`${!isDetailView ? 'hidden lg:flex' : 'flex'} flex-1 flex-col overflow-hidden`}>
        <CharacterDetail character={selectedCharacter} showBackButton={isDetailView} />
        {children}
      </div>
    </div>
  );
};
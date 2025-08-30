import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ArrowLeft } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';

interface Character {
  id: string | number;
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

interface CharacterDetailProps {
  character: Character | null;
  showBackButton?: boolean;
}

export const CharacterDetail: React.FC<CharacterDetailProps> = ({
  character,
  showBackButton = false
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/characters-general');
  };

  if (!character) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-gray-400 mb-2">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-600 mb-1">No character selected</h3>
          <p className="text-sm text-gray-400">Select a character from the list to view details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white overflow-y-auto">
      <div className="px-4 lg:px-[10rem] pt-[2rem]">
        {/* Back Button - Visible en tablet y mobile, arriba de la imagen */}
        {showBackButton && (
          <div className="lg:hidden mb-4">
            <button
              onClick={handleBack}
              className="p-2 text-primary-700 hover:text-primary-800 transition-colors duration-150"
              aria-label="Volver a la lista"
            >
              <ArrowLeft size={24} />
            </button>
          </div>
        )}
        {/* Character Image with Favorite Heart */}
        <div className="relative mb-6 inline-block">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 shadow-lg">
            <img
              src={character.image}
              alt={character.name}
              className="w-full h-full object-cover"
            />
          </div>

          <button
            aria-label={`Toggle favorite for ${character.name}`}
            onClick={() => toggleFavorite(character.id.toString())}
            className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-150 border border-gray-200"
          >
            <Heart
              size={18}
              className={
                isFavorite(character.id.toString())
                  ? "fill-green-500 text-green-500"
                  : "text-gray-400 hover:text-gray-600"
              }
            />
          </button>
        </div>

        {/* Character Name */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {character.name}
          </h1>
        </div>

        {/* Character Info with separators */}
        <div className="space-y-0">
          <div className="py-4 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-1">
              Specie
            </h3>
            <p className="text-gray-600">
              {character.species}
            </p>
          </div>

          <div className="py-4 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-1">
              Status
            </h3>
            <p className="text-gray-600">
              {character.status}
            </p>
          </div>

          <div className="py-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-1">
              Occupation
            </h3>
            <p className="text-gray-600">
              {character.location?.name || 'Unknown'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
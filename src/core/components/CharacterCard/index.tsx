import { Heart } from "lucide-react";
import { useFavorites } from "../../context/FavoritesContext";

interface Character {
  id: string;
  name: string;
  species: string;
  image: string;
}

interface CharacterCardProps {
  character: Character;
  onClick?: (id: string) => void;
  isSelected?: boolean;
}

export const CharacterCard = ({ character, onClick, isSelected }: CharacterCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <div
      className={`flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-all duration-150 cursor-pointer ${
        isSelected
          ? 'bg-primary-100 border-r-2 border-primary-600'
          : 'hover:bg-gray-50'
      }`}
      onClick={() => onClick?.(character.id)}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
          <img
            src={character.image}
            alt={character.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className={`font-medium text-sm truncate leading-tight ${
            isSelected ? 'text-primary-700' : 'text-gray-900'
          }`}>
            {character.name}
          </div>
          <div className={`text-xs mt-0.5 ${
            isSelected ? 'text-primary-600' : 'text-gray-500'
          }`}>
            {character.species}
          </div>
        </div>
      </div>
      <button
        aria-label={`Toggle favorite for ${character.name}`}
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(character.id);
        }}
        className="p-1.5 hover:bg-gray-100 rounded-full transition-colors duration-150 flex-shrink-0 ml-2"
      >
        <Heart
          size={16}
          className={
            isFavorite(character.id)
              ? "fill-secondary-600 text-secondary-600"
              : "text-gray-400 hover:text-gray-600"
          }
        />
      </button>
    </div>
  );
};
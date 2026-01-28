import React from 'react';
import { FiHeart } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const FavoriteButton = ({ characterId, characterName, characterImage, isFavorite, onToggle }) => {
  const { isAuthenticated } = useAuth();

  const handleClick = () => {
    if (!isAuthenticated) {
      alert('Debes estar registrado para guardar favoritos');
      return;
    }
    onToggle(characterId, characterName, characterImage);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition transform hover:scale-105 ${
        isFavorite
          ? 'bg-red-600 hover:bg-red-700 text-white'
          : 'bg-gray-800 border border-gray-700 hover:border-primary text-white'
      }`}
    >
      <FiHeart fill={isFavorite ? 'currentColor' : 'none'} className="text-xl" />
      {isFavorite ? 'Eliminado de favoritos' : 'Añadir a favoritos'}
    </button>
  );
};

export default FavoriteButton;

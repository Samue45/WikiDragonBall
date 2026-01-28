import React from 'react';
import CharacterList from '../characters/CharacterList';

const FavoritesList = ({ favorites, loading, onRemoveFavorite }) => {
  const handleToggleFavorite = (characterId) => {
    onRemoveFavorite(characterId);
  };

  return (
    <CharacterList
      characters={favorites}
      loading={loading}
      isFavorites={true}
      onToggleFavorite={handleToggleFavorite}
    />
  );
};

export default FavoritesList;

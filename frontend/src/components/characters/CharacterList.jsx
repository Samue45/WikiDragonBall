import React from 'react';
import CharacterCard from './CharacterCard';
import Loading from '../common/Loading';

const CharacterList = ({ characters, loading, isFavorites, onToggleFavorite }) => {
  if (loading) {
    return <Loading />;
  }

  if (characters.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-xl">
          {isFavorites ? 'No tienes favoritos aún' : 'No se encontraron personajes'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          isFavorite={character.isFavorite || false}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default CharacterList;

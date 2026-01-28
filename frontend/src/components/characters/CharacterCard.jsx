import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHeart, FiShare2 } from 'react-icons/fi';
import FavoriteButton from '../favorites/FavoriteButton';

const CharacterCard = ({ character, isFavorite, onToggleFavorite }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-primary transition transform hover:scale-105 cursor-pointer group"
      onClick={() => navigate(`/character/${character.id}`)}
    >
      {/* Imagen */}
      <div className="relative overflow-hidden h-64 bg-gray-900">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
          }}
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition"></div>
      </div>

      {/* Contenido */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-primary mb-2 truncate">{character.name}</h3>

        <div className="space-y-2 text-sm text-gray-300 mb-4">
          {character.race && (
            <div className="flex justify-between">
              <span className="text-gray-400">Raza:</span>
              <span className="font-semibold">{character.race}</span>
            </div>
          )}
          {character.gender && (
            <div className="flex justify-between">
              <span className="text-gray-400">Género:</span>
              <span className="font-semibold">{character.gender}</span>
            </div>
          )}
          {character.ki && (
            <div className="flex justify-between">
              <span className="text-gray-400">Ki:</span>
              <span className="font-semibold text-secondary">{character.ki}</span>
            </div>
          )}
        </div>

        {/* Botones */}
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(character.id, character.name, character.image);
            }}
            className={`flex-1 py-2 px-3 rounded font-semibold transition flex items-center justify-center gap-2 ${
              isFavorite
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-100'
            }`}
          >
            <FiHeart fill={isFavorite ? 'currentColor' : 'none'} />
            {isFavorite ? 'Favorito' : 'Guardar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;

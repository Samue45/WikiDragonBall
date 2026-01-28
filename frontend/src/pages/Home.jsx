import React, { useState, useEffect } from 'react';
import SearchBar from '../components/characters/SearchBar';
import CharacterList from '../components/characters/CharacterList';
import Pagination from '../components/characters/Pagination';
import ErrorMessage from '../components/common/ErrorMessage';
import * as charactersService from '../services/charactersService';
import * as favoritesService from '../services/favoritesService';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const { isAuthenticated } = useAuth();

  const ITEMS_PER_PAGE = 10;

  // Cargar personajes
  const loadCharacters = async (pageNum = 1, search = '') => {
    setLoading(true);
    setError(null);
    try {
      const data = await charactersService.getCharacters(pageNum, ITEMS_PER_PAGE, search);
      const items = data.items || [];
      
      // Marcar favoritos
      if (isAuthenticated) {
        const fav = await favoritesService.getFavorites();
        const favIds = fav.map((f) => f.character_id);
        const itemsWithFav = items.map((char) => ({
          ...char,
          isFavorite: favIds.includes(char.id),
        }));
        setCharacters(itemsWithFav);
        setFavorites(favIds);
      } else {
        setCharacters(items);
      }

      setPage(pageNum);
      setTotalPages(data.meta?.totalPages || 1);
    } catch (err) {
      setError('Error al cargar los personajes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Cargar personajes al montar
  useEffect(() => {
    loadCharacters(1, searchTerm);
  }, [searchTerm, isAuthenticated]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    loadCharacters(newPage, searchTerm);
  };

  const handleToggleFavorite = async (characterId, characterName, characterImage) => {
    if (!isAuthenticated) {
      alert('Debes estar registrado para guardar favoritos');
      return;
    }

    try {
      if (favorites.includes(characterId)) {
        await favoritesService.removeFavorite(characterId);
        setFavorites(favorites.filter((id) => id !== characterId));
      } else {
        await favoritesService.addFavorite(characterId, characterName, characterImage);
        setFavorites([...favorites, characterId]);
      }

      // Actualizar lista
      setCharacters(
        characters.map((char) =>
          char.id === characterId
            ? { ...char, isFavorite: !char.isFavorite }
            : char
        )
      );
    } catch (err) {
      setError('Error al actualizar favoritos');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Personajes de Dragon Ball 🐉
          </h1>
          <p className="text-gray-400 text-lg">
            Explora todos los personajes, guarda tus favoritos y deja comentarios
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Error */}
        {error && <ErrorMessage message={error} onClose={() => setError(null)} />}

        {/* Characters */}
        <CharacterList
          characters={characters}
          loading={loading}
          onToggleFavorite={handleToggleFavorite}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default Home;

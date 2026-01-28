import React, { useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import FavoritesList from '../components/favorites/FavoritesList';
import ErrorMessage from '../components/common/ErrorMessage';
import * as favoritesService from '../services/favoritesService';
import { useAuth } from '../context/AuthContext';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const data = await favoritesService.getFavorites();
        setFavorites(data);
      } catch (err) {
        setError('Error al cargar los favoritos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [isAuthenticated, navigate]);

  const handleRemoveFavorite = async (characterId) => {
    try {
      await favoritesService.removeFavorite(characterId);
      setFavorites(favorites.filter((fav) => fav.character_id !== parseInt(characterId)));
    } catch (err) {
      setError('Error al eliminar de favoritos');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-primary hover:text-secondary transition"
          >
            <FiArrowLeft />
          </button>
          <h1 className="text-4xl font-bold text-primary">Mis Favoritos ❤️</h1>
        </div>

        {/* Error */}
        {error && <ErrorMessage message={error} onClose={() => setError(null)} />}

        {/* Favorites List */}
        <FavoritesList
          favorites={favorites}
          loading={loading}
          onRemoveFavorite={handleRemoveFavorite}
        />
      </div>
    </div>
  );
};

export default FavoritesPage;

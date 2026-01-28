import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import FavoriteButton from '../components/favorites/FavoriteButton';
import CommentForm from '../components/comments/CommentForm';
import CommentList from '../components/comments/CommentList';
import * as charactersService from '../services/charactersService';
import * as commentsService from '../services/commentsService';
import * as favoritesService from '../services/favoritesService';
import { useAuth } from '../context/AuthContext';

const CharacterDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [character, setCharacter] = useState(null);
  const [comments, setComments] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Cargar personaje
        const charData = await charactersService.getCharacterById(id);
        setCharacter(charData);

        // Cargar comentarios
        const commentsData = await commentsService.getCommentsByCharacter(id);
        setComments(commentsData);

        // Verificar si es favorito
        if (isAuthenticated) {
          const isFav = await favoritesService.isFavorite(id);
          setIsFavorite(isFav);
        }
      } catch (err) {
        setError('Error al cargar el personaje');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isAuthenticated]);

  const handleToggleFavorite = async (characterId, characterName, characterImage) => {
    try {
      if (isFavorite) {
        await favoritesService.removeFavorite(characterId);
        setIsFavorite(false);
      } else {
        await favoritesService.addFavorite(characterId, characterName, characterImage);
        setIsFavorite(true);
      }
    } catch (err) {
      setError('Error al actualizar favoritos');
      console.error(err);
    }
  };

  const handleAddComment = async (data) => {
    try {
      const response = await commentsService.addComment(
        id,
        character.name,
        data.comment,
        data.rating
      );
      
      // Agregar el nuevo comentario a la lista
      setComments([
        {
          id: response.data.id,
          ...data,
          character_id: id,
          character_name: character.name,
          username: user.username,
          user_id: user.id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        ...comments,
      ]);
    } catch (err) {
      setError('Error al publicar el comentario');
      console.error(err);
    }
  };

  const handleEditComment = async (commentId, comment, rating) => {
    try {
      await commentsService.updateComment(commentId, comment, rating);
      
      setComments(
        comments.map((c) =>
          c.id === commentId
            ? { ...c, comment, rating, updated_at: new Date().toISOString() }
            : c
        )
      );
    } catch (err) {
      setError('Error al actualizar el comentario');
      console.error(err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await commentsService.deleteComment(commentId);
      setComments(comments.filter((c) => c.id !== commentId));
    } catch (err) {
      setError('Error al eliminar el comentario');
      console.error(err);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!character) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 bg-primary hover:bg-secondary text-white px-6 py-3 rounded-lg transition"
        >
          <FiArrowLeft /> Volver
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-primary hover:text-secondary transition mb-8"
        >
          <FiArrowLeft /> Volver
        </button>

        {/* Error */}
        {error && <ErrorMessage message={error} onClose={() => setError(null)} />}

        {/* Character Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Imagen */}
          <div className="md:col-span-1">
            <img
              src={character.image}
              alt={character.name}
              className="w-full rounded-lg border-2 border-primary shadow-lg"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
              }}
            />
          </div>

          {/* Detalles */}
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold text-primary mb-4">{character.name}</h1>

            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
              <div className="space-y-4">
                {character.race && (
                  <div>
                    <h4 className="text-gray-400 text-sm font-semibold">Raza</h4>
                    <p className="text-white text-lg">{character.race}</p>
                  </div>
                )}
                {character.gender && (
                  <div>
                    <h4 className="text-gray-400 text-sm font-semibold">Género</h4>
                    <p className="text-white text-lg">{character.gender}</p>
                  </div>
                )}
                {character.ki && (
                  <div>
                    <h4 className="text-gray-400 text-sm font-semibold">Ki</h4>
                    <p className="text-secondary text-lg font-bold">{character.ki}</p>
                  </div>
                )}
                {character.maxKi && (
                  <div>
                    <h4 className="text-gray-400 text-sm font-semibold">Ki Máximo</h4>
                    <p className="text-secondary text-lg font-bold">{character.maxKi}</p>
                  </div>
                )}
                {character.affiliation && (
                  <div>
                    <h4 className="text-gray-400 text-sm font-semibold">Afiliación</h4>
                    <p className="text-white text-lg">{character.affiliation}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Favorite Button */}
            <FavoriteButton
              characterId={character.id}
              characterName={character.name}
              characterImage={character.image}
              isFavorite={isFavorite}
              onToggle={handleToggleFavorite}
            />
          </div>
        </div>

        {/* Description */}
        {character.description && (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Descripción</h2>
            <p className="text-gray-300 leading-relaxed">{character.description}</p>
          </div>
        )}

        {/* Comments Section */}
        <div className="mb-8">
          <CommentForm
            characterId={parseInt(id)}
            characterName={character.name}
            onSubmit={handleAddComment}
          />

          <CommentList
            comments={comments}
            userId={user?.id}
            isAdmin={user?.role === 'admin'}
            onEdit={handleEditComment}
            onDelete={handleDeleteComment}
          />
        </div>
      </div>
    </div>
  );
};

export default CharacterDetailPage;

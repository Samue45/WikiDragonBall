import React, { useState } from 'react';
import StarRating from './StarRating';
import { useAuth } from '../../context/AuthContext';

const CommentForm = ({ characterId, characterName, onSubmit }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim() || rating === 0) {
      alert('Por favor completa el comentario y selecciona una calificación');
      return;
    }

    setLoading(true);
    try {
      await onSubmit({ comment, rating });
      setComment('');
      setRating(0);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
        <p className="text-gray-400 mb-4">Debes estar registrado para comentar</p>
        <a
          href="/login"
          className="inline-block bg-primary hover:bg-secondary text-white px-6 py-2 rounded transition"
        >
          Iniciar sesión
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-8">
      <h3 className="text-xl font-bold text-primary mb-4">Dejar un comentario</h3>

      <div className="mb-4">
        <label className="block text-gray-300 font-semibold mb-2">Calificación</label>
        <StarRating rating={rating} onRatingChange={setRating} />
      </div>

      <div className="mb-4">
        <label className="block text-gray-300 font-semibold mb-2">
          Comentario ({comment.length}/500)
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value.slice(0, 500))}
          placeholder="Comparte tu opinión sobre este personaje..."
          className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-3 focus:border-primary outline-none transition resize-none"
          rows="4"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg transition disabled:opacity-50"
      >
        {loading ? 'Publicando...' : 'Publicar comentario'}
      </button>
    </form>
  );
};

export default CommentForm;

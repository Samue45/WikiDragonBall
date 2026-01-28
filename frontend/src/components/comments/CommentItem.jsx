import React, { useState } from 'react';
import { FiTrash2, FiEdit2, FiCheck, FiX } from 'react-icons/fi';
import StarRating from './StarRating';
import { useAuth } from '../../context/AuthContext';

const CommentItem = ({ comment, isOwner, isAdmin, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.comment);
  const [editRating, setEditRating] = useState(comment.rating);
  const [loading, setLoading] = useState(false);

  const handleEdit = async () => {
    setLoading(true);
    try {
      await onEdit(comment.id, editText, editRating);
      setIsEditing(false);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
      try {
        await onDelete(comment.id);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const date = new Date(comment.created_at).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-4">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="text-primary font-bold">{comment.username}</h4>
          <p className="text-gray-400 text-sm">{date}</p>
        </div>
        <div className="flex gap-2">
          {isOwner && (
            <>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-secondary hover:text-primary transition"
                title="Editar"
              >
                <FiEdit2 />
              </button>
              <button
                onClick={handleDelete}
                className="text-red-400 hover:text-red-500 transition"
                title="Eliminar"
              >
                <FiTrash2 />
              </button>
            </>
          )}
          {isAdmin && !isOwner && (
            <button
              onClick={handleDelete}
              className="text-red-400 hover:text-red-500 transition"
              title="Eliminar (Admin)"
            >
              <FiTrash2 />
            </button>
          )}
        </div>
      </div>

      {/* Rating */}
      <div className="mb-3">
        <StarRating rating={isEditing ? editRating : comment.rating} onRatingChange={isEditing ? setEditRating : undefined} readOnly={!isEditing} />
      </div>

      {/* Contenido */}
      {isEditing ? (
        <div className="space-y-3">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value.slice(0, 500))}
            className="w-full bg-gray-700 border border-gray-600 text-white rounded p-2 focus:border-primary outline-none resize-none"
            rows="3"
          />
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              disabled={loading}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition disabled:opacity-50"
            >
              <FiCheck /> Guardar
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditText(comment.comment);
                setEditRating(comment.rating);
              }}
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
            >
              <FiX /> Cancelar
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-200">{comment.comment}</p>
      )}

      {comment.updated_at && comment.updated_at !== comment.created_at && (
        <p className="text-gray-500 text-xs mt-2">Editado</p>
      )}
    </div>
  );
};

export default CommentItem;

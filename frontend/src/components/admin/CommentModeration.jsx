import React, { useState, useEffect } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import * as adminService from '../../services/adminService';

const CommentModeration = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const data = await adminService.getComments();
      setComments(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (id) => {
    if (confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
      try {
        await adminService.deleteCommentAdmin(id);
        setComments(comments.filter((c) => c.id !== id));
      } catch (error) {
        console.error('Error:', error);
        alert('Error al eliminar el comentario');
      }
    }
  };

  const filteredComments = comments.filter((c) =>
    c.character_name.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) {
    return <div className="text-center text-gray-400">Cargando comentarios...</div>;
  }

  return (
    <div>
      <h3 className="text-2xl font-bold text-primary mb-6">Moderación de Comentarios</h3>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Filtrar por personaje..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:border-primary outline-none"
        />
      </div>

      {filteredComments.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No hay comentarios</p>
      ) : (
        <div className="space-y-4">
          {filteredComments.map((comment) => (
            <div key={comment.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-primary font-bold">{comment.username}</p>
                  <p className="text-gray-400 text-sm">
                    {comment.character_name} • {new Date(comment.created_at).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="text-red-400 hover:text-red-500 transition"
                >
                  <FiTrash2 className="text-xl" />
                </button>
              </div>

              <div className="flex items-center gap-4 mb-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${i < comment.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-gray-400">{comment.rating}/5</span>
              </div>

              <p className="text-gray-200">{comment.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentModeration;

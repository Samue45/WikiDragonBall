import React, { useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/common/ErrorMessage';
import * as adminService from '../services/adminService';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await adminService.getUserStats();
        setStats(data);
      } catch (err) {
        setError('Error al cargar estadísticas');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-primary hover:text-secondary transition"
          >
            <FiArrowLeft /> Volver
          </button>
        </div>

        {error && <ErrorMessage message={error} onClose={() => setError(null)} />}

        {/* Profile Card */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">{user?.username}</h1>
          <p className="text-gray-400 text-lg mb-4">{user?.email}</p>
          <div className="inline-block bg-secondary text-white px-4 py-2 rounded-lg font-semibold">
            {user?.role === 'admin' ? '👑 Administrador' : '👤 Usuario'}
          </div>
        </div>

        {/* Statistics */}
        {!loading && stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
              <p className="text-gray-400 text-sm font-semibold mb-2">FAVORITOS</p>
              <p className="text-4xl font-bold text-primary">{stats.totalFavorites}</p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
              <p className="text-gray-400 text-sm font-semibold mb-2">COMENTARIOS</p>
              <p className="text-4xl font-bold text-secondary">{stats.totalComments}</p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
              <p className="text-gray-400 text-sm font-semibold mb-2">PUNTUACIÓN PROMEDIO</p>
              <p className="text-4xl font-bold text-yellow-400">{stats.avgRating.toFixed(1)} ⭐</p>
            </div>
          </div>
        )}

        {loading && (
          <div className="text-center text-gray-400">
            <p>Cargando estadísticas...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

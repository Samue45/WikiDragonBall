import React, { useState, useEffect } from 'react';
import * as adminService from '../../services/adminService';

const AdminStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await adminService.getStats();
        setStats(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-400">Cargando estadísticas...</div>;
  }

  if (!stats) {
    return <div className="text-center text-gray-400">Error al cargar estadísticas</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
        <p className="text-gray-400 text-sm font-semibold mb-2">USUARIOS REGISTRADOS</p>
        <p className="text-4xl font-bold text-primary">{stats.totalUsers}</p>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
        <p className="text-gray-400 text-sm font-semibold mb-2">COMENTARIOS TOTALES</p>
        <p className="text-4xl font-bold text-secondary">{stats.totalComments}</p>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
        <p className="text-gray-400 text-sm font-semibold mb-2">PERSONAJE MÁS COMENTADO</p>
        <p className="text-2xl font-bold text-primary">
          {stats.topCharacter ? stats.topCharacter.name : 'N/A'}
        </p>
        {stats.topCharacter && (
          <p className="text-gray-400 text-sm">{stats.topCharacter.commentCount} comentarios</p>
        )}
      </div>
    </div>
  );
};

export default AdminStats;

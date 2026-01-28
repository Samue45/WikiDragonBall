import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import AdminStats from '../components/admin/AdminStats';
import CommentModeration from '../components/admin/CommentModeration';

const AdminPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('stats');

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-primary hover:text-secondary transition"
          >
            <FiArrowLeft /> Volver
          </button>
          <h1 className="text-4xl font-bold text-primary">Panel de Administración 🔐</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-6 py-3 font-semibold transition border-b-2 ${
              activeTab === 'stats'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Estadísticas
          </button>
          <button
            onClick={() => setActiveTab('comments')}
            className={`px-6 py-3 font-semibold transition border-b-2 ${
              activeTab === 'comments'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Moderación
          </button>
        </div>

        {/* Content */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8">
          {activeTab === 'stats' && <AdminStats />}
          {activeTab === 'comments' && <CommentModeration />}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

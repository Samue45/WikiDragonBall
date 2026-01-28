import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiLogOut, FiUser, FiHome, FiHeart, FiLock } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="bg-gray-900 border-b-2 border-primary shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary hover:text-secondary transition">
            <span className="text-3xl">🐉</span>
            <span>DragonBall Wiki</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 text-white hover:text-primary transition">
              <FiHome /> Inicio
            </Link>

            {isAuthenticated && (
              <>
                <Link to="/favorites" className="flex items-center gap-2 text-white hover:text-primary transition">
                  <FiHeart /> Favoritos
                </Link>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="flex items-center gap-2 text-white hover:text-primary transition">
                    <FiLock /> Admin
                  </Link>
                )}
              </>
            )}

            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="flex items-center gap-2 text-white hover:text-primary transition">
                    <FiUser /> {user?.username}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
                  >
                    <FiLogOut /> Salir
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-white hover:text-primary transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded transition"
                  >
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white text-2xl"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-gray-800 border-t border-primary py-4 space-y-2">
            <Link
              to="/"
              className="block text-white hover:text-primary transition px-4 py-2"
              onClick={() => setIsOpen(false)}
            >
              Inicio
            </Link>

            {isAuthenticated && (
              <>
                <Link
                  to="/favorites"
                  className="block text-white hover:text-primary transition px-4 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Favoritos
                </Link>
                <Link
                  to="/profile"
                  className="block text-white hover:text-primary transition px-4 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Perfil
                </Link>
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="block text-white hover:text-primary transition px-4 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Panel Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-red-400 hover:text-red-300 transition px-4 py-2"
                >
                  Salir
                </button>
              </>
            )}

            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className="block text-white hover:text-primary transition px-4 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block text-white hover:text-primary transition px-4 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

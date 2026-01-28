import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-primary mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-primary font-bold text-lg mb-4">Dragon Ball Wiki</h3>
            <p className="text-gray-400">
              Aplicación fullstack para explorar y comentar sobre personajes de Dragon Ball.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Enlaces</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-primary transition">Inicio</a></li>
              <li><a href="/favorites" className="hover:text-primary transition">Favoritos</a></li>
              <li><a href="https://dragonball-api.com" target="_blank" rel="noreferrer" className="hover:text-primary transition">API Dragon Ball</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Tecnologías</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>React 18 + Vite</li>
              <li>Node.js + Express</li>
              <li>SQLite + JWT</li>
              <li>TailwindCSS</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>© 2026 Dragon Ball Wiki. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

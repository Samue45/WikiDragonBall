// Constantes de la aplicación
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
export const APP_NAME = 'Dragon Ball Wiki';
export const ITEMS_PER_PAGE = 10;

// Colores
export const COLORS = {
  primary: '#FF6B35',
  secondary: '#4ECDC4',
  dark: '#1a1a1a',
  gray: {
    900: '#111827',
    800: '#1f2937',
    700: '#374151',
    600: '#4b5563',
    400: '#9ca3af',
  },
};

// Mensajes
export const MESSAGES = {
  loading: 'Cargando...',
  error: 'Ocurrió un error',
  success: '¡Operación exitosa!',
  login_required: 'Debes estar registrado para continuar',
};

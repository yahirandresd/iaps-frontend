/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        azul:           '#1565C0',
        'azul-suave':   '#E3F2FD',
        'azul-oscuro':  '#0D47A1',
        verde:          '#2E7D32',
        'verde-suave':  '#E8F5E9',
        'verde-oscuro': '#1B5E20',
        naranja:        '#F57C00',
        'naranja-suave':'#FFF3E0',
        rojo:           '#D32F2F',
        'rojo-suave':   '#FFEBEE',
        'gris-fondo':   '#F5F7FA',
        'gris-borde':   '#E5E9F0',
        'gris-texto':   '#6B7280',
        texto:          '#1A1A2E',
      },
      borderRadius: {
        sm: '12px',
        md: '16px',
        lg: '20px',
        xl: '28px',
      },
      boxShadow: {
        sm:  '0 2px 6px rgba(16,24,40,.06)',
        md:  '0 4px 12px rgba(16,24,40,.08)',
        lg:  '0 12px 28px rgba(16,24,40,.12)',
        fab: '0 8px 20px rgba(13,71,161,.35)',
      },
      maxWidth: {
        app:     '480px',
        desktop: '1100px',
      },
      keyframes: {
        fade: {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        pop: {
          '0%':   { transform: 'scale(.3)', opacity: '0' },
          '100%': { transform: 'scale(1)',  opacity: '1' },
        },
      },
      animation: {
        fade: 'fade .28s ease both',
        pop:  'pop .4s cubic-bezier(.2,1.3,.4,1) both',
      },
    },
  },
  plugins: [],
}

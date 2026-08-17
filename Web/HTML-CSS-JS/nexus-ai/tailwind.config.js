module.exports = {
  content: ['./index.html', './src/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        nexus: {
          bg: '#080808',
          panel: '#0d0d0d',
          card: '#111111',
          border: 'rgba(255,255,255,0.08)',
          primary: '#ff6a00',
          primaryHover: '#ff7a1a',
          text: '#ffffff',
          muted: '#a3a3a3',
          soft: '#737373'
        }
      }
    }
  },
  plugins: []
};

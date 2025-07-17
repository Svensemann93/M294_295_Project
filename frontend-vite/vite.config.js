import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/* https://vitejs.dev/config/
dieses Vite-Konfigurationsfile ist für die React-Anwendung im Frontend-Verzeichnis
verantwortlich. Es definiert die Plugins und Testumgebung für die Anwendung.
Das Plugin 'react' ermöglicht die Verwendung von React in der Vite-Anwendung.*/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js'
  }
});
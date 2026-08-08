import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const cvPath = '/Zulfahmi_M_Ardianto_Resume_ID.pdf'

const inlineCvPlugin = () => {
  const setInlineHeader = (server) => {
    server.middlewares.use((req, res, next) => {
      if (req.url?.split('?')[0] === cvPath) {
        res.setHeader('Content-Disposition', 'inline; filename="Zulfahmi_M_Ardianto_Resume_ID.pdf"')
      }
      next()
    })
  }

  return {
    name: 'inline-cv-header',
    configureServer: setInlineHeader,
    configurePreviewServer: setInlineHeader,
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), inlineCvPlugin()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          animation: ['gsap', 'motion'],
          icons: ['react-icons']
        }
      }
    },
    chunkSizeWarningLimit: 500
  }
})

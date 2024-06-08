import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dns from 'node:dns'  

// https://vitejs.dev/config/
dns.setDefaultResultOrder('verbatim')  
export default defineConfig({
  server: {  
    port: 3000, 
  }, 
  plugins: [react()],
})

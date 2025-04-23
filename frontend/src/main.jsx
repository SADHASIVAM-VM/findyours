import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ContextApp } from './controller/ContextController.jsx'

createRoot(document.getElementById('root')).render(
  <ContextApp>
    <App />
  </ContextApp>
)

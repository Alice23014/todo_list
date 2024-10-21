import { createRoot } from 'react-dom/client'
import { App } from './views/App'
import './views/styles/common.scss';
import './views/styles/reset.scss'

createRoot(document.getElementById('root')!).render(
    <App />
)

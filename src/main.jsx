import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ThemeProvider } from '@/lib/theme'
import { BASE_PATH } from '@/data/site'
import './styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      {/*
        The site is served from a sub-path on GitHub Pages. Without a matching
        basename the router compares location.pathname ("/portfolio/pricing")
        against route paths written at the root ("/pricing"), matches nothing,
        and renders the 404 for every URL including the homepage. basename
        strips the prefix before matching and re-adds it when building hrefs,
        which is why <Link to> stays root-relative everywhere else.
      */}
      <BrowserRouter basename={BASE_PATH || undefined}>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)

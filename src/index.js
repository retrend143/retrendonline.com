import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

// Add a style tag to completely disable hover effects
const disableHoverEffects = document.createElement('style');
disableHoverEffects.innerHTML = `
  .mdb-navbar button, 
  .mdb-navbar a, 
  .mdb-navbar .btn, 
  .mdb-navbar [class*="button"], 
  .mdb-navbar [class*="Button"] {
    pointer-events: auto !important;
    transition: none !important;
  }

  .mdb-navbar button:hover, 
  .mdb-navbar a:hover, 
  .mdb-navbar .btn:hover, 
  .mdb-navbar [class*="button"]:hover, 
  .mdb-navbar [class*="Button"]:hover {
    opacity: 1 !important;
    background-color: transparent !important;
    background-image: none !important;
    color: inherit !important;
    text-decoration: none !important;
    box-shadow: none !important;
  }
`;
document.head.appendChild(disableHoverEffects);

// 2. Extend the theme to include custom colors, fonts, etc
const theme = extendTheme({
  fonts: {
    heading: `'Bebas Neue', sans-serif`,
    body: `'Nunito', sans-serif`,
    // Optionally, you can define an accent font:
    accent: `'Pacifico', cursive`,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

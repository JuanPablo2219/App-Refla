import React from 'react'
import ReactDOM from 'react-dom/client'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import SearchComponent from './components/SerchDats.jsx';
        

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SearchComponent />
  </React.StrictMode>,
)

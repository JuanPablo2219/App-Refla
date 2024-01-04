import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import '../styles/SearchDats.css';
import axios from 'axios';
import { ProgressSpinner } from 'primereact/progressspinner';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const [loading, setLoading] = useState(false);

  const isNumeric = (value) => !isNaN(parseFloat(value)) && isFinite(value);

  const handleInputChange = (e) => {
    // Filtrar caracteres especiales usando una expresión regular
    const inputValue = e.target.value.replace(/[^\w\s]/gi, ''); // Esto permitirá solo letras, números y espacios

    setQuery(inputValue);
  };

  const search = async () => {
    try {
      setLoading(true);
      let url;

      const cleanedQuery = query.trim().toUpperCase();
      //Si contiene espacios , osea es nombre completo (2 apellidos, 2 nombres)
       if (cleanedQuery.includes(' ')) {
        const [Apellido,Nombre] = cleanedQuery.split(' ');
        url = `http://localhost:8080/personRuc/name/${encodeURIComponent(cleanedQuery)}`;
        //Si es numerico
      } else if (isNumeric(cleanedQuery)) {
        url = `http://localhost:8080/personRuc/${query}`;
      }

      const response = await axios.get(url);

      const data = response.data;
      console.log('Datos recibidos:', data);

      if (data && data.length > 0) {
        setResult(data);
        setSearchError(null); // Reiniciar mensaje de error
      } else {
        setResult(null);
      }
      setResult(data);
    } catch (error) {
      console.error('Error al buscar:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Card className="card">
        <h2 className="p-text-center">Consulta de Datos</h2>
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="query">Ingrese RUC o nombre</label>
            <InputText
              id="query"
              placeholder="Ej. 1234567890 o Nombre"
              value={query}
              onChange={handleInputChange} // Usar la función de filtrado
            />
          </div>
        </div>
        <br />
        <div className="p-d-flex p-jc-center p-mt-4">
          <Button label="Buscar" icon="pi pi-search" onClick={search} />
        </div>
        <div style={{ display: 'grid', placeContent: 'center' }}>
          {loading && <ProgressSpinner />} {/* Indicador de carga */}
          {searchError && (
            <div className="p-message p-message-error p-mt-2 p-mb-0"></div>
          )}
        </div>
        {result && result.data && result.data.length > 0 ? (
          <div className="result-container">
            <h3 className="p-text-center">Resultado:</h3>
            <p className="p-text-center">
          {isNumeric(query) ? (
            <span>
              <strong>Nombre:</strong> {result.data[0].nombres}
              <br />
              <strong>Número de cédula:</strong> {result.data[0].identificacion}
            </span>
          ) : (
            <span>
              <strong>Nombre:</strong> {result.data[0].nombres}
              <br />
              <strong>Número de cédula:</strong> {result.data[0].identificacion}
            </span>
          )}
        </p>
          </div>
        ) : (
          <div className="result-container">
            <p className="p-text-center">Registro no encontrado</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SearchComponent;

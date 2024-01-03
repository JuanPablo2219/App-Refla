import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import '../styles/SearchDats.css';
import axios from 'axios';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);

  const isNumeric = (value) => !isNaN(parseFloat(value)) && isFinite(value);

  const search = async () => {
    try {
      let url;
      if (isNumeric(query)) {
        url = `http://192.168.1.157:8080/personRuc/${query}`;
      } else {
        url = `http://192.168.1.157:8080/personRuc/name/${encodeURIComponent(query)}`;
      }

      const response = await axios.get(url);

      const data = response.data;
      console.log('Datos recibidos:', data);
      setResult(data);
    } catch (error) {
      console.error('Error al buscar:', error.message);
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
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <br />
        <div className="p-d-flex p-jc-center p-mt-4">
          <Button label="Buscar" icon="pi pi-search" onClick={search} />
        </div>
        {result && (
          <div className="result-container">
            <h3 className="p-text-center">Resultado:</h3>
            <p className="p-text-center">
              {isNumeric(query) ? result[0].nombres : result[0].identificacion}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SearchComponent;

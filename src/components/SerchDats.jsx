import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import '../styles/SearchDats.css';
import axios from 'axios';

const SearchComponent = () => {
  const [result, setResult] = useState(null);

   const search = async () => {
    try {
      const response = await axios.get("http://localhost:3001/notas");

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
            <label htmlFor="query">Ingrese cédula o nombre</label>
            <InputText
              id="query"
              placeholder="Ej. 1234567890"
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
            <p className="p-text-center">{result.nombreCompleto || result.numeroCedula}</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SearchComponent;

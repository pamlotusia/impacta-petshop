import React, { useState } from 'react';

const App = () => {
  const [formData, setFormData] = useState({
    // Inicialize os campos do formulário com valores padrão se necessário
    campo1: '',
    campo2: '',
    // ...
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="App">
      <div className="left-side">
        <CardPreview formData={formData} />
      </div>
      <div className="right-side">
        <Formulario onChange={handleFormChange} />
      </div>
    </div>
  );
};

const CardPreview = ({ formData }) => {
  return (
    <div className="card">
      <h2>Preview do Formulário</h2>
      <p>Campo 1: {formData.campo1}</p>
      <p>Campo 2: {formData.campo2}</p>
      {/* Adicione mais campos conforme necessário */}
    </div>
  );
};

const Formulario = ({ onChange }) => {
  return (
    <div className="formulario">
      <h2>Formulário</h2>
      <input
        type="text"
        name="campo1"
        placeholder="Campo 1"
        onChange={onChange}
      />
      <input
        type="text"
        name="campo2"
        placeholder="Campo 2"
        onChange={onChange}
      />
      {/* Adicione mais campos conforme necessário */}
    </div>
  );
};

export default App;

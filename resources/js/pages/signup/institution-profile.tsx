import React, { useState } from 'react';
import './styles.css';

export default function Signup() {
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
  };

  const handleSubmit = () => {
    window.location.href = '/login';
  };

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4 container">
      <h1 className="text-2xl font-bold">Cadastro de Entidade Social</h1>

      <div className="input-file">
        <h3>Defina uma foto de perfil</h3>
        <label htmlFor="file-upload" className="input-file-label">
          Escolher Arquivo
        </label>
        <input
          type="file"
          id="file-upload"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      <div className="input-file">
        <h3>Insira documentos que comprovem a existência e seriedade da entidade social</h3>
        <label htmlFor="file-upload" className="input-file-label">
          Escolher Arquivo
        </label>
        <input
          type="file"
          id="file-upload"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      {file && <p>Arquivo selecionado: {file.name}</p>}
      <div className="input-text-area">
        <h3>Faça uma breve descrição sobre a instituição</h3>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full border p-2 rounded"
        />
      </div>
      {file && <p>Arquivo selecionado: {file.name}</p>}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleSubmit}
      >
        Cadastrar
      </button>
    </div>
  );
}


import React, { useState } from 'react';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  {
      title: 'Cadastro - DoNation',
      href: '/cadastro',
  },
];

type SignupPageProps = {
    userType?: string;
  };

export default function Signup({ userType = 'pessoa' }: SignupPageProps) {

  const [form, setForm] = useState({
    razaoSocial: '',
    nomeFantasia: '',
    cnpj: '',
    inscricaoEstadual: '',
    dataAbertura: '',
  });
  const [progress, setProgress] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let newValue = value;

    if (name === 'cnpj') {
      newValue = value
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .slice(0, 18);
    }

    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const cancelarCadastro = () => {
    window.location.href = "/";
  }

   const analyzeCNPJ = () => {
  setProgress(0);
  const interval = setInterval(() => {
    setProgress((prev) => {
      if (prev >= 100) {
        clearInterval(interval);
        window.location.href = '/signup/institution-profile'; 
        return 100;
      }
      return prev + 5;
    });
  }, 50);
};

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4 grid grid-flow-row grid-cols-8">
      <div className='grid-col-subgrid col-span-6 col-start-2'>
        <h1 className="text-2xl font-bold">Cadastro de Entidade Social</h1>
      </div>
      <div className='col-span-8'>
        <label>Razão Social</label>
        <input name="razaoSocial" value={form.razaoSocial} onChange={handleChange} className="w-full border p-2 rounded" />
      </div>
      <div className='col-span-8'>
        <label>Nome Fantasia</label>
        <input name="nomeFantasia" value={form.nomeFantasia} onChange={handleChange} className="w-full border p-2 rounded" />
      </div>
      <div className='col-span-4'>
        <label>CNPJ</label>
        <input name="cnpj" value={form.cnpj} onChange={handleChange} className="w-full border p-2 rounded" />
      </div> 
      <div className='col-span-3 col-start-6'>
        <label>Inscrição Estadual</label>
        <input name="inscricaoEstadual" value={form.inscricaoEstadual} onChange={handleChange} className="w-full border p-2 rounded" />
      </div>
      <div className='col-span-3'>
        <label>Data de Abertura</label>
        <input type="date" name="dataAbertura" value={form.dataAbertura} onChange={handleChange} className="w-full border p-2 rounded" />
      </div>
      <br />
      <div className='col-span-3 col-start-3 flex justify-between'>
        <button onClick={cancelarCadastro} className="bg-red-500 text-white px-4 py-2 rounded mt-4">
          Cancelar
        </button>
        <button onClick={analyzeCNPJ} className="bg-green-500 text-white px-4 py-2 rounded mt-4">
          Cadastrar
        </button>
      </div>
      <div>
        {progress > 0 && (
          <div className="w-full h-4 bg-gray-200 rounded mt-2">
            <div className="h-full bg-green-500 transition-all duration-200 ease-in-out" style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>
    </div>
  );
}

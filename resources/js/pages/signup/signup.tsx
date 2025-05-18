import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type SignupPageProps = {
  userType?: string;
};

export default function Signup({}: SignupPageProps) {
  const [step1Form, setStep1Form] = useState({
    razaoSocial: '',
    nomeFantasia: '',
    cnpj: '',
    inscricaoEstadual: '',
    dataAbertura: '',
    description: '',
  });

  const [progress, setProgress] = useState(0);

  const [step, setStep] = useState(1);

  const [fileProfile, setFileProfile] = useState<File | null>(null);
  const [fileDocuments, setFileDocuments] = useState<File | null>(null);
  const [description, setDescription] = useState('');

  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    password_confirmation: '',
    razaoSocial: '',
    nomeFantasia: '',
    cnpj: '',
    inscricaoEstadual: '',
    dataAbertura: '',
  });

  const handleChangeStep1 = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    setStep1Form((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const cancelRegister = () => {
    history.back();
  }

  const analyzeCNPJ = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStep(2);
          return 100;
        }
        return prev + 5;
      });
    }, 50);
  };

  const handleFileProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFileProfile(selectedFile);
  };

  const handleFileDocumentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFileDocuments(selectedFile);
  };

  const submit: React.FormEventHandler = (e) => {
    e.preventDefault();

    setData('razaoSocial', step1Form.razaoSocial);
    setData('nomeFantasia', step1Form.nomeFantasia);
    setData('cnpj', step1Form.cnpj);
    setData('inscricaoEstadual', step1Form.inscricaoEstadual);
    setData('dataAbertura', step1Form.dataAbertura);

    post(route('register'), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
    //alert('Cadastro efetuado com sucesso!');
    //history.go(-2);
  };

  return (
    <AuthLayout title="Cadastro de Entidade Social" description="Preencha os dados abaixo para criar sua conta">
      <Head title="Cadastro" />

      <div className="max-w-xl mx-auto mt-10 space-y-6">
        {step === 1 && (
          <>
            <h1 className="text-2xl font-bold mb-6">Cadastro - Dados Básicos</h1>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl">
              <div className="flex flex-col">
                <label htmlFor="razaoSocial" className="mb-1 font-semibold">Razão Social</label>
                <input
                  id="razaoSocial"
                  name="razaoSocial"
                  value={step1Form.razaoSocial}
                  onChange={handleChangeStep1}
                  className="border rounded p-2 w-full"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="nomeFantasia" className="mb-1 font-semibold">Nome Fantasia</label>
                <input
                  id="nomeFantasia"
                  name="nomeFantasia"
                  value={step1Form.nomeFantasia}
                  onChange={handleChangeStep1}
                  className="border rounded p-2 w-full"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="cnpj" className="mb-1 font-semibold">CNPJ</label>
                <input
                  id="cnpj"
                  name="cnpj"
                  value={step1Form.cnpj}
                  onChange={handleChangeStep1}
                  className="border rounded p-2 w-full"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="inscricaoEstadual" className="mb-1 font-semibold">Inscrição Estadual</label>
                <input
                  id="inscricaoEstadual"
                  name="inscricaoEstadual"
                  value={step1Form.inscricaoEstadual}
                  onChange={handleChangeStep1}
                  className="border rounded p-2 w-full"
                />
              </div>

              <div className="flex flex-col md:col-span-2">
                <label htmlFor="dataAbertura" className="mb-1 font-semibold">Data de Abertura</label>
                <input
                  id="dataAbertura"
                  type="date"
                  name="dataAbertura"
                  value={step1Form.dataAbertura}
                  onChange={handleChangeStep1}
                  className="border rounded p-2 w-full"
                />
              </div>

               <div className="flex flex-col justify-start">
                <button
                  type="button"
                  onClick={cancelRegister}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Voltar
                </button>
              </div>

              <div className="flex flex-col justify-start">
                <button
                  type="button"
                  onClick={analyzeCNPJ}
                  className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
                >
                  Prosseguir
                </button>
              </div>

              {progress > 0 && (
                <div className="md:col-span-2 w-full h-4 bg-gray-200 rounded mt-2">
                  <div
                    className="h-full bg-green-500 transition-all duration-200 ease-in-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="text-2xl font-bold mb-6">Cadastro - Informações Adicionais e Conta</h1>

            <form onSubmit={submit} className="space-y-8 max-w-xl grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl" encType="multipart/form-data">

              <div className="mb-6 col-span-2">
                <h3 className="font-semibold mb-2">Defina uma foto de perfil</h3>
                <label
                  htmlFor="file-profile"
                  className="inline-block cursor-pointer text-blue-600 underline hover:text-blue-800"
                >
                  Escolher Arquivo
                </label>
                <input
                  type="file"
                  id="file-profile"
                  onChange={handleFileProfileChange}
                  className="hidden"
                />
                {fileProfile && <p className="mt-1 text-gray-700">Arquivo selecionado: {fileProfile.name}</p>}
              </div>

              <div className="mb-6 col-span-2">
                <h3 className="font-semibold mb-2">Insira documentos que comprovem a existência e seriedade da entidade social</h3>
                <label
                  htmlFor="file-documents"
                  className="inline-block cursor-pointer text-blue-600 underline hover:text-blue-800"
                >
                  Escolher Arquivo
                </label>
                <input
                  type="file"
                  id="file-documents"
                  onChange={handleFileDocumentsChange}
                  className="hidden"
                />
                {fileDocuments && <p className="mt-1 text-gray-700">Arquivo selecionado: {fileDocuments.name}</p>}
              </div>

              <div className="mb-6 col-span-2">
                <h3 className="font-semibold mb-2">Faça uma breve descrição sobre a instituição</h3>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  className="w-full border border-gray-300 rounded p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 col-span-2 md:grid-cols-1 gap-6">
                <div className="flex flex-col">
                  <Label htmlFor="email" className="mb-1">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    tabIndex={2}
                    autoComplete="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    disabled={processing}
                    placeholder="email@exemplo.com"
                  />
                  <InputError message={errors.email} />
                </div>

                <div className='flex flex-row gap-6'>
                  <div className="flex flex-col w-1/2">
                    <Label htmlFor="password" className="mb-1">Senha</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      tabIndex={3}
                      autoComplete="new-password"
                      value={data.password}
                      onChange={(e) => setData('password', e.target.value)}
                      disabled={processing}
                      placeholder="Senha"
                    />
                    <InputError message={errors.password} />
                  </div>

                  <div className="flex flex-col w-1/2">
                    <Label htmlFor="password_confirmation" className="mb-1">Confirme a senha</Label>
                    <Input
                      id="password_confirmation"
                      type="password"
                      required
                      tabIndex={4}
                      autoComplete="new-password"
                      value={data.password_confirmation}
                      onChange={(e) => setData('password_confirmation', e.target.value)}
                      disabled={processing}
                      placeholder="Confirme a senha"
                    />
                    <InputError message={errors.password_confirmation} />
                  </div>
                </div>
                
              </div>

              <div className="flex flex-row col-span-2 gap-4">
                <div className="flex flex-col w-full">
                  <Button
                    type="button"
                    onClick={cancelRegister}
                    className="mt-6 w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    Cancelar Cadastro
                  </Button>
                </div>
                
                <div className="flex flex-col w-full">
                  
                  <Button
                    type="submit"
                    className="mt-6 w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    tabIndex={5}
                    disabled={processing}
                  >
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2 inline-block" />}
                    Cadastrar
                  </Button>
                </div>
              </div>

              
            </form>
          </>
        )}

      </div>
    </AuthLayout>
  );
}

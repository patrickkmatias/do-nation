/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function Signup() {
  // Form Inertia para todos os campos
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    password_confirmation: '',
    is_receptor: true,
    nome_instituicao: '',
    logradouro: '',
    cep: '',
    bairro: '',
    cidade: '',
    estado: '',
    cnpj_cpf: '',
    ie_rg: '',
    observacoes: '',
    doacao_preferencia: '',
    data_abertura: '',
    file_profile: null as File | null,
    file_documents: null as File | null,
    description: '',
  });

  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(1);

  // Handle texto e máscara
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      const fileInput = e as React.ChangeEvent<HTMLInputElement>;
      setData(name as any, fileInput.target.files?.[0] ?? null);
    } else {
      let newValue = value;
      if (name === 'cnpj_cpf') {
        newValue = value
          .replace(/\D/g, '')
          .replace(/^(\d{2})(\d)/, '$1.$2')
          .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
          .replace(/\.(\d{3})(\d)/, '.$1/$2')
          .replace(/(\d{4})(\d)/, '$1-$2')
          .slice(0, 18);
      }
      setData(name as any, newValue);
    }
  };

  const cancelRegister = () => history.back();

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

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('register'), {
      forceFormData: true,  
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  return (
    <AuthLayout
      title="Cadastro de Entidade Social"
      description="Preencha os dados abaixo para criar sua conta"
    >
      <Head title="Cadastro" />

      <div className="max-w-xl mx-auto mt-10 space-y-6">
        {step === 1 ? (
          <>
            <h1 className="text-2xl font-bold mb-6">Dados Básicos</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <Label htmlFor="nome_instituicao">Razão Social</Label>
                <Input
                  id="nome_instituicao"
                  name="nome_instituicao"
                  value={data.nome_instituicao}
                  onChange={handleChange}
                  style={{borderColor: 'gray'}}
                />
                <InputError message={errors.nome_instituicao} />
              </div>

              <div className="flex flex-col">
                <Label htmlFor="observacoes">Descrição Rápida</Label>
                <Input
                  id="observacoes"
                  name="observacoes"
                  value={data.observacoes}
                  onChange={handleChange}
                  style={{borderColor: 'gray'}}
                />
                <InputError message={errors.observacoes} />
              </div>

              <div className="flex flex-col">
                <Label htmlFor="cnpj_cpf">CNPJ</Label>
                <Input
                  id="cnpj_cpf"
                  name="cnpj_cpf"
                  value={data.cnpj_cpf}
                  onChange={handleChange}
                  style={{borderColor: 'gray'}}
                />
                <InputError message={errors.cnpj_cpf} />
              </div>

              <div className="flex flex-col">
                <Label htmlFor="ie_rg">Inscrição Estadual</Label>
                <Input
                  id="ie_rg"
                  name="ie_rg"
                  value={data.ie_rg}
                  onChange={handleChange}
                  style={{borderColor: 'gray'}}
                />
                <InputError message={errors.ie_rg} />
              </div>

              <div className="flex flex-col md:col-span-2">
                <Label htmlFor="data_abertura">Data de Abertura</Label>
                <Input
                  id="data_abertura"
                  name="data_abertura"
                  type="date"
                  value={data.data_abertura}
                  onChange={handleChange}
                  style={{borderColor: 'gray'}}
                />
                <InputError message={errors.data_abertura} />
              </div>

              <div className="md:col-span-2 flex gap-4">
                <Button type="button" onClick={cancelRegister}>Voltar</Button>
                <Button type="button" onClick={analyzeCNPJ} className='bg-[#bba7ff] hover:bg-[#a693ff] text-black'>Prosseguir</Button>
              </div>

              {progress > 0 && (
                <div className="md:col-span-2 w-full h-4 bg-gray-200 rounded">
                  <div className="h-full bg-green-500" style={{ width: `${progress}%` }} />
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-6">Informações Adicionais e Conta</h1>
            <form onSubmit={submit} encType="multipart/form-data" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <Label htmlFor="file_profile">Foto de Perfil</Label>
                <Input id="file_profile" name="file_profile" type="file" onChange={handleChange} style={{borderColor: 'gray'}}/>
                <InputError message={errors.file_profile} />
              </div>

              <div className="col-span-2">
                <Label htmlFor="file_documents">Documentos</Label>
                <Input id="file_documents" name="file_documents" type="file" onChange={handleChange} style={{borderColor: 'gray'}}/>
                <InputError message={errors.file_documents} />
              </div>

              <div className="col-span-2">
                <Label htmlFor="description" >Descrição Completa</Label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={data.description}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  style={{borderColor: 'gray'}}
                />
                <InputError message={errors.description} />
              </div>

              <div className="col-span-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={data.email} onChange={handleChange} disabled={processing} style={{borderColor: 'gray'}}/>
                <InputError message={errors.email} />
              </div>

              <div className="col-span-2 flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="password">Senha</Label>
                  <Input id="password" name="password" type="password" value={data.password} onChange={handleChange} disabled={processing} style={{borderColor: 'gray'}}/>
                  <InputError message={errors.password} />
                </div>
                <div className="flex-1">
                  <Label htmlFor="password_confirmation">Confirme Senha</Label>
                  <Input id="password_confirmation" name="password_confirmation" type="password" value={data.password_confirmation} onChange={handleChange} disabled={processing} style={{borderColor: 'gray'}}/>
                  <InputError message={errors.password_confirmation} />
                </div>
              </div>

              <div className="col-span-2 flex gap-4">
                <Button type="button" onClick={cancelRegister}>Cancelar</Button>
                <Button type="submit" disabled={processing} className='bg-[#bba7ff] hover:bg-[#a693ff] text-black'>
                  {processing && <LoaderCircle className="animate-spin mr-2" />} Cadastrar
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </AuthLayout>
  );
}

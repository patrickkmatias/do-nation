import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, router } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

export default function Dashboard() {
  // Consumir o prop `user` que o controller retorna
  const { user } = usePage().props as unknown as {
    user: {
      id: number;
      email: string;
      is_receptor: boolean;
      nome_instituicao?: string;
      cnpj_cpf?: string;
      ie_rg?: string;
      observacoes?: string;
      doacao_preferencia?: string;
      data_abertura?: string;
      profile_photo_path?: string;
    };
  };

  // Mock de doadores e notícias
  const [donors] = useState([
    { id: 1, name: 'João Silva', visitRequest: '2025-06-01' },
    { id: 2, name: 'Maria Oliveira', visitRequest: '2025-06-02' },
  ]);

  const [news] = useState([
    { id: 1, title: 'Evento de Doação de Alimentos', date: '2025-05-25' },
    { id: 2, title: 'Campanha de Arrecadação de Roupas', date: '2025-05-30' },
  ]);

  const formatDateBR = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        {/* Dados Cadastrais */}
        <section className="rounded border p-4">
          <h2 className="text-xl font-bold">Dados Cadastrais</h2>
          <div className="mt-4 space-y-1">
            <p><strong>Razão Social:</strong> {user.nome_instituicao || '—'}</p>
            
            <p><strong>CNPJ:</strong> {user.cnpj_cpf || '—'}</p>
            <p><strong>Inscrição Estadual:</strong> {user.ie_rg || '—'}</p>
            <p><strong>Data de Abertura:</strong> {formatDateBR(user.data_abertura)}</p>
            <p><strong>Observações:</strong> {user.observacoes || '—'}</p>
          </div>
          <button
            onClick={() => router.visit('/profile/edit')}
            className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
          >
            Atualizar Dados
          </button>
        </section>

        {/* Doadores e Solicitações */}
        <section className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border p-4">
          <h2 className="text-xl font-bold">Doadores e Solicitações</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {donors.map((donor) => (
              <div key={donor.id} className="rounded-lg border p-4 shadow-sm">
                <p><strong>Nome:</strong> {donor.name}</p>
                <p><strong>Solicitação de Visita:</strong> {formatDateBR(donor.visitRequest)}</p>
                <button className="mt-2 rounded bg-green-500 px-4 py-2 text-white">
                  Confirmar Visita
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Notícias e Eventos */}
        <section className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border p-4">
          <h2 className="text-xl font-bold">Notícias e Eventos</h2>
          <div className="mt-4">
            {news.map((item) => (
              <div key={item.id} className="border-b py-3">
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-600">Data: {formatDateBR(item.date)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Logout */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => router.post('/logout')}
            className="rounded bg-red-500 px-4 py-2 text-white"
          >
            Sair
          </button>
        </div>
      </div>
    </AppLayout>
  );
}

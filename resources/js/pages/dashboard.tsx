import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { router } from '@inertiajs/react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { auth } = usePage().props as any;
    const user = auth?.user;

    const [donors, setDonors] = useState([
        { id: 1, name: 'João Silva', visitRequest: '01/06/2025' },
        { id: 2, name: 'Maria Oliveira', visitRequest: '02/06/2025' },
    ]);

    const [news, setNews] = useState([
        { id: 1, title: 'Evento de Doação de Alimentos', date: '25/05/2025' },
        { id: 2, title: 'Campanha de Arrecadação de Roupas', date: '30/05/2025' },
    ]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[200px] overflow-hidden rounded-xl border p-4">
                    <h2 className="text-xl font-bold">Dados Cadastrais</h2>
                    <div className="mt-4">
                        <p><strong>Razão Social:</strong> {user?.razaoSocial}</p>
                        <p><strong>Nome Fantasia:</strong> {user?.nomeFantasia}</p>
                        <p><strong>CNPJ:</strong> {user?.cnpj}</p>
                        <p><strong>Inscrição Estadual:</strong> {user?.inscricaoEstadual}</p>
                        <p><strong>Data de Abertura:</strong> {user?.dataAbertura}</p>
                    </div>
                    <button
                        onClick={() => alert('Atualizar Dados')}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Atualizar Dados
                    </button>
                </div>

                <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border p-4">
                    <h2 className="text-xl font-bold">Doadores e Solicitações</h2>
                    <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3">
                        {donors.map(donor => (
                            <div key={donor.id} className="p-4 border rounded-lg shadow-sm">
                                <p><strong>Nome:</strong> {donor.name}</p>
                                <p><strong>Solicitação de Visita:</strong> {donor.visitRequest}</p>
                                <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded">
                                    Confirmar Visita
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border p-4">
                    <h2 className="text-xl font-bold">Notícias e Eventos</h2>
                    <div className="mt-4">
                        {news.map(item => (
                            <div key={item.id} className="border-b py-3">
                                <p className="font-semibold">{item.title}</p>
                                <p className="text-sm text-gray-600">Data: {item.date}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-6 flex gap-4">
                    <button
                        onClick={() => router.post('/logout')}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Sair
                    </button>
                </div>
            </div>
        </AppLayout>
    );
}

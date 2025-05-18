import { useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function Edit({ user }: { user: any }) {
    const { data, setData, post, processing, errors } = useForm({
        razaoSocial: user.razaoSocial || '',
        nomeFantasia: user.nomeFantasia || '',
        cnpj: user.cnpj || '',
        inscricaoEstadual: user.inscricaoEstadual || '',
        dataAbertura: user.dataAbertura || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/profile/update');
    };

    return (
        <AppLayout>
            <Head title="Editar Dados" />
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-8 space-y-4">
                <h1 className="text-2xl font-bold mb-4">Editar Dados Cadastrais</h1>

                <div>
                    <label className="block font-semibold">Razão Social</label>
                    <input
                        type="text"
                        value={data.razaoSocial}
                        onChange={e => setData('razaoSocial', e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                    {errors.razaoSocial && <p className="text-red-500 text-sm">{errors.razaoSocial}</p>}
                </div>

                <div>
                    <label className="block font-semibold">Nome Fantasia</label>
                    <input
                        type="text"
                        value={data.nomeFantasia}
                        onChange={e => setData('nomeFantasia', e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                    {errors.nomeFantasia && <p className="text-red-500 text-sm">{errors.nomeFantasia}</p>}
                </div>

                <div>
                    <label className="block font-semibold">CNPJ</label>
                    <input
                        type="text"
                        value={data.cnpj}
                        onChange={e => setData('cnpj', e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                    {errors.cnpj && <p className="text-red-500 text-sm">{errors.cnpj}</p>}
                </div>

                <div>
                    <label className="block font-semibold">Inscrição Estadual</label>
                    <input
                        type="text"
                        value={data.inscricaoEstadual}
                        onChange={e => setData('inscricaoEstadual', e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                    {errors.inscricaoEstadual && <p className="text-red-500 text-sm">{errors.inscricaoEstadual}</p>}
                </div>

                <div>
                    <label className="block font-semibold">Data de Abertura</label>
                    <input
                        type="date"
                        value={data.dataAbertura}
                        onChange={e => setData('dataAbertura', e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                    {errors.dataAbertura && <p className="text-red-500 text-sm">{errors.dataAbertura}</p>}
                </div>

                <div className="flex gap-4 mt-6">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                        disabled={processing}
                    >
                        Atualizar
                    </button>
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </AppLayout>
    );
}

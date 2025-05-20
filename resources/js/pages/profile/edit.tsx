import { useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Edit({ user }: { user: any }) {
    // Form com campos do receptor
    const { data, setData, put, processing, errors } = useForm({
        nome_instituicao: user.nome_instituicao ?? '',
        cnpj_cpf: user.cnpj_cpf ?? '',
        ie_rg: user.ie_rg ?? '',
        observacoes: user.observacoes ?? '',
        doacao_preferencia: user.doacao_preferencia ?? '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('profile.updatereceptor'), {
            onError: () => console.log(errors),
            onSuccess: () => router.visit('/dashboard'),
        });
    };

    return (
        <AppLayout>
            <Head title="Editar Dados Cadastrais" />
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-8 space-y-4">
                <h1 className="text-2xl font-bold mb-4">Editar Dados Cadastrais</h1>

                <div>
                    <label htmlFor="nome_instituicao" className="block font-semibold">Razão Social</label>
                    <input
                        id="nome_instituicao"
                        name="nome_instituicao"
                        type="text"
                        value={data.nome_instituicao}
                        onChange={e => setData('nome_instituicao', e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                    {errors.nome_instituicao && <p className="text-red-500 text-sm">{errors.nome_instituicao}</p>}
                </div>

                <div>
                    <label htmlFor="cnpj_cpf" className="block font-semibold">CNPJ</label>
                    <input
                        id="cnpj_cpf"
                        name="cnpj_cpf"
                        type="text"
                        value={data.cnpj_cpf}
                        onChange={e => setData('cnpj_cpf', e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                    {errors.cnpj_cpf && <p className="text-red-500 text-sm">{errors.cnpj_cpf}</p>}
                </div>

                <div>
                    <label htmlFor="ie_rg" className="block font-semibold">Inscrição Estadual</label>
                    <input
                        id="ie_rg"
                        name="ie_rg"
                        type="text"
                        value={data.ie_rg}
                        onChange={e => setData('ie_rg', e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                    {errors.ie_rg && <p className="text-red-500 text-sm">{errors.ie_rg}</p>}
                </div>

                <div>
                    <label htmlFor="data_abertura" className="block font-semibold">Data de Abertura</label>
                    <input
                        id="data_abertura"
                        name="data_abertura"
                        type="date"
                        value={data.data_abertura}
                        onChange={e => setData('data_abertura', e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                    {errors.data_abertura && <p className="text-red-500 text-sm">{errors.data_abertura}</p>}
                </div>

                <div>
                    <label htmlFor="observacoes" className="block font-semibold">Observações</label>
                    <textarea
                        id="observacoes"
                        name="observacoes"
                        rows={3}
                        value={data.observacoes}
                        onChange={e => setData('observacoes', e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                    {errors.observacoes && <p className="text-red-500 text-sm">{errors.observacoes}</p>}
                </div>

                <div>
                    <label htmlFor="doacao_preferencia" className="block font-semibold">Preferência de Doação</label>
                    <input
                        id="doacao_preferencia"
                        name="doacao_preferencia"
                        type="text"
                        value={data.doacao_preferencia}
                        onChange={e => setData('doacao_preferencia', e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                    {errors.doacao_preferencia && <p className="text-red-500 text-sm">{errors.doacao_preferencia}</p>}
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

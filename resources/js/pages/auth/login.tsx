import { Head, useForm, Link, usePage } from '@inertiajs/react';
import { LoaderCircle, Router } from 'lucide-react';
import { FormEventHandler } from 'react';
import { type BreadcrumbItem } from '@/types';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { type SharedData } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Login - DoNation',
        href: '/',
    },
];

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { auth } = usePage<SharedData>().props;
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Log in" />
            <div className="min-h-screen flex flex-col justify-center items-center px-6 lg:px-8">
                <div className="flex h-20 items-center flex-col lg:justify-center lg:p-5">
                    <h1 className='text-2xl text-black dark:text-white"'>DoNation</h1>
                </div>
                <div className="flex flex-col items-center p-6 lg:justify-center lg:p-8">

                    <form className="flex flex-col gap-6" onSubmit={submit}>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label
                                    className='text-black'
                                    htmlFor="email">Endereço de E-mail</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="email@exemplo.com"
                                    className='text-black'
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label
                                        className='text-black'
                                        htmlFor="password"
                                    >
                                        Senha
                                    </Label>
                                    {canResetPassword && (
                                        <TextLink href={route('password.request')} className="ml-auto text-sm text-black" tabIndex={5}>
                                            Esqueci minha senha
                                        </TextLink>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Password"
                                    className='text-black'
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    checked={data.remember}
                                    onClick={() => setData('remember', !data.remember)}
                                    tabIndex={3}
                                />
                                <Label className='text-black' htmlFor="remember">Lembrar usuário</Label>
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 w-full bg-[#bba7ff] hover:bg-[#a693ff] text-black"
                                tabIndex={4}
                                disabled={processing}
                            >
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Entrar
                            </Button>

                        </div>

                        <div className="text-center text-sm text-black">
                            Ainda não é cadastrado?{' '}
                            <TextLink className="text-black" href={route('cadastro')} tabIndex={5}>
                                Cadastre-se
                            </TextLink>
                        </div>
                    </form>
                    <br />
                    <div className="text-center text-sm text-black">
                        Quer saber mais sobre a DoNation?{' '}
                        <TextLink className="text-black" href={route('sobre-nos')} tabIndex={5}>
                            Clique aqui 
                        </TextLink>!
                    </div>

                    {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
                </div>
            </div>
        </>
    );
}

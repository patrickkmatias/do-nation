<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserReceptorRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Arr;
use Log;

class UserReceptorRegistrationController extends Controller
{
    public function store(UserReceptorRequest $request)
    {
        // Os dados já chegam validados
        $data = $request->validated();

        \Log::info('VALIDATED:', $data);
        DB::beginTransaction();

        try {
            // Criar o Usuário
            $user = User::create([
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
            ]);
            Log::info('USER CREATED ID=' . $user->id);


            // Se for receptor, cria perfil
            if ($data['is_receptor']) {
                $receptorData = Arr::only($data, [
                    'nome_instituicao',
                    'logradouro',
                    'cep',
                    'bairro',
                    'cidade',
                    'estado',
                    'cnpj_cpf',
                    'ie_rg',
                    'observacoes',
                    'doacao_preferencia',
                ]);

                $receptor = $user->receptor()->create($receptorData);
                Log::info('RECEPTOR CREATED ID=' . $receptor->id);

            }

            DB::commit();
            Log::info('TRANSACTION COMMITTED');

            Auth::login($user);

            if ($request->hasFile('file_profile')) {
                $path = $request->file('file_profile')->store('profiles', 'public');
                $user->update(['profile_photo_path' => $path]);
            }

            if ($request->hasFile('file_documents')) {
                $path = $request->file('file_documents')->store('documents', 'public');
                $user->receptor()->update(['document_path' => $path]);
            }

            if (!empty($data['description'])) {
                $user->receptor()->update(['description' => $data['description']]);
            }

            return redirect()
                ->route('dashboard')
                ->with('success', 'Usuário registrado com sucesso!');

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('STORE ERROR: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
            ]);
            throw $e;
        }
    }
}

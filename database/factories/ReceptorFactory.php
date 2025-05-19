<?php

namespace Database\Factories;

use App\Models\Receptor;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReceptorFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Receptor::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nome_instituicao' => $this->faker->company() . ' ' . $this->faker->companySuffix(),
            'logradouro' => $this->faker->streetAddress(),
            'cep' => $this->faker->postcode(),
            'bairro' => $this->faker->citySuffix() . ' ' . $this->faker->streetName(), // Faker não tem um método direto para bairro
            'cidade' => $this->faker->city(),
            'estado' => $this->faker->stateAbbr(),
            'cnpj_cpf' => $this->faker->boolean(70) ? $this->faker->numerify('##############') : $this->faker->numerify('###########'), // Gera CNPJ (14 dígitos) ou CPF (11 dígitos)
            'ie_rg' => $this->faker->numerify('#########'), // Exemplo para IE ou RG
            'observacoes' => $this->faker->optional()->paragraph(),
            'doacao_preferencia' => $this->faker->randomElement(['Alimentos', 'Roupas', 'Dinheiro', 'Brinquedos', null]),
        ];
    }
}
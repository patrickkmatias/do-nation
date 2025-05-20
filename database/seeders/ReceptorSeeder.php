<?php

namespace Database\Seeders;

use App\Models\Receptor;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReceptorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Cria 10 registros de receptores usando a factory
        Receptor::factory()->count(10)->create();
    }
}
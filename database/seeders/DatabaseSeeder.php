<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        if (User::count() === 0) {
            User::create([
                'name' => 'admin',
                'password' => Hash::make('123456'),
            ]);
        }

        $this->call([
            CategorySeeder::class,
            QuizSeeder::class
        ]);
    }
}

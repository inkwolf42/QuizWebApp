<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Choice;
use App\Models\Quiz;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::factory()
        ->count(5)
        ->has(
            Quiz::factory()
            ->count(20)
            ->has(
                Choice::factory()->count(3)
            )
            ->has(
                Choice::factory()->state([
                    "answer"=>"answer",
                    "is_correct"=>true
                ])->count(1)
            )
        )
        ->create();
    }
}

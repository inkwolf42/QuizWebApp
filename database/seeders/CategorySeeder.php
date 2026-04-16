<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run()
    {
        $file = database_path('seeders/categories.json');

        if (!file_exists($file) || !is_readable($file)) {
            $this->command->error('categories.json not found or not readable.');
            return;
        }

        $categories = json_decode(file_get_contents($file), true);



        foreach ($categories as $data) {
            // $this->command->info($data['name']);
            Category::create(
                ['name' => $data['name'],'icon' => $data['icon'], 'color' => $data['color']]
            );
        }

        $this->command->info('Categories imported successfully!');
    }
}

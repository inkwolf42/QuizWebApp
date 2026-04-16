<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Quiz;
use App\Models\Choice;

class QuizSeeder extends Seeder
{
    public function run()
    {
        $file = database_path('seeders/quizzes.json');

        if (!file_exists($file) || !is_readable($file)) {
            $this->command->error('JSON file not found or not readable.');
            return;
        }

        $quizzes = json_decode(file_get_contents($file), true);

        if (!$quizzes) {
            $this->command->error('Invalid JSON format.');
            return;
        }

        foreach ($quizzes as $data) {
            // Handle nullable category
            $category = null;
            if (!empty($data['category'])) {
                $category = Category::where('name' , $data['category'])->first();
            }

            // Create quiz
            $quiz = Quiz::create([
                'category_id' => $category?->id,
                'question' => $data['question'],
                'has_multi_answer' => $data['has_multiple_answers'],
                'difficulty' => in_array($data['difficulty'], ['easy','normal','hard']) ? $data['difficulty'] : 'normal',
            ]);

            // Create choices
            foreach ($data['choices'] as $choice) {
                Choice::create([
                    'quiz_id' => $quiz->id,
                    'answer' => $choice['answer'],
                    'is_correct' => $choice['is_correct'],
                ]);
            }
        }

        $this->command->info('Quizzes imported successfully from JSON!');
    }
}

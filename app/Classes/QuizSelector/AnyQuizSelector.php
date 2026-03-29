<?php

namespace App\Classes\QuizSelector;

use App\Classes\ResponceObjects\QuizAttemptResponceObject;
use App\Models\Quiz;

final class AnyQuizSelector extends QuizSelector{

    public function pickRandom(){
        $collection = Quiz::inRandomOrder()->limit($this->size)->pluck("id");
        return $collection->map(function($quiz){
            return new QuizAttemptResponceObject($quiz);
        })->all();
    }
}

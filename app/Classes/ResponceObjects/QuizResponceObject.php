<?php

namespace App\Classes\ResponceObjects;

use App\Models\Category;
use App\Models\Quiz;
use JsonSerializable;

final class QuizResponceObject implements JsonSerializable
{
    public function __construct(private Quiz $quiz){}
    public function jsonSerialize() : mixed {
        return [
            "id"=>$this->quiz->id,
            "question"=>$this->quiz->question,
            "difficulty"=>$this->quiz->difficulty,
            "has_multi_answer"=>$this->quiz->has_multi_answer,
            "choices"=>$this->quiz->choices,
        ];
    }
}


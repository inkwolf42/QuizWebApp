<?php

namespace App\Models;

use App\Classes\OrderableModel;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
"user_name",
"not_answred",
"correct",
"worng",
"score",
"time",
"starting_time",
"negative",
])]
class Record extends Model implements OrderableModel
{
    public static function orederByList()
    {
        return [
            "user_name",
            "score",
            "time",
            "starting_time",
        ];
    }

    public function quizzes(){
        return $this->belongsToMany(Quiz::class);
    }
}

<?php

namespace App\Models;

use App\Classes\OrderableModel;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    "name",
    "icon",
    "color",
])]
class Category extends Model implements OrderableModel
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory;

    static public function orederByList(){
        return [
            "name","created_at","quizzes_count"
        ];
    }

    public function quizzes(){
        return $this->hasMany(Quiz::class);
    }
}

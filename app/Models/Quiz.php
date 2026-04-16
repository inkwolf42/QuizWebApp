<?php

namespace App\Models;

use App\Classes\OrderableModel;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;


#[Fillable([
"category_id",
"question",
"has_multi_answer",
"difficulty",
])]
class Quiz extends Model implements OrderableModel
{
    use HasFactory;

    public static function orederByList()
    {
        return [
            "question",
            "created_at"
        ];
    }

    public function choices(){
        return $this->HasMany(Choice::class);
    }
    public function category(){
        return $this->belongsTo(Category::class);
    }
}

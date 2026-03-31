<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;


#[Fillable([
"category_id",
"question",
"difficulty",
"has_multi_answer",
])]
class Quiz extends Model
{
    use HasFactory;

    public function choices(){
        return $this->HasMany(Choice::class);
    }
    public function category(){
        return $this->belongsTo(Category::class);
    }
}

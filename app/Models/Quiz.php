<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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

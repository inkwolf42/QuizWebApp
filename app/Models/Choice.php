<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


#[Fillable([
'answer',
'is_correct',
])]
class Choice extends Model
{
    use HasFactory;

    public function quiz(){
        return $this->belongsTo(Quiz::class);
    }
}

<?php

namespace App\Classes\ResponceObjects;

use App\Models\Category;
use JsonSerializable;

final class CategoryResponceObject implements JsonSerializable
{
    public function __construct(private Category $category){}
    public function jsonSerialize() : mixed {
        return [
            "id"=>$this->category->id,
            "name"=>$this->category->name
        ];
    }
}


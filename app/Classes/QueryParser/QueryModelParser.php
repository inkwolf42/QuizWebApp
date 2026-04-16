<?php

namespace App\Classes\QueryParser;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class QueryModelParser implements QueryParser
{
    public function __construct(private Builder $query)
    {
    }

    public function parse(): Builder
    {
        return $this->query;
    }
}

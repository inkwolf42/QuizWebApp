<?php

namespace App\Classes\QueryParser;

use Illuminate\Database\Eloquent\Builder;

interface QueryParser
{
    public function parse():Builder;
}

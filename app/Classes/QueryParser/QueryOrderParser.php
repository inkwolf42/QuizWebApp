<?php

namespace App\Classes\QueryParser;

use Illuminate\Database\Eloquent\Builder;
use Symfony\Component\HttpFoundation\Request;

class QueryOrderParser implements QueryParser
{
    public function __construct(private QueryParser $query_parser,private Request $request)
    {
    }

    public function parse(): Builder
    {

        $query = $this->query_parser->parse();
        $sort = $this->request->orderBy ?? 'created_at';
        $direction = $this->request->orderDirection ?? 'desc';

        $query->orderBy($sort,$direction);

        return $query;
    }
}

<?php

namespace App\Classes\QueryParser;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class QuerySearchParser implements QueryParser
{
    public function __construct(
        private QueryParser $query_parser,
        private Request $request,
        private string $col_name = "name"
    )
    {
    }

    public function parse(): Builder
    {
        $query = $this->query_parser->parse();

        if($this->request->search && $this->request->search!=""){
            $query->where($this->col_name,"like","%{$this->request->search}%");
        }

        return $query;
    }
}

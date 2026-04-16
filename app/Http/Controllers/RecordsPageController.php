<?php

namespace App\Http\Controllers;

use App\Classes\QueryParser\QueryModelParser;
use App\Classes\QueryParser\QueryOrderParser;
use App\Classes\QueryParser\QuerySearchParser;
use App\Models\Record;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RecordsPageController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $query = new QueryModelParser(Record::query());

        $query = new QuerySearchParser($query,$request,"user_name");

        $query = new QueryOrderParser($query,$request);

        $records = $query->parse()->with("quizzes")->paginate(10)->withQueryString();
        
        return Inertia::render("Admin/Records",[
            "recordes"=>$records,
            "filters"=>$request->only([
                "orderBy",
                "orderDirection",
                "search",
                "category",
            ]),
            "orderByList"=>Record::orederByList()
        ]);
    }
}

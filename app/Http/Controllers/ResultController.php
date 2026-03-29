<?php

namespace App\Http\Controllers;

use App\Classes\SessionObjects\ResultSessionObject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResultController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {

        $resultSession = new ResultSessionObject($request);

        $result = $resultSession->get();

        return Inertia::render("User/Result",[
            "result"=>$result
        ]);
    }
}

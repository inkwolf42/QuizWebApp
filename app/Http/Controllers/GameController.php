<?php

namespace App\Http\Controllers;

use App\Classes\ResponceObjects\GameReponceObject;
use App\Classes\SessionObjects\QuizSessionObject;
use App\Classes\SessionObjects\ResultSessionObject;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class GameController extends Controller
{
    function page(Request $request,int $id = 0){
        $quizSession = new QuizSessionObject($request);

        $game = $quizSession->get();


        $n=count($game->getQuizez());

        if($id>=$n){
            redirect()->route("quiz");
        }
        return Inertia::render("User/Quiz"
        ,[
            "game"=>$quizSession->json(),
            "current_index"=>$id,
            "next"=>($id==$n-1)?-1:$id+1,
            "prev"=>$id-1,
            "targetUrl"=>route("quiz.submit",["id"=>$id])
        ]);
    }

    function submit(Request $request,int $id){
        $validated = $request->validate([
            "choices"=>"array|required",
            "choices.*"=>"boolean",
            "next"=>"required|string",
            "next_arg"=>"int",
        ]);
        $quizSession = new QuizSessionObject($request);

        $game = $quizSession->get();

        if($game->hasEnded()){
            return redirect()->route("quiz.finish");
        }

        // dd($game);

        $game->setChoices($id,$validated["choices"]);

        $quizSession->set($game);

        // dd($validated["next_arg"]);
        if($validated["next_arg"]!=null && $validated["next_arg"]!=-1)
            return redirect()->route($validated["next"],["id"=>$validated["next_arg"]]);

        return redirect()->route($validated["next"]);
    }

    function finish(Request $request){
        // dd("jjjj");
        $quizSession = new QuizSessionObject($request);

        $game = $quizSession->get();

        $result = $game->evaluation();

        $quizSession->forogtCache();

        $resultSession = new ResultSessionObject($request);

        $result->saveToDatabase($request);

        $resultSession->set($result);

        return redirect()->route("result");
    }
}

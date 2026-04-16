<?php

namespace App\Http\Controllers;

use App\Classes\QuizSelector\AnyQuizSelector;
use App\Classes\QuizSelector\CategoryQuizSelector;
use App\Classes\QuizSelector\QuizSelector;
use App\Classes\ResponceObjects\CategoryResponceObject;
use App\Classes\ResponceObjects\GameReponceObject;
use App\Classes\ResponceObjects\QuizAttemptResponceObject;
use App\Classes\SessionObjects\CachableArray;
use App\Classes\SessionObjects\QuizSessionObject;
use App\Classes\SessionObjects\UsernameSessionObject;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use QuizHandler;

use function Illuminate\Support\now;

class ConfigController extends Controller
{
    function page(Request $request){

        $request->session()->forget("quiz");

        $usernameSession = new UsernameSessionObject($request);

        return Inertia::render("User/Config",[
            "targetUrl"=>route("start.quiz"),
            "user"=>$usernameSession->json(),
            "Categories"=>Category::all()
        ]);
    }

    function startquiz(Request $request){
        $values = $request->validate(
            [
                "selectedCatigories"=>"array|max:5",
                "selectedCatigories.*"=>"integer",
                "questions"=>"required|integer|min:1|max:50",
                "negative"=>"required|boolean",
                "limitedTime"=>"required|int"
            ]
        );

        $categoryIds = array_map('intval', $values['selectedCatigories']);
        $quizes_length = $values["questions"];
        $quizes = [];
        $quizSession = new QuizSessionObject($request);


        if($categoryIds!=null && count($categoryIds)!=0){
            $selactor = new CategoryQuizSelector($categoryIds,$quizes_length);
        }else{
            $selactor = new AnyQuizSelector($quizes_length);
        }

        $quizes = $selactor->pickRandom();

        

        $quizSession->set(new GameReponceObject(
            new CachableArray($quizes, new QuizAttemptResponceObject()),
            $values["negative"],
            $values["limitedTime"]
        ));



        return redirect()->route("quiz");

    }
}

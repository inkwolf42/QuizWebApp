<?php

namespace App\Http\Controllers;

use App\Enums\DifficultyEnum;
use App\Models\Category;
use App\Models\Quiz;
use App\Rules\AnswerArrayConditional;
use App\Rules\CategoryOrMinusOne;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class QuizController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $quizzes = Quiz::with("category")->paginate(10);

        return Inertia::render("Admin/Quizzes",[
            "page"=>$quizzes,
            // "quiz_show_url"=>route("admin.dashboard.quiz")
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        return Inertia::render("Admin/CreatePage",[
            "categories"=>$categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            "category_id"=>["required","integer",new CategoryOrMinusOne()],
            "question"=>"required|string|min:5|max:255",
            "difficulty"=>["required",Rule::in(array_map(fn($case) => $case->value, DifficultyEnum::cases()))],
            "has_multi_answer"=>["required","boolean"],
            "choices"=>["required","array","min:2","max:8",new AnswerArrayConditional($request->has_multi_answer)],
            "choices.*.answer"=>"required|string|max:50",
            "choices.*.is_correct"=>"required|boolean",
        ],[
            // "choices.*.answer.min"=>"the choice has to be atleast 5 charachters",
            "choices.*.answer.max"=>"the choice has to be less then 50 charachters",
            "choices.max"=>"the choices can't be more than 8 choices",
            "choices.min"=>"the choices can't be less than 2 choices",
        ]);

        $quiz = Quiz::create([
            "category_id"=>$data["category_id"]==-1?null:$data["category_id"],
            "question"=>$data["question"],
            "difficulty"=>$data["difficulty"],
            "has_multi_answer"=>$data["has_multi_answer"],
        ]);

        foreach ($data["choices"] as $qData) {
            $quiz->choices()->create([
                'answer' => $qData['answer'],
                'is_correct' => $qData['is_correct'],
            ]);
        }

        return Inertia::location(route("admin.dashboard.quiz",["quiz"=>$quiz->id]), 302, ['replace' => true]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Quiz $quiz)
    {
        $quiz->load(["category","choices"]);
        return Inertia::render("Admin/QuizPage",[
            "quiz"=>$quiz
        ]);
    }

    /**
     * Show the form for editing the specified resource.
    */
    public function edit(Quiz $quiz)
    {
        $quiz->load(["choices"]);
        $categories = Category::all();
        return Inertia::render("Admin/ModifyPage",[
            "categories"=>$categories,
            "quiz"=>$quiz
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Quiz $quiz)
    {

        $data = $request->validate([
            "category_id"=>["required","integer",new CategoryOrMinusOne()],
            "question"=>"required|string|min:5|max:255",
            "difficulty"=>["required",Rule::in(array_map(fn($case) => $case->value, DifficultyEnum::cases()))],
            "has_multi_answer"=>["required","boolean"],
            "choices"=>["required","array","min:2","max:8",new AnswerArrayConditional($request->has_multi_answer)],
            "choices.*.answer"=>"required|string|max:50",
            "choices.*.is_correct"=>"required|boolean",
        ],[
            // "choices.*.answer.min"=>"the choice has to be atleast 5 charachters",
            "choices.*.answer.max"=>"the choice has to be less then 50 charachters",
            "choices.max"=>"the choices can't be more than 8 choices",
            "choices.min"=>"the choices can't be less than 2 choices",
        ]);

        $quiz->update([
            "category_id"=>$data["category_id"]==-1?null:$data["category_id"],
            "question"=>$data["question"],
            "difficulty"=>$data["difficulty"],
            "has_multi_answer"=>$data["has_multi_answer"],
        ]);

        DB::transaction(function () use($quiz,$data) {
            $quiz->choices()->delete();
            foreach ($data["choices"] as $qData) {
                $quiz->choices()->create([
                    'answer' => $qData['answer'],
                    'is_correct' => $qData['is_correct'],
                ]);
            }
        });

        return Inertia::location(route("admin.dashboard.quiz",["quiz"=>$quiz->id]), 302, ['replace' => true]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Quiz $quiz)
    {
        $quiz->delete();

        return redirect()->route('admin.dashboard');
    }
}

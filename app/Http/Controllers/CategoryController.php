<?php

namespace App\Http\Controllers;

use App\Classes\Logger\CategoryChangeLogger;
use App\Classes\QueryParser\QueryModelParser;
use App\Classes\QueryParser\QueryOrderParser;
use App\Classes\QueryParser\QuerySearchParser;
use App\Classes\SessionObjects\AdminSession;
use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = new QueryModelParser(Category::query());

        $query = new QuerySearchParser($query,$request);

        $query = new QueryOrderParser($query,$request);

        $categories = $query->parse()->withCount("quizzes")->paginate(10)->withQueryString();


        return Inertia::render("Admin/Categories",[
            "categories"=>$categories,
            "filters"=>$request->only([
                "orderBy",
                "orderDirection",
                "search",
                "category",
            ]),
            "orderByList"=>Category::orederByList()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Admin/CategoryCreate");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $values = $request->validate([
            "name" =>"required|string|max:25|regex:/^[a-zA-Z0-9_]+$/",
            "icon" =>"required|string|max:25",
            "color"=>"required|string|regex:/^#[0-9a-fA-F]{6}$/",
        ]);

        $category=Category::create($values);


        $adminSession = new AdminSession($request);
        $admin = User::find($adminSession->get()->getId());
        $logger = CategoryChangeLogger::getInstance();
        $logger->logCreate($request,$admin,$category);

        return Inertia::location(route("admin.dashboard.categories"));
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {

        return Inertia::render("Admin/CategoryEdit",[
            "category"=>$category
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {

        $values = $request->validate([
            "name" =>"required|string|max:25|regex:/^[a-zA-Z0-9_]+$/",
            "icon" =>"required|string|max:25",
            "color"=>"required|string|regex:/^#[0-9a-fA-F]{6}$/",
        ]);

        $category->update($values);


        $adminSession = new AdminSession($request);
        $admin = User::find($adminSession->get()->getId());
        $logger = CategoryChangeLogger::getInstance();
        $logger->logChange($request,$admin,$category);


        return Inertia::location(route("admin.dashboard.categories"));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request,Category $category)
    {

        $adminSession = new AdminSession($request);
        $admin = User::find($adminSession->get()->getId());
        $logger = CategoryChangeLogger::getInstance();
        $logger->logDeleted($request,$admin,$category);

        $category->delete();
    }
}

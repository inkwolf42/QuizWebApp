<?php

use App\Http\Controllers\AdminProfilePageController;
use App\Http\Controllers\AdminProfileUpdateController;
use App\Http\Controllers\Auth\AdminAuthController;
use App\Http\Controllers\Auth\UserLoginController;
use App\Http\Controllers\Auth\UserLogoutController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ConfigController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\HomePageController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\RecordsPageController;
use App\Http\Controllers\ResultController;
use App\Http\Middleware\EnsureAdminIsLogedIn;
use App\Http\Middleware\EnsureAdminIsLogedOut;
use App\Http\Middleware\HasQuizSession;
use App\Http\Middleware\HasResultSession;
use App\Http\Middleware\NameIsNotSet;
use App\Http\Middleware\NameIsSet;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(NameIsNotSet::class)->middleware(EnsureAdminIsLogedOut::class)->group(function(){
    Route::get("/",HomePageController::class)->name("home");
    Route::post("/user_login",UserLoginController::class)->name("user.login");

    Route::get("/admin_login_page",[AdminAuthController::class,'page'])->name("admin.login.page");
    Route::post("/admin_login",[AdminAuthController::class,'login'])->name("admin.login");
});

Route::middleware(EnsureAdminIsLogedIn::class)->group(function(){
    Route::post("/admin_logout",[AdminAuthController::class,'logout'])->name("admin.logout");
    Route::get("/admin_dashboard",[QuizController::class,"index"])->name("admin.dashboard");
    Route::get("/admin_quiz/create",[QuizController::class,"create"])->name("admin.dashboard.quiz.create");
    Route::post("/admin_quiz/create",[QuizController::class,"store"])->name("admin.dashboard.quiz.store");
    Route::get("/admin_quiz/{quiz}",[QuizController::class,"show"])->name("admin.dashboard.quiz");
    Route::get("/admin_quiz/edit/{quiz}",[QuizController::class,"edit"])->name("admin.dashboard.quiz.edit");
    Route::put("/admin_quiz/edit/{quiz}",[QuizController::class,"update"])->name("admin.dashboard.quiz.edit");
    Route::delete("/admin_quiz/{quiz}",[QuizController::class,"destroy"])->name("admin.dashboard.quiz.delete");

    Route::get("/admin/categories",[CategoryController::class,"index"])->name("admin.dashboard.categories");
    Route::get("/admin/category",[CategoryController::class,"create"])->name("admin.dashboard.categories.create");
    Route::get("/admin/category/{category}",[CategoryController::class,"edit"])->name("admin.dashboard.categories.edit");
    Route::post("/admin/category",[CategoryController::class,"store"])->name("admin.dashboard.categories.store");
    Route::put("/admin/category/{category}",[CategoryController::class,"update"])->name("admin.dashboard.categories.update");
    Route::delete("/admin/category/{category}",[CategoryController::class,"destroy"])->name("admin.dashboard.categories.delete");

    Route::get("/admin/profile",AdminProfilePageController::class)->name("admin.dashboard.profile");
    Route::post("/admin/profile",AdminProfileUpdateController::class)->name("admin.dashboard.profile");

    Route::get("/admin/records",RecordsPageController::class)->name("admin.dashboard.records");
});

Route::middleware(NameIsSet::class)->group(function(){
    Route::get("/config",[ConfigController::class,'page'])->name("config");
    Route::post("/config/start_quiz",[ConfigController::class,'startquiz'])->name("start.quiz");

    Route::post("/user_logout",UserLogoutController::class)->name("user.logout");

    Route::middleware(HasQuizSession::class)->group(function(){
        Route::post("/quiz/submit/{id}",[GameController::class,'submit'])->name("quiz.submit");
        Route::get("/quiz/finish",[GameController::class,'finish'])->name("quiz.finish");
        Route::get("/quiz/{id?}",[GameController::class,'page'])->name("quiz")->defaults("id",0);
    });

    Route::middleware(HasResultSession::class)->group(function(){
        Route::get("/result",ResultController::class)->name("result");
    });
});


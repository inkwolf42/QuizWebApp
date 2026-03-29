<?php

use App\Http\Controllers\Auth\UserNameLoginController;
use App\Http\Controllers\ConfigController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\HomePageController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\ResultController;
use App\Http\Middleware\HasQuizSession;
use App\Http\Middleware\HasResultSession;
use App\Http\Middleware\NameIsNotSet;
use App\Http\Middleware\NameIsSet;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(NameIsNotSet::class)->group(function(){
    Route::get("/",HomePageController::class)->name("home");
    Route::post("/user_login",UserNameLoginController::class)->name("user.login");
});

Route::middleware(NameIsSet::class)->group(function(){
    Route::get("/config",[ConfigController::class,'page'])->name("config");
    Route::post("/config/start_quiz",[ConfigController::class,'startquiz'])->name("start.quiz");

    Route::post("/user_logout",LogoutController::class)->name("user.logout");

    Route::middleware(HasQuizSession::class)->group(function(){
        Route::post("/quiz/submit/{id}",[GameController::class,'submit'])->name("quiz.submit");
        Route::get("/quiz/finish",[GameController::class,'finish'])->name("quiz.finish");
        Route::get("/quiz/{id?}",[GameController::class,'page'])->name("quiz")->defaults("id",0);
    });

    Route::middleware(HasResultSession::class)->group(function(){
        Route::get("/result",ResultController::class)->name("result");
    });
});


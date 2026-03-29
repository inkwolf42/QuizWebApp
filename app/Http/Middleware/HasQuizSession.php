<?php

namespace App\Http\Middleware;

use App\Classes\SessionObjects\QuizSessionObject;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class HasQuizSession
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $quizSession = new QuizSessionObject($request);

        if(!$quizSession->hasCache()){
            return redirect()->route("config");
        }

        return $next($request);
    }
}

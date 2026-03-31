<?php

namespace App\Http\Middleware;

use App\Classes\SessionObjects\AdminSession;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureAdminIsLogedIn
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $adminSession = new AdminSession($request);
        if($adminSession->hasCache()){
            return $next($request);
        }
        return redirect()->route("home");
    }
}

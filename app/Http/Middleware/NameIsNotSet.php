<?php

namespace App\Http\Middleware;

use App\Classes\SessionObjects\UsernameSessionObject;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

class NameIsNotSet
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $usernameSessionobject = new UsernameSessionObject($request);

        if(
            !$usernameSessionobject->has()
        ){
            return $next($request);
        }
        return redirect()->route("config");
    }
}

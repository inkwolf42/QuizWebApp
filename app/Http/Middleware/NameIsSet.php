<?php

namespace App\Http\Middleware;

use App\Classes\SessionObjects\UsernameSessionObject;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class NameIsSet
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $usernameSessionobject= new UsernameSessionObject($request);

        if(
            $usernameSessionobject->has()
        ){
            return $next($request);
        }
        return redirect()->route("home");
    }
}

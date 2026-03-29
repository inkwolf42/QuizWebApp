<?php

namespace App\Http\Middleware;

use App\Classes\SessionObjects\ResultSessionObject;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class InvalidResultIfExists
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $resultSession = new ResultSessionObject($request);

        $resultSession->forogt();

        return $next($request);
    }
}

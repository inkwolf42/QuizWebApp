<?php

namespace App\Http\Controllers\Auth;

use App\Classes\SessionObjects\UsernameSessionObject;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class UserLoginController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $validated = $request->validate([
            "name"=>["required","min:5","string","max:50","regex:/^[A-Za-z0-9_]+$/"]
        ]);


        $usernameSessionobject= new UsernameSessionObject($request);
        $usernameSessionobject->set($validated["name"]);

        return redirect()->route("config");
    }
}

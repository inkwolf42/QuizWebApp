<?php

namespace App\Http\Controllers;

use App\Classes\SessionObjects\UsernameSessionObject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomePageController extends Controller
{
    public function __invoke(Request $request)
    {
        // $usernameSessionobject = new UsernameSessionObject($request);

        // dd(
        //     $usernameSessionobject->has()
        // );
        return Inertia::render("User/Home",[
            "targetUrl"=>route("user.login")
        ]);
    }
}

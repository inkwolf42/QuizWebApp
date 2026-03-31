<?php

namespace App\Http\Controllers\Auth;

use App\Classes\Cashable\AdminCachable;
use App\Classes\SessionObjects\AdminSession;
use App\Classes\SessionObjects\UsernameSessionObject;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class AdminAuthController extends Controller
{

    public function page(Request $request)
    {
        return Inertia::render("Admin/AuthPage",[
            "targetUrl"=>route("admin.login")
        ]);
    }

    public function login(Request $request)
    {
        $data=$request->validate([
            'name' => ['required', 'string', 'max:255'],
            'password' => ['required', 'string'],
        ]);

        if(Auth::attempt($request->only('name', 'password'))){
            $adminSession = new AdminSession($request);
            $adminSession->set(new AdminCachable($data["name"]));
            return redirect()->route("admin.dashboard");
        }
        throw ValidationException::withMessages([
            "credentials"=>"Invalid credentials",
        ]);

    }

    public function logout(Request $request)
    {
        $adminSession = new AdminSession($request);
        $adminSession->forogtCache();

        $request->session()->invalidate();
        redirect()->route("home");
    }
}

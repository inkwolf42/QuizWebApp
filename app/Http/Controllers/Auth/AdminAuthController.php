<?php

namespace App\Http\Controllers\Auth;

use App\Classes\Cashable\AdminCachable;
use App\Classes\Logger\AdminLogginLogger;
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

        $logger = AdminLogginLogger::getInstance();

        if(Auth::attempt($request->only('name', 'password'))){
            $request->session()->regenerate();
            $user = Auth::user();
            $adminSession = new AdminSession($request);
            $adminSession->set(new AdminCachable($user->id,$user->name));

            $logger->logSuccses($request,$user);

            return redirect()->route("admin.dashboard");
        }
        $logger->logAttmpt($request,$data["name"]);
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

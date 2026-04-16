<?php

namespace App\Http\Controllers;

use App\Classes\Logger\AdminLogginLogger;
use App\Classes\SessionObjects\AdminSession;
use App\Models\User;
use App\Rules\OldPasswordChecked;
use App\Rules\ValidName;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class AdminProfileUpdateController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $adminSession = new AdminSession($request);
        $admin = User::find($adminSession->get()->getId());


        $request->validate([
            "name"=>["required","string","min:3","max:25",new ValidName($admin)],
            "old_password"=>["required","string",new OldPasswordChecked($admin)],
            "password"=>[
                "confirmed",
                "required",
                "string",
                Password::min(8)
                ->mixedCase()
                ->numbers()
            ]
        ]);

        $logger = AdminLogginLogger::getInstance();
        $logger->logPasswordChanged($request,$admin);

        $admin->update($request->only("name","password"));

    }
}

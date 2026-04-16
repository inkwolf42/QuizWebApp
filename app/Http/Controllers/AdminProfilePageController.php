<?php

namespace App\Http\Controllers;

use App\Classes\SessionObjects\AdminSession;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class AdminProfilePageController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $adminSession = new AdminSession($request);

        return Inertia::render("Admin/ProfilePage",["name"=>$adminSession->get()->getName()]);

    }
}

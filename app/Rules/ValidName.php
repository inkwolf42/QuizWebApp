<?php

namespace App\Rules;

use App\Classes\SessionObjects\AdminSession;
use App\Models\User;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Translation\PotentiallyTranslatedString;

class ValidName implements ValidationRule
{
    public function __construct(private User $admin){}
    /**
     * Run the validation rule.
     *
     * @param  Closure(string, ?string=): PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if ($value!=$this->admin->name) {
            if(User::where("name",$value)->exists())
                $fail("Username is Already Taken");
        }
    }
}

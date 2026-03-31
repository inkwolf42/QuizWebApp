<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Translation\PotentiallyTranslatedString;

class AnswerArrayConditional implements ValidationRule
{
    public function __construct(private bool $hasMultiple)
    {
    }
    /**
     * Run the validation rule.
     *
     * @param  Closure(string, ?string=): PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $trueCount = count(array_filter($value,fn($choice) => $choice["is_correct"]));

        if ($this->hasMultiple && $trueCount < 1) {
            $fail('At least one true value is required.');
        }

        if (!$this->hasMultiple && $trueCount !== 1) {
            $fail('Exactly one true value is required.');
        }
    }
}

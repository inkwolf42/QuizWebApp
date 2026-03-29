<?php

namespace App\Classes\QuizSelector;


abstract class QuizSelector{
    function __construct(
        protected int $size
    ){}

    abstract public function pickRandom();
}

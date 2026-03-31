<?php

namespace App\Classes\Cashable;

interface Cachable{
    public function toCache() : array;
    public function fromCache(array $input);
}

<?php

namespace App\Classes\SessionObjects;

interface Cachable{
    public function toCache() : array;
    public function fromCache(array $input);
}

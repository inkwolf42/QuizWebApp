<?php

namespace App\Classes\Cashable;

use JsonSerializable;

final class AdminCachable implements JsonSerializable,Cachable{

    public function __construct(
        private string $name
    ){}

    public function toCache() : array{
        return [
            "name"=>$this->name
        ];
    }
    public function fromCache(array $input){
        $this->name = $input["name"];

        return $this;
    }
    public function jsonSerialize():mixed{
        return $this->toCache();
    }
}


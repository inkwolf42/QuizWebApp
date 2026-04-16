<?php

namespace App\Classes\Cashable;

use JsonSerializable;

final class AdminCachable implements JsonSerializable,Cachable{

    public function __construct(
        private int $id,
        private string $name
    ){}

    public function getId():int{return $this->id;}
    public function getName():string{return $this->name;}

    public function toCache() : array{
        return [
            "id"=>$this->id,
            "name"=>$this->name
        ];
    }
    public function fromCache(array $input){
        $this->id = $input["id"];
        $this->name = $input["name"];

        return $this;
    }
    public function jsonSerialize():mixed{
        return $this->toCache();
    }
}


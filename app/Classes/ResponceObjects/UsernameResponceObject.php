<?php

namespace App\Classes\ResponceObjects;

use JsonSerializable;

final class UsernameResponceObject implements JsonSerializable
{
    public function __construct(private string $username){}
    public function jsonSerialize() : mixed {
        return [
            "username"=>$this->username
        ];
    }
}


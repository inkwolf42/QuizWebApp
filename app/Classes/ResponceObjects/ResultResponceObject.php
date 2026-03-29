<?php

namespace App\Classes\ResponceObjects;

use App\Classes\SessionObjects\Cachable;
use App\Models\Quiz;
use JsonSerializable;

final class ResultResponceObject implements JsonSerializable
{


    public function __construct(
        private int $notAnswred,
        private int $correct,
        private int $worng,
        private int $time,
        private int $startingTime,
    ){}

    public function jsonSerialize() : mixed {
        return [
            "notAnswred"=>$this->notAnswred,
            "correct"=>$this->correct,
            "worng"=>$this->worng,
            "time"=>$this->time,
            "startingTime"=>$this->startingTime,
        ];
    }

}


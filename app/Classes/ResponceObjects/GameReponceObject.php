<?php

namespace App\Classes\ResponceObjects;

use App\Classes\Cashable\Cachable;
use App\Classes\ResponceObjects\QuizAttemptResponceObject;
use App\Classes\SessionObjects\CachableArray;
use JsonSerializable;

final class GameReponceObject implements JsonSerializable,Cachable{

    private $startingTime;

    public function __construct(
        private CachableArray $quizez,
        private bool $negative,
        private int $limitedTime
    ){
        $this->startingTime = now()->timestamp;
    }

    public function getQuizez(){
        return $this->quizez->getArray();
    }

    public function setChoices(int $id,array $choices){
        $quizez = $this->getQuizez();
        $n=count($quizez);

        if($id>=$n){
            redirect()->route("quiz");
        }

        $quizez[$id]->setChoices($choices);
    }

    public function jsonSerialize() : mixed {
        return [
            "negative"=>$this->negative,
            "limitedTime"=>$this->limitedTime,
            "startingTime"=>$this->startingTime,
            "quizez"=>array_map(fn(QuizAttemptResponceObject $item)=>$item->jsonSerialize() , $this->getQuizez()),
        ];
    }

    public function toCache() : array {
        return [
            "negative"=>$this->negative,
            "limitedTime"=>$this->limitedTime,
            "startingTime"=>$this->startingTime,
            "quizez"=>$this->quizez->toCache(),
        ];
    }

    public function fromCache(array $input):self{
        $this->negative = $input["negative"];
        $this->limitedTime = $input["limitedTime"];
        $this->startingTime = $input["startingTime"];
        $this->quizez->fromCache($input["quizez"]);
        return $this;
    }

    public function evaluation(){
        $notAnswred = 0;
        $correct = 0;
        $worng = 0;

        foreach($this->getQuizez() as $quizez){
            switch ($quizez->evaluation()) {
                case -1:$worng++;break;
                case 0:$notAnswred++;break;
                case 1:$correct++;break;
            }
        }

        $score = $this->negative?max($correct-$worng,0):$correct;

        $quizez = $this->quizez->getArray();

        $n = count($quizez);
        $result = round($score/$n*100);

        return new ResultResponceObject(
            $notAnswred,
            $correct,
            $worng,
            $result,
            now()->timestamp - $this->startingTime,
            $this->startingTime,
            $this->negative,
            $quizez
        );
    }

    public function hasEnded(){
        return $this->limitedTime<0?false:now()->timestamp>$this->startingTime+$this->limitedTime;
    }
}


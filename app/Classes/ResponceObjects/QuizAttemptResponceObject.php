<?php

namespace App\Classes\ResponceObjects;

use App\Classes\Cashable\Cachable;
use App\Models\Quiz;
use JsonSerializable;

final class QuizAttemptResponceObject implements JsonSerializable,Cachable
{
    private bool $attampted = false;

    public function __construct(private int $quizId = -1,private ?array $choices=null){
        if($quizId==-1)return;
        if ($choices==null){
            $this->choices = Quiz::find($quizId)->choices->map(fn($item)=>new ChoiceResponceObject($item->id))->all();
        }
        // dd($this->choices);
    }

    public function jsonSerialize() : mixed {
        $quiz = Quiz::find($this->quizId);
        return [
            "id"=>$quiz->id,
            "question"=>$quiz->question,
            "difficulty"=>$quiz->difficulty,
            "has_multi_answer"=>$quiz->has_multi_answer,
            "attampted"=>$this->attampted,
            "choices"=>$this->choices,
        ];
    }

    public function toCache() : array {
        return [
            "id"=>$this->quizId,
            "attampted"=>$this->attampted,
            "choices"=>array_map(fn(ChoiceResponceObject $item) => $item->toCache(),$this->choices),
        ];
    }

    public function fromCache(array $input):self{
        // dd($input);
        $this->quizId = $input["id"];
        $this->attampted = $input["attampted"];
        $this->choices = array_map(function($item){
            $obj = new ChoiceResponceObject();
            $obj->fromCache($item);
            return $obj;
        },$input["choices"]);
        return $this;
    }


    public function setChoices(array $answers){

        $this->attampted = false;
        foreach($answers as $index=>$answer){
            $this->choices[$index]->setSelected($answer);
            if($answer)$this->attampted=true;
        }
    }

    public function evaluation(){
        if(!$this->attampted)return 0;
        $quiz = Quiz::find($this->quizId);

        foreach($quiz->choices as $index=>$answer){
            if ($this->choices[$index]->isSelected()!=$answer->is_correct)return -1;
        }

        return 1;
    }


}


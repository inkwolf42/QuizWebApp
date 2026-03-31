<?php

namespace App\Classes\ResponceObjects;

use App\Classes\Cashable\Cachable;
use App\Models\Choice;
use JsonSerializable;

final class ChoiceResponceObject implements JsonSerializable,Cachable
{

    public function __construct(private int $choiceId = 0,private bool $selected = false){}

    public function setSelected(bool $selected){
        $this->selected = $selected;
    }

    public function isSelected(){
        return $this->selected;
    }

    public function jsonSerialize() : mixed {
        $choice = Choice::find($this->choiceId);
        return [
            "id"=>$choice->id,
            "answer"=>$choice->answer,
            "selected"=>$this->selected
        ];
    }

    public function toCache() : array {
        return [
            "id"=>$this->choiceId,
            "selected"=>$this->selected
        ];
    }

    public function fromCache(array $input):self{
        $this->choiceId = $input["id"];
        $this->selected = $input["selected"];
        return $this;
    }

}


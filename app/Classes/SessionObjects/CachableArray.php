<?php

namespace App\Classes\SessionObjects;

use App\Classes\Cashable\Cachable;
use Exception;

class CachableArray implements Cachable{

    public function __construct(private array $arr,private Cachable $className){

    }

    public function toCache() : array{
        return array_map(fn($item)=>$item->toCache(),$this->arr);
    }
    public function fromCache(array $input) : self{

        $this->arr = array_map(function($item){
            $obj = clone $this->className;
            // dd($item);
            $obj->fromCache($item);
            return $obj;
        },$input);

        return $this;
    }

    public function getArray(){
        return $this->arr;
    }
}

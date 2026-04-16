<?php

namespace App\Classes;

final class ArraySheffler{
    public function __construct(private int $times = 10)
    {}

    public function shuffle(array $arr){

        for ($i=0; $i < $this->times; $i++) {
            $n = count($arr);
            $arr1 = array_splice($arr,0,$n/2);
            $arr2 = $arr;

            $tmp = [];

            while(!empty($arr1) && !empty($arr2)){
                if(rand(0,1)){
                    $tmp[] = array_pop($arr1);
                }else{
                    $tmp[] = array_pop($arr2);
                }
            }

            $arr = array_merge($tmp , $arr1 , $arr2);

        }

        return $arr;
    }
}


<?php

namespace App\Classes;

final class ArraySheffler{
    public function __construct(private int $times = 10)
    {}

    public function shuffle(array $arr){
        $n = count($arr);
        for ($i=0; $i < $this->times; $i++) {
            $off = rand(1,5);
            $j = $off*2;
            $prev = $arr[$off];
            while($j<$n){
                $temp = $arr[$j];
                $arr[$j] = $prev;
                $prev = $temp;

                $j+=$off;
            }
            $arr[$off] = $prev;
        }
    }
}


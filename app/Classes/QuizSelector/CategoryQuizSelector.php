<?php

namespace App\Classes\QuizSelector;

use App\Classes\ArraySheffler;
use App\Classes\ResponceObjects\QuizAttemptResponceObject;
use App\Models\Category;
use App\Models\Quiz;
use Symfony\Component\HttpKernel\Exception\HttpException;

final class CategoryQuizSelector extends QuizSelector{


    function __construct(private array $categoryIds,int $size)
    {
        return parent::__construct($size);
    }

    public function pickRandom():array{
        $n = ceil($this->size / count($this->categoryIds));

        $arr = [];

        foreach ($this->categoryIds as $categoryId) {
            $arr = array_merge(
                $arr,
                Quiz::where("category_id",$categoryId)->inRandomOrder()->limit($n)->pluck("id")->map(function($quiz){
                    return new QuizAttemptResponceObject($quiz);
                })->all()
            );
        }

        $shuffler = new ArraySheffler();
        $arr = $shuffler->shuffle($arr);

        return array_slice($arr,0,$this->size);
    }
}

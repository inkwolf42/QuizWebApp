<?php

namespace App\Classes\ResponceObjects;

use App\Classes\SessionObjects\Cachable;
use App\Classes\SessionObjects\UsernameSessionObject;
use App\Models\Quiz;
use App\Models\Record;
use Carbon\Carbon;
use Illuminate\Http\Request;
use JsonSerializable;

final class ResultResponceObject implements JsonSerializable
{


    public function __construct(
        private int $not_answred,
        private int $correct,
        private int $worng,
        private int $score,
        private int $time,
        private int $starting_time,
        private bool $negative,
        private array $quizez
    ){}

    public function jsonSerialize() : mixed {
        return [
            "notAnswred"=>$this->not_answred,
            "correct"=>$this->correct,
            "worng"=>$this->worng,
            "score"=>$this->score,
            "time"=>$this->time,
            "startingTime"=>$this->starting_time,
        ];
    }

    public function saveToDatabase(Request $request){
        $usernameSession = new UsernameSessionObject($request);

        $record = Record::create([
            "user_name"=>$usernameSession->get(),
            "not_answred"=>$this->not_answred,
            "correct"=>$this->correct,
            "worng"=>$this->worng,
            "score"=>$this->score,
            "time"=>gmdate("H:i:s",$this->time),
            "starting_time"=>Carbon::createFromTimestamp($this->starting_time),
            "negative"=>$this->negative,
        ]);
        $quizezIds = array_map(fn($item) => $item->getId(),$this->quizez);
        $record->quizzes()->attach($quizezIds);
    }

}


<?php

namespace App\Classes\SessionObjects;

use App\Classes\ResponceObjects\GameReponceObject;
use App\Classes\ResponceObjects\QuizAttemptResponceObject;
use App\Classes\ResponceObjects\QuizResponceObject;
use App\Models\Quiz;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpKernel\Exception\HttpException;

class ResultSessionObject extends SessionObject{
    private $cache = null;

    public function __construct(protected Request $request){}


    public function key():string{
        return "result";
    }

    public function get(){
        if($this->cache!=null)return $this->cache;

        if(!$this->has())return null;

        $this->cache = $this->request->session()->get($this->key());

        return $this->cache;
    }

    public function set($input){


        $this->cache = $input;


        $this->request->session()->put($this->key(),$this->cache);
    }

    public function json():mixed{
        $data = $this->get();
        return $data->jsonSerialize();
    }
}

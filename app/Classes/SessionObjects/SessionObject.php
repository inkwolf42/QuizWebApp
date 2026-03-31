<?php

namespace App\Classes\SessionObjects;

use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpKernel\Exception\HttpException;

abstract class SessionObject{

    public function __construct(protected Request $request){}

    abstract function key():string;

    abstract function get();
    abstract function set($input);
    abstract function json():mixed;

    function has():bool{
        return $this->request->session()->has($this->key());
    }


    function forogt(){
        $this->request->session()->forget($this->key());
    }
}

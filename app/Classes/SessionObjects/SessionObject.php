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

    function hasCache():bool{
        if(!$this->has()){
            return false;
        }
        $uuid = $this->request->session()->get($this->key());
        if(!Cache::has($uuid)){
            $this->forogt();
            return false;
        }
        return true;
    }

    function forogt(){
        $this->request->session()->forget($this->key());
    }

    function forogtCache(){
        $uuid = $this->request->session()->get($this->key());
        Cache::forget($uuid);
        $this->forogt();
    }

    function storeInCache(Cachable $value,$time = 3600){
        $uuid = uuid_create();
        $this->request->session()->put($this->key(),$uuid);
        Cache::put($uuid, $value->toCache(), $time);
    }

    function loadFromCache(Cachable $cashabelObject){


        $uuid = $this->request->session()->get($this->key());
        $data = Cache::get($uuid,null);
        if($data==null)throw new HttpException(408,"Session Expaierd.");
        return $cashabelObject->fromCache($data);
    }
}

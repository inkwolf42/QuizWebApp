<?php

namespace App\Classes\SessionObjects;

use App\Classes\Cashable\AdminCachable;
use App\Classes\ResponceObjects\GameReponceObject;
use App\Classes\ResponceObjects\QuizAttemptResponceObject;
use Illuminate\Http\Request;


class AdminSession extends CachableSession{
    private $cache = null;

    public function key():string{
        return "admin_session";
    }

    public function get(){
        if($this->cache!=null)return $this->cache;

        if(!$this->has())return null;

        $this->cache = $this->loadFromCache(new AdminCachable(-1,""));

        // dd($this->cache);

        return $this->cache;
    }

    public function set($input){


        $this->cache = $input;

        $this->storeInCache($this->cache);
    }

    public function json():mixed{
        $data = $this->get();
        return $data->jsonSerialize();
    }
}

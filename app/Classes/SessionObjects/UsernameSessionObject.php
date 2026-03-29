<?php

namespace App\Classes\SessionObjects;

use App\Classes\ResponceObjects\UsernameResponceObject;
use Illuminate\Http\JsonResponse;

final class UsernameSessionObject extends SessionObject{
    private ?string $username = null;

    function key():string{
        return "username";
    }

    public function get():string{
        if($this->username==null){
            $this->username = $this->request->session()->get($this->key());
        }
        return $this->username;
    }
    public function set($username){
        $this->request->session()->put($this->key(),$username);
        $this->username = $username;

    }
    public function json():mixed{
        $responce = new UsernameResponceObject($this->get());
        return $responce->jsonSerialize();
    }

}

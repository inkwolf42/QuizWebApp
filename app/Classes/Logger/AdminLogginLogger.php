<?php

namespace App\Classes\Logger;

use App\Models\User;
use Illuminate\Http\Request;

class AdminLogginLogger
{
    private LoggerIF $logger;

    static private ?AdminLogginLogger $instance = null;

    static public function getInstance(){
        if(self::$instance == null){
            self::$instance = new AdminLogginLogger();
        }
        return self::$instance;
    }

    public function __construct()
    {
        $this->logger = new FileLogger("AdminLogs");
    }

    public function logAttmpt(Request $request,string $adminname){
        $ip = $request->getClientIp();
        $this->logger->log("Attempted to Login to admin '$adminname' from ip $ip");
    }
    public function logSuccses(Request $request,User $admin){
        $ip = $request->getClientIp();
        $this->logger->log("Someone Login to admin '$admin->name' with ID '$admin->id' from ip $ip");
    }
    public function logPasswordChanged(Request $request,User $admin){
        $ip = $request->getClientIp();
        $this->logger->log("Someone Changed the password of '$admin->name' with ID '$admin->id' from ip $ip");
    }

}

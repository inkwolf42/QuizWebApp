<?php

namespace App\Classes\Logger;

use App\Models\Quiz;
use App\Models\User;
use Illuminate\Http\Request;

class QuizChangeLogger
{
    private LoggerIF $logger;

    static private ?QuizChangeLogger $instance = null;

    static public function getInstance(){
        if(self::$instance == null){
            self::$instance = new QuizChangeLogger();
        }
        return self::$instance;
    }

    public function __construct()
    {
        $this->logger = new FileLogger("QuizLogs");
    }

    public function logDeleted(Request $request,User $admin,Quiz $quiz){
        $ip = $request->getClientIp();
        $this->logger->log("The Admin '$admin->name' with ip ($ip) deleted the quiz $quiz->question");
    }
    public function logChange(Request $request,User $admin,Quiz $quiz){
        $ip = $request->getClientIp();
        $this->logger->log("The Admin '$admin->name' with ip ($ip) change a Quiz with id $quiz->id");
    }
    public function logCreate(Request $request,User $admin,Quiz $quiz){
        $ip = $request->getClientIp();
        $this->logger->log("The Admin '$admin->name' with ip ($ip) created a Quiz with id $quiz->id");
    }

}

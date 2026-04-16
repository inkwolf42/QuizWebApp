<?php

namespace App\Classes\Logger;

use App\Models\Category;
use App\Models\Quiz;
use App\Models\User;
use Illuminate\Http\Request;

class CategoryChangeLogger
{
    private LoggerIF $logger;

    static private ?CategoryChangeLogger $instance = null;

    static public function getInstance(){
        if(self::$instance == null){
            self::$instance = new CategoryChangeLogger();
        }
        return self::$instance;
    }

    public function __construct()
    {
        $this->logger = new FileLogger("CategoryLogs");
    }

    public function logDeleted(Request $request,User $admin,Category $category){
        $ip = $request->getClientIp();
        $this->logger->log("The Admin '$admin->name' with ip ($ip) deleted the Category $category->name with $category->quizzes_count quiz.");
    }
    public function logChange(Request $request,User $admin,Category $category){
        $ip = $request->getClientIp();
        $this->logger->log("The Admin '$admin->name' with ip ($ip) change a Category with id $category->id");
    }
    public function logCreate(Request $request,User $admin,Category $category){
        $ip = $request->getClientIp();
        $this->logger->log("The Admin '$admin->name' with ip ($ip) created a Category with id $category->id");
    }

}

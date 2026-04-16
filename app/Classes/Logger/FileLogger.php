<?php

namespace App\Classes\Logger;

class FileLogger implements LoggerIF
{
    public function __construct(private string $file_path){}
    public function log(string $input)
    {
        $date = date('Y-m-d H:i:s');
        $month_year = date('Y-m');
        file_put_contents("$this->file_path/$month_year.txt","[$date] $input\n",FILE_APPEND);
    }
}

<?php

namespace App\Classes\Logger;

use Illuminate\Support\Facades\File;

class FileLogger implements LoggerIF
{
    public function __construct(private string $file_path){
        if (!File::exists($this->file_path)) {
            File::makeDirectory($this->file_path, 0755, true, true);
        }
    }
    public function log(string $input)
    {
        if (!File::exists($this->file_path)) {
            File::makeDirectory($this->file_path, 0755, true, true);
        }
        $date = date('Y-m-d H:i:s');
        $month_year = date('Y-m');
        file_put_contents("$this->file_path/$month_year.txt","[$date] $input\n",FILE_APPEND);
    }
}

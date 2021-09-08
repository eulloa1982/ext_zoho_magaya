<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;

class Controller extends BaseController
{
    //functio primera
    function primera () {
        echo 'Primera';
        
    }
    
    function segunda () {
        echo 'segunda';
    }
}

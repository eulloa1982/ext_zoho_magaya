<?php

namespace App\Http\Controllers;

use App\Services\MagayaAPI;
use Exception;
use Illuminate\Http\Request;

class HostController extends Controller
{
    private $host;
    private $magayaAPI;

    public function __construct()
    {


    }



    /***check magaya host */
    public function ping(Request $request)
    {
        $url = $request->get('url');
        try {
            $this->magayaAPI = new MagayaAPI($url);
            return [
                'error'=> false
            ];
        }
        catch (Exception $e){
            return [
                'error'=> true
            ];
        }
    }
}

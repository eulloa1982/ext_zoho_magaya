<?php

namespace App\Http\Middleware;

use Closure;

class IpMiddleware
{

    public function handle($request, Closure $next)
    {

        if ($request->ip() != "204.141.42.49" && $request->ip() != "204.141.32.123") {
        // here instead of checking a single ip address we can do collection of ips
        //address in constant file and check with in_array function
            //return redirect('home');
            //print_r($request->ip());
        }

        return $next($request);
    }

}

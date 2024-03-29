<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
|
*/
$router->post('pdf', 'PDFController@pdf');
$router->post('api', 'APIController@execMethod');
$router->post('createCustomer', 'APIController@createUser');
$router->post('getPorts', 'APIController@GetWorkingPorts');
$router->post('ping', 'HostController@ping');

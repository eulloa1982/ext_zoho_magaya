<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
|
*/

$router->post('api', 'APIController@execMethod');
$router->post('createCustomer', 'APIController@createUser');
$router->post('createPdf', 'APIController@createPdf');
//$router->post('getPorts', 'APIController@GetWorkingPorts');

<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
| test
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->group(['prefix'=> 'tab-widget'], function($router){
    $router->get('/quotations', 'TabWidgetController@quotations');
    //interfaz para widget lista relacionada
    $router->get('/addQuote', 'TabWidgetController@addQuotation');
    $router->get('/configuration', 'TabWidgetController@configuration');
    $router->get('/config-crm', 'TabWidgetController@configCrm');
    $router->get('/editQuote', 'TabWidgetController@editQuotation');
    $router->get('/addCharge', 'TabWidgetController@addCharges');
    $router->get('/addItems', 'TabWidgetController@addItems');
    $router->get('/listMquotes', 'TabWidgetController@listMQuotes');
    $router->get('/pdf', 'TabWidgetController@pdf');

    //$router->get('/qtts', 'TabWidgetController@quotation_ts');
});

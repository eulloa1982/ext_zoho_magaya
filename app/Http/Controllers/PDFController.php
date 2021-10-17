<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade as PDF;

class PDFController extends Controller
{
    public function __construct()
    {


    }



    public function pdf(Request $request) {
        //$data = $request->get('data');
        $data = $request->all();
        //print_r($data);
        $dataPdf = ['name' => $request->all()];
        return PDF::loadView('tab_widget.quotation_pdf', $dataPdf)->setOptions(['defaultFont' => 'sans-serif'])->stream('invoice.pdf');


        //return view ('tab_widget.quote_pdf');
    }
}

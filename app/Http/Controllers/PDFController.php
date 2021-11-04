<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade as PDF;
use Illuminate\Database\Eloquent\Model;

class PDFController extends Controller
{
    public function __construct()
    {


    }



    public function pdf(Request $request) {
        //$data = $request->get('data');
        //$data = $request->all();

        //print_r($data);
        if ($request->isJson()) {
            $a = $request->json()->all();
        } else {
            $a = $request->all();
        }
        $b = $a['organization'];

        $dataPdf = ['organization' => $a['organization']];
        //$charges = ['charges' => $a['charges']];

        return PDF::loadView('tab_widget.quotation_pdf', $dataPdf)->setOptions(['defaultFont' => 'sans-serif', 'isRemoteEnabled' => TRUE])->stream('invoice.pdf');
        //return PDF::loadView('tab_widget.quotation_pdf', $dataPdf)->setOptions(['defaultFont' => 'sans-serif'])->stream('invoice.pdf');


        //return view ('tab_widget.quotation_pdf')->with($dataPdf);
    }
}

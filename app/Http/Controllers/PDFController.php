<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade as PDF;
use App;
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

        $typePdf = "type1";
        if (isset($a['organization']['pdfType']))
            $typePdf = $a['organization']['pdfType'];
        $dataPdf = ['organization' => $a['organization']];
        $nameView = 'quotation_pdf_'.$typePdf;

        if (view() -> exists('tab_widget.'.$nameView))
            return PDF::loadView('tab_widget.'.$nameView, $dataPdf)->setOptions(['defaultFont' => 'sans-serif', 'isRemoteEnabled' => TRUE, 'isHtml5ParserEnabled' => true])->stream('invoice.pdf');
        else
            return view('errors.404');
    }
}

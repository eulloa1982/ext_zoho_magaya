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



    public function pdf() {
        $pdf = PDF::loadView('tab_widget.list_mquotes')->setOptions(['defaultFont' => 'sans-serif']);

        return $pdf->download('invoice.pdf');
        //return view ('tab_widget.quote_pdf');
    }
}

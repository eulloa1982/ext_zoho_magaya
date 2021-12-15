<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
//use tibonilab\Pdf\PdfServiceProvider;
//use Barryvdh\DomPDF\Facade as PDF;

class TabWidgetController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    //new interface testing web form zoho desk
    //public function quotation_ts() {
    //    return view('tab_widget.quotation-list');
    //}

    public function quotations()
    {
        return view('tab_widget.new_qlist');
    }


    //public function shipments()
    //{
    //    return view('tab_widget.shipment');
    //}

    //public function editQuotation ($quotation_guid)
    //{
    //    return view('tab_widget.edit_quotation')->with ('quotation', $quotation_guid);
    //}


    public function configCrm()
    {
        return view('tab_widget.config_crm') ;
    }

    public function configuration()
    {
        return view('tab_widget.configuration');
    }

    public function addQuotation()
    {
        return view('tab_widget.add_quotation');
    }

    public function editQuotation()
    {
        return view('tab_widget.edit_quotation');
    }

    public function addCharges(){
        return view('tab_widget.add_charge');
    }

    public function addItems(){
        return view('tab_widget.add_item');
    }

    public function listMQuotes() {
        return view ('tab_widget.list_mquotes');
    }

    public function pdf() {
        return view ('tab_widget.quote_pdf');
    }

}

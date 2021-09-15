<?php

namespace App\Services;

class XmlMagayaValidator
{
    const  ERROR_CODES = [
        'no_error'                    =>    "API call succeeded",
        'no_status_quotation'         =>    "Quotation does not have a valid Stage.",
        'no_cargo_quotation'          =>    "Quotation must have items cargo.",
        'no_status_item_quotation'    =>    "Items does not have a valid Status. ",
        'no_status_cargo_quotation'   =>    "Cargo does not have a valid Status. ",
        'no_quotation_type'           =>    "Quotation must be No Commerce Type",
        'no_quotation_item_cargo'     =>    "Quotation must have Item or Charge"
        ];

    const TYPES_STATUS_QT = array('Open', 'Posted', 'Empty');

    const TYPES_STATUS_ITEM = array('SoQuote');

    const TYPES_STATUS_CARGO = array('Open', 'Closed');

    public function __construct()
    {

    }


    /*
     *checkXMLSetTransaction
     *
     *@SimpleXMLElement $xml to send to magaya
     *checking if XML have fields required by magaya
     *
     */
    public function checkXMLSetTransaction (\SimpleXMLElement $xml) : array {
        $message = Array();
        if ($xml->IsCommerceQuotation != 'false') {
            $message['error'] = $this::ERROR_CODES['no_quotation_type'];
            return $message;
        }
        /*if (!in_array ($xml->Status, $this::TYPES_STATUS_QT)) {
            $message['error'] = $this::ERROR_CODES['no_status_quotation'];
            return $message;
        }*/

        //items
        /*$items = $xml->Items;

        if ($xml->Items->Item == null){
            //foreach ($xml->Items->Item as $value) {
                //if (!in_array($value, $this::TYPES_STATUS_ITEM))
            $message['error'] = $this::ERROR_CODES['no_status_item_quotation'];
            //}

            return $message;
        }*/
        //cargos
        /*$charges = $xml->Charges;
        if ($charges && @count ($charges->children()) < 0) {
            //foreach ($xml->Charges->Charge as $value) {
                //if (!in_array($value, $this::TYPES_STATUS_CARGO))
                    $message['error'] = $this::ERROR_CODES['no_status_item_quotation'];
           // }
            return $message;
        }*/
        return $message;
    }



}

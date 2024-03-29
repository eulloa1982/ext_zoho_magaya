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
        'no_quotation_item_cargo'     =>    "Quotation must have Item or Charge",
        'no_guid_consignee'           =>    "Consignee has no GUID Attribute",
        'no_guid_contact'           =>    "Probably mquote contact is not a Magaya Customer",
        'no_guid_shipper'           =>    "Shipper has no GUID Attribute",
        'no_guid_carrier'           =>    "Probably mquote carrier is not a Magaya Carrier",
        'no_code_transport'           =>    "No code transport detected",
        'no_transport_method'           =>    "No transport method detected",
        'item_quantity_not_valid'    => "Item quantity must to be greather than 0",
        'item_required'             => "This mquote need a Package Item",
        'charge_required'             => "This mquote need a Charge Item",
        'bad_ccode_origin_port'           => "Country Code in Origin Port is missing",
        'bad_method_origin_port'           => "Method in Origin Port is missing",
        'bad_name_origin_port'           => "Name in Origin Port is missing",
        'bad_name_destination_port'           => "Name inDestination Port is missing",
        'bad_method_destination_port'           => "Method in Destination Port is missing",
        'bad_ccode_destination_port'           => "Country Code in Destination Port is missing"

        ];

    const TYPES_STATUS_QT = array('Open', 'Posted', 'Empty');

    const TYPES_STATUS_ITEM = array('InQuote');

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
        $message_string = '';
        //tipo de cotizacion
        if ($xml->IsCommerceQuotation != 'false') {
            $message['error'][] = $this::ERROR_CODES['no_quotation_type'];
            //return $message;
        }

        //guid del account
        if (empty($xml->Contact[0]['GUID']) || $xml->Contact[0]['GUID'] == null) {
            $message['error'][] = $this::ERROR_CODES['no_guid_contact'];
            //return $message;
        }

        //guid del carrier
        if (!empty($xml->Carrier[0]['GUID']) && $xml->Carrier[0]['GUID'] == "null") {
            $message['error'][] = $this::ERROR_CODES['no_guid_carrier'];
            //return $message;
        }

        //valora si el modo de transportacion esta en null
        //aqui incorporar mas validaciones, como por ejemplo que el mode sea int
        if (!empty($xml->ModeOfTransportation[0]['Code']) && $xml->ModeOfTransportation[0]['Code'] == "null") {
            $message['error'][] = $this::ERROR_CODES['no_code_transport'];
        }

        //estado de la cotizacion
        //open, empty y posted
        if (!in_array ($xml->Status, $this::TYPES_STATUS_QT)) {
            $message['error'][] = $this::ERROR_CODES['no_status_quotation'];
        }

        //items
        $items = $xml->Items;
        //si existe Item, debe existir metodo de transporte
        //el status debe ser valido
        //el item debe enviarse con cantidad > 0
        if (!empty($xml->Items)){
            if (empty($xml->ModeOfTransportation)) {
                $message['error'][] = $this::ERROR_CODES['no_transport_method'];
            }
            foreach ($xml->Items->Item as $value) {
                if (!in_array($value->Status, $this::TYPES_STATUS_ITEM)) {
                    $message['error'][] = $this::ERROR_CODES['no_status_item_quotation'];
                }
                if ($value->Pieces <= 0) {
                    $message['error'][] = $this::ERROR_CODES['item_quantity_not_valid'];

                }
            }

            //return $message;
        }

        //si existe charge debe existir item
        //si existe charge, debe existir metodo de transporte
        if (!empty($xml->Charges)){
            if (empty($xml->Items)) {
                $message['error'][] = $this::ERROR_CODES['item_required'];
            }

            if (empty($xml->ModeOfTransportation)) {
                $message['error'][] = $this::ERROR_CODES['no_transport_method'];
            }
            /*foreach ($xml->Items->Item as $value) {
                if (!in_array($value->Status, $this::TYPES_STATUS_ITEM)) {
                    $message['error'][] = $this::ERROR_CODES['no_status_item_quotation'];
                }
            }*/

            //return $message;
        }

        //metodo de transporte
        //si existe metodo de transporte deben existir item o charges
        if (!empty($xml->ModeOfTransportation)) {
            if (empty($xml->Items)) {
                $message['error'][] = $this::ERROR_CODES['item_required'];
            }

            if (empty($xml->Charges)) {
                $message['error'][] = $this::ERROR_CODES['charge_required'];
            }
        }

        //puertos
        if (!empty($xml->OriginPort)) {
            if ($xml->OriginPort->Country[0]['Code'] == 'null')
                $message['error'][] = $this::ERROR_CODES['bad_ccode_origin_port'];
            if (empty($xml->OriginPort->Method))
                $message['error'][] = $this::ERROR_CODES['bad_method_origin_port'];
            if (empty($xml->OriginPort->Name))
                $message['error'][] = $this::ERROR_CODES['bad_name_origin_port'];
        }

        if (!empty($xml->DestinationPort)) {
            if ($xml->DestinationPort->Country[0]['Code'] == 'null')
                $message['error'][] = $this::ERROR_CODES['bad_ccode_destination_port'];
            if (empty($xml->DestinationPort->Method))
                $message['error'][] = $this::ERROR_CODES['bad_method_destination_port'];
            if (empty($xml->DestinationPort->Name))
                $message['error'][] = $this::ERROR_CODES['bad_name_destination_port'];
        }

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

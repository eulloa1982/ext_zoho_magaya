<?php

namespace App\Services;
use SoapClient;

class MagayaAPI extends SoapClient implements MagayaAPIInterface
{
    const  ERROR_CODES = [
        'no_error'                    =>    "API call succeeded",
        'too_many_open_sessions'      =>    "Too many API sessions open with the same key. Only one IP address is allowed per key, but you can have several keys sharing the same IP address.",
        'access_denied'               =>    "Access denied.",
        'license_in_use'              =>    "There is no available Magaya licenses to consume API service",
        'over_credit_limit'           =>    "The transaction cannot be saved because the Client is over",
        'service_unreachable'         =>    "API service is unreachable.",
        'invalid_operation'           =>    "The operation is invalid. See error description output parameter for more information.",
        'error_saving_to_database'    =>    "There was an error saving the transaction to the database. See error description output parameter for more information.",
        'unknown_object'              =>    "Unknown transaction type.",
        'xml_validation_error'        =>    "Transaction XML does not match the rules of the XSD for that transaction type.",
        'invalid_xml'                 =>    "XML is not well formed.",
        'transaction_not_found'       =>    "The requested transaction was not found."
    ];

    const TEMPLATE_USER = [
        'Type',
        'Name'
    ];

    public function __construct(string $url)
    {
        @set_exception_handler(array($this, 'exceptionHandler'));

        $url_handler = $url."/Invoke?Handler=CSSoapService";
        //$url_handler = "http://98.211.167.16:3691/Invoke?Handler=CSSoapService";
        $url_soap = $url."/CSSoapService?wsdl";

        $options = [
            'trace' => 1,
            'exceptions' => 1,
            'location' => $url_handler,
            'stream_context' => stream_context_create(array(
                'ssl' => array(
                    'verify_peer' => false,
                    'verify_peer_name' => false,
                    'allow_self_signed' => true //can fiddle with this one.
                )
            ))
        ];
        parent::__construct($url_soap, $options);
    }

    private function exceptionHandler(\SoapFault  $fault, $parameters = [])
    {
        return [
            'error' => true,
            'data' =>  $fault->faultstring
        ];
    }

    private function parseResponse($resp): array
    {
        if (!array_key_exists('return', $resp)) {
            return [
                'error' => true,
                'data' => $resp
            ];
        } else {
            if ($resp['return'] === 'no_error') {
                return [
                    'error' => false,
                    'data' => $resp
                ];
            } else {
                return [
                    'error' => true,
                    'data' => $this::ERROR_CODES[$resp['return']]
                ];
            }
        }
    }

    //############ Magaya API Methods #####################//

    /**
     * StartSession
     *
     * @param string $user
     * @param string $pass
     * @return array
     */
    public function StartSession(string $user, string $pass): array
    {
        $result =  $this->parseResponse(parent::{__FUNCTION__}($user, $pass));

        return $result['error'] ? $result : [
            'error' => false,
            'data' => [
                'access_key' => $result['data']['access_key']
            ]
        ];
    }

    /**
     * GetEntitiesOfType
     *
     * @param string $access_key
     * @param int $flags
     * @param string $start_width
     * @param int $entity_type
     * @return array
     */
    public function GetEntitiesOfType(int $access_key, int $flags, string $start_with, int $entity_type): array
    {

        $result =  $this->parseResponse(parent::{__FUNCTION__}($access_key, $flags, $start_with, $entity_type));

        return $result['error'] ? $result : [
            'error' => false,
            'data' => simplexml_load_string($result['data']['entity_list_xml'])
        ];
    }

    /**
     * GetTransRangeByDate
     *
     * @param int $access_key
     * @param string $type
     * @param string $start_date format yyyy-MM-dd
     * @param string $end_date format yyyy-MM-dd
     * @param int $flags
     */
    public function GetTransRangeByDate(int $access_key, string $type, string $start_date, string $end_date,  int $flags): array
    {
        $result =  $this->parseResponse(parent::{__FUNCTION__}($access_key, $type, $start_date, $end_date,  $flags));

        return $result['error'] ? $result : [
            'error' => false,
            'data' => simplexml_load_string($result['data']['trans_list_xml'])
        ];

    }

    /*
     * SetTransaction
     *
     * @param int $access_key
     * @param string $type
     * @param int $flags
     * @param array data
     */
    public function SetTransaction(int $access_key, string $type, int $flags, string $data): array
    {
        //check xml to avoid send invalid one
        /*$toXml = new ArrayToXml();
        $toXml::$type = 'Client';
        $XML = $toXml::xml_from_array($data);
        return [
            "error" => false,
            "data" => "Data flow"
        ];*/
        //print_r($XML);

        $dataXML = new \SimpleXMLElement($data);
        $message = new XmlMagayaValidator();
        $message_array = $message->checkXMLSetTransaction($dataXML);
        if (array_key_exists ('error', $message_array)) {
            return $message_array;
        }

        $result = $this->parseResponse(parent::{__FUNCTION__}($access_key, $type, $flags, $data));

        return $result['error'] ? $result : [
            'error' => false
        ];
    }



    /*
     * SetEntity
     *
     * @param int $access_key
     * @param int $flags
     * @param string $entity_xml
     */
    public function SetEntity(int $access_key, int $flags, string $entity_xml): array
    {
        $result = $this->parseResponse(parent::{__FUNCTION__}($access_key, $flags, $entity_xml));

        return $result['error'] ? $result : [
            'error' => false
        ];
    }

    /*
     *
     *
     */
    public function GetTransaction(int $access_key, string $entity_type, string $flags, string $number): array
    {
        $result = $this->parseResponse(parent::{__FUNCTION__}($access_key, $entity_type, $flags, $number));

        return $result['error'] ? $result : [
            'error' => false,
            'data' => simplexml_load_string($result['data']['trans_xml'])
        ];
    }

    /*
     * DeleteTransaction
     *
     * @param int $access_key
     * @param string $entity_type
     * @param string guid
     */
    public function DeleteTransaction(int $access_key, string $entity_type, string $guid): array
    {
        $result = parent::{__FUNCTION__}($access_key, $entity_type, $guid);

        return $result == 'no_error' ? ['error' => 'no_error'] : ['error' => $result];
    }

    /*
     *GetChargeDefinitions
     *@param int $access_key
     *
     */
    public function GetChargeDefinitions(int $access_key):array
    {
        $result = parent::{__FUNCTION__}($access_key);

        return [
            'error' => false,
            'data' => simplexml_load_string($result['service_list_xml'])
        ];
    }

    /*
     *GetEventDefinitions
     *
     *@param int $access_key
     *
     */
    public function GetEventDefinitions(int $access_key):array
    {
        $result = parent::{__FUNCTION__}($access_key);

        return [
            'error' => false,
            'data' => simplexml_load_string($result['event_definition_list_xml'])
        ];
    }

    /*
    GetWorkingPorts
    */
    public function GetWorkingPorts(string $data): array {
        //return ["data" => false];
        $result = parent::{__FUNCTION__}();

        return [
            'error' => false,
            'data' => simplexml_load_string($result["ports_list_xml"])
        ];
        //return ["data" => false];
    }


}

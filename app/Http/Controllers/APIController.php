<?php

namespace App\Http\Controllers;

use App\Services\MagayaAPI;
use App\Services\ArrayToXml;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class APIController extends Controller
{
    private $magayaApi;

    public function __construct(Request $request)
    {
        $url = $request->get('url');
        $this->magayaApi = new MagayaAPI($url);

    }

    public function execMethod(Request $request)
    {
        $method = $request->get('method');

        $data = $request->get('data');

        //$this->validateData($method, $data);

        return $this->magayaApi->{$method}(...$data);
    }

    /*
    *
    *create customer with setEntity
    *
    */
    public function createUser(Request $request)
    {
        $data = $request->get('data');
        $access_key = $data[0];
        $contactData = $request->get('contactData');
        $emailCustomer = $contactData['Email'];
        //EntityContact or Client
        $typeEntity = $contactData['Type'];
        $contactData['Email'] = $randomEmail = $this->generateRandomEmail();
        //check magaya guid, if it null drop it from the array
        if ($contactData['Attribute_GUID'] == 0 || $contactData['Attribute_GUID'] == "null") {
            unset($contactData['Attribute_GUID']);
        }
        //$guid = $contactData['Attribute_GUID'] ? $contactData['Attribute_GUID'] : 0;
        $guidString = '';

        $toXml = new ArrayToXml();
        $toXml::$type = 'Client';
        $XML = $toXml::xml_from_array($contactData);

        $XML = str_replace('<?xml version="1.0"?>','',$XML);
        $XML = str_replace('<Client',"<Entity xmlns=\"http://www.magaya.com/XMLSchema/V1\"", $XML);
        $XML = str_replace('</Client>', "</Entity>", $XML);

        print_r($XML);
        //return $XML;
        $result = $this->magayaApi->SetEntity($access_key, 524288, $XML);
        print_r($result);
        $customer_data = '';

        //print_r($XML);
       // print_r($result);

        if (!$result['error'] || $result['error'] != 1) {
            //find customer by email
            //check the type of entity to change the method
            /*if (strcasecmp("EntityContact", $typeEntity)) {
                //metodo EntityContact

            }
            else if (strcasecmp("Client", $typeEntity)){
                //metodo 2
            }
            else {
                //no method
            }*/

            $magaya_customers = $this->magayaApi->GetEntitiesOfType($access_key, 524288, '', 2);
            foreach ($magaya_customers['data'] as $key => $value) {
                if ($value->Email == $randomEmail) {
                   $customer_data = $value;
                }
            }
            $customer_guid = 0;
            $customer_data = json_decode(json_encode($customer_data), true);

            if (!empty($customer_data["@attributes"]["GUID"])) {
                $customer_guid = $customer_data["@attributes"]["GUID"];
            }

            //update user with true email here
            $toXmlUpd = new ArrayToXml();
            $contactData['Email'] = $emailCustomer;
            $toXmlUpd::$type = 'Client';
            $XMLUpd = $toXmlUpd::xml_from_array($contactData);
            $XMLUpd = str_replace('<?xml version="1.0"?>','',$XMLUpd);
            $XMLUpd = str_replace('<Client',"<Entity xmlns=\"http://www.magaya.com/XMLSchema/V1\"", $XMLUpd);
            $XMLUpd = str_replace('</Client>',"</Entity>", $XMLUpd);

            //print_r($XMLUpd);
            //return "fsdf45345435 345345";
            $result = $this->magayaApi->SetEntity($access_key, 524288, $XMLUpd);
            return $customer_guid;

        } else {
            //echo "Error";
            return false;
        }
    }


    /*
    *generate a ramdom email
    *@length of userEmail
    *
    *return userRamdomEmail@gmail.com
    */
    private function generateRandomEmail($length = 10) {
        $randomString = substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, $length);
        $randomEmail = $randomString."@gmail.com";
        return ($randomEmail);
    }

    /*private function validateData(string $method, $request)
    {
        if(!array_key_exists(3, $request)){ return; }
        $class = 'App\Http\Validators\\'.$method.$request[1].'Validator';
        $data = $request[3];

        if(class_exists($class)){
            $validator = new $class();
            $validator = Validator::make($data, $validator->rules, $validator->messages, $validator->attributes);

            if ($validator->fails()) {
                throw new ValidationException($validator, new JsonResponse(['errors' => $validator->errors()], 422));
            }
        }

    }*/
}

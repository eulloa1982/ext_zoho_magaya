<?php

namespace App\Services;

class ArrayToXml
{
    //member that holds transaction type, must be initializated first
    public static $type;

    /*
     *@param $arr multidimensional array containing data
     *@param $xml set null
     *from stackoverflow
     *drop <borrar></borrar> tags from resulting string
     *fixed to accept attributes
     *Example array
     *array ( array(
            "authkey"=> "68252AGguI2SK45395d8f7",
            "route" => 4,
            "campaign" => "test",
            "sender" => "oooop",
            "sms" => array (
                'Attribute_ID' => '111',
                "attribute" => "text:Hi Man",
                "address" =>array (
                            "attribute" => "to:8870300358"
                        )
                ),
            "Charges" => array (
                array("Charge"=>array("Attribute_Currency"=>"USD","COSTOS"=>1.225, "NOTA"=>"Prueba de 1 nota")),
                array("Charge"=>array("GASTOS"=>2.2258, "NOTA"=>"Prueba de 2 nota"))

            )
        )
      );
     */
    public static function xml_from_array($arr, $xml = NULL)
    {
        $first = $xml;
        //set Attribute Tag to find and add
		$attr = "Attribute_";

        if($xml === NULL) $xml = new \SimpleXMLElement('<'.self::$type.'/>');
        foreach ($arr as $k => $v)
        {
			(!is_int ($k)) ? $k = $k : $k = 'borrar';
            if (is_array ($v)) {
				self::xml_from_array($v, $xml->addChild($k));
			} else {
				if(strpos($k, $attr) !== false){
                    //if (strcmp($v,"null") < 0)
					    $xml->addAttribute(substr($k, strlen($attr)), $v);
				}else{
                    //if (strlen ($v) > 0 && strcmp($v,"null") < 0) {
                        $xml->addChild($k, $v);
                    //} else {
                     //   $xml->addChild($k, 0);
                    //    $child[0] = '';
				}
			}
			/*is_array($v)
                ? self::xml_from_array($v, $xml->addChild($k))
                : $xml->addChild($k, $v);*/

        }
        return ($first === NULL) ? $xml->asXML() : $xml;
    }


    public static function to_array($xml)
    {
        $xml = simplexml_load_string($xml);
        $json = json_encode($xml);
        return json_decode($json,TRUE);
    }



}

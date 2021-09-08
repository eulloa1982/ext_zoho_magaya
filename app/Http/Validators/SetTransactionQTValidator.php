<?php

namespace App\Http\Validators;

class SetTransactionQTValidator
{
        
    public function rules(){
        return [
            'Number' => 'required|min:2',
            'IssuedByName' => 'required',
            'Charges' => 'required',
        ];
    }
    
    public function attributes(){
        return [];
    }

    public function messages(){
        return [];
    }
    
    public function __get($name)
    {
        if(method_exists($this, $name)){
            return $this->{$name}();
        }
    }

}
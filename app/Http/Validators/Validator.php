<?php

namespace App\Http\Validators;

abstract class Validatorea
{
    public function __get($name)
    {
        if(method_exists($this, $name)){
            return $this->{$name}();
        }
    }
    public function rules(){
        return [];
    }

    public function attributes(){
        return [];
    }

    public function messages(){
        return [];
    }
}
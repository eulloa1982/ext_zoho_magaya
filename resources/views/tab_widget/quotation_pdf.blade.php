@extends('base_listmquote')
@section('main')
<style>


</style>
<?php
print_r($name);
?>
<table><tr><td>Name</td><td>Last Name</td></tr></table>



@stop
@section('js')
    <script>
        Utils.blockUI();
        $(document).ready(function(){
    });
   </script>
    @stop

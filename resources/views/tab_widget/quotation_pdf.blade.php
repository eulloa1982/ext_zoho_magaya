@extends('base_listmquote')
@section('main')
<style>


</style>
<?php
print_r($name);
?>
@foreach ($name as $dat)
        <li>{{ $dat }}</li>

        @endforeach





@stop
@section('js')
    <script>
        Utils.blockUI();
        $(document).ready(function(){
    });
   </script>
    @stop

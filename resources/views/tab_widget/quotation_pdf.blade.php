@extends('base_listmquote')
@section('main')
<style>


</style>
<?php
print_r($name);

/*
@foreach ($name as $dat)
        <li>{{ $dat }}</li>

        @endforeach
*/
?>
<table><tr><td>Name</td></tr>
@foreach ($name as $dat)
        <li>{{ $dat }}</li>

        @endforeach


</table>



@stop
@section('js')
    <script>
        Utils.blockUI();
        $(document).ready(function(){
    });
   </script>
    @stop

@extends('base_listmquote')
@section('main')

<?php
//print_r($organization['orgData']['city']);

/*
<table><tr><td>Name</td></tr>
@foreach ($organization as $dat)
        <li>{{ $dat->city }}</li>

        @endforeach

</table>*/
?>

    @include('tab_widget.partials.organization')
    @include('tab_widget.partials.mquote')
    @include('tab_widget.partials.charges')
    @include('tab_widget.partials.items')
    @include('tab_widget.partials.terms')







@stop
@section('js')
    <script>
        Utils.blockUI();
        $(document).ready(function(){
    });
   </script>
@stop

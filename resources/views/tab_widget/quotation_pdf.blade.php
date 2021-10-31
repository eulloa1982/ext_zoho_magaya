@extends('base_listmquote')
@section('main')

<?php
//print_r($organization['orgData']['city']);

/*
<table><tr><td>Name</td></tr>
@foreach ($organization as $dat)
        <li>{{ $dat->city }}</li>

        @endforeach


</table>

*/
?>
<li>{{$organization['orgData']['company_name']}}</li>
<li>{{$organization['orgData']['phone']}}</li>
<li>{{$organization['orgData']['primary_email']}}</li>
<li>{{$organization['orgData']['country']}}, {{$organization['orgData']['city']}}, {{$organization['orgData']['state']}}</li>

<br /><br />
<table><thead><tr><th>Charge Description</th><th>Price</th><th>Quantity</th><th>Amount</th><th>Final Amount</th></tr></thead>

    @include('tab_widget.partials.charges')

</table>


<br /><br />
<table><thead><tr><th>Package Type</th><th>Quantity</th><th>Dimensions</th><th>Weigth</th><th>Volume</th></tr></thead>

    @include('tab_widget.partials.items')

</table>














@stop
@section('js')
    <script>
        Utils.blockUI();
        $(document).ready(function(){
    });
   </script>
    @stop

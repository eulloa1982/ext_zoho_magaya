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
@foreach ($organization['charges'] as $dat=>$v)
    <tr>
        <td>{{$v['Name']}}</td>
        <td>{{$v['magaya__Price']}}</td>
        <td>{{$v['magaya__CQuantity']}}</td>
        <td>{{$v['magaya__Amount']}}</td>
        <td>{{$v['magaya__Amount_Total']}}</td>
    </tr>
    @endforeach
</table>


<br /><br />
<table><thead><tr><th>Package Type</th><th>Quantity</th><th>Dimensions</th><th>Weigth</th><th>Volume</th></tr></thead>
@foreach ($organization['items'] as $dat=>$v)
    <tr>
        <td>{{$v['magaya__Package_Type']['name']}}</td>
        <td>{{$v['magaya__Pieces']}}</td>
        <td>{{$v['magaya__Length']}} X {{$v['magaya__Width']}} X {{$v['magaya__Height']}}</td>
        <td>{{$v['magaya__Weigth']}}</td>
        <td>{{$v['magaya__Volume']}}</td>
    </tr>
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

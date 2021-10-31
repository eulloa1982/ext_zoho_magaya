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
<div class="container">
    <table cellspacing="0px" cellpadding="2px" style="border: none;" width="100%">
        <tr>
            <th rowspan="2">
                <table>
                    <tr>
                        <th>
                            <div class="session-first" style="float: left; font-size: 28px;">
                                {{$organization['orgData']['company_name']}}
                            </div>
                        </th>
                    </tr>
                </table>
            </th>
            <th>
                <table id="header" cellspacing="0px" cellpadding="2px" style="border: none; text-align: right;float: right;">
                    <tr>
                        <td colspan="12">
                            <div class="col headerFont p-2"><span class="material-icons">
                        language</span>{{$organization['orgData']['website']}}</div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="12">
                            <div class="col headerFont p-2"><span class="material-icons">
                        phone</span>{{$organization['orgData']['phone']}}</div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="12">
                            <div class="col headerFont p-2"><span class="material-icons">
                        alternate_email</span>{{$organization['orgData']['primary_email']}}</div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="12">
                            <div class="col headerFont p-2"><span class="material-icons">
                        home</span>{{$organization['orgData']['country']}}, {{$organization['orgData']['city']}}, {{$organization['orgData']['state']}}</div>
                        </td>
                    </tr>
                </table>
            </th>
        </tr>
        <tr></tr>
        <tr></tr>
    </table>
</div>
@include('tab_widget.partials.mquote')
<div class="container">

    <table width="100%" cellspacing="0px" cellpadding="0px">
        <tr>
            <th colspan="5" style="background-color: lightgrey; text-align: start;text-transform:uppercase ;border: 1px #000 solid">Charges</th>
        </tr>
        <tr style="font-weight: bold;">
            <th style="border-left: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">Charge Description</th>
            <th style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">Price</th>
            <th style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">Quantity</th>
            <th style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">Tax Amount</th>
            <th style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">Final Amount</th>
        </tr>
        @include('tab_widget.partials.charges')
    </table>
</div>
<div class="container">
    <table width="100%">
        <tr>
            <th colspan="5" style="background-color: lightgrey; text-align: start;text-transform:uppercase ;border: 1px #000 solid;">Items</th>
        </tr>
        <tr>
            <th style="border-left: 1px #000 solid; border-bottom: 1px #000 solid; border-right: 1px #000 solid; text-align: center;">Description </th>
            <th style="border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: center;">Quantity</th>
            <th style="border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: center;">Dimensions</th>
            <th style="border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: center;">Weight</th>
            <th style="border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: center;">Volume</th>
        </tr>
        @include('tab_widget.partials.items')

    </table>
</div>












@stop
@section('js')
    <script>
        Utils.blockUI();
        $(document).ready(function(){
    });
   </script>
    @stop

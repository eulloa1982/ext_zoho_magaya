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
                        <th rowspan="2">
                            <img class="headerIMG" width="100px" height="100px" src="https://zohomagaya.herokuapp.com/js/ui_listmquote/utils/logo2.png" style="text-align: center; margin-left:15px;" />
                        </th>
                        <th>
                            <div class="session-first" style="float: left; font-size: 28px; vertical-align:top">
                                {{$organization['orgData']['company_name']}}
                            </div>
                        </th>
                    </tr>
                </table>
            </th>
            <th>
                <table id="header" cellspacing="0px" cellpadding="2px" style="border: none; text-align: right;float: right;">
                    <tr>
                        <td colspan="12"class="headerFont">
                            <span class="material-icons">language</span>
                            {{$organization['orgData']['website']}}
                        </td>
                    </tr>
                    <tr>
                        <td colspan="12" class="headerFont">
                            <span class="material-icons">phone</span>
                            {{$organization['orgData']['phone']}}
                        </td>
                    </tr>
                    <tr>
                        <td colspan="12" class="headerFont">
                            <span class="material-icons">alternate_email</span>
                            {{$organization['orgData']['primary_email']}}
                        </td>
                    </tr>
                    <tr>
                        <td colspan="12" class="headerFont"><span class="material-icons">home</span>
                            {{$organization['orgData']['country']}}, {{$organization['orgData']['city']}}, {{$organization['orgData']['state']}}
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
<div class="container" style="margin-top: 10px">

    <table width="100%" cellspacing="0px" cellpadding="0px">
        <tr>
            <th colspan="5" style="background-color: lightblue; text-align: start;text-transform:uppercase ;border: 1px #000 solid">Charges</th>
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
<div class="container" style="margin-top: 10px">
    <table width="100%">
        <tr>
            <th colspan="5" style="background-color: lightblue; text-align: start;text-transform:uppercase ;border: 1px #000 solid;">Items</th>
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
<div class="container" style="margin-top: 10px">
    <table width="100%">
        <tr>
            <th colspan="5" style="background-color: lightblue; text-align: start;text-transform:uppercase ;border: 1px #000 solid;">TERMS & CONDITIONS</th>
        </tr>
        @include('tab_widget.partials.terms')
    </table>
</div>

<br /><br />

    <table width="100%">
        <tr>
            <th style="background-color: lightgrey; text-align: start;text-transform:uppercase ;border: 1px #000 solid;">Terms</th>
        </tr>

        @include('tab_widget.partials.terms')

    </table>








@stop
@section('js')
    <script>
        Utils.blockUI();
        $(document).ready(function(){
    });
   </script>
    @stop

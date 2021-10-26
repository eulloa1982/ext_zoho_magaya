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

para poner en la hoja d estilos
.headerIMG{
    text-align: left;
    float: left;
    padding: 5px;
}
session_first{
    float: left; 
    font-size: 28px;
}
*/
?>
    <div class="container">
        <table cellspacing="0px" cellpadding="2px" style="border: none;" width="100%">
            <tr>
                <th rowspan="2">
                    <table>
                        <tr>
                            <th>
                                {{$organization['orgData']['logo']}}
                                <img class="headerIMG" width="100px" height="100px" src="{{$organization['orgData']['logo']}}" style="text-align: left;float: left; padding: 5px;" />
                            </th>
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
    <div class="container">
        <table>
            <tr>
                <td width="40%">
                    <table id="info1" cellspacing="0px" cellpadding="0px" width="100%" style="text-align: left;">
                        <tr>
                            <th class="headerFont" colspan="2" style="border: 1px #000 solid; padding: 3px;text-align: center;">Customer Info</th>
                        </tr>
                        <tr>
                            <th class="headerFont" style="text-align: right; padding: 3px; border-left: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid;">
                                Customer</th>
                            <td class="dataFont" style="text-align: start; padding: 3px;border-right: 1px #000 solid;border-bottom: 1px #000 solid;">
                                {{$contact['Full_Name']}}</td>
                        </tr>
                        <tr>
                            <th class="headerFont" style="text-align: right; padding: 3px; border-left: 1px #000 solid;border-right: 1px #000 solid;">
                                Representative</th>
                            <td class="dataFont" style="text-align: start; padding: 3px;border-right: 1px #000 solid;border-bottom: 1px #000 solid;">
                                {{$quoteAccount['magaya__Representative']}}</td>
                        </tr>
                        <tr>
                            <th class="headerFont" style="text-align: right; padding: 3px; border: 1px #000 solid;">
                                Phone</th>
                            <td class="dataFont" style="text-align: start; padding: 3px;border-right: 1px #000 solid;border-bottom: 1px #000 solid;">
                                {{$quoteAccount['magaya__ContactMobile']}}</td>
                        </tr>
                        <tr>
                            <th class="headerFont" style="text-align: right; padding: 3px;border-left: 1px #000 solid;border-right: 1px #000 solid;">
                                Email</th>
                            <td class="dataFont" style="text-align: start; padding: 3px;border-right: 1px #000 solid;border-bottom: 1px #000 solid;">
                                {{$quoteAccount['magaya__ContactEmail']}}</td>
                        </tr>
                        <tr>
                            <th class="headerFont" style="text-align: right;border: 1px #000 solid;">
                                Address</th>
                            <td class="dataFont" style="text-align: start;border-right: 1px #000 solid;border-bottom: 1px #000 solid;">
                                {{$quoteAccount['magaya__ContactStreet']}}, {{$quoteAccount['magaya__ContactCity']}}, {{$quoteAccount['magaya__ContactState']}}, {{$quoteAccount['magaya__ContactCountry']}}
                            </td>
                        </tr>
                    </table>

                </td>
                <?php 
                    create_date = new Date();
                    expire_date = new Date();
                ?>
                <td width="40%">
                    <table id="info2" cellspacing="0px" cellpadding="2px" style="text-align:left;border: none; float: right;margin-left: 45px;">
                        <tr>
                            <th class="headerFont" style="text-align: right;">
                                Quote Number:</th>
                            <td class="dataFont">
                                {{$quoteAccount['magaya__Number']}}</td>
                        </tr>
                        <tr>
                            <th class="headerFont" style="text-align: right;">
                                Creation Date:</th>
                            <td class="dataFont">
                                {{$create_date}}</td>
                        </tr>
                        <tr>
                            <th class="headerFont" style="text-align: right;">
                                Expiration Date:</th>
                            <td class="dataFont">
                                {{$expire_date}}</td>
                        </tr>
                        <tr>
                            <th class="headerFont" style="text-align: right;">
                                Contact To:</th>
                            <td class="dataFont">
                                {{$quoteAccount['magaya__Employee']}}</td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <table width="100%" cellspacing="0px" cellpadding="2px" style="border: none; margin-top: 5px;">
                        <tr>
                            <th class="headerFont" colspan="2" style="background-color: lightgrey; text-align: start;text-transform:uppercase ;border-left: 1px #000 solid;border-right: 1px #000 solid;border-top: 1px #000 solid;">
                                Quotation Info
                            </th>
                        </tr>
                        <tr>
                            <th colspan="2" class="headerFont" style="border-left: 1px #000 solid;border-right: 1px #000 solid;border-top: 1px #000 solid; text-align: start;">
                                <span>Description of Goods:</span>
                                <div class="dataFont">{{$quoteAccount['magaya__Description']}}</div>
                            </th>
                        </tr>
                        <tr>
                            <th class="headerFont" style="border-left: 1px #000 solid;border-top: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid;text-align: start;">
                                <span>Origin:</span>
                                <div class="dataFont" style="text-align: start;">{{$quoteAccount['magaya__Origin'] !== null ? $quoteAccount['magaya__Origin'] : ""}}</div>
                            </th>
                            <th class="headerFont" style="border-top: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid;text-align: start;"><span>Destination:</span>
                                <div class="dataFont" style="text-align: start;">{{$quoteAccount['magaya__Destination'] !== null ? $quoteAccount['magaya__Destination'] : ""}}</div>
                            </th>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
    <div class="container">
        <table width="100%" cellspacing="0px" cellpadding="0px">
            <tr>
                <th colspan="5" style="background-color: lightgrey; text-align: start;text-transform:uppercase ;border: 1px #000 solid">
                    Charges</th>
            </tr>
            <tr style="font-weight: bold;">
                <th style="border-left: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">
                    Charge Description</th>
                <th style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">
                    Price</th>
                <th style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">
                    Quantity</th>
                <th style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">
                    Tax Amount</th>
                <th style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">
                    Final Amount</th>
            </tr>
            @foreach ($organization['charges'] as $dat=>$v)
            <tr>
                <td style="border-bottom: 1px #000 solid;border-left: 1px #000 solid;border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: left;">
                    {{$v['Name']}}</td>
                <td style="border-bottom: 1px #000 solid;border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: right;">
                    {{$v['magaya__Price']}}</td>
                <td style="border-bottom: 1px #000 solid;border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: right;">
                    {{$v['magaya__CQuantity']}}</td>
                <td style="border-right: 1px #000 solid; text-align: right;">
                    {{$v['magaya__Amount']}}</td>
                <td style="border-right: 1px #000 solid; text-align: right; font-weight: bold;">
                    {{$v['magaya__Amount_Total']}}</td>
            </tr>
            @endforeach
            <tr style="font-weight: bolder;">
                <td style="border:none" colspan="3">
                </td>
                <td style="border-left: 1px #000 solid; border-top: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">
                    TOTAL</td>
                <td style="border-left: 1px #000 solid;border-top: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: right;">{{roundDec($amount_total)}}</td>
            </tr>
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
            <?php totalWeight = 0; totalVolume = 0;
            ?> @foreach ($organization['items'] as $dat=>$v)
            <tr>
                <td width="40%" style="border-left: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: left;">
                    {{$v['magaya__Package_Type']['name']}}</td>
                <td width="15%" style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">
                    {{v['magaya__Pieces']}}</td>
                <td width="15%" style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">
                    {{v['magaya__Length']}} X {{$v['magaya__Width']}} X {{$v['magaya__Height']}}</td>
                <td width="15%" style="border-right: 1px #000 solid; text-align: right;border-bottom: 1px #000 solid;">
                    {{v['magaya__Weigth']}} ({{measure_weigth}})</td>
                <td width="15%" style="border-right: 1px #000 solid; text-align: right;border-bottom: 1px #000 solid;">
                    {{v['magaya__Volume']}} ({{measure_volume}})</td>
                <?php
                     totalWeight += v['magaya__Weigth'] 
                     totalVolume += v['magaya__Volume'] 
                     ?>
            </tr>
            @endforeach
            <tr style="font-weight: bold;">
                <td style="border:none; text-align: center;" colspan="2">
                </td>
                <td style="border-left: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">
                    TOTAL</td>
                <td style="border-left: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: right;">
                    {{$totalWeight}} kg</td>
                <td style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: right;">
                    {{$totalVolume}} m<sup>3</sup></td>
            </tr>
        </table>
    </div>
    <div class="container" style="margin-top: 5px;">
        <table width="100%" cellpadding="0px" cellspacing="0px">
            <tr>
                <th colspan="12" class="session-fourth headerFont" style="background-color: lightgrey; text-align: start;text-transform:uppercase ;border: 1px #000 solid;">
                    Terms & Conditions</th>
            </tr>
            <tr>
                <td colspan="12" style="border-left: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid;">
                    {{$organization['orgData']['magaya__Terms']}}</td>
            </tr>
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

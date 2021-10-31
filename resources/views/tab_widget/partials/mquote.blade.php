@if (@isset($organization['mQuote']))
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
                            {{$organization['mQuote']['magaya__ContactName']}}</td>
                    </tr>
                    <tr>
                        <th class="headerFont" style="text-align: right; padding: 3px; border-left: 1px #000 solid;border-right: 1px #000 solid;">
                            Representative</th>
                        <td class="dataFont" style="text-align: start; padding: 3px;border-right: 1px #000 solid;border-bottom: 1px #000 solid;">
                            {{$organization['mQuote']['magaya__Representative']['name']}}</td>
                    </tr>
                    <tr>
                        <th class="headerFont" style="text-align: right; padding: 3px; border: 1px #000 solid;">
                            Phone</th>
                        <td class="dataFont" style="text-align: start; padding: 3px;border-right: 1px #000 solid;border-bottom: 1px #000 solid;">
                            {{$organization['mQuote']['magaya__ContactMobile']}}</td>
                    </tr>
                    <tr>
                        <th class="headerFont" style="text-align: right; padding: 3px;border-left: 1px #000 solid;border-right: 1px #000 solid;">
                            Email</th>
                        <td class="dataFont" style="text-align: start; padding: 3px;border-right: 1px #000 solid;border-bottom: 1px #000 solid;">
                            {{$organization['mQuote']['magaya__ContactEmail']}}</td>
                    </tr>
                    <tr>
                        <th class="headerFont" style="text-align: right;border: 1px #000 solid;">
                            Address</th>
                        <td class="dataFont" style="text-align: start;border-right: 1px #000 solid;border-bottom: 1px #000 solid;">
                        </td>
                    </tr>
                </table>

            </td>
            <td width="40%">
                <table id="info2" cellspacing="0px" cellpadding="2px" style="text-align:left;border: none; float: right;margin-left: 45px;">
                    <tr>
                        <th class="headerFont" style="text-align: right;">
                            Quote Number:</th>
                        <td class="dataFont">
                            {{$organization['mQuote']['magaya__Number']}}</td>
                    </tr>
                    <tr>
                        <th class="headerFont" style="text-align: right;">
                            Creation Date:</th>
                        <td class="dataFont">
                            {{$organization['mQuote']['Created_Time']}}</td>
                    </tr>
                    <tr>
                        <th class="headerFont" style="text-align: right;">
                            Expiration Date:</th>
                        <td class="dataFont">
                            {{$organization['mQuote']['magaya__ExpirationDate']}}</td>
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
                            <div class="dataFont">{{$organization['mQuote']['magaya__Description']}}</div>
                        </th>
                    </tr>
                    <tr>
                        <th class="headerFont" style="border-left: 1px #000 solid;border-top: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid;text-align: start;">
                            <span>Origin:</span>
                            <div class="dataFont" style="text-align: start;">{{$organization['mQuote']['magaya__Origin']}}</div>
                        </th>
                        <th class="headerFont" style="border-top: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid;text-align: start;"><span>Destination:</span>
                            <div class="dataFont" style="text-align: start;">{{$organization['mQuote']['magaya__Destination']}}</div>
                        </th>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</div>    
    
@endif

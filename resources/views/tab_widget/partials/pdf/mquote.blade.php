@if (@isset($organization['mQuote']))
<table cellspacing="0px" cellpadding="0px" width="100%" style="margin-top: 10px;">
    <tr>
        <td width="40%">
            <table id="info1" cellspacing="0px" cellpadding="2px" width="100%" style="text-align: left;">
                <tr>
                    <th class="headerFont" colspan="2" style="border: 1px #000 solid; padding: 3px;text-align: center;">Customer Info</th>
                </tr>
                <tr>
                    <th class="headerFont" style="text-align: right; border-left: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid; font-size:14px">
                        Customer</th>
                    <td class="dataFont" style="text-align: start; border-right: 1px #000 solid;border-bottom: 1px #000 solid;">
                        @if (@isset($organization['mQuote']['Account']))
                            {{$organization['mQuote']['Account']['name']}}
                        @endif
                    </td>
                </tr>
                <tr>
                    <th class="headerFont" style="text-align: right; border-left: 1px #000 solid;border-right: 1px #000 solid;font-size:14px">
                        Representative</th>
                    <td class="dataFont" style="text-align: start; border-right: 1px #000 solid;border-bottom: 1px #000 solid;">
                        @if (@isset($organization['mQuote']['magaya__Representative']))
                            {{$organization['mQuote']['magaya__Representative']['name']}}
                        @endif

                    </td>
                </tr>
                <tr>
                    <th class="headerFont" style="text-align: right; border: 1px #000 solid;font-size:14px">
                        Phone</th>
                    <td class="dataFont" style="text-align: start; border-right: 1px #000 solid;border-bottom: 1px #000 solid;">
                        @if (@isset($organization['mQuote']['magaya__ContactMobile']))
                            {{$organization['mQuote']['magaya__ContactMobile']}}
                        @endif
                    </td>
                </tr>
                <tr>
                    <th class="headerFont" style="text-align: right; border-left: 1px #000 solid;border-right: 1px #000 solid;font-size:14px">
                        Email</th>
                    <td class="dataFont" style="text-align: start; border-right: 1px #000 solid;border-bottom: 1px #000 solid;">
                        @if (@isset($organization['mQuote']['magaya__ContactEmail']))
                            {{$organization['mQuote']['magaya__ContactEmail']}}
                        @endif
                    </td>
                </tr>
                <tr>
                    <th class="headerFont" style="text-align: right;border: 1px #000 solid;font-size:14px">
                        Address</th>
                    <td class="dataFont" style="text-align: start;border-right: 1px #000 solid;border-bottom: 1px #000 solid;font-size:13px">
                        @if (@isset($organization['mQuote']['magaya__BillingStreet']))
                            {{$organization['mQuote']['magaya__BillingStreet']}}
                        @endif
                        @if (@isset($organization['mQuote']['magaya__BillingCity']))
                            , {{$organization['mQuote']['magaya__BillingCity']}}
                        @endif
                        @if (@isset($organization['mQuote']['magaya__BillingState']))
                            , {{$organization['mQuote']['magaya__BillingState']}}
                        @endif
                        @if (@isset($organization['mQuote']['magaya__BillingCountry']))
                            , {{$organization['mQuote']['magaya__BillingCountry']}}
                        @endif
                    </td>
                </tr>
            </table>
        </td>
        <td width="10%"></td>
        <td width="40%">
            <table id="info2" cellspacing="0px" cellpadding="2px" style="border: none; float: right;">
                <tr>
                    <th class="headerFont" style="text-align: right;font-size:14px">
                        Quote Number:</th>
                    <td class="dataFont" style="font-size:13px">
                        @if (@isset($organization['mQuote']['Name']))
                            {{$organization['mQuote']['Name']}}    
                        @endif
                        </td>
                </tr>
                <tr>
                    <th class="headerFont" style="text-align: right;font-size:14px">
                        Creation Date:</th>
                    <td class="dataFont" style="font-size:13px">
                        @if (@isset($organization['mQuote']['Created_Time']))
                            <?php echo explode('T',$organization['mQuote']['Created_Time'])[0]; ?>
                        @endif                        
                    </td>
                </tr>
                <tr>
                    <th class="headerFont" style="text-align: right;font-size:14px">
                        Expiration Date:</th>
                    <td class="dataFont" style="font-size:13px;">
                        @if ( @isset($organization['mQuote']['magaya__ExpirationDate']) )
                            <?php echo explode('T',$organization['mQuote']['magaya__ExpirationDate'])[0]; ?>
                        @endif
                    </td>
                </tr>
                <tr>
                    <th class="headerFont" style="text-align: right;font-size:14px">
                        Contact To:</th>
                    <td class="dataFont" style="font-size:13px;word-wrap: break-word;">
                        @if (@isset($organization['mQuote']['Owner']['name']))
                            {{$organization['mQuote']['Owner']['name']}},<br> {{$organization['mQuote']['Owner']['email']}}    
                        @endif                        
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>

@endif


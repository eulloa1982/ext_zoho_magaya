@if (@isset($organization['mQuote']))

<table cellspacing="0px" cellpadding="0px" width="100%" style="margin-top: 10px;">
    <tr>
        <td>
            <table id="info1" cellspacing="0px" cellpadding="0px" width="100%" style="text-align: left;">
                <tr>
                    <th colspan="2" style="border: 1px #000 solid; padding: 3px;text-align: center; background-color: #f8f2ec">Customer Info</th>
                </tr>
                <tr>
                    <th style="text-align: right; border: 1px #000 solid; font-size:12px; padding: 5px 5px 5px 0px;">
                        Customer</th>
                    <td style="text-align: left; border: 1px #000 solid; font-size:12px; padding-left: 5px;">
                        @if (@isset($organization['mQuote']['Account']))
                            {{$organization['mQuote']['Account']['name']}}
                        @endif
                    </td>

                    <th></th><td></td>

                    <th style="text-align: right; border-right: 1px #000 solid; font-size:12px; padding: 0px 5px 0px 15px">Quote Number</th>
                    <td style="text-align: start; border: 1px #000 solid; font-size:12px; padding-left: 5px">
                    @if (@isset($organization['mQuote']['Name']))
                        {{$organization['mQuote']['Name']}}
                    @endif
                    </td>

                </tr>
                <tr>
                    <th style="text-align: right; border: 1px #000 solid; font-size:12px; padding: 5px 5px 5px 0px;">
                        Representative</th>
                    <td style="text-align: left; border: 1px #000 solid; font-size:12px; padding-left: 5px;">
                        @if (@isset($organization['mQuote']['magaya__Representative']))
                            {{$organization['mQuote']['magaya__Representative']['name']}}
                        @endif

                    </td>

                    <th></th><td></td>

                    <th style="text-align: right; border-right: 1px #000 solid; font-size:12px; padding: 0px 5px 0px 15px">
                    Creation Date</th>
                    <td style="text-align: start; border: 1px #000 solid; font-size:12px; padding-left: 5px">
                        @if (@isset($organization['mQuote']['Created_Time']))
                            <?php echo explode('T',$organization['mQuote']['Created_Time'])[0]; ?>
                        @endif
                    </td>
                </tr>
                <tr>
                    <th style="text-align: right; border: 1px #000 solid; font-size:12px; padding: 5px 5px 5px 0px;">
                        Phone</th>
                    <td style="text-align: left; border: 1px #000 solid; font-size:12px; padding-left: 5px;">
                        @if (@isset($organization['mQuote']['magaya__ContactMobile']))
                            {{$organization['mQuote']['magaya__ContactMobile']}}
                        @endif
                    </td>

                    <th></th><td></td>

                    <th style="text-align: right; border-right: 1px #000 solid; font-size:12px; padding: 0px 5px 0px 15px">
                    Expiration Date</th>
                    <td style="text-align: start; border: 1px #000 solid; font-size:12px; padding-left: 5px">
                        @if ( @isset($organization['mQuote']['magaya__ExpirationDate']) )
                            <?php echo explode('T',$organization['mQuote']['magaya__ExpirationDate'])[0]; ?>
                        @endif
                    </td>
                </tr>
                <tr>
                    <th style="text-align: right; border: 1px #000 solid; font-size:12px; padding: 5px 5px 5px 0px;">
                        Email</th>
                    <td style="text-align: left; border: 1px #000 solid; font-size:12px; padding-left: 5px;">
                        @if (@isset($organization['mQuote']['magaya__ContactEmail']))
                            {{$organization['mQuote']['magaya__ContactEmail']}}
                        @endif
                    </td>

                    <th></th><td></td>

                    <th style="text-align: right; border-right: 1px #000 solid; font-size:12px; padding: 0px 5px 0px 15px">
                    Contact To</th>
                    <td style="text-align: start; border: 1px #000 solid; font-size:12px; padding-left: 5px">
                        @if (@isset($organization['mQuote']['Owner']['name']))
                            {{$organization['mQuote']['Owner']['name']}},<br> {{$organization['mQuote']['Owner']['email']}}
                        @endif
                    </td>
                </tr>
                <tr>
                    <th style="text-align: right; border: 1px #000 solid; font-size:12px; padding: 5px 5px 5px 0px;">
                        Address</th>
                    <td style="text-align: left; border: 1px #000 solid; font-size:12px; padding-left: 5px;">
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

    </tr>
    <tr>
        <td colspan="2">
            <table width="100%" cellspacing="0px" cellpadding="0px" style="border: none; margin-top: 10px;">
                <tr>
                    <th colspan="2" style="font-size: 12px; background-color: lightblue; text-align: start;text-transform:uppercase ;border: 1px #000 solid; padding: 3px 0px 3px 5px;">
                        Quotation Info
                    </th>
                </tr>
                <tr>
                    <th colspan="2" style="font-size: 12px; border: 1px #000 solid; text-align: start; padding: 3px 0px 3px 5px;">
                        Description of Goods:
                        @if (@isset($organization['mQuote']['magaya__Description']))
                            {{$organization['mQuote']['magaya__Description']}}
                        @endif

                    </th>
                </tr>
                <tr>
                    <th style="font-size: 12px; border: 1px #000 solid; text-align: start; padding: 3px 0px 3px 5px;">
                        Origin:
                        @if (@isset($organization['mQuote']['magaya__Origin']))
                            {{$organization['mQuote']['magaya__Origin']}}
                        @endif

                    </th>
                    <th style="font-size: 12px; border: 1px #000 solid; text-align: start; padding: 3px 0px 3px 5px;">
                        Destination:
                        @if (@isset($organization['mQuote']['magaya__Destination']))
                            {{$organization['mQuote']['magaya__Destination']}}
                        @endif

                    </th>
                </tr>
            </table>
        </td>
    </tr>
</table>

@endif


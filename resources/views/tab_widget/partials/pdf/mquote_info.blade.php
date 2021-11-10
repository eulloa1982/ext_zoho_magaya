@if (@isset($organization['mQuote']))
<table cellspacing="0px" cellpadding="0px" width="100%" style="margin-top: 10px;">
    <tr>
        <td colspan="2">
            <table width="100%" cellspacing="0px" cellpadding="2px" style="border: none; margin-top: 10px;">
                <tr>
                    <th class="headerFont" colspan="2" style="background-color: lightblue; text-align: start;text-transform:uppercase ;border-left: 1px #000 solid;border-right: 1px #000 solid;border-top: 1px #000 solid;">
                        Quotation Info
                    </th>
                </tr>
                <tr>
                    <th colspan="2" style="border-left: 1px #000 solid;border-right: 1px #000 solid;border-top: 1px #000 solid; text-align: start;">
                        <div class="dataFont"><span class="headerFont">Description of Goods:</span>
                            @if (@isset($organization['mQuote']['magaya__Description']))
                                {{$organization['mQuote']['magaya__Description']}}        
                            @endif
                        </div>
                    </th>
                </tr>
                <tr>
                    <th style="border-left: 1px #000 solid;border-top: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid;text-align: start;">
                        <div class="dataFont" style="text-align: start;"><span class="headerFont">Origin:</span>
                            @if (@isset($organization['mQuote']['magaya__Origin']))
                                {{$organization['mQuote']['magaya__Origin']}}
                            @endif
                        </div>
                    </th>
                    <th style="border-top: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid;text-align: start;">
                        <div class="dataFont" style="text-align: start;"><span class="headerFont">Destination:</span>
                            @if (@isset($organization['mQuote']['magaya__Destination']))
                                {{$organization['mQuote']['magaya__Destination']}}    
                            @endif                            
                        </div>
                    </th>
                </tr>
            </table>
        </td>
    </tr>
</table>

@endif


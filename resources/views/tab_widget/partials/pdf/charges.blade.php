<table cellspacing="0px" cellpadding="2px" width="100%" style="margin-top: 10px">
    <tr>
        <th colspan="5" style="text-align: start;text-transform:uppercase ;border: 1px #000 solid">Charges</th>
    </tr>
    <tr style="font-weight: bold;background-color: lightblue;">
        <th style="border-left: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">Charge Description</th>
        <th style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">Price</th>
        <th style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">Quantity</th>
        <th style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">Tax Amount</th>
        <th style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">Final Amount</th>
    </tr>
    {{$amount_total = 0;}}
    @if (@isset($organization['charges']))        
        @foreach ($organization['charges'] as $dat=>$v)
            {{ $amount_total += float.Parse($v['magaya__Amount_Total']) }}
        <tr>
            <td style="border-bottom: 1px #000 solid;border-left: 1px #000 solid;border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: center;">{{$v['Name']}}</td>
            <td style="border-bottom: 1px #000 solid;border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: right;">{{$v['magaya__Price']}}</td>
            <td style="border-bottom: 1px #000 solid;border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: right;">{{$v['magaya__CQuantity']}}</td>
            <td style="border-bottom: 1px #000 solid;border-right: 1px #000 solid; text-align: right;">{{$v['magaya__Amount']}}</td>
            <td style="border-bottom: 1px #000 solid;border-right: 1px #000 solid; text-align: right; font-weight: bold;">{{$v['magaya__Amount_Total']}}</td>
        </tr>
        @endforeach
    @else 
        <tr>
            <td style="border-bottom: 1px #000 solid;border-left: 1px #000 solid;border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: center;"><br><br><br></td>
            <td style="border-bottom: 1px #000 solid;border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: right;"><br><br><br></td>
            <td style="border-bottom: 1px #000 solid;border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: right;"><br><br><br></td>
            <td style="border-bottom: 1px #000 solid;border-right: 1px #000 solid; text-align: right;"><br><br><br></td>
            <td style="border-bottom: 1px #000 solid;border-right: 1px #000 solid; text-align: right; font-weight: bold;"><br><br><br></td>
        </tr>
    @endif
    <tr style="font-weight: bolder">
        <td colspan="3"></td>
        <td style="border-left:1px #000 solid; border-bottom: 1px #000 solid;border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: right;">TOTAL</td>
        <td style="border-bottom: 1px #000 solid;border-right: 1px #000 solid; text-align: right; font-weight: bold;">{{$amount_total}}</td>
    </tr>
</table>

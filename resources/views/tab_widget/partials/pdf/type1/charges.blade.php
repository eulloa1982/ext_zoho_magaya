<table class="info" cellspacing="0px" cellpadding="0px" width="100%" style="margin-top: 10px">
    <tr>
        <th colspan="5" style="background-color: lightblue; text-align: start;text-transform:uppercase ;border: 1px #000 solid; padding: 3px 0px 3px 5px;">Charges</th>
    </tr>
    <tr style="font-weight: bold;">
        <th style="border-left: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">Charge Description</th>
        <th style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">Price</th>
        <th style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">Quantity</th>
        <th style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">Tax Amount</th>
        <th style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">Final Amount</th>
    </tr>
    {{$amount_total = 0;}}
    @if (@isset($organization['charges']))
        @foreach ($organization['charges'] as $dat=>$v)
            {{ $amount_total += $v['magaya__Amount_Total'] }}
        <tr>
            <td style="border-bottom: 1px #000 solid;border-left: 1px #000 solid;border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: center;">{{$v['Name']}}</td>
            <td style="border-bottom: 1px #000 solid;border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: right;">{{number_format($v['magaya__Price'], 2, ',', ' ')}}</td>
            <td style="border-bottom: 1px #000 solid;border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: right;">{{$v['magaya__CQuantity']}}</td>
            <td style="border-bottom: 1px #000 solid;border-right: 1px #000 solid; text-align: right;">{{number_format($v['magaya__Amount'], 2, ',', ' ')}}</td>
            <td style="border-bottom: 1px #000 solid;border-right: 1px #000 solid; text-align: right; font-weight: bold;">{{number_format($v['magaya__Amount_Total'], 2, ',', ' ')}}</td>
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
    <tr>
        <td colspan="3"></td>
        <td style="border-left:1px #000 solid; border-bottom: 1px #000 solid;border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: right;">TOTAL</td>
        <td style="border-bottom: 1px #000 solid;border-right: 1px #000 solid; text-align: right; font-weight: bold;">{{number_format($amount_total, 2, ',', ' ')}}</td>
    </tr>
</table>

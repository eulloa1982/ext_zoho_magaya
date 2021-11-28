<table class="info" cellspacing="0px" cellpadding="0px" width="100%" style="margin-top: 10px;">
    <tr>
        <th colspan="5" style="padding: 5px 0px 5px 5px; background-color: #577BC1; text-align: start;text-transform:uppercase ;border: 1px #000 solid">Charges</th>
    </tr>
    <tr style="font-weight: bold; background-color: #d3daf8; border: 1px solid #1a2142;">
        <th style="text-align: center;width: 40%">Charge Description</th>
        <th style="text-align: center;">Price</th>
        <th style="text-align: center;">Quantity</th>
        <th style="text-align: center;">Tax Amount</th>
        <th style="text-align: center;">Final Amount</th>
    </tr>
    {{$amount_total = 0;}}
    @if (@isset($organization['charges']))        
        @foreach ($organization['charges'] as $dat=>$v)
            {{ $amount_total += $v['magaya__Amount_Total'] }}
        <tr style="padding: 5px 0px 5px 5px;">
            <td style="text-align: center;">{{$v['Name']}}</td>
            <td style="text-align: right;">{{number_format($v['magaya__Price'], 2, ',', ' ')}}</td>
            <td style="text-align: right;">{{$v['magaya__CQuantity']}}</td>
            <td style="text-align:right;">{{number_format($v['magaya__Amount'], 2, ',', ' ')}}</td>
            <td style="text-align: right; font-weight: bold;">{{number_format($v['magaya__Amount_Total'], 2, ',', ' ')}}</td>
        </tr>
        @endforeach
    @else 
        <tr>
            <td style="text-align: center;"><br><br><br></td>
            <td style="text-align: right;"><br><br><br></td>
            <td style="text-align: right;"><br><br><br></td>
            <td style="text-align: right;"><br><br><br></td>
            <td style="font-weight: bold;"><br><br><br></td>
        </tr>
    @endif
    <tr>
        <td colspan="3"></td>
        <td style="text-align: right;">TOTAL</td>
        <td style="text-align: right; font-weight: bold;">{{number_format($amount_total, 2, ',', ' ')}}</td>
    </tr>
</table>

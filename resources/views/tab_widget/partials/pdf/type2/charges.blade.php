<table class="info" width="97%" style="font-size: 11px; margin-top: 10px; border-collapse:separate; border:solid black 1px; border-radius:6px;">
    <tr>
        <th colspan="5" style="padding: 5px 0px 5px 5px; color: white; background-color: #577BC1; text-align: start;text-transform:uppercase ;border: 1px #8b8584 solid">Charges</th>
    </tr>
    <tr style="font-weight: bold; background-color: #d3daf8; ">
        <th style="text-align: center;width: 40%; border: 1px solid #8b8584;">Charge Description</th>
        <th style="text-align: center; width: 8%;border: 1px solid #8b8584;">Price</th>
        <th style="text-align: center; width: 8%;border: 1px solid #8b8584;">Quantity</th>
        <th style="text-align: center; width: 14%;border: 1px solid #8b8584;">Tax Amount</th>
        <th style="text-align: center; width: 14%; border: 1px solid #8b8584;">Final Amount</th>
    </tr>
    {{$amount_total = 0;}}
    @if (@isset($organization['charges']))
        @foreach ($organization['charges'] as $dat=>$v)
            {{ $amount_total += $v['magaya__Amount_Total'] }}
        <tr style="padding: 5px 0px 5px 5px;">
            <td style="text-align: center;">{{$v['Name']}}</td>
            <td style="text-align: right;">$ {{number_format($v['magaya__Price'], 2, ',', ' ')}}</td>
            <td style="text-align: right;">{{$v['magaya__CQuantity']}}</td>
            <td style="text-align:right;">$ {{number_format($v['magaya__Tax_Amount'], 2, ',', ' ')}}</td>
            <td style="text-align: right; font-weight: bold;">$ {{number_format($v['magaya__Amount_Total'], 2, ',', ' ')}}</td>
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
        <td style="text-align: right; font-weight: bold;">$ {{number_format($amount_total, 2, ',', ' ')}}</td>
    </tr>
</table>

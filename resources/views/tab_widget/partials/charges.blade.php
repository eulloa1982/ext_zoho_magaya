@if (@isset($organization['charges']))
    @foreach ($organization['charges'] as $dat=>$v)
        <tr>
            <td style="border-bottom: 1px #000 solid;border-left: 1px #000 solid;border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: left;">{{$v['Name']}}</td>
            <td style="border-bottom: 1px #000 solid;border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: right;">{{$v['magaya__Price']}}</td>
            <td style="border-bottom: 1px #000 solid;border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: right;">{{$v['magaya__CQuantity']}}</td>
            <td style="border-right: 1px #000 solid; text-align: right;">{{$v['magaya__Amount']}}</td>
            <td style="border-right: 1px #000 solid; text-align: right; font-weight: bold;">{{$v['magaya__Amount_Total']}}</td>
        </tr>
    @endforeach
@endif

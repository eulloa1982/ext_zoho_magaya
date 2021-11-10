<table cellspacing="0px" cellpadding="0px" width="100%" style="margin-top: 10px">
    <tr>
        <th colspan="6" style="background-color: lightblue; text-align: start;text-transform:uppercase ;border: 1px #000 solid;">Items</th>
    </tr>
    <tr>
        <th width="20%" style="border-left: 1px #000 solid; border-bottom: 1px #000 solid; border-right: 1px #000 solid; text-align: center;">Description </th>
        <th width="15%" style="border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: center;">Package Type</th>
        <th width="10%" style="border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: center;">Quantity</th>
        <th width="25%" style="border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: center;">Dimensions</th>
        <th width="10%" style="border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: center;">Weight</th>
        <th width="20%" style="border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: center;">Volume</th>
    </tr>
    @if (@isset($organization['items']))
        {{$total_weight = 0}}
        {{$total_volume = 0}}
        {{$measure_length = "in"}}
        {{$measure_weigth = "lb"}}
        {{$measure_volume = "ft"}}        
        {{$total_weight_international = 0}}
        {{$total_volume_international = 0}}
        {{$total_weight_english = 0}}
        {{$total_volume_english = 0}}
        {{$measure_system = ''}}
        @foreach ($organization['items'] as $dat=>$v)
        @if ($v['magaya__Measure_System'] === "International") {
            {{$measure_length = "m"}}
            {{$measure_volume = "m"}}
            {{$measure_weigth = "kg"}}
            {{$total_volume_international += ($v['magaya__Volume'] * $v['magaya__Pieces'])}}
            {{$total_weight_international += ($v['magaya__Weigth'] * $v['magaya__Pieces'])}}
         @else 
            {{/*/pulgadas y libras*/}}
            {{$total_volume_english += ($v['magaya__Volume'] * $v['magaya__Pieces'])}}
            {{$total_weight_english += ($v['magaya__Weigth'] * $v['magaya__Pieces'])}}
        @endif
        {{$measure_system = $v['magaya__Measure_System']}}
        <tr>
            <td width="20%" style="border-left: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">{{$v['Name']}}</td>
            <td width="20%" style="border-left: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">{{$v['magaya__Package_Type']['name']}}</td>
            <td width="15%" style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">{{$v['magaya__Pieces']}}</td>
            <td width="15%" style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">{{$v['magaya__Length']}} X {{$v['magaya__Width']}} X {{$v['magaya__Height']}} ({{$measure_length}})</td>
            <td width="15%" style="border-right: 1px #000 solid; text-align: right;border-bottom: 1px #000 solid;">{{$v['magaya__Weigth']}} ({{$measure_weigth}})</td>
            <td width="15%" style="border-right: 1px #000 solid; text-align: right;border-bottom: 1px #000 solid;">{{$v['magaya__Volume']}} ({{$measure_volume}}<sup>3</sup>)</td>
        </tr>
        @endforeach
        {{$total_weight = ($total_weight_international + $total_weight_english)}}
        {{$total_volume = ($total_volume_international + $total_volume_english)}}
        <tr style="font-weight: bolder">
            <td colspan="3"></td>
            <td style="border-left:1px #000 solid; border-bottom: 1px #000 solid;border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: right;">TOTAL</td>
            <td style="border-bottom: 1px #000 solid;border-right: 1px #000 solid; text-align: right; font-weight: bold;"><?php echo round($total_weight, 2); ?> ({{$measure_weigth}})</td>
            <td style="border-bottom: 1px #000 solid;border-right: 1px #000 solid; text-align: right; font-weight: bold;"><?php echo round($total_volume, 2); ?> ({{$measure_volume}}<sup>3</sup>)</td>
        </tr>
    @endif
</table>

<table class="info" width="100%" style="font-size: 11px; margin-top: 10px; border-collapse:separate; border:solid black 1px; border-radius:6px;">
    <tr>
        <th colspan="6" style="padding: 5px 0px 5px 5px; color: white; background-color: #577BC1; text-align: start;text-transform:uppercase ;border: 1px #000 solid">Items</th>
    </tr>
    <tr style="font-weight: bold; background-color: #d3daf8;">
        <th style="text-align: center; border: 1px solid #8b8584; width:20%;">Description </th>
        <th style="text-align: center; border: 1px solid #8b8584; width:20%">Package Type</th>
        <th style="text-align: center; border: 1px solid #8b8584; width:8%;">Quantity</th>
        <th style="text-align: center;border: 1px solid #8b8584; width:20%">Dimensions</th>
        <th style="text-align: center;border: 1px solid #8b8584; width: 10%">Weight</th>
        <th style="text-align: center;border: 1px solid #8b8584; width: 10%">Volume</th>
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
                {{$total_volume_international += $v['magaya__Total_V']}}
                {{$total_weight_international += $v['magaya__Total_Weight']}}
            @else
                {{$total_volume_english += $v['magaya__Total_V']}}
                {{$total_weight_english += $v['magaya__Total_Weight']}}
            @endif

            {{$measure_system = $v['magaya__Measure_System']}}
            <tr style="background-color: #f0f2f8; border: 30px solid #1a2142;">
                <td style="text-align: center;">{{$v['Name']}}</td>
                <td style="text-align: center;">{{$v['magaya__Package_Type']['name']}}</td>
                <td style="text-align: center;">{{$v['magaya__Pieces']}}</td>
                <td style="font-size: 9px; text-align: center;">{{number_format($v['magaya__Length'], 2, ',', ' ')}} X {{number_format($v['magaya__Width'], 2, ',', ' ')}} X {{number_format($v['magaya__Height'], 2, ',', ' ')}} ({{$measure_length}})</td>
                <td style="text-align: right;">{{number_format($v['magaya__Total_Weight'], 2, ',', ' ')}} ({{$measure_weigth}})</td>
                <td style="text-align: right;">{{number_format($v['magaya__Total_V'], 2, ',', ' ')}} ({{$measure_volume}}<sup>3</sup>)</td>
            </tr>
        @endforeach
        {{$total_weight = $total_weight_international + $total_weight_english * 0.453562}}
        {{$total_volume = $total_volume_international + $total_volume_english * 0.0283168}}
        <tr>
            <td colspan="3"></td>
            <td style="text-align: right;">TOTAL</td>
            <td style="text-align: right; font-weight: bold;"><?php echo number_format($total_weight, 2, ',', ' '); ?> ({{$measure_weigth}})</td>
            <td style="text-align: right; font-weight: bold;"><?php echo number_format($total_volume, 2, ',', ' '); ?> ({{$measure_volume}}<sup>3</sup>)</td>
        </tr>
    @endif
</table>

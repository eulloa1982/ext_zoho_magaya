@if (@isset($organization['items']))
    @foreach ($organization['items'] as $dat=>$v)
        <tr>
            <td width="40%" style="border-left: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: left;">{{$v['magaya__Package_Type']['name']}}</td>
            <td width="15%" style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">{{$v['magaya__Pieces']}}</td>
            <td width="15%" style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">{{$v['magaya__Length']}} X {{$v['magaya__Width']}} X {{$v['magaya__Height']}}</td>
            <td width="15%" style="border-right: 1px #000 solid; text-align: right;border-bottom: 1px #000 solid;">{{$v['magaya__Weigth']}}</td>
            <td width="15%" style="border-right: 1px #000 solid; text-align: right;border-bottom: 1px #000 solid;">{{$v['magaya__Volume']}}</td>
        </tr>
    @endforeach
@endif

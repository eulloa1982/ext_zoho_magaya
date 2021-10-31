@if (@isset($organization['items']))
    @foreach ($organization['items'] as $dat=>$v)
        <tr>
            <td>{{$v['magaya__Package_Type']['name']}}</td>
            <td>{{$v['magaya__Pieces']}}</td>
            <td>{{$v['magaya__Length']}} X {{$v['magaya__Width']}} X {{$v['magaya__Height']}}</td>
            <td>{{$v['magaya__Weigth']}}</td>
            <td>{{$v['magaya__Volume']}}</td>
        </tr>
    @endforeach
@endif

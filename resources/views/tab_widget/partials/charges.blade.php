@if (@isset($organization['charges']))
    @foreach ($organization['charges'] as $dat=>$v)
        <tr>
            <td>{{$v['Name']}}</td>
            <td>{{$v['magaya__Price']}}</td>
            <td>{{$v['magaya__CQuantity']}}</td>
            <td>{{$v['magaya__Amount']}}</td>
            <td>{{$v['magaya__Amount_Total']}}</td>
        </tr>
    @endforeach
@endif

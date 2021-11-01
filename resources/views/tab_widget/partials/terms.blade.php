@if (isset($organization['mQuote']))
    <tr>
        <td colspan="5" style="border-left: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: left;">{{$organization['mQuote']['magaya__Terms']}}</td>
    </tr>
@else
    <tr>
        <td colspan="5" style="border-left: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: left;"><br></td>
    </tr>

@endif

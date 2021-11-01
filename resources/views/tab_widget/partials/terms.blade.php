<table cellspacing="0px" cellpadding="0px" width="100%">
    <tr>
        <th colspan="12" style="background-color: lightblue; text-align: start;text-transform:uppercase ;border: 1px #000 solid;">TERMS & CONDITIONS</th>
    </tr>
    @if (@isset($organization['mQuote']))
    <tr>
        <td colspan="12" style="border-left: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: left;">{{$organization['mQuote']['magaya__Terms']}}</td>
    </tr>
    @else
    <tr>
        <td colspan="5" style="border-left: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: left;"><br></td>
    </tr>
    @endif
</table>
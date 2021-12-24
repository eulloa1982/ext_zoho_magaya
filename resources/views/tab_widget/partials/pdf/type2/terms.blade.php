<table class="info" width="105%" style="font-size: 11px; margin-top: 10px; border-collapse:separate; border:solid black 1px; border-radius:6px;">
    <tr>
        <th colspan="12" style="padding: 5px 0px 5px 5px; color: white; background-color: #577BC1; text-align: start;text-transform:uppercase ;border: 1px #000 solid">TERMS & CONDITIONS</th>
    </tr>
    @if (@isset($organization['mQuote']['magaya__Terms']))
    <tr>
        <td colspan="12" style="border-left: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: left;">{{$organization['mQuote']['magaya__Terms']}}</td>
    </tr>
    @else
    <tr>
        <td colspan="12" style="border-left: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: left;"><br></td>
    </tr>
    @endif
</table>

<div style="opacity: 0.5; width: 260px; padding: 5px 5px 5px 5px; float: left; font-size: 14px; display: block; margin-top:30px;">

    @if (@isset($organization['mQuote']['magaya__Description']))
        <strong>Description: </strong>{{$organization['mQuote']['magaya__Description']}}
        <br />
    @endif

    @if (@isset($organization['mQuote']['magaya__Origin']))
        <strong>Origin: </strong>{{$organization['mQuote']['magaya__Origin']}}
        <br />
    @endif

    @if (@isset($organization['mQuote']['magaya__Destination']))
        <strong>Destination: </strong>{{$organization['mQuote']['magaya__Destination']}}
        <br />
    @endif

</div>

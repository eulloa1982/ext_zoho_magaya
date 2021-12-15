@extends('base_listmquote')
@section('main')

<style>
    body {
        background-color: white;
    }

    table.info > tbody > tr > td {
        border: 1px solid #1a2142;
        white-space: nowrap;
        vertical-align: top;
        padding: 5px 5px 5px 5px;
    }

</style>


<table cellspacing="0px" cellpadding="0px" style="border: none; background-color: none" width="100%">
    <tr>
        <td>
            @include('tab_widget.partials.pdf.type2.organization')
        </td>
    </tr>

    <tr>
        <td>
            @include('tab_widget.partials.pdf.type2.charges')
        </td>
    </tr>
    <tr>
        <td>
            @include('tab_widget.partials.pdf.type2.items')
        </td>
    </tr>
    <tr>
        <td>
            @include('tab_widget.partials.pdf.type2.terms')
        </td>
    </tr>
</table>






@stop
@section('js')
    <script>
        Utils.blockUI();
        $(document).ready(function(){
    });
   </script>
@stop

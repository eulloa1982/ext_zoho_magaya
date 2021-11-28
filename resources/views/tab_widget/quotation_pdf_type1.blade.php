@extends('base_listmquote')
@section('main')

<style>
    body {
        background-color: white;
        font-size: 12px;
    }
    table.info > tbody > tr > td {
        border: 1px solid #1a2142;
        white-space: nowrap;
        vertical-align: top;
        padding: 2px 2px 2px 2px;
    }
</style>

<table cellspacing="0px" cellpadding="0px" style="border: none; background-color: none" width="100%">
    <tr>
        <td>
            @include('tab_widget.partials.pdf.type1.organization')
        </td>
    </tr>
    <tr>
        <td>
            @include('tab_widget.partials.pdf.type1.mquote')
        </td>
    </tr>
    <tr>
        <td>
            @include('tab_widget.partials.pdf.type1.charges')
        </td>
    </tr>
    <tr>
        <td>
            @include('tab_widget.partials.pdf.type1.items')
        </td>
    </tr>
    <tr>
        <td>
            @include('tab_widget.partials.pdf.type1.terms')
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

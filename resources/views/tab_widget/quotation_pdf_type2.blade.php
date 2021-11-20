@extends('base_listmquote')
@section('main')

<style>
    body {
        background-color: white;
    }
</style>

<table cellspacing="0px" cellpadding="0px" style="border: none; background-color: none" width="100%">
    <tr>
        <td>
            @include('tab_widget.partials.pdf.charges')
        </td>
    </tr>
    <tr>
        <td>
            @include('tab_widget.partials.pdf.items')
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

@extends('base_listmquote')
@section('main')



<table cellspacing="0px" cellpadding="0px" style="border: none; background-color: white" width="100%">
    <tr>
        <td>
            @include('tab_widget.partials.pdf.organization')
        </td>
    </tr>
    <tr>
        <td>
            @include('tab_widget.partials.pdf.mquote')
        </td>
    </tr>
    <tr>
        <td>
            @include('tab_widget.partials.pdf.mquote_info')
        </td>
    </tr>
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
    <tr>
        <td>
            @include('tab_widget.partials.pdf.terms')
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

@extends('base_listmquote')
@section('main')


@include('tab_widget.partials.pdf.organization')

@include('tab_widget.partials.pdf.mquote')

@include('tab_widget.partials.pdf.charges')

@include('tab_widget.partials.pdf.items')

@include('tab_widget.partials.pdf.terms')







@stop
@section('js')
    <script>
        Utils.blockUI();
        $(document).ready(function(){
    });
   </script>
@stop

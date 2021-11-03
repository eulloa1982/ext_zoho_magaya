@extends('base_listmquote')
@section('main')


@include('tab_widget.partials.organization')

@include('tab_widget.partials.mquote')

@include('tab_widget.partials.charges')

@include('tab_widget.partials.items')

@include('tab_widget.partials.terms')







@stop
@section('js')
    <script>
        Utils.blockUI();
        $(document).ready(function(){
    });
   </script>
@stop

@extends('base_listmquote')
@section('main')

<?php
//print_r($organization['orgData']['city']);

/*
<table><tr><td>Name</td></tr>
@foreach ($organization as $dat)
        <li>{{ $dat->city }}</li>

        @endforeach

</table>*/
?>
<div class="container" style="clear: both;">
    @include('tab_widget.partials.organization')       
</div>

<div class="container" style="margin-top: 10px">
    @include('tab_widget.partials.mquote')    
</div>

<div class="container" style="margin-top: 10px">
    @include('tab_widget.partials.charges')
</div>

<div class="container" style="margin-top: 10px">
    @include('tab_widget.partials.items')
</div>

<div class="container" style="margin-top: 10px">
    @include('tab_widget.partials.terms')
</div>






@stop
@section('js')
    <script>
        Utils.blockUI();
        $(document).ready(function(){
    });
   </script>
@stop
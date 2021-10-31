@extends('base_listmquote')
@section('main')
<style>
th, td {
  padding: 2px;
}
</style>
<img src="{{ url('images/pdfv1/magaya.png') }}" width="60px" height="60px" alt="Quote" />
    @include('tab_widget.partials.organization')

<br /><br /><br /><br /><br /><br />
    @include('tab_widget.partials.mquote')

<br /><br />

    <table width="100%" cellspacing="0px" cellpadding="0px">
        <tr>
            <th colspan="5" style="background-color: lightgrey; text-align: start;text-transform:uppercase ;border: 1px #000 solid">Charges</th>
        </tr>
        <tr style="font-weight: bold;">
            <th style="border-left: 1px #000 solid;border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">Charge Description</th>
            <th style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">Price</th>
            <th style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">Quantity</th>
            <th style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">Tax Amount</th>
            <th style="border-right: 1px #000 solid;border-bottom: 1px #000 solid; text-align: center;">Final Amount</th>
        </tr>
        @include('tab_widget.partials.charges')

    </table>

<br /><br />
    <table width="100%">
        <tr>
            <th colspan="5" style="background-color: lightgrey; text-align: start;text-transform:uppercase ;border: 1px #000 solid;">Items</th>
        </tr>
        <tr>
            <th style="border-left: 1px #000 solid; border-bottom: 1px #000 solid; border-right: 1px #000 solid; text-align: center;">Description </th>
            <th style="border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: center;">Quantity</th>
            <th style="border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: center;">Dimensions</th>
            <th style="border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: center;">Weight</th>
            <th style="border-right: 1px #000 solid; border-bottom: 1px #000 solid; text-align: center;">Volume</th>
        </tr>
        @include('tab_widget.partials.items')

    </table>

<br /><br />

    <table width="100%">
        <tr>
            <th style="background-color: lightgrey; text-align: start;text-transform:uppercase ;border: 1px #000 solid;">Terms</th>
        </tr>

        @include('tab_widget.partials.terms')

    </table>








@stop
@section('js')
    <script>
        Utils.blockUI();
        $(document).ready(function(){
    });
   </script>
    @stop

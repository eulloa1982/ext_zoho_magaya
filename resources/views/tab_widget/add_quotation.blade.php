@extends('base_widgetslistmquote')
@section('main')
<style>
    /*table{
        /*table-layout: fixed;**
        width: 100%;
    }
    th, td {
        border: 1px solid blue;
        /*max-width: 200px;
        word-wrap: break-word;
        /*width: 1% !important;**
    }*/
    .number
{
    text-align: right;
}

.nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
    color: #007bff;
    background-color: #fff;
    border-color: #dee2e6 #dee2e6 #fff;
}

a {
    color: #495057;
    text-decoration: none;
    background-color: transparent;
}

.material-icons {
	font-size: 18px;
    cursor: pointer;
}

.panel select, .panel input {
    text-align-last: left;
    padding: 0px 5px 0px 10px;
    direction: initial;
}

.fieldset .legend {
    background: #0b3355;
    padding: 6px;
    font-weight: bold;
    color: white;
    padding-top: 2px;
    padding-bottom: 2px;
}



</style>
<div id="magaya_link"></div>
<!-- modal to edit and insert mquotes -->
@include('tab_widget.partials.listmquote.form_modal')

@stop
@section('js')
    <script>
        Utils.blockUI();
        $(document).ready(function(){
            $("#Title").html("Add mQuoted <span class='material-icons' id='reload'>restart_alt</span>");

            //drop the state temporal items and charges
            storeItem.dispatch(emptyItems())
            storeCharge.dispatch(emptyCharges())
            storeQuote.dispatch(clearQuoteToEdit())
            storeAccounts.dispatch(emptyAccounts())
            storeAccounts.dispatch(getAllAccounts())
            //representative
            $("select[name=magaya__Representative]").empty()
            //limpiar campos
            limpiar_form()

            //set tab quotatioFor active by default
            $("#nav-home-tab").addClass("active");
            $("#menu5").addClass("active show");
            $("#nav-general-tab").removeClass("active");
            $("#nav-routing-tab").removeClass("active");
            $("#nav-charges-tab").removeClass("active");
            $("#nav-items-tab").removeClass("active");
            $("#nav-terms-tab").removeClass("active");
            $("#nav-notes-tab").removeClass("active");
            $("#menu1").removeClass("show active");
            $("#menu2").removeClass("show active");
            $("#menu3").removeClass("show active");
            $("#menu4").removeClass("show active");
            $("#menu6").removeClass("show active");
            $("#menu7").removeClass("show active");

            $("#table-charges").hide();
            $("#table-charges-new tbody").empty();
            $("#table-charges-new").show();

            $("#table-items").hide();
            $("#table-items-new tbody").empty();
            $("#table-items-new").show();

            $("#New").show();
            $("#Save").hide();
            $("#sendCharges").hide();
            $("#newCharges").show();
            $("#sendItem").hide();
            $("#newItem").show();

            $("#addNoteNew").show()
            $("#notes-new").show()
            $("#addNote").hide()
            $("#notes").hide()

            $('#mquoteModal').modal('toggle')

            $("#reload").click(function() {
                location.reload()
            })
    });
   </script>
    @stop

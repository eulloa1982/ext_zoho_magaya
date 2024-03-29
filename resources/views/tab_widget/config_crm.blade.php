@extends('tab_widget.layout')
@section('content')
<style>
    @media screen and (min-width: 676px) {
        #QuoteForm .modal-dialog {
          max-width: 85%; /* New width for default modal */
        }
    }

    body {
        background-color: #e5e2e1;
    }

    .carousel-control-prev-icon {
        background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23f02' viewBox='0 0 8 8'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E");
    }

    .carousel-control-next-icon {
        background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23f02' viewBox='0 0 8 8'%3E%3Cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E");
    }
    .carousel-control-prev,
    .carousel-control-next{
          bottom: 95%;
    }

    .carousel-inner{
        width: 90%
    }

    .selected-magaya, .selected-crm {
        /*background-repeat: no-repeat;
        background-attachment: fixed;
        background-position: center;*/
        border: 1px solid blue;
    }

    .send-to-crm{
        display: inline;
    }

    .delete-from-crm{
        display: inline;
    }

    li {
        user-select: none;
    }

    input[type="checkbox"] {
        appearance: none;
    }

    input[type="checkbox"]:after {
        content: '';
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 14px;
        height: 14px;
        line-height: 14px;
        border: 1px solid grey;
        border-radius: 3px;
        vertical-align: bottom;
    }

    input[type="checkbox"]:checked:after {
        content: '✓';
        background-color: black;
        color: white;
    }
</style>

<div class="container">
    <div id="quote-alert" class="alert alert-danger alert-dismissible" style="position: absolute; display: none; z-index: 6000">
        <span class="material-icons close cursor-hand" data-close="quote-alert">close</span>
        <div id="message-alert" class="message-data"></div>

    </div>

    <div id="quote-info" class="alert alert-success alert-dismissible" style="position: absolute; display: none; z-index: 6000;">
        <span class="material-icons close cursor-hand" data-close="quote-info">close</span>
        <div id="message-info" class="message-data"></div>
    </div>

    <div class="row" style="width:100%">


        <div class="col-md-6">

            <label><h5 class="list-group-item active">CRM</h5></label>
            <div class="delete-from-crm">
            <span class="material-icons delete-from-crm">delete_forever</span>
            </div>

            <span class="material-icons add-on-crm">data_saver_on</span>
            <ul id="sortable-crm" class="list-group connectedSortable">
            </ul>
        </div>
        <div class="col-md-6" id="magaya-content">
            <div class="send-to-crm">
                <span class="material-icons send-to-crm">arrow_back</span>
            </div>
            <label><h5 class="list-group-item active">Magaya</h5></label>
            <!--div class="import-all-charges" style="display: inline" data-bs-toggle="tooltip" data-bs-placement="right" title="Export all charges"><i class="fa fa-database" aria-hidden="true"></i></div-->
            <ul id="sortable-magaya-charges" class="list-group connectedSortable sortablecrm"></ul>
            <ul id="sortable-magaya-ports" class="list-group connectedSortable sortablecrm"></ul>
            <ul id="sortable-magaya-providers" class="list-group connectedSortable sortablecrm"></ul>

        </div>
    </div>
</div>

<!----- modal view quotation pdf ---->
<!-- modal form edit-->
<div class="modal fade" id="new-record" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">

            </div>

            <div class="modal-body">
            <div class="container-fluid">

            <div class="card-body">
                <form id="generic-form">
                    <div id="form"></div>
                </form>
                <!---span class="btn btn-outline-success send">New</span><br />
                <span class="btn btn-outline-success edit">Edit</span><br /-->


            </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" id="cancel" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
</div>

@stop
 @section('js')
 <script src="{{ url('js/ui_madmin/madmin.js', $extra = [], $secure = 1) }}"></script>

 <script src="{{ url('js/ui_madmin/subscribers/subscribersChargeDef.js', $extra = [], $secure = 1) }}"></script>
 <script src="{{ url('js/ui_madmin/subscribers/subscribersPortsDef.js', $extra = [], $secure = 1) }}"></script>
 <script src="{{ url('js/ui_madmin/subscribers/subscribersProvidersDef.js', $extra = [], $secure = 1) }}"></script>

 <script src="{{ url('js/ui_madmin/subscribers/subscribersItemsCrm.js', $extra = [], $secure = 1) }}"></script>
 <script src="{{ url('js/ui_madmin/subscribers/subscribersCurrentModule.js', $extra = [], $secure = 1) }}"></script>
 <script src="{{ url('js/ui_madmin/utils/biblio_jquery.js', $extra = [], $secure = 1) }}"></script>


<script>
$(document).ready(function(){
    //Close all
    $('.close').click(function(){
        let div_close = $(this).attr("data-close");
        $(`#${div_close}`).hide();
    })




    ZOHO.embeddedApp.on("PageLoad",function(data)
    {
        $(".module_search").click(function(e) {
            Utils.blockUI()
            let value = $(this).attr("data-module")
            storeCurrentModule.dispatch(addCurrentModule(value))

            //storeChargesDef.dispatch(getCurrentItemDef({module: value}))
            ZOHO.CRM.API.getAllRecords({Entity:currentModule,sort_order:"desc",per_page:250,page:1})
                .then(function(data){
                    let charges_type = data.data;
                    storeCrm.dispatch(addItemCrm(data.data))
                    return charges_type;
                })
                .then(function(charges_type) {
                    //sanitizer
                    $.map(charges_type, function(k, v) {
                        k.Name = sanitize(k.Name)

                    })

                    switch(currentModule) {
                        case "magaya__Ports": {
                            storePortsDef.dispatch(makeActivePort())
                            storeChargesDef.dispatch(makeInactiveChargeDef())
                            storeProvidersDef.dispatch(makeInactiveProviderDef())
                            //storePackages.dispatch(makeInactivePackages())
                            break
                        }

                        case "magaya__Charges_Type": {
                            storePortsDef.dispatch(makeInactivePort())
                            storeChargesDef.dispatch(makeActiveChargeDef())
                            storeProvidersDef.dispatch(makeInactiveProviderDef())
                            //storePackages.dispatch(makeInactivePackages())

                            break;
                        }

                        case "magaya__Providers": {
                            storeProvidersDef.dispatch(makeActiveProviderDef())
                            storeChargesDef.dispatch(makeInactiveChargeDef())
                            storePortsDef.dispatch(makeInactivePort())
                            //storePackages.dispatch(makeInactivePackages())
                            break;
                        }

                        case "magaya__Package_Types": {
                            storeProvidersDef.dispatch(makeInactiveProviderDef())
                            storeChargesDef.dispatch(makeInactiveChargeDef())
                            storePortsDef.dispatch(makeInactivePort())
                            //storePackages.dispatch(makeActivePackages())
                            break;
                        }

                        default:
                            break;
                    }

                    Utils.unblockUI()

                })
        })
        getChargesDefinition()
        getWorkingPorts()
        getCarriers()

    })

    ZOHO.embeddedApp.init()






}); //jQuery


</script>
@stop



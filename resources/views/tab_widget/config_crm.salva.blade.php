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
    <div style="position: relative; margin:-10px -10px -10px -10px;">
        <div class="alert alert-success" id="message-success" style="position: absolute; left: 30px; top: 10px; z-index: 3; display: none">Select Quote From</div>
    </div>
    <div style="position: relative; margin:-10px -10px -10px -10px;">
        <div class="alert alert-danger" id="message-error" style="position: absolute; left: 30px; top: 10px; z-index: 3; display: none">Select Quote From</div>
    </div>
    <div class="row" style="width:100%">


        <div class="col-md-6">
            <div class="delete-from-crm"><i class="fa fa-trash" aria-hidden="true"></i></div>
            <label><h5 class="list-group-item active">CRM</h5></label>
            <ul id="sortable-crm" class="list-group connectedSortable">
            </ul>
        </div>
        <div class="col-md-6" id="magaya-content">
            <div class="send-to-crm"><i class="fa fa-arrow-circle-left" aria-hidden="true"></i></div>
            <label><h5 class="list-group-item active">Magaya</h5></label>
            <!--div class="import-all-charges" style="display: inline" data-bs-toggle="tooltip" data-bs-placement="right" title="Export all charges"><i class="fa fa-database" aria-hidden="true"></i></div-->
            <ul id="sortable-magaya" class="list-group connectedSortable">
            </ul>
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
<script src="{{ url('js/biblio.jquery2.js') }}"></script>
<script src="{{ url('js/config3.js') }}"></script>
<script src="{{ url('js/utils_cookies.js') }}"></script>

<script>
$(document).ready(function(){
    async function getMagayaVar(){
        let dataVar = await getMagayaVariables();
    }
    $("#magaya-loguin").click(function() {
        user = getCookie('user')
        pass = getCookie('pass')
        access_key = getCookie('access_key')
        dataCharge = {
            method: `StartSession`,
            data: [

                user,
                pass,
                access_key
            ]
        }

        MagayaAPI.sendRequest(dataCharge, function(result) {
            if (_.isEmpty(result.data)) {
                Swal.fire({
                    title: "Error",
                    text: "Cant get data charges",
                    icon: 'error'
                })
            } else {
                /*$.map(result.data.ChargeDefinition, function(k, v) {
                    var content = `<li class="list-group-item" data-id="${v}"> ${k.Code}  ${k.Description}</li>`
                    $("#sortable-magaya").append(content);
                    magayaCharges.push(k)
                })*/
            }
        });
    })




    magayaCharges = [];
    //get magaya charges
    //getMagayaContent();

    $("#sortable-crm").sortable({
        connectWith: ".connectedSortable",
            receive: function( event, ui ) {
                data = ui.item;
                $.map(data, function(k){
                    idQuote = k.attributes['data-id']['nodeValue']
                    dataSend = magayaCharges[idQuote];
                });
                //get active module
                moduleName = localStorage.getItem('module');
                dataSend = chargeMagayaToCRM(dataSend);
                let result = insertChargeTypeCRM(dataSend)
                getAllRecordCRM("magaya__Charges_Type").then(r => {
                                $("#sortable-crm").empty();
                                let dataModule = '';
                                if (!_.isEmpty(r)) {
                                    $.each(r, function(k, i) {
                                        dataModule += ` <label class="list-group-item"><div class="sm">
                                        <input data-id="${i.id}" class="form-check-crm" type="checkbox" value="">
                                        <i class="edit-data fa fa-eye"></i></div>${sanitize(i.Name)}  dfgdfgdf</label>`
                                            //dataModule += ` <li class="list-group-item"><div class="sm"></div>${i.Name}</li>`
                                    })
                                } else {
                                    dataModule += ` <li class="list-group-item" >No Data</li>`

                                }

                                $(dataModule).appendTo("#sortable-crm")

                            });


            },
            remove: function (event, ui) {
                $(this).sortable('cancel');
            }
        });

        $("#sortable-magaya").sortable({
            connectWith: ".connectedSortable",
            remove: function ( event, ui) {
                $("#sortable-crm").prepend(ui.item.clone());
                $(this).sortable('cancel');
            }
    });

    //get zoho content
    ZOHO.embeddedApp.on("PageLoad",function(data)
    {
        moduleName = 'magaya__Charges_Type';
        localStorage.setItem('module','magaya__Charges_Type'  )
        //first thing to do


        getContent(moduleName);
        getMagayaContent("GetChargeDefinitions");
    });

    ZOHO.embeddedApp.init();
    //getContent first


    $(".module_search").click(function () {

        var moduleName = $(this).attr("data-module");
        //set module in localStorage
        localStorage.setItem('module', moduleName);

        getContent(moduleName);
        if (moduleName === 'magaya__Charges_Type' ) {
            buildMagayaContentFromArray(magayaCharges);
            $("#magaya-content").show()
        }
        else {
            buildMagayaContentFromArray();
            $("#magaya-content").hide();
        }


    })

    //bind dinamic form
    $('#form').bind("DOMSubtreeModified", function(){
        //button send new record
        $(".send").click(function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            //get module from localStorage

            var module = localStorage.getItem('module');
            //serialize form
            var data = {};
            var a = $("#generic-form").serializeArray();
            $.each(a, function() {
                if (data[this.name]) {
                    if (!data[this.name].push) {
                        data[this.name] = [data[this.name]].replace(/[^a-zA-Z ]/g, "");
                    }
                    data[this.name].push(this.value.replace(/[^a-zA-Z ]/g, "") || '');
                } else {
                    data[this.name] = this.value.replace(/[^a-zA-Z ]/g, "") || '';
                }
            });
            //console.log(data)

            insertRecordCRM(module, data)
                .then(r => {
                    if (r[0]['code'] == "SUCCESS") {
                        Swal.fire({
                            title: 'Success',
                            text: 'Operation success',
                            icon: 'success',
                            allowOutsideClick: false
                        })
                    }
                })
                .catch(function(response) {
                    Swal.fire({
                            title: 'Error',
                            html: response.error,
                            icon: 'error',
                            allowOutsideClick: false
                        })
                })
        });

    });


    //botton enviar al CRM
    $(".send-to-crm").click(function(e) {
        console.log("Sendinf")
            e.preventDefault();
            e.stopImmediatePropagation();
            var message = '';
            var i = 0;
            moduleName = localStorage.getItem('module');
            $("input[class=form-check-magaya]:checked").each(function() {

                id = $(this).attr("data-id");
                dataSend = magayaCharges[id];
                console.log("dATA SEND dd", dataSend);

                moduleName = localStorage.getItem('module');
                dataSend = chargeMagayaToCRM(dataSend);
                //inserting
                let result = insertChargeTypeCRM(dataSend)

            })

        })




    //bind dinamic sortable
    $('#sortable-magaya').bind("DOMSubtreeModified", function(){
        $("#sortable-magaya li").click(function () {
            $(this).addClass("selected-magaya")
            $(".send-to-crm").show();
        })


    });

    //bind sortable crm
    $('#sortable-crm').bind("DOMSubtreeModified", function(){
        $("#sortable-crm li").click(function () {
            //$(this).toggleClass('selected-crm class2')
           $(this).addClass("selected-crm")
           $(".delete-from-crm").show();
        })

        $(".delete-from-crm").click(function(e){
            e.preventDefault();
            e.stopImmediatePropagation();

            i = 0;
            $("input[class=form-check-crm]:checked").each(function(k) {
                i++
            })

            if (i > 0) {
                moduleName = localStorage.getItem('module');
                let message = '';
                $("input[class=form-check-crm]:checked").each(function(k) {
                    id = $(this).attr("data-id");
                    deleteDataCRM(moduleName, id)
                        .then(r => {
                            data = r.data
                            message = `Delete record ${id} ${data[0]['code']}<br />`
                            $("#message-success").html(message).css("display", "inline").fadeIn("slow").delay(1000).fadeOut("slow");;

                        }).then(function() {

                            getContent(moduleName)

                        })
                })
            }
        })

        //show data to edit
        $(".edit-data").click(function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            //get id
            id = $(this).attr("data-id");
            //get moduleName
            var moduleName = localStorage.getItem('module');
            //get the record
            ZOHO.CRM.API.getRecord({ Entity: moduleName, RecordID: id })
                .then(function(data) {
                    //fill the form
                    response = data.data;

                    if (!_.isEmpty(response)) {
                        $.each(response, function(k, v) {
                            //console.log("FIELD", v)
                            $("#form :input[name=Name]").val(v.Name);

                            $("#form :input[name=Id]").val(v.id);
                            $.each(v, function(key, value) {
                                //set generic fields
                                if (!_.isObject(key) && !_.isArray(key) && key.indexOf("$") < 0) {
                                    $("#form :input[name=" + key + "]").val(value);
                                }
                            })
                        })
                    }

                }).then(function() {
                    $(".edit").show();
                    $(".send").hide();
                    $("#new-record").modal("show")
                })
        })

        //update data
        $(".edit").click (function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            //serialize form
            var data = {};
            var a = $("#generic-form").serializeArray();
            $.each(a, function() {
                if (data[this.name]) {
                    if (!data[this.name].push) {
                        data[this.name] = [data[this.name]];
                    }
                    data[this.name].push(this.value || '');
                } else {
                    data[this.name] = this.value || '';
                }
            });

            //get module name
            moduleName = localStorage.getItem('module');
            //update record
            /*var config={
                    Entity:moduleName,
                    id:
                    APIData:{
                        "id": "1000000049031",
                        "Company": "Zylker",
                        "Last_Name": "Peterson"
                    },
            }
            ZOHO.CRM.API.updateRecord(config)
            .then(function(data){
                console.log(data)
            })*/
        })
    });


    //show modal new record
    $(".show-form").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        $("#form").empty();
        $(".send").show();
        $(".edit").hide();
        moduleName = localStorage.getItem('module');
        getContent(moduleName)
        $("#new-record").modal();

    })




}); //jQuery


</script>
@stop



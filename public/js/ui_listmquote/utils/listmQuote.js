$(document).ready(function(){

    idmQuoteToEdit = 0;
    Utils.blockUI();
    var chargesOnNew = []

    jQuery('input[name=magaya__ExpirationDate]').datetimepicker({
        format: 'Y-m-d H:m:s'
    });

    $(".new-charge").focus(function(e) {
        $(this).addClass("editable");

        oldValue = $(this).val()
    })

    $(".new-charge").on("change blur", function(e) {
        e.preventDefault();
        e.stopImmediatePropagation()
        let $celd = $(this)
        $(this).removeClass("editable")

        let value = $(this).val();
        let field = $(this).attr('name');

        let idItem = $(this).attr("data-id")
        value = sanitize(value);

        if (field === "Adjustment" || field === "magaya__CQuantity" || field === "magaya__Price" || field === "magaya__TaxRate") {
            value = parseFloat(value);
        }
        //si los valores son iguales, no actualizar nada
        if (oldValue.toString() !== value.toString()) {
            //storeCharge.dispatch(updateCharge({id:idItem, field: field, value: value}))
            //storeCharge.dispatch(setAmountOnNew({id:idItem, field: field, value: value}))
            storeCharge.dispatch(updateChargeOnNew({field: field, value: value}))
        }

    })

    //campos del formulario new item
    $(".new-item").focus(function(e) {
        $(this).addClass("editable");

        oldValue = $(this).val()
    })

    $(".new-item").on("change blur", function(e) {
        e.preventDefault();
        e.stopImmediatePropagation()
        let $celd = $(this)
        $(this).removeClass("editable")

        let value = $(this).val();
        let field = $(this).attr('name');

        //let idItem = $(this).attr("data-id")
        value = sanitize(value);
        if (field === "magaya__Package_Description") {
            value = sanitize(value)
        } else {
            value = parseFloat(value);
        }
        //si los valores son iguales, no actualizar nada
        if (sanitize(oldValue) !== sanitize(value)) {
            storeItem.dispatch(updateItemOnNew({field: field, value: value}))
        }

    })

    ///////////////////////////////////////////////////////////////////////////////////
    /////////table quotes, main table
    ///////////////////////////////////////////////////////////////////////////////////
    $('#table-quotes').bind("DOMSubtreeModified", function(e) {
        e.preventDefault()

        $(".toPdf").click(function(e) {
            e.stopImmediatePropagation()

            storeItem.dispatch(emptyItems())
            storeCharge.dispatch(emptyCharges())
            storeAccounts.dispatch(emptyAllAccounts())
            storeQuote.dispatch(clearQuoteToEdit())

            let idmQuote = $(this).attr('data-id')

            let pdf = make_pdf(idmQuote);

        })


        //mass delete
        $("#deleteMquote").click(function(e) {
            e.preventDefault();
            Swal.fire({
                    title: "Confirm",
                    text: "You are about to delete record from CRM, you sure?",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "Yes",
                    cancelButtonText: "Cancel",
                    cancelButtonColor: '#d33'

                }).then((result) => {

                    if (result.isConfirmed) {
                        $("input[class=quoteCheckBox]:checked").each(function() {
                            let idQuote = $(this).attr('data-id')

                            ZOHO.CRM.API.deleteRecord({Entity:"magaya__SQuotes",RecordID: idQuote})
                                .then(function(data){
                                    //storeCheckBox.dispatch(addCheckBox({checkbox: idQuote}))
                                    storeQuote.dispatch(deleteQuote({id: idQuote}))
                                })

                        })
                    }
                })
         })


        // Activate tooltip
        $('[data-toggle="tooltip"]').tooltip();

        // Select/Deselect checkboxes
        var checkbox = $('#table-quotes tbody input[type="checkbox"]');
        $("#selectAll").click(function(){
            if(this.checked){
                checkbox.each(function(){
                    this.checked = true;
                });
            } else{
                checkbox.each(function(){
                    this.checked = false;
                });
            }
        });
        checkbox.click(function(){
            if(!this.checked){
                $("#selectAll").prop("checked", false);
            }
        });

        //////  boton delete quote  //////
        $(".delete").click(function(e) {
            e.preventDefault();
            e.stopImmediatePropagation()

            let tr = $(this).parent().parent();
            let td = tr.children()[0].firstChild;
            let idQuote = $(this).attr("data-id");

            Swal.fire({
                title: "Confirm",
                text: "You are about to delete record from CRM, you sure?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Yes",
                cancelButtonText: "Cancel",
                cancelButtonColor: '#d33'

            }).then((result) => {

                if (result.isConfirmed) {
                    ZOHO.CRM.API.deleteRecord({Entity:"magaya__SQuotes",RecordID: idQuote})
                        .then(function(data){
                            storeQuote.dispatch(deleteQuote({id: idQuote}))
                            message = `Record ${idQuote} has been removed`
                            storeSuccess.dispatch(addSuccess({message: message}))

                        })
                }
            }) //then
        })//delete button


        ////// boton editar la cotizacion ///////
        $(".edit").click(function(e) {
            e.preventDefault();
            e.stopImmediatePropagation()

            $("#Heading").html("Edit mQuote");

           //drop the state temporal items and charges
            storeItem.dispatch(emptyItems())
            storeCharge.dispatch(emptyCharges())
            storeAccounts.dispatch(emptyAllAccounts())
            storeQuote.dispatch(clearQuoteToEdit())

            limpiar_form()
            /*$("#nav-home-tab").addClass("active");
            $("#menu5").addClass("active show");
            $("#nav-profile-tab").removeClass("active");
            $("#nav-contact-tab").removeClass("active");
            //$("#nav-charges-tab").removeClass("active");
            //$("#nav-items-tab").removeClass("active");
            $("#menu1").removeClass("show active");
            $("#menu2").removeClass("show active");
            $("#menu3").removeClass("show active");
            $("#menu4").removeClass("show active");*/

            $("#table-charges").show();
            $("#table-charges tbody").empty();
            $("#table-charges-new").hide();

            $("#table-items").show();
            $("#table-items tbody").empty();
            $("#table-items-new").hide();

            $("#New").hide();
            $("#Save").show();

            $("#sendCharges").show();
            $("#newCharges").hide();
            $("#sendItem").show();
            $("#newItem").hide();

            $("#table-charges").show();
            $("#table-charges-new").hide();

            $("#table-items").show();
            $("#table-items-new").hide();

            $("select[name=Deal]").val("")
            idmQuoteToEdit = $(this).attr('data-id')

            quoteToEdit = [];
            //dispatch
            storeQuote.dispatch(findQuote({id: idmQuoteToEdit}))

            //relleno los campos
            //campos q no son objetos
            $("#magaya__Description").val(quoteToEdit.magaya__Description)
            let idAccount = !_.isEmpty(quoteToEdit.Account) ? quoteToEdit.Account.id : 0
            storeAccounts.dispatch(addQuoteAccount({id: idAccount}))
            $.map(quoteToEdit, function(k, v) {
                if (!_.isObject(v) && !v.includes("$")) {
                    $(`input[name=${v}]`).val(k)
                    $(`select[name=${v}]`).val(k)
                }
            })
            $("input[name=NameQuote]").val(quoteToEdit.Name)

            //campos q son objetos
            //transportation mode
            if (!_.isEmpty(quoteToEdit['magaya__TransportationMode'])) {
                $("<option value='" + quoteToEdit['magaya__TransportationMode']['id'] + "' selected>" +quoteToEdit['magaya__TransportationMode']['name'] + "</option>").appendTo("select[name=magaya__TransportationMode]");
                $("input[name=ModeOfTransportation]").val(quoteToEdit['magaya__TransportationMode']['name'])
            }

            //account, cliente de la cotizacion
            if (!_.isEmpty(quoteToEdit["Account"])) {
                let id = quoteToEdit["Account"]["id"];
                let client = sanitize(quoteToEdit["Account"]["name"]);
                $("<option value='" + id + "' selected>" + client + "</option>").appendTo("select[name=Account]");
                //$("select[name=Account]").val(id)
            }

            //representative
            if (!_.isEmpty(quoteToEdit["magaya__Representative"])) {
                $("select[name=magaya__Representative]").empty()
                let idContact = quoteToEdit["magaya__Representative"]["id"];
                let nameContact = sanitize(quoteToEdit["magaya__Representative"]["name"]);
                storeAccounts.dispatch(findContact({id: idContact}));
                $(`<option value="${idContact}" selected>${nameContact}</option>`).appendTo("select[name=magaya__Representative]")
            }

            //deal en la cotizacion
            if (!_.isEmpty(quoteToEdit['magaya__Deal'])) {
                //$("select[name=Deal]").empty()
                let idDeal = quoteToEdit["magaya__Deal"]["id"];
                let nameDeal = sanitize(quoteToEdit["magaya__Deal"]["name"]);
                storeDeal.dispatch(getDeal({id: idDeal}))
                //$(`<option value="${idDeal}" selected>${nameDeal}</option>`).appendTo("select[name=Deal]");
                $("select[name=Deal]").val(idDeal)
            }

            //is hazardous
            let is_hazardous = quoteToEdit["magaya__Is_Hazardous"]
            if (is_hazardous === true) {
                $("input[name=magaya__Is_Hazardous]").prop("checked", true)
            } else {
                $("input[name=magaya__Is_Hazardous]").prop("checked", false)

            }

            //Stage of mQuote
            let stage = quoteToEdit["magaya__Status"]
            $("select[name=magaya__mQuoteStatus]").val(stage)

            //Shipper y Consignee
            //hay que buscar el texto , hasta que tengamos un lookup para eliminar esto
            let shipper = quoteToEdit.magaya__Shipper
            $("select[name=magaya__Shipper] option").each(function(k) {
                if ($(this).text() === shipper)
                    $("select[name=magaya__Shipper]").val($(this).val())
            })

            //procesar el nombre, ya q no podemos recuperar id
            let shipperAddress = quoteToEdit.magaya__ShipperAddress
            if (!_.isEmpty(shipperAddress)) {
                shipperAddress = shipperAddress.split(" / ")
                if (!_.isEmpty(shipperAddress[0]) && shipperAddress[0] !== "undefined" && shipperAddress[0] !== undefined)
                    $("input[name=Shipper_Street").val(shipperAddress[0])
                if (!_.isEmpty(shipperAddress[1]) && shipperAddress[1] !== "undefined" && shipperAddress[1] !== undefined)
                    $("input[name=Shipper_City").val(shipperAddress[1])
                if (!_.isEmpty(shipperAddress[2]) && shipperAddress[2] !== "undefined" && shipperAddress[2] !== undefined)
                    $("input[name=Shipper_State").val(shipperAddress[2])
                if (!_.isEmpty(shipperAddress[3]) && shipperAddress[3] !== "undefined" && shipperAddress[3] !== undefined)
                    $("input[name=Shipper_Country").val(shipperAddress[3])
            }

            let consignee = quoteToEdit.magaya__ConsigneeName
            $("select[name=magaya__ConsigneeName] option").each(function(k) {
                if ($(this).text() === consignee)
                    $("select[name=magaya__ConsigneeName]").val($(this).val())
            })

            //procesar el nombre, ya q no podemos recuperar id
            let consigneeAddress = quoteToEdit.magaya__ConsigneeAddress
            if (!_.isEmpty(consigneeAddress)) {
                consigneeAddress = consigneeAddress.split(" / ")
                if (!_.isEmpty(consigneeAddress[0]) && consigneeAddress[0] !== "undefined" && consigneeAddress[0] !== undefined)
                    $("input[name=Consignee_Street").val(consigneeAddress[0])
                if (!_.isEmpty(consigneeAddress[1]) && consigneeAddress[1] !== "undefined" && consigneeAddress[1] !== undefined)
                    $("input[name=Consignee_City").val(consigneeAddress[1])
                if (!_.isEmpty(consigneeAddress[2]) && consigneeAddress[2] !== "undefined" && consigneeAddress[2] !== undefined)
                    $("input[name=Consignee_State").val(consigneeAddress[2])
                if (!_.isEmpty(consigneeAddress[3]) && consigneeAddress[3] !== "undefined" && consigneeAddress[3] !== undefined)
                    $("input[name=Consignee_Country").val(consigneeAddress[3])
            }



            $("#mquoteModal").modal("show")

            //cargo items
            ZOHO.CRM.API.getRelatedRecords({ Entity: "magaya__SQuotes", RecordID: idmQuoteToEdit, RelatedList: "magaya__SQuote_Name1", page: 1, per_page: 200 })
                .then(function(response) {
                    if (!_.isEmpty(response.data)) {
                        idemItems = response.data
                        $("#table-items tbody").empty();
                        $.each(idemItems, function(i, k) {
                            //dispatch items to store
                            storeItem.dispatch(addItem({...k}))

                            }) //each

                    }
                }) //then*/

            //service items
            ZOHO.CRM.API.getRelatedRecords({ Entity: "magaya__SQuotes", RecordID: idmQuoteToEdit, RelatedList: "magaya__SQuote_Name0", page: 1, per_page: 200 })
                .then(function(response) {
                    $("#table-charges tbody").empty();
                    if (!_.isEmpty(response.data)) {
                        idemCharges = response.data
                        amountTotal = cont = 0;
                        $.each(idemCharges, function(i, k) {
                            storeCharge.dispatch(addCharge({ ...k}))
                        })
                    } //IF
                }) //then*/
        })


        $(".send").click(function(e) {
            e.preventDefault()
            e.stopImmediatePropagation()

            let idQuote = $(this).attr('data-id')
            buildStringXML(idQuote);
        })

        })

        //////////////////////////////////////////////////////////////////////////
        //table items
        //////////////////////////////////////////////////////////////////////////
        $('#table-items').bind("DOMSubtreeModified", function(e) {
            let oldValue = '';


           $('.btn-slide').click(function(e) {
                e.preventDefault()
                e.stopImmediatePropagation()
                //$('form').toggleClass('show');
                let data_id = $(this).attr("data-id");
                let module = $(this).attr("data-module")
                $(this).dataShow(module, data_id)
                $("#panel").show("fast");
                $(this).toggleClass("active"); return false;

              });


            //////////////////////////////////////////////end editable////////////////////
            //del item while editing record
            $(".del-item-warehouse").click (function () {
                let tr = $(this).parent().parent();
                let idItem = $(this).attr('data-id');

                //add a change counter
                store.dispatch(addActionEdited())

                Swal.fire({
                    title: "Confirm",
                    text: "You are about to delete record from CRM, you sure?",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "Yes",
                    cancelButtonText: "Cancel",
                    cancelButtonColor: '#d33'

                }).then((result) => {
                    Utils.blockUI()
                    if (result.isConfirmed) {
                        ZOHO.CRM.API.deleteRecord({Entity:"magaya__ItemQuotes",RecordID: idItem})
                            .then(function(data){
                                Utils.unblockUI()
                                res = data.data;
                                $.map(res, function(k, v) {
                                if (k.code !== "SUCCESS") {
                                    codeError = k.code;
                                    field = k.details.api_name;
                                    show = true;
                                    module = 'Cargo Items'
                                    storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))

                                } else {
                                    message = " : Item Deleted!!";
                                    //actualizar el volumen
                                    storeItem.dispatch(deleteItem({id: idItem}))
                                    storeSuccess.dispatch(addSuccess({message: message}))

                                }

                                })
                            })
                            .catch(function(error){
                                Utils.unblockUI()
                                dataError = error.data;
                                codeError = error.code
                                show = true;
                                field = '';
                                module = 'Cargo Items'
                                storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))

                            })
                    }
                });
            })
        })

        ////////////////////////table charge ////////////////////////////
        $('#table-charges').bind("DOMSubtreeModified", function() {
            let oldValue = ''

            $('.btn-slide').click(function(e) {
                e.preventDefault()
                e.stopImmediatePropagation()
                //$('form').toggleClass('show');
                let data_id = $(this).attr("data-id");
                let module = $(this).attr("data-module")
                $(this).dataShow(module, data_id)
                $("#panel").show("fast");
                $(this).toggleClass("active"); return false;

              });



            /////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////////////////

            //del item while editing record
            $(".del-item-charge").click (function (e) {
                let idCharge = $(this).attr('data-id');
                let tr = $(this).parent().parent();
                let idQuote = quoteToEdit.id
                //add a change counter
                store.dispatch(addActionEdited())

                Swal.fire({
                    title: "Confirm",
                    text: "You are about to delete record from CRM, you sure?",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "Yes",
                    cancelButtonText: "Cancel",
                    cancelButtonColor: '#d33'

                }).then((result) => {

                    if (result.isConfirmed) {

                        Utils.blockUI()
                        ZOHO.CRM.API.deleteRecord({Entity:"magaya__ChargeQuote",RecordID: idCharge})
                            .then(function(data){

                                res = data.data;
                                $.map(res, function(k, v) {
                                if (k.code !== "SUCCESS") {
                                    codeError = k.code;
                                    field = k.details.api_name;
                                    show = true;
                                    module = 'Service Items'
                                    storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))

                                } else {
                                    //execute update amount function
                                    var func_name = "magaya__setQuoteTotalAmount";
                                    var req_data ={
                                        "quote_id" : idQuote
                                    };

                                    ZOHO.CRM.FUNCTIONS.execute(func_name, req_data)
                                        .then(function(data){
                                            Utils.unblockUI()
                                            message = " : Quote Amount updated";
                                            storeSuccess.dispatch(addSuccess({message: message}))
                                        })
                                    message = " : Item Updated!!";
                                    storeCharge.dispatch(deleteCharge({id: idCharge}))
                                    storeSuccess.dispatch(addSuccess({message: message}))
                                }

                                })

                            })
                            .catch(function(error){
                                Utils.unblockUI()
                                dataError = error.data;
                                $.map(dataError, function(k, v) {
                                    codeError = 'Error on field';
                                    show = true;
                                    field = oldValue;
                                    module = 'Service Items'
                                    storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))

                                })
                            })
                    }
                });

            });
        })


         ////////////////////////table charge new, form new mquote////////////////////////////
         $('#table-charges-new').bind("DOMSubtreeModified", function() {
            let oldValue = '';

            $('.btn-slide').click(function(e) {
                e.preventDefault()
                e.stopImmediatePropagation()
                //$('form').toggleClass('show');
                let data_id = $(this).attr("data-id");
                let module = $(this).attr("data-module")
                $(this).dataShow(module, data_id)
                $("#panel").show("fast");
                $(this).toggleClass("active"); return false;

              });


            //del item while inserting record
            $(".del-item-charge-new").click(function(e){
                let idArr = $(this).attr("data-id");
                Swal.fire({
                    title: "Confirm",
                    text: "You are about to delete record from CRM, you sure?",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "Yes",
                    cancelButtonText: "Cancel",
                    cancelButtonColor: '#d33'

                }).then((result) => {

                    if (result.isConfirmed) {
                        storeCharge.dispatch(deleteChargeOnNew({id: idArr}))
                        $(this).parent().parent().remove()
                    }
                })
            })
         })


         //////////////////////////////////////////////////////////////////////////
        //table items new
        //////////////////////////////////////////////////////////////////////////
        $('#table-items-new').bind("DOMSubtreeModified", function(e) {
            let oldValue = '';

            $('.btn-slide').click(function(e) {
                e.preventDefault()
                e.stopImmediatePropagation()
                //$('form').toggleClass('show');
                let data_id = $(this).attr("data-id");
                let module = $(this).attr("data-module")
                $(this).dataShow(module, data_id)
                $("#panel").show("fast");
                $(this).toggleClass("active"); return false;

              });



            //del item while inserting record
            $(".del-item-warehouse-new").click(function(e){
                let idArr = $(this).attr("data-id");

                Swal.fire({
                    title: "Confirm",
                    text: "You are about to delete record from CRM, you sure?",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "Yes",
                    cancelButtonText: "Cancel",
                    cancelButtonColor: '#d33'

                }).then((result) => {

                    if (result.isConfirmed) {
                        storeItem.dispatch(deleteItemOnNew({id: idArr}))
                        $(this).parent().parent().remove()
                    }
                })
            })
        })




})

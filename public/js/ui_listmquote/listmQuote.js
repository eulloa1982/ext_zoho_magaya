$(document).ready(function(){

    idmQuoteToEdit = 0;
    Utils.blockUI();
    var chargesOnNew = []

    jQuery('input[name=magaya__ExpirationDate]').datetimepicker({
        format: 'Y-m-d H:m:s'
    });

    //boton cerrar panel
    /*$(".noselect #close-all").click(function() {
        let panelId = $(this).attr("data-close")
        $(`#${panelId}`).animate({width:'toggle'},150);
        //$(`#${panelId}`).show("slide", { direction: "left" }, 1000);
        //$("#slide").animate({width:'toggle'},350);
    })*/

    //boton delete
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
                        console.log("Dropping quote", idQ)
                        ZOHO.CRM.API.deleteRecord({Entity:"magaya__SQuotes",RecordID: idQuote})
                            .then(function(data){
                                //storeCheckBox.dispatch(addCheckBox({checkbox: idQuote}))
                                storeQuote.dispatch(deleteQuote({id: idQuote}))
                            })

                    })
                }
            })
     })


     ///////////////////////////////////////////////////////////////////////////////////
    /////////no - border form edit outer fields
    ///////////////////////////////////////////////////////////////////////////////////
    $(".no-border").click(function(e) {
        $(this).addClass("editable");

        let t = $("<span>Edit</span>")
        let parent = $(this).parent().parent();
        oldValue = $(this).val()
    })

    $(".no-border").blur(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation()

        if ( quoteToEdit && !_.isEmpty(quoteToEdit)) {
            let $celd = $(this)
            $(this).removeClass("editable")

            let value =$(this).val();
            let field = $(this).attr('name');
            let idItem = quoteToEdit.id
            console.log("Quote a edit", quoteToEdit)
            console.log(`value: ${value}, field: ${field}`)

            //it have to be any class attached
            if (field !== undefined && field !== 'undefined') {
                console.log('sending to CRM')
                //let idItem = $(this).parent().attr("data-id");
                //pintamos el nuevo value parseado
                //$(this).val(value);
                //if (oldValue.toString() !== value.toString()) {

                    let json_items ='{"id":"'+ idItem +'", "' + field + '": "' + value + '"}';

                    var config={
                        Entity:"magaya__SQuotes",
                        APIData: JSON.parse(json_items)
                    }

                    console.log(config)
                    ZOHO.CRM.API.updateRecord(config)
                        .then(function(data){
                            res = data.data;
                            $.map(res, function(k, v) {
                                if (k.code !== "SUCCESS") {
                                    codeError = k.code;
                                    field = k.details.api_name;
                                    show = true;
                                    module = 'Cargo Items'
                                    storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))

                                } else {
                                    ZOHO.CRM.API.getRecord({Entity: "magaya__SQuotes", RecordID:idItem})
                                        .then(function (res) {
                                            let record = res.data[0]
                                            storeQuote.dispatch(updateQuote(record))

                                        })
                                    message = " : Item Updated!!";
                                    storeSuccess.dispatch(addSuccess({message: message}))

                                }
                            })

                        })
                        .catch(function(error) {
                            $(`input.editable[name=${field}]`).val(oldValue);
                            console.log(error)
                            codeError = 'Error on field';
                            show = true;
                            field = oldValue;
                            module = 'Service Items'
                            storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))

                        })
                //}
            }
        }
    })






    ///////////////////////////////////////////////////////////////////////////////////
    /////////table quotes, main table
    ///////////////////////////////////////////////////////////////////////////////////
    $('#table-quotes').bind("DOMSubtreeModified", function(e) {

        e.preventDefault()

        $(".magaya__ApplyToAccounts").hide();
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

           //drop the state temporal items and charges
            storeItem.dispatch(emptyItems())
            storeCharge.dispatch(emptyCharges())
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

            idmQuoteToEdit = $(this).attr('data-id')

            quoteToEdit = [];
            //dispatch
            storeQuote.dispatch(findQuote({id: idmQuoteToEdit}))
            storeQuote.subscribe(() => {
                let quote = storeQuote.getState();
                quoteToEdit = quote.quoteToEdit;
            })

            //relleno los campos
            //campos q no son objetos
            $("#magaya__Description").val(quoteToEdit.magaya__Description)
            $.map(quoteToEdit, function(k, v) {
                if (!_.isObject(v) && !v.includes("$")) {
                    $(`input[name=${v}]`).val(k)
                    $(`select[name=${v}]`).val(k)
                }
            })

            //campos q son objetos
            //transportation mode
            if (!_.isEmpty(quoteToEdit['magaya__TransportationMode'])) {
                $("<option value='" + quoteToEdit['magaya__TransportationMode']['id'] + "' selected>" +quoteToEdit['magaya__TransportationMode']['name'] + "</option>").appendTo("select[name=magaya__TransportationMode]");
            }

            //account, cliente de la cotizacion
            if (!_.isEmpty(quoteToEdit["Account"])) {
                id = quoteToEdit["Account"]["id"];
                client = quoteToEdit["Account"]["name"];
                $("<option value='" + id + "' selected>" + client + "</option>").appendTo("select[name=magaya__Account]");
            }

            //representative
            if (!_.isEmpty(quoteToEdit["magaya__Representative"])) {
                let idContact = quoteToEdit["magaya__Representative"]["id"];
                let nameContact = quoteToEdit["magaya__Representative"]["name"];
                storeAccounts.dispatch(findContact({id: idContact}));
                $(`<option value="${idContact}">${nameContact}</option>`).appendTo("select[name=magaya__Representative]")
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


            //editable in situ
            /*$(".no-border-item").click(function(e) {
                $(this).addClass("editable");
                oldValue = $(this).val()
            })

            $(".no-border-item").on("change blur", function(e) {
                e.preventDefault();
                e.stopImmediatePropagation()
                let $celd = $(this)
                $(this).removeClass("editable")

                let value = $(this).val().replace(/[^a-zA-Z0-9]\./g, ' ');
                let field = $(this).attr('name');

                //it have to be any class attached
                if (field !== undefined && field !== 'undefined') {
                    let idItem = $(this).attr("data-id");

                    //pintamos el nuevo value parseado
                    $(this).val(value);
                    if (oldValue.toString() !== value.toString()) {
                        value = sanitize(value)
                        console.log("Value item", value)
                        if (field !== "Name") {
                            value = roundDec(value)
                        }

                        let json_items ='{"id":"'+ idItem +'", "' + field + '": "' + value + '"}';

                        var config={
                            Entity:"magaya__ItemQuotes",
                            APIData: JSON.parse(json_items)
                        }

                        console.log(config)
                        ZOHO.CRM.API.updateRecord(config)
                            .then(function(data){
                                res = data.data;
                                console.log("response", res)
                                $.map(res, function(k, v) {
                                    if (k.code !== "SUCCESS") {
                                        codeError = k.code;
                                        field = k.details.api_name;
                                        show = true;
                                        module = 'Cargo Items'
                                        storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))

                                    } else {
                                        message = " : Item Updated!!";
                                        storeItem.dispatch(updateItemOnNew({id: idItem, field: field, value: value}))
                                        storeItem.dispatch(setVolume({id:idItem, field: field, value: value}))
                                        storeSuccess.dispatch(addSuccess({message: message}))

                                    }
                                })

                            })
                            .catch(function(error) {
                                console.log("error", error)
                                $(`input.editable[name=${field}]`).val(oldValue);
                                codeError = 'Error on field';
                                show = true;
                                field = oldValue;
                                module = 'Service Items'
                                storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))

                            })
                    }
                }
            })*/
            //////////////////////////////////////////////end editable////////////////////
            //del item while editing record
            $(".del-item-warehouse").click (function () {
                let tr = $(this).parent().parent();
                let idItem = $(this).attr('data-id');

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
                        ZOHO.CRM.API.deleteRecord({Entity:"magaya__ItemQuotes",RecordID: idItem})
                            .then(function(data){
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



            //////////////////////////////////////////////////////////////////
            ///////// data in situ editable
            ///////////////////////////////////////////////////////////////////

            /*$(".no-border-charge").focus(function(e) {
                $(this).addClass("editable");

                oldValue = $(this).val()
            })

            $(".no-border-charge").on("change blur", function(e) {
                e.preventDefault();
                e.stopImmediatePropagation()

                $(this).removeClass("editable")

                let idQuote = quoteToEdit.id
                let value = $(this).val().replace(/[^a-zA-Z0-9]\./g, ' ');
                let field = $(this).attr('name');
                let idCharge = $(this).attr("data-id")
                //check class for each field
                if (field !== undefined && field !== 'undefined') {

                    value = sanitize(value)
                    if (field === "magaya__CQuantity" || field === "magaya__Price" || field === "magaya__TaxRate") {
                        value = roundDec(value);
                    }

                    //si los valores son iguales, no actualizar nada
                    if (oldValue.toString() !== value.toString()) {

                        let json_items ='{"id":"'+ idCharge +'", "' + field + '": "' + value + '"}';

                        var config={
                            Entity:"magaya__ChargeQuote",
                            APIData: JSON.parse(json_items)
                        }


                        ZOHO.CRM.API.updateRecord(config)
                            .then(function(data){
                                res = data.data;
                                $.map(res, function(k, v) {
                                    console.log("Error", k)
                                    if (k.code !== "SUCCESS") {
                                        codeError = k.code;
                                        field = k.details.api_name;
                                        show = true;
                                        module = 'Service Items'
                                        storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))

                                    } else {
                                        var func_name = "magaya__setQuoteTotalAmount";
                                        var req_data ={
                                            "quote_id" : idQuote
                                        };

                                        ZOHO.CRM.FUNCTIONS.execute(func_name, req_data).then(function(data){
                                            console.log(data)
                                        })
                                        message = " : Item Updated!!";
                                        storeCharge.dispatch(setAmount({id:idCharge, field: field, value: value}))
                                        storeSuccess.dispatch(addSuccess({message: message}))

                                    }
                                })

                            })
                            .catch(function(error) {
                                $(`input.editable[name=${field}]`).val(oldValue);
                                codeError = 'Error on field';
                                show = true;
                                field = oldValue;
                                module = 'Service Items'
                                console.log("Error Fatal", error)
                                storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))

                            })
                    }
                }

            })*/


            /////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////////////////

            //del item while editing record
            $(".del-item-charge").click (function (e) {
                let idCharge = $(this).attr('data-id');
                let tr = $(this).parent().parent();
                let idQuote = quoteToEdit.id

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

                                    ZOHO.CRM.FUNCTIONS.execute(func_name, req_data).then(function(data){
                                        console.log("Deleting data", data)
                                    })
                                    message = " : Item Updated!!";
                                    storeCharge.dispatch(deleteCharge({id: idCharge}))
                                    storeSuccess.dispatch(addSuccess({message: message}))
                                }

                                })

                            })
                            .catch(function(error){
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

            //////////////////////////////////////////////////////////////////
            ///////// data in situ editable
            ///////////////////////////////////////////////////////////////////
            /*$(".no-border-charge-new").focus(function(e) {
                $(this).addClass("editable");

                oldValue = $(this).val()
            })

            $(".no-border-charge-new").on("change blur", function(e) {
                e.preventDefault();
                e.stopImmediatePropagation()
                let $celd = $(this)
                $(this).removeClass("editable")

                let value = $(this).val().replace(/[^a-zA-Z0-9]\./g, ' ');
                let field = $(this).attr('name');

                let idItem = $(this).attr("data-id")
                value = sanitize(value);

                if (field === "magaya__CQuantity" || field === "magaya__Price" || field === "magaya__TaxRate") {
                    value = parseFloat(value);
                }

                //si los valores son iguales, no actualizar nada
                if (oldValue.toString() !== value.toString()) {
                    //storeCharge.dispatch(updateCharge({id:idItem, field: field, value: value}))
                    storeCharge.dispatch(setAmountOnNew({id:idItem, field: field, value: value}))
                }

            })*/


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


            /*$(".no-border-item-new").click(function(e) {
                $(this).addClass("editable");

                oldValue = $(this).val()
            })

            $(".no-border-item-new").on("change blur", function(e) {
                e.preventDefault();
                e.stopImmediatePropagation()
                let $celd = $(this)
                $(this).removeClass("editable")
                let field = $(this).attr('name');
                let value = $(this).val()

                value = sanitize(value)

                if (field !== "Name")
                    value = roundDec(value);

                let idItem = $(this).parent().attr("data-id")
                //pintamos el nuevo value parseado
                $(this).val(value);
                if (oldValue.toString() !== value.toString()) {
                    storeItem.dispatch(updateItemOnNew({id: idItem, field: field, value: value}))
                    storeItem.dispatch(setVolumeOnNew({id:idItem, field: field, value: value}))
                }

            })*/

        })


        $("input[name=magaya__Amount_Total]").change(function(e) {
            //get final amount
            let final_amount = $("input[name=magaya__Final_Amount]").val()
            final_amount = roundDec(final_amount)
            if (isEmpty(final_amount) || final_amount == 0) {
                let val = $(this).val()
                $("input[name=magaya__Final_Amount]").val(val)
            }

        })

        /////////////////////////////////////////////////////////////////////////
        //////// subscribers UI
        ////////////////////////////////////////////////////////////////////////
        ////// change account, find contacts of accounts//////////////////////////
        $("select[name=Account]").change(function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();

            let account = $("select[name=Account]").val();
            store.dispatch(addQuoteAccount({accountId: account}))
            storeAccounts.dispatch(findContactOfAccount({id: account}))
        })

        ////////// change representative, find contact data //////////////////
        $("select[name=magaya__Representative]").change(function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();

            let contact = $("select[name=magaya__Representative]").val();
            storeAccounts.dispatch(findContact({id: contact}))
        })

        //////////susbscriber contacList, fill representative select
        storeAccounts.subscribe(() => {
            let contacts = storeAccounts.getState().contactList;
           //$("select[name=magaya__Representative]").empty();
            //$("<option></option>").appendTo("select[name=magaya__Representative]");

            $.map(contacts, function(k, v) {
                $(`<option value="${k.id}">${k.Full_Name}</option>`).appendTo("select[name=magaya__Representative]")
            })
        })

        ////////subscriber singleContact, fill fields contact data
        storeAccounts.subscribe(() => {
            let contact = storeAccounts.getState().singleContact
            $("input[name=magaya__ContactPhone]").val(contact[0]["Phone"])
            $("input[name=magaya__ContactEmail]").val(contact[0]["Email"])
            $("input[name=magaya__ContactMobile]").val(contact[0]["Mobile"])
        })










})

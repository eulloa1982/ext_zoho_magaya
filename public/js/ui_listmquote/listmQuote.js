$(document).ready(function(){

    idmQuoteToEdit = 0;
    Utils.blockUI();
    var chargesOnNew = []

    jQuery('input[name=magaya__ExpirationDate]').datetimepicker({
        format: 'Y-m-d H:m:s'
    });

    ///////////////////////////////////////////////////////////////////////////////////
    /////////table quotes, main table
    ///////////////////////////////////////////////////////////////////////////////////
    $('#table-quotes').bind("DOMSubtreeModified", function(e) {

        e.preventDefault()
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

            //campos q son objetos
            //transportation mode
            if (!_.isEmpty(quoteToEdit['magaya__TransportationMode'])) {
                $("<option value='" + quoteToEdit['magaya__TransportationMode']['id'] + "' selected>" +quoteToEdit['magaya__TransportationMode']['name'] + "</option>").appendTo("select[name=magaya__TransportationMode]");
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
            store.dispatch(addActionEdited())

            let account = $("select[name=Account]").val();
            storeAccounts.dispatch(addQuoteAccount({id: account}))
            storeAccounts.dispatch(findContactOfAccount({id: account}))

            $("input[name=magaya__ContactPhone]").val("")
            $("input[name=magaya__ContactMobile]").val("")
            $("input[name=magaya__ContactEmail]").val("")
        })

        ////////// change representative, find contact data //////////////////
        $("select[name=magaya__Representative]").change(function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();

            let contact = $("select[name=magaya__Representative]").val();
            storeAccounts.dispatch(findContact({id: contact}))
        })

        ////////// Deal data //////////////////
        $("select[name=Deal]").change(function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            store.dispatch(addActionEdited())

            let deal = $("select[name=Deal]").val();
            storeDeal.dispatch(getDeal({id: deal}))
        })

        $("select[name=magaya__Shipper]").change(function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();

            let account = $("select[name=magaya__Shipper]").val();
            storeAccounts.dispatch(setAccountShipper({id: account}))
        })


        $("select[name=magaya__ConsigneeName]").change(function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();

            let account = $("select[name=magaya__ConsigneeName]").val();
            storeAccounts.dispatch(setAccountConsignee({id: account}))

        })


        $("select[name=magaya__TransportationMode]").change(function(e) {
            e.preventDefault()
            e.stopImmediatePropagation()
            store.dispatch(addActionEdited())

            let idT = $(this).val()

            let method = transpMethods.filter(k => k.id === idT)

            if (!_.isEmpty(method)) {
                let parentMethod = method[0]['magaya__ParentMethod']
                let query = ''
                switch (parentMethod) {
                    case "Ground":
                        query = `magaya__Roadway`
                        break;
                    case "Air":
                        query = `magaya__Airway`
                        break;
                    case "Rail":
                        query = `magaya__Railway`
                        break;
                    case "Road":
                        query = `magaya__Roadway`
                        break;
                    case "Ocean":
                        query = `magaya__Waterway`
                        break;
                    default:
                        query = `magaya__Other`
                        break;

                }

                storePorts.dispatch(searchByType({type: query}))

            }

        })





})

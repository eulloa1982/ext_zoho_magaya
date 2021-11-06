$(document).ready(function(){

    idmQuoteToEdit = 0;
    Utils.blockUI();
    var chargesOnNew = []

    jQuery('input[name=magaya__ExpirationDate]').datetimepicker({
        format: 'Y-m-d H:m:s'
    });

    let obs = new MutationObserver(function(mutations, observer) {
        $(".startSession").click(function(e) {
            e.preventDefault()
            e.stopImmediatePropagation()

            let a = startSession()
        })

    });
    let magaya_link = $("#magaya_link")[0];
    obs.observe(magaya_link, {childList: true, subtree: true});




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

        //console.log(`${field} ${value}`)
        if (field === "magaya__CQuantity" || field === "magaya__Price") {
            value = parseFloat(value.replace(/[,]/g, ''));
        }
        storeCharge.dispatch(updateChargeOnNew({field: field, value: value}))

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

        //if (field === "Name")
        //    value = $("#magaya__Package_Description").val()

        //si los valores son iguales, no actualizar nada
        if (field !== 'magaya__Package_Type' && field !== 'Name' && field !== 'magaya__Measure_System') {
            value = parseFloat(value.replace(/[,]/g, ''));

        }
        //console.log(`${field}  val  ${value}`)
        storeItem.dispatch(updateItemOnNew({field: field, value: value}))

    })


    $('.arrows-quote').bind("DOMSubtreeModified", function(e) {
        e.preventDefault()
        e.stopImmediatePropagation()
        $(".move-quote").click(function(e) {
            e.stopImmediatePropagation()
            e.preventDefault()
            let id = $(this).attr("data-id")
            move_quote(id)
        })
    })

    $(".toPdf").click(function(e) {
        e.stopImmediatePropagation()

        storeItem.dispatch(emptyItems())
        storeCharge.dispatch(emptyCharges())
        storeAccounts.dispatch(emptyAllAccounts())
        storeQuote.dispatch(clearQuoteToEdit())

        let idmQuote = $(this).attr('data-id')
        let pdf = make_pdf(idmQuote);

    })

    ///////////////////////////////////////////////////////////////////////////////////
    /////////table quotes, main table
    ///////////////////////////////////////////////////////////////////////////////////
    $('#table-quotes').bind("DOMSubtreeModified", function(e) {
        e.preventDefault()

        $('.btn-slide').click(function(e) {
            e.preventDefault()
            e.stopImmediatePropagation()
            let data_id = $(this).attr("data-id");
            let module = $(this).attr("data-module")

            storeQuote.dispatch(clearQuoteToEdit())
            idmQuoteToEdit = $(this).attr('data-id')
            limpiar_form()

            //dispatch
            //make_pdf(idmQuoteToEdit);
            storeQuote.dispatch(findQuote({id: idmQuoteToEdit}))
            $("#panel-preview").show("fast");
            $(this).toggleClass("active"); return false;

        });


        $(".toPdf").click(function(e) {
            e.stopImmediatePropagation()

            storeItem.dispatch(emptyItems())
            storeCharge.dispatch(emptyCharges())
            storeAccounts.dispatch(emptyAllAccounts())
            storeQuote.dispatch(clearQuoteToEdit())

            let idmQuote = $(this).attr('data-id')
            let pdf = make_pdf(idmQuote);

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
                text: "You are about to delete record from CRM, are you sure?",
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

            storeQuote.dispatch(clearQuoteToEdit())
            idmQuoteToEdit = $(this).attr('data-id')
            limpiar_form()
            //dispatch
            storeQuote.dispatch(findQuote({id: idmQuoteToEdit}))
            $("#mquoteModal").modal("show")
        })


        $(".send").click(function(e) {
            e.preventDefault()
            e.stopImmediatePropagation()

            let idQuote = $(this).attr('data-id')
            buildStringXML(idQuote);
        })

        $(".duplicate").click(function(e) {
            e.preventDefault()
            e.stopImmediatePropagation()

            let quote = storeQuote.getState().quoteToEdit
            let idQuote = quote.id

            Utils.blockUI()
            var func_name = "magaya__duplicatemQuote";
                            var req_data ={
                                "quote_id" : idQuote
                            };
            ZOHO.CRM.FUNCTIONS.execute(func_name, req_data)
                .then(function(data){
                    if (data.code === "success") {
                        let id_new_mquote = data.details.output
                        if (id_new_mquote.length <= 0) {
                            codeError = 'Error duplicating mQuote';
                            field = '';
                            show = false;
                            module = 'Cargo Items'
                            storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))

                        } else {

                            let message = ": Successfully duplicate mQuote"
                            storeSuccess.dispatch(addSuccess({message: message}))
                            //location.reload()
                            //actualizar el store
                            ZOHO.CRM.API.getRecord({Entity:"magaya__SQuotes",RecordID:id_new_mquote})
                                .then(function(data){
                                    console.log(data)
                                    storeQuote.dispatch(addStarting(data.data[0]))
                                })
                        }
                    } else {
                        codeError = 'Error duplicating mQuote';
                        field = '';
                        show = false;
                        module = 'Cargo Items'
                        storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))
                    }
                    Utils.unblockUI()
                    //actualizar el store
                })
                .catch(function(error1) {
                    codeError = 'Error duplicating mQuote';
                    field = '';
                    show = false;
                    module = 'Cargo Items'
                    storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))
                    console.log(error1)
                    Utils.unblockUI()
                })



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
            let data_id = $(this).attr("data-id");
            let module = $(this).attr("data-module")
            $(this).dataShow(module, data_id)
            $("#sendCharges").hide()
            $("#newCharges").hide()
            $("#updateCharge").show()

            $("#panel-item").show("fast");

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
                text: "You are about to delete record from CRM, are you sure?",
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
            let data_id = $(this).attr("data-id");
            let module = $(this).attr("data-module")
            $("select[name=magaya__Tax]").val("").change()
            $(this).dataShow(module, data_id)
            $("#panel-charge").show("fast");

            $(this).toggleClass("active"); return false;

        });

        //del item while editing record
        $(".del-item-charge").click (function (e) {
            let idCharge = $(this).attr('data-id');
            let tr = $(this).parent().parent();
            let idQuote = quoteToEdit.id
            //add a change counter
            store.dispatch(addActionEdited())

            Swal.fire({
                title: "Confirm",
                text: "You are about to delete record from CRM, are you sure?",
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
            let data_id = $(this).attr("data-id");
            let module = $(this).attr("data-module")
            $(this).dataShow(module, data_id)
            $("#panel-charge").show("fast");
            $(this).toggleClass("active"); return false;

        });

        //del item while inserting record
        $(".del-item-charge-new").click(function(e){
            let idArr = $(this).attr("data-id");
            Swal.fire({
                title: "Confirm",
                text: "You are about to delete record from CRM, are you sure?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Yes",
                cancelButtonText: "Cancel",
                cancelButtonColor: '#d33'

            }).then((result) => {
                if (result.isConfirmed) {
                    storeCharge.dispatch(deleteChargeOnNew({id: idArr}))
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
            let data_id = $(this).attr("data-id");
            let module = $(this).attr("data-module")
            $(this).dataShow(module, data_id)
            $("#panel-item").show("fast");
            $(this).toggleClass("active"); return false;

        });



        //del item while inserting record
        $(".del-item-warehouse-new").click(function(e){
            let idArr = $(this).attr("data-id");

            Swal.fire({
                title: "Confirm",
                text: "You are about to delete record from CRM, are you sure?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Yes",
                cancelButtonText: "Cancel",
                cancelButtonColor: '#d33'

            }).then((result) => {
                if (result.isConfirmed) {
                    storeItem.dispatch(deleteItemOnNew({id: idArr}))
                }
            })
        })
    })
})

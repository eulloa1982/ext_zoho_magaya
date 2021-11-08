$(document).ready(function(){
    let currentModule = ''
    storeCurrentModule.subscribe(() => {
        let u = storeCurrentModule.getState();
        currentModule = u.currentModule
    })


    //sortable crm
    let obs = new MutationObserver(function(mutations, observer) {
        //delete item in CRM
        $(".delete-from-crm").click(function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
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
                    moduleName = "magaya__Charges_Type";
                    message = ''
                    $("input[class=form-check-crm]:checked").each(function(k) {

                        let idItem = $(this).attr("data-id");
                        deleteDataCRM(currentModule, idItem).then(r => {
                            let d = r.data[0]
                            if (d.code === "SUCCESS") {
                                message = " : Item Deleted!!";
                                //actualizar el volumen
                                storeCrm.dispatch(deleteItemCrm({id: idItem}))
                                storeSuccess.dispatch(addSuccess({message: message}))
                            } else {
                                dataError = "error.data";
                                codeError = "error.code"
                                show = true;
                                field = '';
                                module = 'Charge Type Items'
                                storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))

                            }
                        })
                    })


                }
            });
        });


        $(".add-on-crm").click(function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();

            //get an id from sortable
            let idItem = $('#sortable-crm li:nth-child(1)')
            console.log("Data io", idItem)
            let append = ``
            let idRecord = 0;
            $("#form").empty()
            storeCrm.dispatch(getItemEmptyCrm({id: idItem}))
            $("#new-record").modal("show")
        })


        $(".view-crm").click(function(e) {
            e.preventDefault()
            e.stopImmediatePropagation()

            let idItem = $(this).attr("data-id")
            let append = ``
            let idRecord = 0;
            $("#form").empty()
            storeCrm.dispatch(getItemCrm({id: idItem}))
            $("#new-record").modal("show")

        })
    });
    let crm = $("#sortable-crm")[0];
    obs.observe(crm, {childList: true, subtree: true});


    //magaya charges types
    let obs2 = new MutationObserver(function(mutations, observer) {
        //botton enviar al CRM
        $(".send-to-crm").click(function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var message = '';
            var i = 0;
            let chargesToSend = []
            let portsToSend = []
            let providersToSend = []
            $("input[class=form-check-magaya]:checked").each(function() {
                id = $(this).attr("data-id");
                console.log(currentModule)
                //determinar la funcion a llamar dependiendo del currentModule
                switch (currentModule) {
                    case 'magaya__Charges_Type': {
                        storeChargesDef.dispatch(getChargeDef({id: id}))
                        let chargeDef = storeChargesDef.getState().singleChargeDef;
                        if (!_.isEmpty(chargeDef)) {
                            chargesToSend.push(chargeMagayaToCRM({...chargeDef}))
                        }

                        break;
                    }

                    case 'magaya__Ports' : {
                        storePortsDef.dispatch(getPortDef({id: id}))
                        let portDef = storePortsDef.getState().singlePortDef;
                        if (!_.isEmpty(portDef)) {
                            portsToSend.push(portMagayaToCRM({...portDef}))
                        }

                        break;
                    }

                    case 'magaya__Providers' : {
                        storeProvidersDef.dispatch(getProviderDef({id: id}))
                        let providers = storeProvidersDef.getState().singleProviderDef;
                        if (!_.isEmpty(providers)) {
                            providersToSend.push(providerMagayaToCRM({...providers}))
                        }

                        break;
                    }


                }


            })

            if (!_.isEmpty(chargesToSend)) {
                insertMagayaRecordToCrm(chargesToSend)
                chargesToSend = []
            }
            if (!_.isEmpty(portsToSend)) {
                insertMagayaRecordToCrm(portsToSend)
                portsToSend = []
            }
            if (!_.isEmpty(providersToSend)) {
                insertMagayaRecordToCrm(providersToSend)
                providersToSend = []
            }

        })
    });
    let chargesMag = $("#sortable-magaya-charges")[0];
    obs2.observe(chargesMag, {childList: true, subtree: true});








    ////////////////////////////////////////////////////////////////
    //////////////////SORTABLE CRM
    ////////////////////////////////////////////////////////////////
    /*$('#sortable-crm').bind("DOMSubtreeModified", function(){

        $(".material-icons").click(function(e) {
            e.preventDefault()
            e.stopImmediatePropagation()

            let idItem = $(this).attr("data-id")
            let append = ``
            let idRecord = 0;
            $("#form").empty()
            getRecordById(currentModule, idItem)
                .then(r => {
                    if (!_.isEmpty(r.data[0])) {
                        idRecord = r.data[0].id
                        $.map(r.data[0], function(k, v) {
                            if ( _.has(ITEMS_CRM, v)) {

                                let field = _.get(ITEMS_CRM, [v, 'field'])
                                let values = _.has(ITEMS_CRM, [v, "values"]) ? _.get(ITEMS_CRM, [v, 'values']) : ''
                                input = `<input type="text" class="form-control" name="${v}" value="${k}"/>`

                                //append += `<span class="btn btn-primary float-right">Save</span><br /><br />`

                                if (!_.isEmpty(values)) {
                                    input = `<select name="${v}" class="form-control">`
                                        $.map(values, function(val) {
                                            if (val === k)
                                                input += `<option value="${val}" selected>${val}</option>`
                                            else
                                                input += `<option value="${val}">${val}</option>`
                                        })
                                    input += `</select>`
                                }
                                append += `<div class="row" style="margin: 5px 5px 5px 5px">
                                    <div class="col-md-4" style="font-weight: bold; padding: 5px 5px 5px 5px">${field}</div>
                                    <div class="col-md-6" style="font-weight: bold; padding: 5px 5px 5px 5px">${input}</div>
                                    </div>`
                            }
                        })
                        append += `<span data-id="${idRecord}" class="btn btn-primary float-right" id="save-record">Save</span><br /><br />`

                        $("#form").append(append)

                    }

                })

            $("#new-record").modal("show")

        })
    })*/


    ////////////////////////////////////////////////////////////////
    //////////////////DINAMIC FORM
    ////////////////////////////////////////////////////////////////
    $('#form').bind("DOMSubtreeModified", function(){
        $("#save-record").click(function(e) {
            Utils.blockUI()
            e.preventDefault()
            e.stopImmediatePropagation()

            let idRecord = $(this).attr("data-id")
            var data = {};
            var a = $("#generic-form").serializeArray();
            $.each(a, function() {
                if (data[this.name]) {
                    if (!data[this.name].push) {
                        data[this.name] = [data[this.name]];
                    }
                    data[this.name].push(this.value || '');
                } else {
                    if (this.value === "true")
                        this.value = true
                    if (this.value === "false")
                        this.value = false

                    data[this.name] = this.value || '';
                }
            });

            Object.assign(data, {id: idRecord})
            var config={
                Entity:currentModule,
                APIData:data,
                Trigger:[]
              }

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
                            Utils.unblockUI()
                        } else {
                            message = " : Item Updated!!";
                            //get record again
                            ZOHO.CRM.API.getRecord({Entity: currentModule, RecordID: idRecord})
                                .then(function(data) {
                                    Utils.unblockUI()
                                    storeCrm.dispatch(updateItemCrm({id: idRecord, item: data.data}))
                                })

                            storeSuccess.dispatch(addSuccess({message: message}))
                        }

                    })
                })
                .catch(function(error) {
                    Utils.unblockUI()
                    codeError = 'Error updating the record';
                    field = '';
                    show = false;
                    module = 'Items CRM'
                    storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))
                })


        })


        $("#add-record").click(function(e) {
            Utils.blockUI()
            e.preventDefault()
            e.stopImmediatePropagation()

            var data = {};
            var a = $("#generic-form").serializeArray();
            $.each(a, function() {
                if (data[this.name]) {
                    if (!data[this.name].push) {
                        data[this.name] = [data[this.name]];
                    }
                    data[this.name].push(this.value || '');
                } else {
                    if (this.value === "true")
                        this.value = true
                    if (this.value === "false")
                        this.value = false

                    data[this.name] = this.value || '';
                }
            });


            ZOHO.CRM.API.insertRecord({Entity:currentModule,APIData:data,Trigger:[""]})
                .then(function(data){
                    Utils.unblockUI();
                    res = data.data;
                    if (res[0].code !== "SUCCESS") {
                        codeError = res[0].code;
                        field = res[0].details.api_name;
                        show = true;
                        module = 'Cargo Items'
                        storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))
                    }else {

                        message = " : Item Updated!!";
                        //get record again
                        ZOHO.CRM.API.getRecord({Entity: currentModule, RecordID: res[0].details.id})
                            .then(function(data) {
                                Utils.unblockUI()
                                storeCrm.dispatch(addItemCrm(data.data))
                            })

                        storeSuccess.dispatch(addSuccess({message: message}))
                    }
                    console.log(data);
                })
                .catch(function(e) {
                    console.log("Error", e)
                    Utils.unblockUI()
                })
        })


    })

})

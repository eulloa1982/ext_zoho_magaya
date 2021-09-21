$(document).ready(function(){
    let currentModule = ''
    storeCurrentModule.subscribe(() => {
        let u = storeCurrentModule.getState();
        currentModule = u.currentModule
    })

    //botton enviar al CRM
    $(".send-to-crm").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var message = '';
        var i = 0;
        let chargesToSend = []
        $("input[class=form-check-magaya]:checked").each(function() {
            id = $(this).attr("data-id");

            storeChargesDef.dispatch(getChargeDef({id: id}))
            chargesToSend.push(chargeMagayaToCRM({...chargeDef}))

            //

        })
        insertChargeTypeCRM(chargesToSend)

    })


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
                    console.log("Getting id for delete in " + currentModule, idItem)
                    deleteDataCRM(currentModule, idItem).then(r => {
                        let d = r.data[0]
                        console.log("Delete result", r)
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


    ////////////////////////////////////////////////////////////////
    //////////////////SORTABLE CRM
    ////////////////////////////////////////////////////////////////
    $('#sortable-crm').bind("DOMSubtreeModified", function(){

        $(".material-icons").click(function(e) {
            e.preventDefault()
            e.stopImmediatePropagation()

            let idItem = $(this).attr("data-id")
            let append = ``
            $("#form").empty()
            getRecordById(currentModule, idItem)
                .then(r => {
                    if (!_.isEmpty(r.data[0])) {
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
                                console.log(k, v)
                            }
                        })

                        $("#form").append(append)

                    }

                })

            $("#new-record").modal("show")

        })
    })
        //Packages Types
        /*ZOHO.CRM.API.getAllRecords({Entity:"magaya__Package_Types",sort_order:"asc",per_page:20,page:1})
            .then(function(data){
                $("#select-package").empty();
                $.map (data.data, function (k, i){
                    k.Name = sanitize(k.Name)
                    $("<option value='"+i+"'>"+k.Name+"</option>").appendTo("#select-package");
                    packageType.push(k);
                })
            })*/




})

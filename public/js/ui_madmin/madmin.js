$(document).ready(function(){

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

                    let idChargeTypeDelete = $(this).attr("data-id");
                    console.log("Getting id for delete ", idChargeTypeDelete)
                    deleteDataCRM(moduleName, idChargeTypeDelete).then(r => {
                        let d = r.data[0]
                        console.log("Delete result", r)
                        if (d.code === "SUCCESS") {
                            message = " : Item Deleted!!";
                            //actualizar el volumen
                            storeChargesCrm.dispatch(deleteChargeType({id: idChargeTypeDelete}))
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

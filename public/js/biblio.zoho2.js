function getAccountsAllAccounts(){
    accounts = []
    ZOHO.CRM.API.getAllRecords({ Entity: "Accounts", sort_order: "asc" })
        .then(function(response) {
            $.map(response.data, function(k, i) {
                //contacts.push(k);
                accounts.push(k)
                $("#sortable3").append(`<li class="list-group-item" data-magayaGuid="${k.magaya__MagayaGUID}" data-id="${k.id}">
                                       <input class="form-check-input-contact-crm" type="checkbox" value="">
                                       <button class="btn btn-sm view-account-crm"><i class="fa fa-eye"></i></button>

                                       <i class="far fa-edit"></i>
                                       ${k.Account_Name}  (${k.magaya__MagayaEmail})</li>`)

                                       $("<option value='"+k.id+"'>"+k.Account_Name+"</option>").appendTo("select[name=quotation-for-accounts]");
                                       $("<option value='"+k.id+"'>"+k.Account_Name+"</option>").appendTo("select[name=ShipperName]");
                                       $("<option value='"+k.id+"'>"+k.Account_Name+"</option>").appendTo("select[name=ConsigneeName]");


            })
        })

}

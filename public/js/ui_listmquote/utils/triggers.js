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

    //$("input[id=rol_shipper]").prop("checked", false)
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


let rol_shipper = document.getElementById("rol_shipper")
rol_shipper.addEventListener("change", validaRolShipper, false)
function validaRolShipper() {
    let checked = rol_shipper.checked
    if (checked) {
        let account = $("select[name=Account]").val();
        storeAccounts.dispatch(setAccountShipper({id: account}))
    }
    else {
        $("select[name=magaya__Shipper]").val("")
        $("input[name=Shipper_City]").val("")
        $("input[name=Shipper_State").val("")
        $("input[name=Shipper_Country]").val("")
        $("input[name=Shipper_Street]").val("")
    }
}

let rol_consignee = document.getElementById("rol_consignee")
rol_consignee.addEventListener("change", validaRolConsignee, false)
function validaRolConsignee() {
    let checked = rol_consignee.checked
    if (checked) {
        let account = $("select[name=Account]").val();
        storeAccounts.dispatch(setAccountConsignee({id: account}))
    }
    else {
        $("select[name=magaya__ConsigneeName]").val("")
        $("input[name=Consignee_City]").val("")
        $("input[name=Consignee_State").val("")
        $("input[name=Consignee_Country]").val("")
        $("input[name=Consignee_Street]").val("")
    }
}

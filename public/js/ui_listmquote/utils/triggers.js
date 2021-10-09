/*$("input[name=magaya__Amount_Total]").change(function(e) {
    //get final amount
    let final_amount = $("input[name=magaya__Final_Amount]").val()
    final_amount = roundDec(final_amount)
    if (_.isEmpty(final_amount) || final_amount == 0) {
        let val = $(this).val()
        $("input[name=magaya__Final_Amount]").val(val)
    }
})*/

$("select[name=magaya__TransportationMode]").change(function(e) {
    //$("select[name=ModeOfTransportation]").empty()
    let value = $("select[name=magaya__TransportationMode] option:selected").text()
    $("input[name=ModeOfTransportation]").val(value)
    //$("#new-item")[0].reset()
    /*let elementos = document.querySelectorAll("input[type=text], input[id=magaya__Description], select[name=magaya__TransportationMode], select[name=magaya__Direction]")
    elementos.forEach((elemento) => {
        elemento.value = ''
    })*/

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


$("select[name=magaya__Consignee]").change(function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    let account = $("select[name=magaya__Consignee]").val();
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


$('input[type=radio][name=customer_rol]').on('change', function() {
    switch ($(this).val()) {
        case 'shipper':
            rolShipper();
            break;
        case 'consignee':
            rolConsignee();
            break;
        case 'other':
            rolOther();
            break;

    }
  });

function rolShipper(){
    let account = $("select[name=Account]").val();
    storeAccounts.dispatch(setAccountShipper({id: account}))
    $("select[name=magaya__Consignee]").val("")
    $("input[name=magaya__ConsigneeCity]").val("")
    $("input[name=magaya__ConsigneeState").val("")
    $("input[name=magaya__ConsigneeCountry]").val("")
    $("input[name=magaya__ConsigneeStreet]").val("")
}

function rolConsignee() {
    let account = $("select[name=Account]").val();
    storeAccounts.dispatch(setAccountConsignee({id: account}))
    $("select[name=magaya__Shipper]").val("")
    $("input[name=magaya__ShipperCity]").val("")
    $("input[name=magaya__ShipperState").val("")
    $("input[name=magaya__ShipperCountry]").val("")
    $("input[name=magaya__ShipperStreet]").val("")
}

function rolOther() {
    $("select[name=magaya__Consignee]").val("")
    $("input[name=magaya__ConsigneeCity]").val("")
    $("input[name=magaya__ConsigneeState").val("")
    $("input[name=magaya__ConsigneeCountry]").val("")
    $("input[name=magaya__ConsigneeStreet]").val("")
    $("select[name=magaya__Shipper]").val("")
    $("input[name=magaya__ShipperCity]").val("")
    $("input[name=magaya__ShipperState").val("")
    $("input[name=magaya__ShipperCountry]").val("")
    $("input[name=magaya__ShipperStreet]").val("")
}



//var obs = new MutationObserver(function(mutations, observer) {

    $("select[name=Name]").change(function(e) {
        e.preventDefault()
        e.stopImmediatePropagation()
        let index = parseInt($("select[name=Name]").val());

        let length = packageType[index]["magaya__PackageLength"]
        let height = packageType[index]["magaya__PackageHeight"]
        let width = packageType[index]["magaya__PackageWidth"]

        storeItem.dispatch(updateAllItemNew({Name: index, length: length, width: width, height: height}))
    })

//})


/****table notes new change events******/
var obs = new MutationObserver(function(mutations, observer) {
    $('#notes-new').on('click', '.del-item-note-new', function(e) {
        e.preventDefault()
        e.stopImmediatePropagation()
        Swal.fire({
            title: "Confirm",
            text: "You are about to delete record from mQuote, you sure?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
            cancelButtonColor: '#d33'

        }).then((result) => {
            if (result.isConfirmed) {
                $(this).closest('tr').remove();
            }
        })
        //console.debug('Index', rowindex);
  });




  });
  var canvasElement = $("#notes-new")[0];
  obs.observe(canvasElement, {childList: true, subtree: true});

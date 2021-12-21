/////////////////////////////////////////////////////////////////////////
//////// subscribers UI
////////////////////////////////////////////////////////////////////////
////// change account, find contacts of accounts//////////////////////////
$("select[name=Account]").change(function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    $("select[name=magaya__Representative]").empty();
    store.dispatch(addActionEdited())

    let account = $("select[name=Account]").val();
    storeAccounts.dispatch(addQuoteAccount({id: account}))
    storeAccounts.dispatch(findContactOfAccount({id: account}))
    //deberia vaciar todo con emptySingleContact (BUG -- No cambia el valor del account)
    $("input[name=Phone]").val("")
    $("input[name=Mobile]").val("")
    $("input[name=Email]").val("")
    $("input[name=Mailing_Street]").val("")
    $("input[name=Mailing_City]").val("")
    $("input[name=Mailing_State]").val("")
    $("input[name=Mailing_Country]").val("")
    $("input[name=Mailing_Zip]").val("")

})

////////// change representative, find contact data //////////////////
$("select[name=magaya__Representative]").change(function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    let contact = $(this).val();
    storeAccounts.dispatch(findContact({id: contact}))
})

////////// Deal data //////////////////
$("select[name=Deal]").change(function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    storeAccounts.dispatch(emptySingleContact())
    let deal = $(this).val();
    storeDeal.dispatch(getDeal({id: deal}))
    store.dispatch(addActionEdited())
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


$("select[name=magaya__Mode_of_Transportation]").change(function(e) {
    e.preventDefault()
    e.stopImmediatePropagation()
    /*store.dispatch(addActionEdited())*/
    let value = $(this).val()
    $("input[name=ModeOfTransportation]").val(value)

    let port = $(this).val()

    //let method = transpMethods.filter(k => k.id === idT)

    if (!_.isEmpty(port)) {
        //let parentMethod = method[0]['magaya__ParentMethod']
        let query = ''
        switch (port) {
            case "Vessel, Non-containerized":
                query = `magaya__Waterway`
                break;
            case "Vessel, Containerized":
                query = `magaya__Waterway`
                break;
            case "Barge":
                query = `magaya__Waterway`
                break;
            case "Rail, Non-containerized":
                query = `magaya__Railway`
                break;
            case "Rail, Containerized":
                query = `magaya__Railway`
                break;
            case "Truck, Non-containerized":
                query = `magaya__Roadway`
                break;
            case "Truck, Containerized":
                query = `magaya__Roadway`
                break;
            case "Auto":
                query = `magaya__Roadway`
                break;
            case "Road, other":
                query = `magaya__Roadway`
                break;
            case "Air, Non-containerized":
                query = `magaya__Airway`
                break;
            case "Air, Containerized":
                query = `magaya__Airway`
                break;
            case "Mail":
                query = `magaya__Roadway`
                break;
            default:
                query = `magaya__Other`
                break;

        }
        /*magaya__Roadway
        magaya__Airway
        magaya__Railway
        magaya__Waterway
        magaya__Other*/

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
    $("input[name=magaya__ConsigneeCode]").val("")

}

function rolConsignee() {
    let account = $("select[name=Account]").val();
    storeAccounts.dispatch(setAccountConsignee({id: account}))
    $("select[name=magaya__Shipper]").val("")
    $("input[name=magaya__ShipperCity]").val("")
    $("input[name=magaya__ShipperState").val("")
    $("input[name=magaya__ShipperCountry]").val("")
    $("input[name=magaya__ShipperStreet]").val("")
    $("input[name=magaya__ShipperCode]").val("")

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
    $("input[name=magaya__ShipperCode]").val("")
    $("input[name=magaya__ConsigneeCode]").val("")
}



//var obs = new MutationObserver(function(mutations, observer) {
$("select[name=magaya__Package_Type]").change(function(e) {
    e.preventDefault()
    e.stopImmediatePropagation()
    let index = $(this).val();

    let pck = packageType.filter(k => k.id === index)
    if (!_.isEmpty(pck)) {

        let length = pck[0]["magaya__PackageLength"]
        let height = pck[0]["magaya__PackageHeight"]
        let width = pck[0]["magaya__PackageWidth"]
        let weigth = pck[0]["magaya__PackageWeigth"]
        let measure_system = $("select[name=magaya__Measure_System]").val()

        storeItem.dispatch(updateAllItemNew({length: length, width: width, height: height, weigth: weigth, package: pck[0]["id"], measure_system: measure_system}))
    }
})


$("select[name=magaya__Tax]").change(function(e) {
    e.preventDefault()
    e.stopImmediatePropagation()
    let index = $(this).val();
    let rate = 0;
    let pck = taxes.filter(k => k.id === index)
    if (!_.isEmpty(pck)) {

        rate = pck[0]["magaya__Tax_Rate0"]
        storeCharge.dispatch(updateChargeOnNew({field: 'magaya__Tax', value: index}))
        storeCharge.dispatch(updateChargeOnNew({field: 'magaya__TaxRate', value: rate}))
    }

})



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

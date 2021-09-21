<!doctype html>
<html lang="en">
  <head>
    <base href="{{ url('.') }}">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="generator" content="Visual Studio Code">
    <title>Magaya</title>
    <!-- Bootstrap core CSS -->
    <link href="{{ url('bootstrap/css/bootstrap.min.css') }}" rel="stylesheet">
    <!-- Plugins -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

    <link href="{{ url('css/jquery-ui.css') }}" rel="stylesheet">

    <link href="{{ url('datetimepicker/jquery.datetimepicker.css') }}" rel="stylesheet">
    <link href="{{ url('daterangepicker/daterangepicker.css') }}" rel="stylesheet">
    <link href="{{ url('select2/css/select2.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="{{ url('css/custom-lismquotes.css') }}"/>


    <!-- Custom CSS -->

  </head>

  <style>

    @keyframes preloader {
    0% {
        height: 5px;
        transform: translateY(0px);
        background: #334E68;
    }
    25% {
        height: 30px;
        transform: translateY(15px);
        background: #3fbb91;
    }
    50% {
        height: 5px;
        transform: translateY(0px);
        background: #3e847e;
    }
    100% {
        height: 5px;
        transform: translateY(0px);
        background: #3d566e;
    }
}

#preloader {
    display: none;
    z-index: 1060;
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
}

#preloader .loading-animation {
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -30px;
    z-index: 100;
}

#preloader .loading-animation span {
    display: block;
    bottom: 0;
    width: 9px;
    height: 5px;
    background: #334E68;
    position: absolute;
    animation: preloader 1.5s infinite ease-in-out;
    -webkit-animation: preloader 1.5s infinite ease-in-out;
    -moz-animation: preloader 1.5s infinite ease-in-out;
    -ms-animation: preloader 1.5s infinite ease-in-out;
}

#preloader .loading-animation span:nth-child(2) {
    left: 11px;
    animation-delay: .2s;
    -webkit-animation-delay: .2s;
    -moz-animation-delay: .2s;
    -ms-animation-dealy: .2s;
}

#preloader .loading-animation span:nth-child(3) {
    left: 22px;
    animation-delay: .4s;
    -webkit-animation-delay: .4s;
    -moz-animation-delay: .4s;
    -ms-animation-dealy: .4s;
}

#preloader .loading-animation span:nth-child(4) {
    left: 33px;
    animation-delay: .6s;
    -webkit-animation-delay: .6s;
    -moz-animation-delay: .6s;
    -ms-animation-dealy: .6s;
}

#preloader .loading-animation span:nth-child(5) {
    left: 44px;
    animation-delay: .8s;
    -webkit-animation-delay: .8s;
    -moz-animation-delay: .8s;
    -ms-animation-dealy: .8s;
}

.no-border{
 border:none;

}
input:active {
    border:1px solid #000;
}








body {
  background-color: rgba(0, 0, 0, 0.3);
}

* {
  box-sizing: border-box;
}

a {
  text-decoration: none;
}

li {
    color: white;
}

.tall {
  height: 2000px;
  width: 100%;
  margin-top: 100px;
  margin-left: 10px;
}

.overlay {
  position: fixed;
  z-index: 1;
  background-color: #313715;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  pointer-events: none;
  transition: all 300ms ease-in-out;
}
.overlay .main-nav {
  width: 100%;
  margin: 100px 0 0 20px;
  position: absolute;
  top: 20%;
  transition: all 300ms ease-in-out;
}
.overlay .main-nav li {
  font-size: 20px;
  padding: 10px;
  width: auto;
}
.overlay .main-nav li a {
  color: white;
}

.nav-toggle {
  position: fixed;
  top: 20px;
  left: 0;
  width: 120px;
  height: 50px;
  background-color: black;
  z-index: 2;
  opacity: 0.3;
}

.nav-toggle .toggle-botton .middle .top-left .top-right :hover {
    opacity: 0.1;
}

.nav-toggle .toggle-botton {
  position: absolute;
  height: 100%;
  width: 30%;
  background-color: red;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.nav-toggle .toggle-botton .middle {
  width: 60%;
  height: 3px;
  opacity: 1;
  position: absolute;
  background-color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 300ms ease-in-out;
}
.nav-toggle .toggle-botton .top-left {
  width: 30%;
  height: 3px;
  position: absolute;
  background-color: white;
  top: 30%;
  left: 50%;
  transform: translate(-100%, -50%);
  transition: all 300ms ease-in-out;
}
.nav-toggle .toggle-botton .top-right {
  width: 30%;
  height: 3px;
  position: absolute;
  background-color: white;
  top: 30%;
  left: 50%;
  transform: translate(0%, -50%);
  transition: all 300ms ease-in-out;
}
.nav-toggle .toggle-botton .bottom-left {
  width: 30%;
  height: 3px;
  position: absolute;
  background-color: white;
  bottom: 25%;
  left: 50%;
  transform: translate(-100%, -50%);
  transition: all 300ms ease-in-out;
}
.nav-toggle .toggle-botton .bottom-right {
  width: 30%;
  height: 3px;
  position: absolute;
  background-color: white;
  bottom: 25%;
  left: 50%;
  transform: translate(0%, -50%);
  transition: all 300ms ease-in-out;
}
.nav-toggle.is-active .toggle-botton .middle {
  opacity: 0.3;
}
.nav-toggle.is-active .toggle-botton .top-left {
  top: 30%;
  left: 50%;
  transform: translate(-70%, -50%) rotate(45deg);
  transform-origin: left center;
}
.nav-toggle.is-active .toggle-botton .bottom-right {
  bottom: 25%;
  left: 50%;
  transform-origin: right center;
  transform: translate(-30%, -50%) rotate(45deg);
}
.nav-toggle.is-active .toggle-botton .top-right {
  top: 30%;
  left: 50%;
  transform-origin: right center;
  transform: translate(-30%, -50%) rotate(-45deg);
}
.nav-toggle.is-active .toggle-botton .bottom-left {
  bottom: 25%;
  left: 50%;
  transform-origin: left center;
  transform: translate(-70%, -50%) rotate(-45deg);
}
.nav-toggle.is-active + .overlay {
  opacity: 1;
  pointer-events: auto;
}
.nav-toggle.is-active + .overlay .main-nav {
  top: 0%;
}
.nav-toggle.is-active .logo {
  background-color: white;
  color: black;
}

.logo {
  display: block;
  position: absolute;
  width: 70%;
  height: 100%;
  background-color: transparent;
  left: 30%;
  color: white;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  transition: all 300ms ease-in-out;
  letter-spacing: 5px;
}

/*##############################*/
/*####### MEDIA QUERIES #######*/
/*##############################*/
/*@media screen and (max-width: 600px) {
  .tall {
    font-size: 40px;
  }

  .logo {
    font-size: 16px;
  }

  .overlay .main-nav li {
    font-size: 30px;
  }
}*/

</style>





  <body>
  <div id="quote-alert" class="alert alert-danger alert-dismissible" style="position: absolute; display: none; z-index: 6000">
        <span class="material-icons close cursor-hand" data-close="quote-alert">close</span>
        <div id="message-alert" class="message-data"></div>

    </div>

    <div id="quote-info" class="alert alert-success alert-dismissible" style="position: absolute; display: none; z-index: 6000;">
        <span class="material-icons close cursor-hand" data-close="quote-info">close</span>
        <div id="message-info" class="message-data"></div>
    </div>


  <div class="nav-toggle">
  <div class="toggle-botton">
    <div class="top-left"></div>
    <div class="top-right"></div>
    <div class="middle"></div>
    <div class="bottom-left"></div>
    <div class="bottom-right"></div>
  </div>
  <h1 class="logo"><i class="fas fa-plus"></i></h1>
</div>

<div class="overlay">

    <nav class="main-nav">
        <fieldset class="fieldset"><legend class="legend">New Charge</legend>
            <div class="row">
                <div class="col-md-2">
                    <span>Status</span>
                    <div class="input-group">
                        <select name='ChargeStatus' class='form-control'>
                            <option value="Open">Open</option>
                            <option value="Paid">Paid</option>
                            <option value="Posted">Posted</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-4">
                    <span>Charge Type</span>
                    <div class="input-group">
                        <select name='ChargeType' id='ChargeType' class='form-control'>
                            <option value="0"></option>
                        </select>
                    </div>
                </div>

                <div class="col-md-6">
                    <span>Description</span>
                    <div class="input-group">
                        <input type="text" name='DescriptionCharges' id='DescriptionCharges' class='form-control' />
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-4">
                    <span>Currency</span>
                    <div class="input-group">
                        <select name='Currency' id='Currency' class='form-control'>
                            <option value='USD'>USD</option>
                        </select>
                    </div>
                </div>

                <div class="col-md-4">
                    <span>Paid As</span>
                    <div class="input-group">
                        <select name='PaidAs' class='form-control'>
                            <option value='Prepaid'>Prepaid</option>
                            <option value='Collect'>Collect</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-4">
                    <span>Quantity</span>
                    <div class="input-group">
                        <input type="text" class="number form-control" name='Quantity' id='Quantity' class='form-control' />
                    </div>
                </div>

                <div class="col-md-2">
                    <span>Unity</span>
                    <div class="input-group">
                        <select name='Unity' class='form-control'>
                            <option value='U'>U</option>
                            <option value='Lb'>Lb</option>
                            <option value='Kg'>Kg</option>
                        </select>
                    </div>
                </div>

                <div class="col-md-4">
                    <span>Price</span>
                    <div class="input-group">
                        <input type="text" class="number form-control" name='Price' id='Price' class='form-control' />
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-4">
                    <span>Tax Code</span>
                    <div class="input-group">
                        <select name="TaxCode" class='form-control'>
                            <option value='0'></option>
                        </select>
                    </div>
                </div>
            </div>
    </fieldset>

        <div class="col-md-12" style="padding: 0px;">
            <p style="width: 100%;text-align: right;">
                <button id='sendCharges' for-table='#item-charges' class="btn btn-primary" style="background-color: #0b3355">Add Charge</button>
            </p>
        </div>
    </nav>
</div>

<div class="tall">
    <div class="card">
        <div class="card-body">
            <div class="table-responsive-scroll">
                <table id="table-charges" class="table">
                    <thead>
                        <tr>
                            <th style="width:10%"></th>
                            <th style="width:10%">Status</th>
                            <th style="width:26%">Description</th>
                            <th style="width:9%">Quantity</th>
                            <th style="width:9%">Price</th>
                            <th style="width:9%">Amount</th>
                            <th style="width:9%">Tax Amount</th>
                            <th style="width:9%">Amount + Tax</th>
                            <th style="width:9%">Final Amount</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>

            </div>

        </div>
    </div>
</div>






</body>
</html>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/gh/jitbit/HtmlSanitizer@master/HtmlSanitizer.js"></script>

    <script src="{{ url('js/utils.js') }}"></script>
    <script src="{{ url('bootstrap/js/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ url('bootstrap/js/popper.min.js') }}"></script>
    <script src="{{ url('js/jquery-ui.js') }}"></script>
    <script src="{{ url('select2/js/select2.full.js') }}"></script>
    <script src="{{ url('underscore-master/underscore-min.js') }}"></script>
    <!--SDK CDN-->
    <script src="https://live.zwidgets.com/js-sdk/1.1/ZohoEmbededAppSDK.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/4.1.1/redux.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid.min.js"></script>

    <script src="{{ url('js/ui_listmquote/utils/biblio_jquery.js') }}"></script>
    <script src="{{ url('js/errors_handlers/errors.js') }}"></script>
    <script src="{{ url('js/store/constants.js') }}"></script>


    <script src="{{ url('js/store/store.js') }}"></script>
    <script src="{{ url('js/store/storeError.js') }}"></script>
    <script src="{{ url('js/store/storeSuccess.js') }}"></script>
    <script src="{{ url('js/store/storeCharges.js') }}"></script>
    <script src="{{ url('js/store/storeQuotes.js') }}"></script>
    <script src="{{ url('js/store/storeAccounts.js') }}"></script>
    <script src="{{ url('js/ui_listmquote/subscribers/subscribersQuotes.js') }}"></script>

    <!--script src="{{ url('js/ui_listmquote/subscribers/subscribersCharges.js') }}"></script-->



    <!--script src="{{ url('js/contacts2.js') }}"></script-->

<script>

$(document).ready(function(){

    $('.close').click(function(){
        let div_close = $(this).attr("data-close");
        $(`#${div_close}`).animate({width:'toggle'},150);
        //$("#" + div_close).hide()
    })

    $(function(){
  $('.toggle-botton').on('click',function(){
    $('.nav-toggle').toggleClass('is-active')
  })

  $('.main-nav li a').on('click',function(){
    $('.nav-toggle').toggleClass('is-active');
  })
})



    let accountId = 0
    let contact = 0

    let idQuote = 0
    //get zoho data
    ZOHO.embeddedApp.on("PageLoad",function(data)
    {
        idQuote = data.EntityId;

        //select the account from client quote
        ZOHO.CRM.API.getRecord({ Entity: "magaya__SQuotes", RecordID:  idQuote })
        .then (function (response) {
            data = response.data;
            storeQuote.dispatch(addQuote(data))
        })
        .then(function(d) {
            storeQuote.dispatch(findQuote({id: idQuote}))
            accountId = quoteToEdit.Account.id
            console.log("Quote to edit", quoteToEdit)
        });



        //charges types
        ZOHO.CRM.API.getAllRecords({Entity: "magaya__Charges_Type", sort_order: "asc"})
        .then(function (response) {
            if (!_.isEmpty (response.data)) {
                $.map(response.data, function (k, i) {
                    $(`<option value="${sanitize(k.magaya__ChargesCode)}">${sanitize(k.Name)}</option>`).appendTo("select[name=ChargeType]");
                })
            }
        })


        //get related records charges
       ZOHO.CRM.API.getRelatedRecords({ Entity: "magaya__SQuotes", RecordID:  idQuote, RelatedList: "magaya__SQuote_Name0", page: 1, per_page: 200 })
            .then(function(response) {
                $("#charges tbody").empty();
                if (!_.isEmpty(response.data)) {
                    idemCharges = response.data
                    amountTotal = cont = 0;
                    $.each(idemCharges, function(i, k) {
                            cont++;
                            amountTotal += (k.magaya__CQuantity * k.magaya__Price);
                            //ApplyTo es un objeto, que pudiera estar vacio
                            var applyTo = '';
                            var applyToId = '';
                            if (!_.isEmpty(k.magaya__ApplyToAccounts)) {
                                applyTo = k.magaya__ApplyToAccounts.name
                                applyToId = k.magaya__ApplyToAccounts.id

                            }
                            storeCharge.dispatch(addCharge({...k}))
                        }) //each

                } //IF
            }) //then

    })



    ZOHO.embeddedApp.init()

    //boton sendCharges on edit form
    $("#sendCharges").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        Utils.blockUI();
        store.dispatch(addActionEdited())

        let ChargeType = $("select[name=ChargeType] option:selected").val();
        let Status = $("select[name=ChargeStatus] option:selected").val();
        let DescriptionCharges = $("input[name=DescriptionCharges]").val().replace(/[^a-zA-Z0-9]/g, ' ');
        let ChargeText = DescriptionCharges;

        let TaxRate = $("select[name=TaxCode] option:selected").val();
        let Quantity = ($("input[name=Quantity]").val() > 0) ? $("input[name=Quantity]").val() : 0;
        let Unity = $("input[name=Unity]").val() > 0 ? $("input[name=Unity]").val() : 0;
        let Price = $("input[name=Price]").val() > 0 ? $("input[name=Price]").val() : 0;

        Price = roundDec(Price)
        TaxRate = roundDec(TaxRate)
        Quantity = roundDec(Quantity);
        let amount = Price * Quantity;
        amount = roundDec(amount)
        let amount_tax = amount / 100 * TaxRate
        amount_tax = roundDec (amount_tax);
        let amount_total = amount + amount_tax;
        amount_total = roundDec (amount_total)


        let item = {
                'magaya__SQuote_Name': idQuote,
                'Name': DescriptionCharges,
                'magaya__Status': Status,
                'magaya__TaxRate': TaxRate,
                'magaya__Tax_Amount': amount_tax,
                'magaya__Amount_Total': amount_total,
                'magaya__ChargeCode': ChargeType,
                'magaya__Charge_Description': DescriptionCharges,
                'magaya__CQuantity': Quantity,
                'magaya__Price': Price,
                'magaya__Amount': amount,
                'magaya__Final_Amount': amount_total,
                'magaya__ChargeCurrency': $("select[name=Currency]").val(),
                'magaya__ApplyToAccounts': accountId
        }


        ZOHO.CRM.API.insertRecord({ Entity: "magaya__ChargeQuote", APIData: item, Trigger: [] })
            .then(function(data) {
                res = data.data;

                let idCharge = res[0]['details']['id'];
                if (res[0]["code"] !== "SUCCESS") {
                    codeError = res[0]["code"];
                    field = res[0]['details']["api_name"];
                    show = true;
                    module = 'Service Items'

                    storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))

                } else {
                    ZOHO.CRM.API.getRecord({Entity:"magaya__ChargeQuote",RecordID:idCharge})
                        .then(function(data){
                            record = data.data;

                            $.map(record, function(k, v){
                                storeCharge.dispatch(addCharge({...k}))
                            })

                            var func_name = "magaya__setQuoteTotalAmount";
                            var req_data ={
                                "quote_id" : idQuote
                            };
                            ZOHO.CRM.FUNCTIONS.execute(func_name, req_data).then(function(data){
                                console.log("Update quote amount", data)
                            })


                            let message = ": Added new Charge item"
                            storeSuccess.dispatch(addSuccess({message: message}))
                        })

                }
            })
            .then(function(){
                Utils.unblockUI()
            })
            .catch(function(error){
                dataError = error.data;
                $.map(dataError, function(k, v) {
                    errorCode = k.code;
                    field = k.details.api_name;
                    show = true;
                    module = 'Service Items'
                    storeError.dispatch(addError({errorCode: errorCode, showInfo: show, field: field, module: module}))

                })
                Utils.unblockUI()
            })
    })


    $("select[name=ChargeType]").change (function () {
        value = $("select[name=ChargeType] option:selected").text();
        $(":input[name=DescriptionCharges]").val(value);
    })



    $('#table-charges').bind("DOMSubtreeModified", function() {



        /////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////

        $(".del-item-charge").click (function (e) {
            let idCharge = $(this).attr('data-id');

            ZOHO.CRM.API.deleteRecord({Entity:"magaya__ChargeQuote",RecordID: idCharge})
                .then(function(data){
                    console.log(data)
                    message = " : Item Updated!!";
                    //storeCharge.dispatch(deleteCharge({id: idCharge}))
                    //storeSuccess.dispatch(addSuccess({message: message}))


                })
                .catch(function(error){
                    dataError = error.data;
                    $.map(dataError, function(k, v) {
                        codeError = 'Error on field';
                        show = true;
                        field = oldValue;
                        module = 'Service Items'
                        //storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))

                    })
                })
        });

    })


    accounts = []
    var idAccount = 0;

    //capturo el ID del account desde el store
    storeClientQuote.subscribe(() => {
        let {client, id} = storeClientQuote.getState();
        //$("#info").html("Account: " + client)
        idAccount = id

    })

    ///////subscriber charges, render UI table
    storeCharge.subscribe(() => {
        let u = storeCharge.getState().charges;

        $("#table-charges tbody").empty();
            if (!_.isEmpty(u)) {
                $.each(u, function(i, k) {

                    $("#table-charges tbody").append(`<tr>
                    <td class="Delete">
                        <a><span class="material-icons oculto delete" data-id="${k.id}">clear</span></a>
                    </td>
                    <td class="magaya__Status">${k.magaya__Status}</td>
                    <td class="Name" id="first">${k.Name}</td>
                    <td><input type="text" class="magaya__CQuantity number form-control" value="${k.magaya__CQuantity}" /></td>
                    <td><input type="text" class="magaya__Price number form-control" value="${roundDec(k.magaya__Price)}" /></td>
                    <td><input type="text" class="magaya__Amount number form-control" value="${roundDec(k.magaya__Amount)}" /></td>
                    <td><input type="text" class="magaya__Tax_Amount number form-control" value="${roundDec(k.magaya__Tax_Amount)}" /></td>
                    <td>${roundDec(k.magaya__Amount_Total)}</td>
                    <td><input type="text" class="magaya__Final_Amount number form-control" value="${roundDec(k.magaya__Final_Amount)}" /></td>



                    </tr>`);
                })
            } //IF
        })

    //var  idmQuoteToEdit = 0;

});

</script>

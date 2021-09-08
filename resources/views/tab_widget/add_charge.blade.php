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
    <link href="{{ url('sweetalert/sweetalert2.min.css') }}" rel="stylesheet">
    <link href="{{ url('font-awesome/css/all.min.css') }}" rel="stylesheet">
    <link href="{{ url('css/jquery-ui.css') }}" rel="stylesheet">

    <link href="{{ url('datetimepicker/jquery.datetimepicker.css') }}" rel="stylesheet">
    <link href="{{ url('daterangepicker/daterangepicker.css') }}" rel="stylesheet">
        <link href="{{ url('select2/css/select2.css') }}" rel="stylesheet">
        <link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.css" />

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
    <div id="quote-alert" class="alert alert-danger" style="position: absolute; display: none; z-index: 200"></div>
    <div id="quote-info" class="alert alert-info" style="position: absolute; display: none; z-index: 200;"></div>


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
  <div class="row" style="padding:10px 10px 10px 40px;" >
            <div class="col-md-4">
                <li><a>Charge Type</a></li>
                <div class="input-group">
                    <div class="input-group-text"><i class="fas fa-user-check"></i></div>
                        <select name='ChargeType' id='ChargeType' class='form-control'>
                            <option value="select"></option>
                        </select>
                </div>
            </div>

            <div class="col-md-4">
                <li>Description</li>
                <div class="input-group">
                    <div class="input-group-text"><i class="fas fa-user-check"></i></div>
                        <input type="text" name='DescriptionCharges' id='DescriptionCharges' class='form-control' />
                </div>
            </div>

            <div class="col-md-2">
               <li>Currency</li>
                <div class="input-group">
                    <div class="input-group-text"><i class="fas fa-dollar-sign"></i></div>
                    <select name='Currency' id='Currency' class='form-control'>
                        <option value='USD'>USD</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="row" style="padding:10px 10px 10px 40px;">
        <div class="col-md-2">
                <li>Quantity</li>
                <div class="input-group">
                    <div class="input-group-text"><i class="fas fa-cash-register"></i></div>
                    <input type="text" name='Quantity' id='Quantity' class='form-control' />
                </div>
            </div>

            <div class="col-md-2">
                <li>Unity</li>
                <div class="input-group">
                    <div class="input-group-text"><i class="fas fa-chart-pie"></i></div>
                        <input type="text" name='Unity' id='Unity' class='form-control' />
                </div>
            </div>

            <div class="col-md-2">
                <li>Price</li>
                <div class="input-group">
                    <div class="input-group-text"><i class="fas fa-hand-holding-usd"></i></div>
                        <input type="text" name='Price' id='Price' class='form-control' />
                </div>
            </div>



            <div class="col-md-2">
                <li>Amount</li>
                <div class="input-group">
                    <div class="input-group-text"><i class="fas fa-coins"></i></div>
                    <input type="text" name='Amount' id='Amount' class='form-control' readonly/>
                </div>
            </div>
        </div>
        <div class="row" style="padding:10px 10px 10px 40px;">
            <span class="btn btn-primary" id="sendCharges"><i class="far fa-save fa-2x"></i></i></label>
        </div>

        <!--ul>
      <li></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Blog</a></li>
      <li><a href="#">Work</a></li>
      <li><a href="#">Contact</a></li>
    </ul-->
  </nav>
</div>

<div class="tall">
<div class="card">
            <div class="card-body">
                <div class="table-responsive-scroll">
                <table id="table-charges" class="table">
                    <thead>
                    <tr>
                        <th>Delete</th>
                        <th>Code</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Amount</th>
                        <th>Currency</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>

            </div>

        </div>
</div>






</body>
</html>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="{{ url('js/utils.js') }}"></script>
    <script src="{{ url('bootstrap/js/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ url('bootstrap/js/popper.min.js') }}"></script>
    <script src="{{ url('js/jquery-ui.js') }}"></script>
    <script src="{{ url('select2/js/select2.full.js') }}"></script>
    <script src="{{ url('underscore-master/underscore-min.js') }}"></script>
    <!--SDK CDN-->
    <script src="https://live.zwidgets.com/js-sdk/1.1/ZohoEmbededAppSDK.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/4.1.1/redux.min.js"></script>

    <script src="{{ url('js/biblio.jquery3.js') }}"></script>

    <script src="{{ url('js/biblio.zoho2.js') }}"></script>

    <script src="{{ url('js/store/store.js') }}"></script>
    <script src="{{ url('js/store/storeError.js') }}"></script>
    <script src="{{ url('js/store/storeSuccess.js') }}"></script>
    <script src="{{ url('js/store/storeCharges.js') }}"></script>



    <!--script src="{{ url('js/contacts2.js') }}"></script-->

<script>



$(document).ready(function(){

    $(function(){
  $('.toggle-botton').on('click',function(){
    $('.nav-toggle').toggleClass('is-active')
  })

  $('.main-nav li a').on('click',function(){
    $('.nav-toggle').toggleClass('is-active');
  })
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
        console.log("State charge now", u)
        $("#table-charges tbody").empty();
            if (!_.isEmpty(u)) {
                $.each(u, function(i, k) {

                    $("#table-charges tbody").append(`<tr><td class="Delete"><i class="fa fa-trash del-item-charge" aria-hidden="true" data-id="${k.id}"></i></td>
                    <td class="magaya__ChargeCode">${k.magaya__ChargeCode}</td>
                    <td><input type="text" class="form-control no-border" name="Name" value="${k.Name}" required></td>
                    <td><input type="text" class="form-control no-border" name="magaya__CQuantity" value="${k.magaya__CQuantity}" /></td>
                    <td><input type="text" class="form-control no-border" name="magaya__Price" value="${k.magaya__Price}" /></td>
                    <td class="magaya__Amount">${k.magaya__Amount}</td>
                    <td class="magaya__ChargeCurrency">${k.magaya__ChargeCurrency}</td>
                    </tr>`);
                })
            } //IF
        })

    var idQuote = 0;
    //get zoho data
    ZOHO.embeddedApp.on("PageLoad",function(data)
    {
        idQuote = data.EntityId;

        //select the account from client quote
        ZOHO.CRM.API.getRecord({ Entity: "magaya__SQuotes", RecordID: idQuote })
        .then (function (response) {
            data = response.data;
            if (!_.isEmpty(data[0]["Account"])) {
                //select account data
                id = data[0]["Account"]["id"];
                client = data[0]["Account"]["name"];
                //dispatch los datos del account hacia el store
                storeClientQuote.dispatch({type: 'SET', value: {client, id}})

            }
        });



        //charges types
        ZOHO.CRM.API.getAllRecords({Entity: "magaya__Charges_Type", sort_order: "asc"})
        .then(function (response) {
            //console.log("Charges Type", response)
            if (!_.isEmpty (response.data)) {
                $.map(response.data, function (k, i) {
                    //console.log(k.magaya__ChargesCode)
                        $(`<option value="${k.magaya__ChargesCode}">${k.Name}</option>`).appendTo("select[name=ChargeType]");
                })
            }
        })


        //get related records charges
       ZOHO.CRM.API.getRelatedRecords({ Entity: "magaya__SQuotes", RecordID: idQuote, RelatedList: "magaya__SQuote_Name0", page: 1, per_page: 200 })
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

    //enviar el nuevo service item
    $("#sendCharges").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        //recibir los campos
        //recibir los campos del form
        let ChargeType = $("#ChargeType").val();
        let DescriptionCharges = $("#DescriptionCharges").val().replace(/[^a-zA-Z0-9]/g, ' ');
        let ChargeText = DescriptionCharges;
        let Quantity = ($("#Quantity").val() > 0) ? $("#Quantity").val() : 0;
        let Unity = $("#Unity").val() > 0 ? $("#Unity").val() : 0;
        let Price = $("#Price").val() > 0 ? $("#Price").val() : 0;
        Price = roundDec(Price);
        //var Amount = Math.round(Price * 100) / 100;
        var Amount = parseFloat(Quantity) * parseFloat(Price);
        Amount = roundDec(Amount);

        //formar el objeto
        DescriptionCharges = DescriptionCharges.replace(/[^a-zA-Z0-9]/g, ' ');
        Quantity = parseFloat(Quantity);
        Price = parseFloat(Price);
        Amount = parseFloat(Amount)

        let item = {
            'magaya__SQuote_Name': idQuote,
            'Name': DescriptionCharges,
            'magaya__ChargeCode': ChargeType,
            'magaya__Charge_Description': DescriptionCharges,
            'magaya__CQuantity': Quantity,
            'magaya__Price': Price,
            'magaya__Amount': Amount,
            'magaya__ApplyToAccounts': idAccount
        }

        ZOHO.CRM.API.insertRecord({ Entity: "magaya__ChargeQuote", APIData: item, Trigger: [] })
            .then(function(data) {
                res = data.data;
                console.log(res)
                $.map(res, function(k, v) {
                    if (k.code !== "SUCCESS") {
                        codeError = k.code;
                        field = k.details.api_name;
                        show = true;
                        module = 'Service Items'

                        storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))

                    } else {
                        let idCharge = res[0].details.id;
                        codeError = "";
                        field = "";
                        show = false;
                        module = 'Service Items'

                        $("#ChargeType").val('');
                        $("#DescriptionCharges").val('');
                        $("#Quantity").val('');
                        $("#Unity").val('');
                        $("#Price").val('');
                        $("#Amount").val('');

                        content = `<tr><td class="Delete"><i class="fa fa-trash del-item-charge" aria-hidden="true" data-id="${idCharge}"></i></td>
                        <td class="magaya__ChargeCode">${ChargeType}</td>
                        <td><input type="text" class="form-control no-border" name="Name" value="${ChargeText}"/></td>
                        <td><input type="text" class="form-control no-border" name="magaya__Charge_Description" value="${DescriptionCharges}"/></td>
                        <td><input type="text" class="form-control no-border" name="magaya__CQuantity" value="${Quantity}"/></td>
                        <td><input type="text" class="form-control no-border" name="magaya__Price" value="${Price}"/></td>
                        <td class="magaya__Amount">${Amount}</td>
                        <td class="magaya__ApplyToAccounts">${idAccount}</td>
                        </tr>`;

                        $(content).appendTo("#table-charges tbody");
                        let message = ": Added new Charge item"
                        storeCharge.dispatch(addCharge({...item, id: idCharge}))
                        storeSuccess.dispatch(addSuccess({message: message}))

                    }
                })
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

        //////////////////////////////////////////////////////////////////
        ///////// data in situ editable
        ///////////////////////////////////////////////////////////////////
        $(".Edit").click(function(e) {
            e.preventDefault()
            e.stopImmediatePropagation();

            let tr = $(this).parent()
            //tr.

        })

        $(".no-border").click(function(e) {
            //$(this).addClass("editable")

        })

        $(".no-border").blur(function(e) {
            //e.preventDefault();
            /*let td = $(this).parent();
            let tr = td.parent();

            let value = $(this).val();
            let parent = $(this).parent();
            let field = parent.attr('class');
            let celd = tr.find("td:first");
            let child = celd.children().attr('data-id');

            let json_items = `{'id': ${child}`;
            json_items += `, '${field}': '${value}'`;
            json_items += "}";

            var config=JSON.stringify({
                Entity:"magaya__ChargeQuote",
                APIData:JSON.parse(json_items),
                Trigger:[]
                })

            console.log("Data to sendas", config)
            $(this).updateRecordCRM(config);*/

            //$(this).removeClass("editable")
        })

        $(".editable").focus(function(e) {
            e.preventDefault();

            let padre = $(this).parent()
            console.log("Clase padre", padre.attr('class'))
        })

        /////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////

        $(".del-item-charge").click (function (e) {
            let idCharge = $(this).attr('data-id');

            ZOHO.CRM.API.deleteRecord({Entity:"magaya__ChargeQuote",RecordID: idCharge})
                .then(function(data){
                    console.log(data)
                    message = " : Item Updated!!";
                    storeCharge.dispatch(deleteCharge({id: idCharge}))
                    storeSuccess.dispatch(addSuccess({message: message}))


                })
                .catch(function(error){
                    dataError = error.data;
                    $.map(dataError, function(k, v) {
                        codeError = 'Error on field';
                        show = true;
                        field = oldValue;
                        module = 'Service Items'
                        storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))

                    })
                })
        });

    })

});





//redondear decimales
function roundDec(num) {
    if (typeof num === 'undefined' || num <= 0) return 0;
    let t = num.toString();
    let regex = /(\d*.\d{0,4})/;
    return t.match(regex)[0];

}

</script>

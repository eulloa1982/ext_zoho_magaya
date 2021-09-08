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
    <link href="{{ url('css/jquery-ui.css') }}" rel="stylesheet">

    <link href="{{ url('datetimepicker/jquery.datetimepicker.css') }}" rel="stylesheet">
    <link href="{{ url('daterangepicker/daterangepicker.css') }}" rel="stylesheet">
    <link href="{{ url('select2/css/select2.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">

    <!-- Custom CSS -->

  </head>

  <style>

    .table-responsive-scroll{
        height: 30rem;
        width: 70rem;
        overflow-y: auto;
    }


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



@import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400|Dosis:200,300,400);
*, *:before, *:after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #fafafa;
  -webkit-background-size: cover;
  background-size: cover;
}

.wrap {
  margin: auto;
  padding: 0;
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #fafafa;
  overflow: hidden;
  -webkit-transition: all 0.4s;
  -moz-transition: all 0.4s;
  -ms-transition: all 0.4s;
  -o-transition: all 0.4s;
  transition: all 0.4s;
}

.tabs {
  margin: 0;
  padding: 0;
  display: block;
  width: 100%;
  height: 100%;
  float: left;
  background: #111;
}

.tab-height, .button {
  height: 125px;
  line-height: 125px;
}

.tab {
  display: none;
}

.button {
  margin: 0;
  padding: 0;
  display: block;
  position: relative;
  width: 160px;
  text-align: center;
  color: #f0f0f0;
  cursor: pointer;
  -webkit-transition: all 0.4s;
  -moz-transition: all 0.4s;
  -ms-transition: all 0.4s;
  -o-transition: all 0.4s;
  transition: all 0.4s;
}

.button:hover {
  background: #ccc;
  color: #111;
}

.button:active {
  color: #ff58a5;
}

.display {
  margin: 0;
  padding: 0;
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  width: calc(100% - 160px);
  height: 100%;
  background: #fafafa;
  overflow: hidden;
}

.title {
  margin: 30px 0;
  padding: 0;
  display: block;
  position: relative;
  width: 100%;
  height: 30px;
  font-family: "Open Sans";
  font-weight: 300;
  font-size: 1.5em;
  line-height: 30px;
  text-align: center;
  color: #111;
  -webkit-transition: all 0.4s;
  -moz-transition: all 0.4s;
  -ms-transition: all 0.4s;
  -o-transition: all 0.4s;
  transition: all 0.4s;
}

p {
  margin: 30px auto;
  padding: 0;
  display: block;
  position: relative;
  width: 90%;
  height: auto;
  font-family: "Open Sans";
  font-weight: 300;
  font-size: 1em;
  line-height: 20px;
  text-align: center;
  color: #111;
}

#tab--1:checked ~ #button--1,
#tab--2:checked ~ #button--2,
#tab--3:checked ~ #button--3,
#tab--4:checked ~ #button--4,
#tab--5:checked ~ #button--5 {
  background: #fafafa;
  color: #111;
}

#tab--1:checked ~ #display--1,
#tab--2:checked ~ #display--2,
#tab--3:checked ~ #display--3,
#tab--4:checked ~ #display--4,
#tab--5:checked ~ #display--5 {
  display: block;
}

</style>

  <body>
    <div id="preloader" >
      <div class="loading-animation">
        <div class="line">
            <span class="break dot1"></span>
            <span class="break dot2"></span>
            <span class="break dot3"></span>
            <span class=""></span>
            <span class=""></span>
        </div>
      </div>
    </div>



    <div class="wrap">
        <div class="tabs">
            <input class="tab" type="radio" name="tabs" checked="checked" id="tab--1"/>
            <input class="tab" type="radio" name="tabs" id="tab--2"/>
            <input class="tab" type="radio" name="tabs" id="tab--3"/>
            <input class="tab" type="radio" name="tabs" id="tab--4"/>
            <input class="tab" type="radio" name="tabs" id="tab--5"/>

            <label class="button" for="tab--1" id="button--1"><i class="far fa-address-card fa-2x"></i></i></label>
            <label class="button" for="tab--2" id="button--2"><i class="fas fa-globe fa-2x"></i></label>
            <label class="button" for="tab--3" id="button--3"><i class="fas fa-ship fa-2x"></i></label>
            <label class="button" for="tab--4" id="button--4"><i class="fas fa-file-invoice-dollar fa-2x"></i></i></label>
            <label class="button" for="tab--5" id="button--5"><i class="fa fa-bell fa-2x"></i></label>
            <label class="button" for="tab--5" id="sendQuotation"><i class="far fa-save fa-2x"></i></i></label>



    <div class="alert alert-danger" id="quote-alert" style="display: none;"></div>
    <div class="alert alert-danger" id="no-configuration-alert">
        Can´t reach Magaya, check Login data or try to Log in <a class="btn btn-outline-success" id="magaya-loguin">Login</a>
    </div>
    <div class="display" id="display--1"><span class="title">Testing</span>

        <div class="row" style="padding:10px 10px 10px 40px;">
            <div class="card" style="margin:10px 10px 10px 10px; width: 20rem;">
                <div class="card-body">
                    <h5 class="card-title">You can select an Account from a Deal</h5>
                    <select name="quotation-for-deals" class="form-control qtFrom"  data-module="Deals">
                        <option></option>
                    </select>

                    <br />
                    <br />
                    <h4>Or</h4>
                    <br />
                    <br />

                    <h5 class="card-title">You can Select an Account directly</h5>
                        <select name="quotation-for-accounts" class="form-control qtFrom" data-module="Accounts">
                            <option></option>
                        </select>

                </div>
            </div>

            <div class="jumbotron" style="position: relative; margin:10px 10px 10px 10px;">
                <div class="container">
                    <div style="position: relative; margin:10px 10px 10px 10px;">
                        <div class="alert alert-success" id="message" style="position: absolute; left: 30px; top: 80px; z-index: 3; display: none">Select Quote From</div>
                    </div>
                    <h1 class="display-4">Quote From</h1>
                    <p class="lead">Select an Account or a Deal from the left panel, go to the General Tab</p>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Client</label><br />
                            <select name="ContactName" class="form-control">
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Representative</label><br />
                                <select name="RepresentativeName" class="form-control">
                                </select>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <div class="display" id="display--2"> <span class="title">Testing</span>

    <div class="row" style="padding:10px 10px 10px 40px;">
        <div class="col-md-2">
            <label class="visually-hidden" for="autoSizingInputGroup">Number</label>
            <div class="input-group">
                <div class="input-group-text"><i class="far fa-address-card"></i></div>
                <input type="text" name="Name" id="Name" class="form-control" placeholder="Quote Number" />
            </div>
        </div>

        <div class="col-md-2">
            <label class="visually-hidden" for="autoSizingInputGroup">Issued By</label>
            <div class="input-group">
                <div class="input-group-text"><i class="fas fa-user-check"></i></div>
                    <input type="text" name='IssuedByName' id='IssuedByName' class='form-control' readonly/>
                </div>
        </div>



        <div class="col-md-4">
            <label class="visually-hidden" for="autoSizingInputGroup">Seller Name</label>
            <div class="input-group">
                <div class="input-group-text"><i class="fas fa-user-check"></i></div>
                <input name="SellerName" id="SellerName" class="form-control" readonly/>
            </div>
        </div>
    </div>


    <div class="row" style="padding:10px 10px 10px 40px;">
        <div class="col-md-4">
            <label class="visually-hidden" for="autoSizingInputGroup">Expiration Date</label>
            <div class="input-group">
            <div class="input-group-text"><i class="far fa-calendar-alt"></i></div>
                <input type="text" name="ExpirationDate" id="ExpirationDate" class="form-control" />
            </div>
        </div>

        <div class="col-md-2">
            <label class="visually-hidden" for="autoSizingInputGroup">Transportation Mode</label>
            <div class="input-group">
            <div class="input-group-text"><i class="fas fa-ship"></i></div>
                <select name='TransportationMode' id='TransportationMode' class='form-control' />
                    <option></option>
                </select>
            </div>
        </div>

        <div class="col-md-2">
            <label class="visually-hidden" for="autoSizingInputGroup">Direction</label>
            <div class="input-group">
            <div class="input-group-text"><i class="far fa-arrow-alt-circle-right"></i></div>
                        <select name='Direction' id='Direction' class='form-control'>
                            <option value='Outgoing'>Out Going</option>
                            <option value='Incoming'>In comming</option>
                        </select>
                </div>
            </div>

    </div>

    <div class="row" style="padding:10px 10px 10px 40px;">
        <div class="col-md-4">
                <div class="form-group">
                    <span>Description of Goods</span>
                        <textarea name='Description' id='Description' class='form-control'></textarea>
                </div>
            </div>
    </div>



    </div>

    <div class="display" id="display--3"><span class="title">Ugly markup though...</span>
        <div class="row"  style="padding:10px 10px 10px 40px;">
            <div class="col-md-4">
                <label class="visually-hidden" for="autoSizingInputGroup">Carrier</label>
                <div class="input-group">
                <div class="input-group-text"><i class="fas fa-people-carry"></i></div>
                    <select name='Carrier' id='Carrier' class='form-control'>
                        <option value="select"></option>
                    </select>
                </div>
            </div>

            <div class="col-md-2">
                <label class="visually-hidden" for="autoSizingInputGroup">Service</label>
                <div class="input-group">
                    <div class="input-group-text"><i class="fas fa-people-carry"></i></div>
                    <select name='Service' id='Service' class='form-control'>
                        <option value="PortToPort">PortToPort</option>
                        <option value="PortToDoor">PortToDoor</option>
                        <option value="DoorToDoor">DoorToDoor</option>
                        <option value="DoorToPort">DoorToPort</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="row"  style="padding:10px 10px 10px 40px;">
            <div class="col-md-4">
                <label class="visually-hidden" for="autoSizingInputGroup">Shipper</label>
                <div class="input-group">
                    <div class="input-group-text"><i class="fas fa-user-check"></i></div>
                    <select name='ShipperName' id='Shipper' class='form-control' >
                        <option></option>
                    </select>
                </div>
            </div>

            <div class="col-md-4">
                <label class="visually-hidden" for="autoSizingInputGroup">Consignee</label>
                <div class="input-group">
                    <div class="input-group-text"><i class="fas fa-user-check"></i></div>
                        <select name="ConsigneeName" id="ConsigneeName" class="form-control">
                            <option></option>
                    </select>
                </div>
            </div>

        </div>
    </div>


    <div class="display" id="display--4"><span class="title">But it works!</span>
        <div class="row" style="padding:10px 10px 10px 40px;">
            <div class="col-md-2">
                <label class="visually-hidden" for="autoSizingInputGroup">Charge Type</label>
                <div class="input-group">
                    <div class="input-group-text"><i class="fas fa-user-check"></i></div>
                        <select name='ChargeType' id='ChargeType' class='form-control'>
                            <option value="select"></option>
                        </select>
                </div>
            </div>

            <div class="col-md-6">
                <label class="visually-hidden" for="autoSizingInputGroup">Description</label>
                <div class="input-group">
                    <div class="input-group-text"><i class="fas fa-user-check"></i></div>
                        <input type="text" name='DescriptionCharges' id='DescriptionCharges' class='form-control' />
                </div>
            </div>
        </div>

        <div class="row" style="padding:10px 10px 10px 40px;">
           <div class="col-md-2">
                <label class="visually-hidden" for="autoSizingInputGroup">Quantity</label>
                <div class="input-group">
                    <div class="input-group-text"><i class="fas fa-cash-register"></i></div>
                    <input type="text" name='Quantity' id='Quantity' class='form-control' />
                </div>
            </div>

            <div class="col-md-2">
                <label class="visually-hidden" for="autoSizingInputGroup">Unity</label>
                <div class="input-group">
                    <div class="input-group-text"><i class="fas fa-chart-pie"></i></div>
                        <input type="text" name='Unity' id='Unity' class='form-control' />
                </div>
            </div>

            <div class="col-md-2">
                <label class="visually-hidden" for="autoSizingInputGroup">Price</label>
                <div class="input-group">
                    <div class="input-group-text"><i class="fas fa-hand-holding-usd"></i></div>
                        <input type="text" name='Price' id='Price' class='form-control' />
                </div>
            </div>

            <div class="col-md-2">
                <label class="visually-hidden" for="autoSizingInputGroup">Currency</label>
                <div class="input-group">
                    <div class="input-group-text"><i class="fas fa-dollar-sign"></i></div>
                    <select name='Currency' id='Currency' class='form-control'>
                        <option value='USD'>USD</option>
                    </select>
                </div>
            </div>

            <div class="col-md-2">
                <label class="visually-hidden" for="autoSizingInputGroup">Amount</label>
                <div class="input-group">
                    <div class="input-group-text"><i class="fas fa-coins"></i></div>
                    <input type="text" name='Amount' id='Amount' class='form-control' readonly/>
                </div>
            </div>
        </div>


        <div class="col-md-10" style="padding:10px 10px 10px 40px;">
            <h4 class="mb-3"><a class="btn btn-success btn-sm float-left" id="addCharges">Add <i class="fa fa-plus"></i></a></h4>
            <br />
            <div class="card-body"></div>

            <div class="table-responsive-scroll">
                <table id="table-charges" class="table">
                    <thead class="thead-dark">
                    <tr>
                        <th>Delete</th>
                        <th>Charge Code</th>
                        <th>Charge Description</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Amount</th>
                        <th>Tarif. Imp.</th>
                        <th>Cant. Imp.</th>
                        <th>Cant + Imp</th>
                        <th>Currency</th>
                        <th>Gasto/Ing.</th>
                        <th>Apply To</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
    </div>

    <div class="display" id="display--5"><span class="title">But it works!</span>
        <div class="row" style="padding:10px 10px 10px 40px;">
            <div class="col-md-4">
                <div class="form-group" style="width:50%">
                    <label>Measure System:</label>
                    <select name='Measure_System' id='Measure_System' class='form-control' >
                        <option value='Enlglish'>English</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="row" style="padding:10px 10px 10px 40px;">
            <div class="col-md-1">
                <label class="visually-hidden" for="autoSizingInputGroup">Quantity</label>
                <div class="input-group">
                    <div class="input-group-text"><i class="fas fa-cash-register"></i></div>
                    <input type="numeric" name="Item-Pieces" class='form-control' />
                    </div>
                </div>

            <div class="col-md-2">
                <label class="visually-hidden" for="autoSizingInputGroup">Quantity</label>
                <div class="input-group">
                    <div class="input-group-text"><i class="fas fa-cash-register"></i></div>
                    <select id='select-package' name="select-package" class="form-control"></select>
                </div>
            </div>

            <div class="col-md-2">
                <label class="visually-hidden" for="autoSizingInputGroup">Length</label>
                <div class="input-group">
                    <div class="input-group-text"><i class="fas fa-arrows-alt-h"></i></div>
                    <input type="text" name="Item-Length" id="Item-Length" class='form-control' />
                </div>
            </div>

            <div class="col-md-2">
                <label class="visually-hidden" for="autoSizingInputGroup">Height</label>
                <div class="input-group">
                    <div class="input-group-text"><i class="fas fa-arrows-alt-v"></i></div>
                    <input type="text" name="Item-Height" class='form-control' />
                </div>
            </div>

            <div class="col-md-2">
                <label class="visually-hidden" for="autoSizingInputGroup">Width</label>
                <div class="input-group">
                    <div class="input-group-text"><i class="fas fa-exchange-alt"></i></div>
                    <input type="text" name="Item-Width" class='form-control' />
                </div>
            </div>

            <div class="col-md-2">
                <label class="visually-hidden" for="autoSizingInputGroup">Weight</label>
                <div class="input-group">
                    <div class="input-group-text"><i class="fas fa-balance-scale"></i></div>
                    <input type="text" name="Item-Weight" class='form-control' />
                </div>
            </div>

            <div class="col-md-2">
                <span class="btn btn-primary btn-sm" id="buton-package">Add</span>
            </div>
        </div>


        <div class="col-md-10" style="padding:10px 10px 10px 40px;">
            <div class="table-responsive">
                <!-- products items -->
                <table class="table" id="table-items">
                    <thead><tr>
                    <td>Delete</td>
                    <td>Status</td>
                    <td>Package</td>
                    <td>Quantity</td>
                    <td>Length</td>
                    <td>Height</td>
                    <td>Width</td>
                    <td>Weigth</td>
                    <td>Volume</td>
                    </tr></thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div><!--pane-->

</div><!--tabs-->


</div>


</body>
</html>
    <script src="{{ url('js/jquery-3.6.0.js') }}"></script>
    <!--script src="{{ url('html2pdf/html2canvas.min.js') }}"></script-->
    <script src="{{ url('js/utils.js') }}"></script>
    <!--script src="{{ url('html2pdf/html2pdf.bundle.min.js') }}"></script-->
    <script src="{{ url('js/moment.js') }}"></script>

    <script src="{{ url('js/magaya_api.js') }}"></script>
    <script src="{{ url('bootstrap/js/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ url('bootstrap/js/popper.min.js') }}"></script>
    <script src="{{ url('js/jquery-ui.js') }}"></script>
    <script src="{{ url('daterangepicker/daterangepicker.js') }}"></script>
    <script src="{{ url('sweetalert/sweetalert.js') }}"></script>
    <script src="{{ url('select2/js/select2.full.js') }}"></script>
    <script src="{{ url('datetimepicker/build/jquery.datetimepicker.full.min.js') }}"></script>
    <script src="{{ url('underscore-master/underscore-min.js') }}"></script>
    <!--SDK CDN-->
    <script src="https://live.zwidgets.com/js-sdk/1.1/ZohoEmbededAppSDK.min.js"></script>

    <script src="{{ url('js/biblio.jquery3.js') }}"></script>
    <script src="{{ url('js/quotation3.js') }}"></script>

    <script src="{{ url('js/contacts2.js') }}"></script>
    <script src="{{ url('js/quotation_utils2.js') }}"></script>
    <script src="{{ url('js/utils_cookies.js') }}"></script>


<script>
$(document).ready(function(){
    //date range field

    accounts = [];
    deals = [];
    dealData = [];
    transpMethods = [];
    packageType = [];
    arrayQuote = [];
    MagayaUsers = [];
    arrayMagayaQuotes = [];
    MagayaCarriers = [];
    squoteStage = [];
    dataArray = new Array();
    quoteName = "QT-1";
    organizationInfo = [];



    //hide icons delete and send functionality
    $(".send-to-crm, .send-to-magaya, .delete-from-crm, .delete-from-magaya, .send-quote-to-magaya, .delete-quote-from-crm, .delete-quote-from-magaya, .send-quote-to-crm").hide();

    //set tab quotatioFor active by default
    $("#av-quotationFor-tab").addClass("active");
    $("#nav-general-tab").removeClass("active");
    $("#nav-quotationFor").addClass("show active");
    $("#nav-general").removeClass("show active")

    //set modal defaults
    $(".new-quote").click (function (){
        $("#QuoteForm input[name=Name]").val(quoteName);
        $("#table-items tbody").empty();
        $("#table-charges tbody").empty();
        $("#QuoteForm select[name=ContactName]").val('');
        $("#QuoteForm input[name=ExpirationDate]").val('');
        $("#QuoteForm #sendQuote").prop('disabled', false);
        $("#QuoteForm #sendQuote").show();
        $("#QuoteForm #editQuote").hide();
    })

    //datetime expiration date
    jQuery('#ExpirationDate').datetimepicker({
        format: 'Y-m-d H:m:s'
    });


//get zoho data
ZOHO.embeddedApp.on("PageLoad",function(data)
{

    let dataVar = getMagayaVar()
    console.log("Getting data from cookies add quote")

    //QT
    //drawQuotationMagaya();
    //get carriers and customer first time
    getCarriersFromMagaya();

    //get convert factor for charges weight
    ZOHO.CRM.API.getOrgVariable("magaya__magaya_convert_factor").then(function(data){
        if (!_.isEmpty (data.Success)){
            var pass = data.Success.Content;
            localStorage.setItem('convert_factor', pass);
        }

    });
    ZOHO.CRM.API.getOrgVariable("magaya__magaya_weight").then(function(data){
        if (!_.isEmpty (data.Success)){
            var pass = data.Success.Content;
            localStorage.setItem('mass_measure', pass);
        }

    });
    //magaya_size_unit
    ZOHO.CRM.API.getOrgVariable("magaya__magaya").then(function(data){
        if (!_.isEmpty (data.Success)){
            var pass = data.Success.Content;
            localStorage.setItem('size_unit', pass);
        }

    });


    //get packages types
    ZOHO.CRM.API.getAllRecords({Entity:"magaya__Package_Types",sort_order:"asc",per_page:20,page:1})
        .then(function(data){
            $("#select-package").empty();
            $.map (data.data, function (k, i){
                $("<option value='"+i+"'>"+k.Name+"</option>").appendTo("#select-package");
                packageType.push(k);
            })
        })
    //get current user
    ZOHO.CRM.CONFIG.getCurrentUser().then(function(data){
        $.map (data.users, function (k, i) {
            currentUser = k.full_name;
            $(":input[name=IssuedByName]").val(k.full_name);
            $(":input[name=SellerName]").val(k.full_name);
        })

    });

    ZOHO.CRM.API.getAllRecords({Entity: "Accounts", sort_order: "asc"})
        .then(function(response){
            $.map (response.data, function (k, i) {
                //accounts.push(k);
                var accountId = k.id;
                $("<option value='"+k.id+"'>"+k.Account_Name+"</option>").appendTo("select[name=quotation-for-accounts]");
                $("<option value='"+k.id+"'>"+k.Account_Name+"</option>").appendTo("select[name=ShipperName]");
                $("<option value='"+k.id+"'>"+k.Account_Name+"</option>").appendTo("select[name=ConsigneeName]");
            })
        })

    //get all records of the given module
    ZOHO.CRM.API.getAllRecords({Entity: "Deals", sort_order: "asc"})
        .then(function(response){
            $.map (response.data, function (k, i) {
                deals.push(k);
                $("<option value='"+k.id+"'>"+k.Deal_Name+"</option>").appendTo("select[name=quotation-for-deals]");
            })
        })

    //get all transports methods
    ZOHO.CRM.API.getAllRecords({Entity: "magaya__TransportationMethods", sort_order: "asc"})
        .then(function(response){
            $.map (response.data, function (k, i) {
                $("<option value='"+k.id+"'>"+k.Name+"</option>").appendTo("#TransportationMode");
                transpMethods.push (k);
            })
        })

    //stage quote
    ZOHO.CRM.API.getAllRecords({Entity: "magaya__SQuoteStage", sort_order: "asc"})
        .then(function (response) {
            if (!_.isEmpty (response.data)) {
                $.map(response.data, function (k, i) {
                    squoteStage.push(k);
                    $(`<option value="${k.id}">${k.Name}</option>`).appendTo("select[name=Stage]");
                })
            }
        })

    //stage quote
    ZOHO.CRM.API.getAllRecords({Entity: "magaya__Charges_Type", sort_order: "asc"})
        .then(function (response) {
            if (!_.isEmpty (response.data)) {
                $.map(response.data, function (k, i) {
                        $(`<option value="${k.magaya__ChargesCode}">${k.Name}</option>`).appendTo("select[name=ChargeType]");

                })
            }
        })

    //draw Contacts
    drawContactsCRM();
    drawQuotationCRM();

}); //Zoho Pageload

ZOHO.embeddedApp.init();

    /////////////////////////////////////////////////////////////////////
    //Listener on dinamic new-quotation form
    /////////////////////////////////////////////////////////////////////
    $('#table-items').bind("DOMSubtreeModified", function(){
        $(".del-item-warehouse").click (function () {
            $(this).parent().parent().remove()
        });

    }); //end listener on new-quotation-form

    /////////////////////////////////////////////////////////////////////
    ////// listener on dinamic charges table
    ////////////////////////////////////////////////////////////////////
    $('#table-charges').bind("DOMSubtreeModified", function() {
        $(".del-item-charge").click (function () {
            $(this).parent().parent().remove()
        });

        $(".magaya__ApplyToAccounts").hide();
    })

    //set description charge = charge type
    $("select[name=ChargeType]").change (function () {
        value = $("select[name=ChargeType] option:selected").text();
        $(":input[name=DescriptionCharges]").val(value);
    })

    //menu quotation from
    //set contactname field
    //and complete the array data to send quotation
    module = ''
    divs = $(".qtFrom");
    for (var i=0; i< divs.length; i++) {
        //add eventlistener to each qtForSelect element
        divs[i].addEventListener("change",function() {

            module = $(this).attr("data-module"); //get button text

            if (module == "Accounts") {
                $("select[name=ContactName]").empty();
                $("select[name=RepresentativeName]").empty();

                //dataArray = accounts;
                accountId = $("select[name=quotation-for-accounts] option:selected").val();
                idAccountArray = accounts.findIndex(i => i.id == accountId);

                if (idAccountArray >= 0) {
                    var account = accounts[idAccountArray];
                    $(`<option value='${account['id']}'>${account['Account_Name']}</option>`).appendTo("select[name=ContactName]");
                    $("#message").html(`Great!!! Go to the General Tab to continue the proccess`).css("display", "inline").fadeIn("slow").delay(3000).fadeOut("slow");;

                }
            }
            else if (module == "Deals") {
                var dealFound = false;
                $("select[name=ContactName]").empty();
                $("select[name=RepresentativeName]").empty();
                dealId = $("select[name=quotation-for-deals] option:selected").val();
                dealName = $("select[name=quotation-for-deals] option:selected").text();
                $.map(deals, function(k, i){
                    if (k.id == dealId) {
                        dealFound = true;
                        $("<option value='"+k.Account_Name.id+"'>"+k.Account_Name.name+"</option>").appendTo("select[name=ContactName]");

                        ZOHO.CRM.API.getRelatedRecords({ Entity: "Accounts", RecordID: k.Account_Name.id, RelatedList: "Contacts", page: 1, per_page: 200 })
                        .then(function(response) {
                            if (!_.isEmpty(response.data)){
                                var contact = response.data;
                                $.each(contact, function (k, v) {
                                    $(`<option value='${v['id']}'>${v['Full_Name']}</option>`).appendTo("select[name=RepresentativeName]");
                                })
                            }
                        })
                    }

                })
                if (dealFound == false) {
                    $("#message").html(`Can't get an Account from ${dealName}, try select different Deal`).css("display", "inline").fadeIn("slow").delay(3000).fadeOut("slow");
                } else {
                    $("#message").html(`Great!!! Go to the General Tab to continue the proccess`).css("display", "inline").fadeIn("slow").delay(3000).fadeOut("slow");;

                }

            }
            else {
                Swal.fire({
                    title: 'Error',
                    text: "Can't recognize Quote From",
                    icon: 'error',
                    allowOutsideClick: false
                })
            }
        });//listener

    } //for



 /////////////////////
// send form
// Get fields form
// Get data from table items
// Get data from table charges
//////////////////////
$("#sendQuotation").click(function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    //cannot require field client from module
    //so we need to add custom validation
    var contact = $("select[name=ContactName]").val();
    if (contact === "" || contact === null || contact === "null") {
        Swal.fire({
            title: 'Error',
            text: 'Please, set a client for Quotation',
            icon: 'error'
        })

    } else {
        let stageCreated = '';
        Utils.blockUI()
            //fecha actual
        let date = new Date()
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        if (month < 10) {
            expirationDateFinal = `${year}-0${month}-${day}T23:59:59`
        } else {
            expirationDateFinal = `${year}-${month}-${day}T23:59:59`
        }

        var expirationDate = $(":input[name=ExpirationDate]").val()
        if (expirationDate !== '') {
            expirationDate = expirationDate.split(" ");
            expirationDateFinal = expirationDate[0] + "T" + expirationDate[1]
        }

        //seleccionar el Stage Created en el CRM
        stage = squoteStage.findIndex(i => i["Name"] === "Created");
        if (stage >= 0) {
            stageCreated = squoteStage[stage]["id"];
        }

        //get and cleand data
        let account = $("select[name=ContactName]").val().replace(/[^a-zA-Z0-9]/g, ' ');
        let consignee = $(":input[name=ConsigneeName] option:selected").text().replace(/[^a-zA-Z0-9]/g, ' ');
        let shipper = $(":input[name=ShipperName] option:selected").text().replace(/[^a-zA-Z0-9]/g, ' ');
        let carrier = $("select[name=Carrier]").val().replace(/[^a-zA-Z0-9]/g, ' ');
        let direction = $(":input[name=Direction]").val().replace(/[^a-zA-Z0-9]/g, ' ');
        let description = $(":input[name=Description]").val().replace(/[^a-zA-Z0-9]/g, ' ');


        recordData = {
            "Account": account,
            "magaya__ConsigneeName": consignee,
            "magaya__Shipper": shipper,
            "magaya__Carrier": carrier,
            "magaya__ExpirationDate": expirationDateFinal,
            "magaya__IssuedBy": currentUser,
            //"Name": $(":input[name=Name]").val(),
            "Name": quoteName,
            "magaya__Direction": direction,
            "magaya__TransportationMode": $("select[name=TransportationMode] option:selected").val(),
            "magaya__Seller": currentUser,
            "magaya__MethodOfTransportation": $("input[name=TransportationMethod]").val(),
            "magaya__Description": description,
            //"magaya__Deal": ,
            "magaya__Stage": stageCreated,
            "magaya__ContactName": $("select[name=ContactName] option:selected").text(),
            "magaya__Service": $("select[name=Service]").val()

        };

        //get Deal data, if Exists
        /*if (!_.isEmpty(dealData)) {
            Object.assign(recordData, dealData)
        }*/
        //Representative data
        rep = setDataRepresentative()
            .then(r => {
                if (!_.isEmpty(r)) {
                    Object.assign(recordData, r)
                }
                return (recordData)
            })
            .then(r => {
                ZOHO.CRM.API.insertRecord({ Entity: "magaya__SQuotes", APIData: recordData, Trigger: [] })
                    .then(function(response) {
                        data = response.data;
                        $.each(data, function(key, valor) {
                            id = valor['details']['id'];
                        })

                    }).then(function() {
                        //insert squote_item
                        //ItemsQuote
                        jsonData = $(this).tableToJson('table-items', id);
                        //check the data
                        if (!_.isEmpty(jsonData)) {
                            ZOHO.CRM.API.insertRecord({ Entity: "magaya__ItemQuotes", APIData: jsonData, Trigger: [] })
                                .then(function(response) {}).catch(function(error) {

                                })
                        }

                    }).then(function() {
                        //charges
                        //ChargesQuote
                        jsonCharges = $(this).tableToJson('table-charges', id);
                        if (!_.isEmpty(jsonCharges)) {
                            jsonCharges[0]['Name'] = jsonCharges[0]['magaya__Charge_Description'];
                            ZOHO.CRM.API.insertRecord({ Entity: "magaya__ChargeQuote", APIData: jsonCharges, Trigger: [] })
                                .then(function(response) {

                                }).catch(function(response) {
                                    //do smething
                                })
                        }

                    }).then(function() {
                        //all is OK, unblock UI, reset form and tables
                        Utils.unblockUI()
                        Swal.fire({
                            title: 'Success',
                            text: 'Operation success',
                            icon: 'success',
                            allowOutsideClick: false
                        }).then(function() {
                            drawQuotationCRM();
                        })

                    }).catch(function(response) {
                        Utils.unblockUI()
                        errorData = response.data
                        codeError = ''
                        $.map(errorData, function(k) {
                            codeError = k.details.api_name;
                        })
                        Swal.fire({
                            title: 'Error',
                            text: 'Please, refer the field ' + codeError,
                            icon: 'error'
                        })
                    })
            })

        //join objects
        //Object.assign(recordData, dataArray)
        //ready to insert
        id = 0;


    }
})








}); //jQuery

async function getMagayaVar(){
    let dataVar = await getMagayaVariables();
    }
</script>

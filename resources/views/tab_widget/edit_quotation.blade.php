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

    <!-- Custom CSS -->

  </head>

  <style>
.table-responsive-scroll{
    height: 30rem;
    width: 70rem;
    overflow-y: auto;
}



 @media screen and (min-width: 676px) {
        #QuoteForm .modal-dialog {
          max-width: 95%; /* New width for default modal */
        }
        #show-contact-customer .modal-dialog {
          max-width: 75%; /* New width for default modal */
        }

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

#container{
        background: crimson;
        height: 100vh;
        /*display: flex;
        justify-content: center;
        align-items: flex-start;*/
    }
#quote-info{
        /*width: 200px;*/
        /*height: 200px;*/
        position: absolute;
        top:0%;
        margin-left: 180px;
    }

/*Client presentation*/
@import url(//fonts.googleapis.com/css?family=Lato:400,900);
    @import url(//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css);


</style>

  <body>
    <div id='container'>
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

    <p id="quote-alert" class="alert alert-danger" style="display: none; z-index: 2"></p>
    <div id="quote-info" class="alert alert-info" style="display: none; z-index: 1;"></div>
    <div class="alert alert-danger" id="no-configuration-alert">
        Can´t reach Magaya, check Login data or try to Log in <a class="btn btn-outline-success" id="magaya-loguin">Login</a>
    </div>
</div>


    <div class="wrap">

        <div class="tabs">
            <input class="tab" type="radio" name="tabs" id="tab--1"/>
            <input class="tab" type="radio" name="tabs" checked="checked" id="tab--2"/>
            <input class="tab" type="radio" name="tabs" id="tab--3"/>
            <input class="tab" type="radio" name="tabs" id="tab--4"/>
            <input class="tab" type="radio" name="tabs" id="tab--5"/>

            <label class="button" for="tab--1" id="button--1"><i class="far fa-address-card fa-2x"></i></i></label>
            <label class="button" for="tab--2" id="button--2"><i class="fas fa-globe fa-2x"></i></label>
            <label class="button" for="tab--3" id="button--3"><i class="fas fa-ship fa-2x"></i></label>
            <label class="button" for="tab--4" id="button--4"><i class="fas fa-file-invoice-dollar fa-2x"></i></i></label>
            <label class="button" for="tab--5" id="button--5"><i class="fa fa-bell fa-2x"></i></label>
            <label class="button" for="tab--5" id="editQuotation"><i class="far fa-save fa-2x"></i></i></label>




    <div class="display" id="display--1"><span class="title">Testing</span>


        <div class="card" style="margin:10px 40px 10px 40px;">
            <div class="card-header" id="Client">
                Client:
            </div>
            <div class="card-body">
                <h5 class="card-title">Client Data</h5>
                <p class="card-text" id="Client-data"></p>
            </div>
        </div>

        <div class="card" style="margin:10px">
            <div class="card-header" id="Client">
                Representative:
            </div>
            <div class="card-body">
                <h5 class="card-title">Representative Data</h5>
                <p class="card-text"></p>
            </div>
        </div>




        <div class="row" style="padding:10px 10px 10px 40px;">

            <div class="jumbotron" style="position: relative; margin:10px 10px 10px 10px;">
                <div class="container">
                    <div style="position: relative; margin:10px 10px 10px 10px;">
                        <div class="alert alert-success" id="message" style="position: absolute; left: 30px; top: 80px; z-index: 3; display: none">Quote Client</div>
                    </div>




                    <div id="Representative"></div>



                </div>
            </div>
        </div>
    </div>

    <div class="display" id="display--2"> <span class="title">Testing</span>
        <div id="info"></div>
    <div class="row" style="padding:10px 10px 10px 40px;">
        <div class="col-md-2">
            <label class="visually-hidden" for="autoSizingInputGroup">Number</label>
            <div class="input-group">
                <div class="input-group-text"><i class="far fa-address-card"></i></div>
                <input type='hidden' name='id' />
                <input type="text" name="Name" id="Name" class="form-control" placeholder="Quote Number" readonly/>
            </div>
        </div>

        <div class="col-md-2">
            <label class="visually-hidden" for="autoSizingInputGroup">Issued By</label>
            <div class="input-group">
                <div class="input-group-text"><i class="fas fa-user-check"></i></div>
                    <input type="text" name='IssuedBy' id='IssuedBy' class='form-control' readonly/>
                </div>
        </div>



        <div class="col-md-4">
            <label class="visually-hidden" for="autoSizingInputGroup">Seller Name</label>
            <div class="input-group">
                <div class="input-group-text"><i class="fas fa-user-check"></i></div>
                <input name="Seller" id="Seller" class="form-control" readonly/>
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
                    <input type="text" name='Shipper' id='Shipper' class='form-control' readonly />
                </div>
            </div>

            <div class="col-md-4">
                <label class="visually-hidden" for="autoSizingInputGroup">Consignee</label>
                <div class="input-group">
                    <div class="input-group-text"><i class="fas fa-user-check"></i></div>
                        <input type="text" name="ConsigneeName" id="ConsigneeName" class="form-control" readonly />
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
                        <th>Code</th>
                        <th>Description</th>
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

</div>
</body>
</html>
    <script src="{{ url('js/jquery-3.6.0.js') }}"></script>
    <script src="{{ url('js/moment.js') }}"></script>
    <script src="{{ url('js/magaya_api.js') }}"></script>
    <script src="{{ url('bootstrap/js/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ url('bootstrap/js/popper.min.js') }}"></script>
    <script src="{{ url('js/jquery-ui.js') }}"></script>
    <script src="{{ url('sweetalert/sweetalert.js') }}"></script>
    <script src="{{ url('select2/js/select2.full.js') }}"></script>
    <script src="{{ url('datetimepicker/build/jquery.datetimepicker.full.min.js') }}"></script>
    <script src="{{ url('underscore-master/underscore-min.js') }}"></script>
    <!--SDK CDN-->
    <script src="https://live.zwidgets.com/js-sdk/1.1/ZohoEmbededAppSDK.min.js"></script>
    <script src="{{ url('js/utils.js') }}"></script>
    <script src="{{ url('js/utils_cookies.js') }}"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/4.1.1/redux.min.js"></script>


    <script src="{{ url('js/biblio.jquery3.js') }}"></script>
    <script src="{{ url('js/quotation3.js') }}"></script>
    <script src="{{ url('js/contacts2.js') }}"></script>
    <script src="{{ url('js/quotation_utils3.js') }}"></script>
    <script src="{{ url('js/magaya_api.js') }}"></script>
    <script src="{{ url('js/store/store.js') }}"></script>

<script>
$(document).ready(function(){
    accounts = []
    getCarriersFromMagaya()
    //global var account name and id
    var AccountName = '';
    var AccountId = 0;
    //susbcribe datos del Account, que es uno para la cotizacion
    storeClientQuote.subscribe(() => {
        let {client, id} = storeClientQuote.getState();
        AccountName = client;
        AccountId = id;
    })




    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////
    //set description charge = charge type
    /////////////////////////////////////////////////////////////////////
    $("select[name=ChargeType]").change (function () {
        value = $("select[name=ChargeType] option:selected").text();
        $(":input[name=DescriptionCharges]").val(value);
    })

    transpMethods = [];
    packageType = [];
    MagayaUsers = [];
    MagayaCarriers = [];


    //datetime expiration date
    jQuery('#ExpirationDate').datetimepicker({
        format: 'Y-m-d H:m:s'
    });

    var id = 0;
    //get zoho data
    ZOHO.embeddedApp.on("PageLoad",function(data)
    {
        //obtener las variables de config de magaya
        let dataVar = getMagayaVar()

        id = data.EntityId;
        $("input[name=id]").val(id)
        //get packages types
        ZOHO.CRM.API.getAllRecords({Entity:"magaya__Package_Types",sort_order:"asc",per_page:20,page:1})
            .then(function(data){
                $("#select-package").empty();
                $.map (data.data, function (k, i){
                    $("<option value='"+i+"'>"+k.Name+"</option>").appendTo("#select-package");
                    packageType.push(k);
                    let name = k.Name;
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
    ZOHO.CRM.API.getAllRecords({Entity: "magaya__Charges_Type", sort_order: "asc"})
        .then(function (response) {
            if (!_.isEmpty (response.data)) {
                $.map(response.data, function (k, i) {
                    //get just Income charges (AccountDefinition Type)
                    //if (k.magaya__AccountDefinitionType === "Income") {
                        $(`<option value="${k.magaya__ChargesCode}">${k.Name}</option>`).appendTo("select[name=ChargeType]");
                    //}

                })
            }
        })




    ZOHO.CRM.API.getRecord({ Entity: "magaya__SQuotes", RecordID: id })
        .then (function (response) {
            data = response.data;
            console.log(data)
            //Primer tab pintado con datos del cliente y el representative
            if (!_.isEmpty(data[0]["Account"])) {
                //select account data
                idAccount = data[0]["Account"]["id"];
                client = data[0]["Account"]["name"];
                id = idAccount;
                storeClientQuote.dispatch({type: 'SET', value: {client, id}})
                //$.data persistencia de datos
                $( "div" ).data( "account", { idQuote: idAccount, clientName: client } );
                //select account data
                ZOHO.CRM.API.getRecord({Entity: "Accounts", RecordID: idAccount})
                    .then(function(response) {
                        let account = response.data;
                        console.log("Client", account)
                        $("#Client").append(`<span>${account[0]['Account_Name']}</span>`)
                        $("#Client-data").append(`<span>Number: ${account[0]['Account_Number']}</span><br />
                                                <span>Website: ${account[0]['Website']}</span><br />
                                                <span>Phone: ${account[0]['Phone']}</span><br />
                                                <span>Billing City: ${account[0]['Billing_City']}</span><br />
                                                <span>Billing Country: ${account[0]['Billing_Country']}</span><br />
                                                <span>Billing State: ${account[0]['Billing_State']}</span><br />
                                                <span>Billing Street: ${account[0]['Billing_Street']}</span><br />
                                                <span>Shipping Country: ${account[0]['Shipping_Country']}</span><br />
                                                <span>Shipping City: ${account[0]['Shipping_City']}</span><br />
                                                <span>Shipping State: ${account[0]['Shipping_State']}</span><br />
                                                <span>Shipping Street: ${account[0]['Shipping_Street']}</span><br />
                                        `)

                    })


                $("select[name=ContactName]").append(`<option value='${idAccount}' selected=true>${client}</option>`);

            }

            //campos que no son objetos
            $.each(data[0], function(k, v) {
                if (!_.isObject(v) && !k.includes("$")) {
                    var nameField = k.split("magaya__");
                    //campos que no son objetos
                    $(":input[name=" + nameField[1] + "]").val(v);
                    $("select[name=" + nameField[1] + "]").val(v);
                }
            })

            //campos objetos, transport methods
            if (!_.isEmpty(data[0]['magaya__TransportationMode'])) {
                $("<option value='" + data[0]['magaya__TransportationMode']['id'] + "' selected>" + data[0]['magaya__TransportationMode']['name'] + "</option>").appendTo("#TransportationMode");
            }
        })


        ZOHO.CRM.API.getRelatedRecords({ Entity: "magaya__SQuotes", RecordID: id, RelatedList: "magaya__SQuote_Name0", page: 1, per_page: 200 })
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

                              $("#ApplyToAccounts").append(`<option value='${applyToId}'>${applyTo}</option>`);
                              //$("#QuoteForm select[name=ApplyToAccounts]").val(applyToId);
                            }

                            $("#table-charges tbody").append(`<tr><td class="Delete"><i class="fa fa-trash del-item-charge" aria-hidden="true"></i></td>
                                                            <td class="magaya__ChargeCode">${k.magaya__ChargeCode}</td>
                                                            <td class="Name">${k.Name}</td><td class="magaya__Charge_Description">${k.magaya__Charge_Description}</td>
                                                            <td class="magaya__CQuantity">${k.magaya__CQuantity}</td>
                                                            <td class="magaya__Price">${k.magaya__Price}</td>
                                                            <td class="magaya__Amount">${k.magaya__Amount}</td>
                                                            <td class="magaya__QuanPlusTax">${k.magaya__QuanPlusTax}</td>
                                                            <td class="NoData"></td>
                                                            <td></td>
                                                            <td class="magaya__ChargeCurrency">${k.magaya__ChargeCurrency}</td>
                                                            <td class="magaya__GastoOIngreso">${k.magaya__GastoOIngreso}</td>
                                                            <td class="NoData">${applyTo}</td>
                                                            <td class="magaya__ApplyToAccounts">${applyToId}</td>

                                                            </tr>`);

                        }) //each

                } //IF
            }) //then

            ZOHO.CRM.API.getRelatedRecords({ Entity: "magaya__SQuotes", RecordID: id, RelatedList: "magaya__SQuote_Name1", page: 1, per_page: 200 })
            .then(function(response) {
                $("#table-items tbody").empty();
                if (!_.isEmpty(response.data)) {
                    idemItems = response.data
                    $.each(idemItems, function(i, k) {

                            var volume = k.magaya__Length * k.magaya__Height * k.magaya__Width;
                            //appendData = `<tr><td class="Delete"><i class="fa fa-trash del-item-warehouse" aria-hidden="true"></i></td><td class="magaya__Status"><select id="Status" name="Status" class="form-control"><option value="${k.magaya__Status}" selected="true">${k.magaya__Status}</option></select></td><td class='Name'>${k.Name}</td><td class='magaya__Pieces'>${k.magaya__Pieces}</td><td class='magaya__Length'>${k.magaya__Length}</td><td class='magaya__Height'>${k.magaya__Height}</td><td class='magaya__Width'>${k.magaya__Width}</td><td class="magaya__Weigth">${k.magaya__Weigth}</td><td class="magaya__Volume">${volume}</td></tr>`
                            appendData = `<tr><td class="Delete"><i class="fa fa-trash del-item-warehouse" aria-hidden="true"></i></td><td class="magaya__Status">${k.magaya__Status}</td><td class='Name'>${k.Name}</td><td class='magaya__Pieces'>${k.magaya__Pieces}</td><td class='magaya__Length'>${k.magaya__Length}</td><td class='magaya__Height'>${k.magaya__Height}</td><td class='magaya__Width'>${k.magaya__Width}</td><td class="magaya__Weigth">${k.magaya__Weigth}</td><td class="magaya__Volume">${volume}</td></tr>`
                            $("#table-items tbody").append(appendData);

                        }) //each

                }
            }) //then


})




ZOHO.embeddedApp.init()



//editQuote button
//save changes to Edit
$("#editQuotation").click(function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    idQuote = $("input[name=id]").val();
    //SQuote Update
    var config = {
            Entity: "magaya__SQuotes",
            id: idQuote,
            APIData: {
                id: idQuote,
                "magaya__Shipper": $(":input[name=ShipperName] option:selected").text(),
                //"magaya__Carrier": $("select[name=Carrier]").val(),
                //"magaya__ExpirationDate": expirationDateFinal,
                "magaya__Direction": $(":input[name=Direction]").val(),
                "magaya__TransportationMode": $("select[name=TransportationMode] option:selected").val(),
                "magaya__MethodOfTransportation": $("input[name=TransportationMethod]").val(),
                "magaya__Description": $("#Description").val(),
                "magaya__Service": $("select[name=Service]").val(),
                "magaya__ConsigneeName": $("select[name=ConsigneeName] option:selected").text(),
                //"magaya__ConsigneeName": $("select[name=OtherConsignee] option:selected").text(),
                "magaya__Stage": $("select[name=Stage] option:selected").val(),
                "magaya__Carrier": $("select[name=Carrier] option:selected").val()
            }
        }
        //SQuotes
    $(this).updateRecordCRM(config);

    //selecciono los registros relacionados, para luego borrarlos
    //items
    ZOHO.CRM.API.getRelatedRecords({ Entity: "magaya__SQuotes", RecordID: idQuote, RelatedList: "magaya__SQuote_Name1", page: 1, per_page: 200 })
        .then(function(response) {
            if (!_.isEmpty(response.data)) {
                //borrarlos
                items = response.data;
                $.map(items, function(k) {
                    $(this).deleteData(k.id, "magaya__ItemQuotes")
                })
            }
        })
        .then(function(e){
            items = $(this).tableToJson('table-items', idQuote);

            if (!_.isEmpty(items)) {
                ZOHO.CRM.API.insertRecord({ Entity: "magaya__ItemQuotes", APIData: items, Trigger: [] })
                    .then(function(data) {
                        console.log("Response charges", data.data)
                        res = data.data;
                        $.map(res, function(k, v) {
                            if (k.code !== "SUCCESS") {
                                codeError = k.code;
                                field = k.details.api_name;
                                show = true;
                                module = 'Cargo Items'

                                storeError.dispatch({type: 'ERROR', value: {codeError, show, field, module}})

                            } else {
                                codeError = "";
                                field = "";
                                show = false;
                                module = 'Cargo Items'

                                storeError.dispatch({type: 'SUCCESS', value: {codeError, show, field, module}})

                            }
                        })

                    })
                    .catch(function(error) {
                        dataError = error.data;
                        $.map(dataError, function(k, v) {

                                console.log("Error captado error")
                                errorCode = k.code;
                                field = k.details.api_name;
                                show = true;
                                storeError.dispatch({type: 'ERROR', value: {errorCode, show, field}})

                        })
                    })
            }
        })
        //get table json and insert data


    //charges
    ZOHO.CRM.API.getRelatedRecords({ Entity: "magaya__SQuotes", RecordID: idQuote, RelatedList: "magaya__SQuote_Name0", page: 1, per_page: 200 })
        .then(function(response) {
            if (!_.isEmpty(response.data)) {
                //borrarlos
                charges = response.data;
                $.map(charges, function(k) {
                    $(this).deleteData(k.id, "magaya__ChargeQuote")
                })
            }
        })
        .then(function(e) {
            charges = $(this).tableToJson('table-charges', idQuote);

            if (!_.isEmpty(charges)) {
                ZOHO.CRM.API.insertRecord({ Entity: "magaya__ChargeQuote", APIData: charges, Trigger: [] })
                    .then(function(data) {
                        //conformando el mensaje de respuesta
                        res = data.data;
                        $.map(res, function(k, v) {
                            if (k.code !== "SUCCESS") {
                                console.log("Error captado then")
                                codeError = k.code;
                                field = k.details.api_name;
                                show = true;
                                module = 'Service Items'

                                storeError.dispatch({type: 'ERROR', value: {codeError, show, field, module}})

                               // $("#quote-alert").append(`<p class="alert alert-danger">Error on field charge: Code: ${k.code} on ${k.details.api_name}</p>`)
                            } else {
                                codeError = "";
                                field = "";
                                show = false;
                                module = 'Service Items'

                                storeError.dispatch({type: 'SUCCESS', value: {codeError, show, field, module}})

                            }
                        })

                    })
                    .catch(function(error) {
                        dataError = error.data;
                        $.map(dataError, function(k, v) {

                                console.log("Error captado error")
                                errorCode = k.code;
                                field = k.details.api_name;
                                show = true;
                                storeError.dispatch({type: 'ERROR', value: {errorCode, show, field}})

                                //$("#quote-alert").append(`<p class="alert alert-danger">Error on field charge: Code: ${k.code} on ${k.details.api_name}</p>`)
                        })

                    })
            }
        })
    //get table json and insert data




});



$("#addCharges").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        let accountId = 0;
        let accountName = '';

        var ChargeType = $("#ChargeType").val();
        var DescriptionCharges = $("#DescriptionCharges").val().replace(/[^a-zA-Z0-9]/g, ' ');
        var ChargeText = DescriptionCharges;
        //var ApplyTo = $("select[name=ApplyToAccounts] option:selected").text();

        var Quantity = ($("#Quantity").val() > 0) ? $("#Quantity").val() : 0;
        var Unity = $("#Unity").val() > 0 ? $("#Unity").val() : 0;
        var Price = $("#Price").val() > 0 ? $("#Price").val() : 0;
        Price = roundDec(Price);
        //var Amount = Math.round(Price * 100) / 100;
        var Amount = parseFloat(Quantity) * parseFloat(Price);
        Amount = roundDec(Amount);
        //console.log("cant: " + Quantity + " price: " + Price + " amount: " + Amount);
        var Tax = $("#Tax").val() > 0 ? $("#Tax").val() : 0;
        Tax = roundDec(Tax);
        var CantPlusPrice = parseFloat(Price) + parseFloat(Tax);
        CantPlusPrice = roundDec(CantPlusPrice);

        var TaxPlusAmount = parseFloat(Tax) + parseFloat(Amount);
        TaxPlusAmount = roundDec(TaxPlusAmount);

        var TotalAmount = parseFloat(Tax) + parseFloat(Amount);
        TotalAmount = roundDec(TotalAmount);

        var ChargeCurrency = $("select[name=Currency]").val();
        if (ChargeType != null && ChargeType != "select") {
            content = `<tr><td class="Delete"><i class="fa fa-trash del-item-charge" aria-hidden="true"></i></td>
                <td class="magaya__ChargeCode">${ChargeType}</td>
                <td class="Name">${ChargeText}</td>
                <td class="magaya__Charge_Description">${DescriptionCharges}</td>
                <td class="magaya__CQuantity">${Quantity}</td>
                <td class="magaya__Price">${Price}</td>
                <td class="magaya__Amount">${Amount}</td>
                <td class="magaya__QuanPlusTax">${Tax}</td>
                <td class="NoData">${CantPlusPrice}</td>
                <td class="NoData"></td>
                <td class="magaya__ChargeCurrency">${ChargeCurrency}</td>
                <td class="magaya__GastoOIngreso">${TotalAmount}</td>
                <td class="NoData">${AccountName}</td>
                <td class="magaya__ApplyToAccounts">${AccountId}</td>
                </tr>`;
            //"magaya__ChargeCurrency"
            //magaya__CantImp
            //magaya__QuanPlusTax
            //reset fields
            $("#ChargeType").val('');
            $("#DescriptionCharges").val('');
            $("#ApplyToAccounts").val('');
            $("#Quantity").val('');
            $("#Unity").val('');
            $("#Price").val('');
            $("#Tax").val('');
            $("#Amount").val('');

            $(content).appendTo("#table-charges tbody");
        } else {
            Swal.fire({
                title: 'Error',
                text: "You need to select a charge type!!",
                icon: 'error'
            })
        }


    }) //end click on addCharges




});

async function getMagayaVar(){
    let dataVar = await getMagayaVariables();
    }

</script>

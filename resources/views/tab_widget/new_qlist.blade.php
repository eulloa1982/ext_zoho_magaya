@extends('tab_widget.layout')
@section('content')
<style>
    @media screen and (min-width: 676px) {
        #QuoteForm .modal-dialog {
          max-width: 95%; /* New width for default modal */
        }
        #show-contact-customer .modal-dialog {
          max-width: 75%; /* New width for default modal */
        }

    }

    body {
        background-color: #e5e2e1;
    }

    .carousel-control-prev-icon {
        background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23f02' viewBox='0 0 8 8'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E");
    }

    .carousel-control-next-icon {
        background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23f02' viewBox='0 0 8 8'%3E%3Cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E");
    }
    .carousel-control-prev,
    .carousel-control-next{
          bottom: 95%;
    }

    .carousel-inner{
        width: 96%
    }

    /****desplegable li****/


#menu ul li {
    background-color:#2e518b;
}

#menu ul {
  list-style:none;
  margin:0;
  padding:0;
}

#menu ul a {
  display:block;
  color:#fff;
  text-decoration:none;
  font-weight:400;
  font-size:15px;
  padding:10px;
  font-family:"HelveticaNeue", "Helvetica Neue", Helvetica, Arial, sans-serif;
  text-transform:uppercase;
  letter-spacing:1px;
}

#menu ul li {
  position:relative;
  float:right;
  margin:0;
  padding:0;
}

#menu ul li:hover {
  background:#5b78a7;
}

#menu ul ul {
  display:none;
  position:absolute;
  top:100%;
  left:0;
  padding:0;
}

#menu ul ul li {
  float:none;
  width:150px
}

#menu ul ul a {
  line-height:120%;
  padding:10px 15px;
}

#menu ul li:hover > ul {
  display:block;
}

.left {
display: inline-block;
float:left;
}

.right {
display: inline-block;
margin-left: 15px;
float:left;
}

/**campo de busqueda */
.navbar-form {
    position:absolute;
    right:0px;
    top:0px;
}

/* Definimos las transiciones */
.navbar-form .form-control[type=text] {
    background: transparent;
    display:inline-block;
    transition: all .5s;
}
/* Al situar el puntero en el campo de búsqueda este cambia su color de fondo a blanco, el color de la letra, el borde y la sombra */
.navbar-form .form-control[type=text]:focus {
    background-color: #fff;
    border-color: #729fcf;
    color:#333;
    -webkit-box-shadow: 0 0 5px rgba(109,207,246,.5);
    -moz-box-shadow: 0 0 5px rgba(109,207,246,.5);
    box-shadow: 0 0 5px rgba(109,207,246,.5);
}

/* Para pantallas grandes hacemos que el formulario se despliegue con amplitud ya que disponemos de espacio en la barra de navegación, la busqueda se ejecuta con intro o pinchando en el icono de la lupa */
@media (min-width:1200px) {
    .navbar-form input.form-control[type=text] { width: 160px; }
    .navbar-form input.form-control[type=text]:focus { width: 350px; }
}

/* Para pantallas menores reducimos el campo de busqueda y hacemos que se despliegue cuando hacemos focus sobre el icono de la lupa. La busqueda se ejecuta con intro o pinchando de nuevo en el icono de la lupa */
@media (max-width: 1200px) {
    .navbar-form .form-control[type=text] {
        width:40px;
        position:absolute;
        right:0px;
        z-index:1000;
        padding:8px 12px;
        cursor:pointer;
    }
    .navbar-form,
    .navbar-form div.input-group {
        width:40px;
        height:40px;
    }
    .navbar-form .form-control[type=text]:focus {
        position:absolute;
        right:40px;
        width:250px;
    }
}

/* Para pantallas de smartphones ajustamos el ancho del campo de busqueda */
@media (max-width: 375px) {
    .navbar-form .form-control[type=text]:focus {
        width:150px;
    }
}

.demo, .demo-2 {
    position:relative;
    height:100px;
    width:500px;
}
.demo .form-search, .demo-2 .form-search {
    position:absolute;
    right:0px;
    top:0px;
}
.demo .form-search input[type=text],
.demo-2 .form-search input[type=text] {
    -webkit-appearance: textfield;
    -webkit-box-sizing: content-box;
    font-family: inherit;
    font-size: 100%;
    border: solid 1px #ccc;
    padding: 9px 18px;
    width: 200px;
    -webkit-transition: all .5s;
    -moz-transition: all .5s;
    transition: all .5s;
}
.demo-2 .form-search input[type=text] {
    width:60px;
    position:absolute;
    right:0px;
    z-index:1000;
    padding:8px 12px;
    cursor:pointer;
}
.demo-2 .form-search div.input-group {
    width:60px;
}
.demo .form-search input[type=text]:focus {
    width: 350px;
    background-color: #fff;
}
.demo-2 .form-search input[type=text]:focus {
    position:absolute;
    right:60px;
    width:250px;
}
.demo .form-search button.btn,
.demo-2 .form-search button.btn {
    padding:16px 12px;
    border-top-right-radius:4px;
    border-bottom-right-radius: 4px;
    cursor:not-allowed;
}
.demo-2 .form-search button.btn {
  padding:15px 12px;
}
</style>

<div class="container">
<div class="carousel-inner">


<div id="carouselExampleControls" class="carousel slide" data-interval="false">

    <!-- Quotes -->
    <div class="carousel-item active">

        <div class="row">
        <div class="errores"></div>
            <div class="col-md-6">

            <label><h5 class="list-group-item active">CRM</h5></label>
            <!--div class="send-quote-to-magaya"><i class="fa fa-arrow-circle-right" aria-hidden="true"></i></div-->
            <div class="delete-quote-from-crm"><i class="fa fa-trash" aria-hidden="true"></i></div>
            <i class="fa fa-plus new-quote" data-toggle="modal" data-target="#QuoteForm" aria-hidden="true"></i>
                <ul id="sortable2" class="list-group connectedSortable">
                </ul>
            </div>
            <div class="col-md-6">
                <label><h5 class="list-group-item active">Magaya</h5></label>
            <div class="send-quote-to-crm"><i class="fa fa-arrow-circle-left" aria-hidden="true"></i></div>
                <div class="delete-quote-from-magaya"><i class="fa fa-trash" aria-hidden="true"></i></div>

              <ul id="sortable1" class="list-group connectedSortable">
                </ul>
            </div>
        </div>

    </div>


    <!-- Accounts -->
    <div class="carousel-item">

        <div class="row">
        <div class="col-md-6">

            <label><h5 class="list-group-item active">CRM</h5></label>

            <div class="send-to-magaya"><i class="fa fa-arrow-circle-right" aria-hidden="true"></i></div>
            <div class="delete-from-crm"><i class="fa fa-trash" aria-hidden="true"></i></div>
            <div class="contact"><i class="fa fa-plus" aria-hidden="true"></i></div>

            <ul id="sortable3" class="list-group connectedSortable">
            </ul>
        </div>
        <div class="col-md-6">
            <label><h5 class="list-group-item active">Magaya</h5></label>
            <div class="send-to-crm"><i class="fa fa-arrow-circle-left" aria-hidden="true"></i></div>
            <div class="delete-from-magaya"><i class="fa fa-trash" aria-hidden="true"></i></div>
            <div class="import-all-customers" data-bs-toggle="tooltip" data-bs-placement="right" title="Import all customer to CRM"><i class="fa fa-database" aria-hidden="true"></i></div>


            <ul id="sortable4" class="list-group connectedSortable">
            </ul>
        </div>
        </div>
    </div>



    <!-- Shipments -->
    <div class="carousel-item table-responsive">

        <div class="demo">
            <form class="form-search">
                <div class="input-group">
                <input class="form-control form-text" maxlength="128" placeholder="Buscar" size="15" type="text" id="date_range"/>
                <span class="input-group-btn"><button class="btn btn-primary" id="search_shipment"><i class="fa fa-search fa-lg">&nbsp;</i></button></span>
                </div>
            </form>
        </div>

        <nav>
            <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                <a class="nav-item nav-link active" id="av-air-tab" data-toggle="tab" href="#nav-air" role="tab" aria-controls="nav-air" aria-selected="false">Shipments</a>
            </div>
        </nav>

        <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="nav-air" role="tabpanel" aria-labelledby="nav-air-tab">
                <table class="table table-bordered table-hover table-light table-striped" id="air-shipments">
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Created</th>
                            <th>Shipper Name</th>
                            <th>Description</th>
                            <th>Consignee</th>
                            <th>Carrier</th>
                            <th>Service</th>
                            <th>Status</th>
                            <th>Direction</th>
                            <th>Type</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>


        </div>
    </div>

  </div>
</div>
</div>

<!-- Modal NEw Quote-->
<div class="modal fade" id="QuoteForm" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Quote</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form id="quotation-generic-form">
        <div class="card-body">

            <div class="container">
            <div class="row">
            <!-- Nav Tabs from https://bootsnipp.com/snippets/exE6D -->
                <div class="col-xs-12 ">
                    <nav>
                        <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                            <!--a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Quotation For:</a-->
                            <a class="nav-item nav-link active" id="av-quotationFor-tab" data-toggle="tab" href="#nav-quotationFor" role="tab" aria-controls="nav-quotationFor" aria-selected="false">Quotation From</a>

                            <a class="nav-item nav-link" id="nav-general-tab" data-toggle="tab" href="#nav-general" role="tab" aria-controls="nav-general" aria-selected="false">General</a>
                            <a class="nav-item nav-link" id="nav-routing-tab" data-toggle="tab" href="#nav-routing" role="tab" aria-controls="nav-routing" aria-selected="false">Routing</a>
                            <a class="nav-item nav-link" id="nav-charges-tab" data-toggle="tab" href="#nav-charges" role="tab" aria-controls="nav-charges" aria-selected="false">Charges</a>
                            <!--a class="nav-item nav-link" id="nav-about-tab" data-toggle="tab" href="#nav-about" role="tab" aria-controls="nav-about" aria-selected="false">About</a-->
                        </div>
                    </nav>



                    <div class="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">

                    <div class="tab-pane fade show active" id="nav-quotationFor" role="tabpanel" aria-labelledby="nav-quotationFor-tab">
                        <div class='row'>

                        <div class="card" style="margin:10px 10px 10px 10px; width: 20rem;">
                                <!--img class="card-img-top" src="https://zohomagaya.herokuapp.com/icons/deal.jpg" alt="Card image cap"-->
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



                            <div class="jumbotron"  style="position: relative; margin:10px 10px 10px 10px;">
                                <div class="container">
                                    <div style="position: relative; margin:10px 10px 10px 10px;">
                                        <div class="alert alert-success" id="message" style="position: absolute; left: 30px; top: 80px; z-index: 3; display: none">Select Quote From</div>
                                    </div>
                                    <h1 class="display-4">Quote From</h1>
                                    <p class="lead">Select Account or Deal from the left panel, go to the General Tab</p>
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

                    <!--General Data -->
                    <div class="tab-pane fade" id="nav-general" role="tabpanel" aria-labelledby="nav-general-tab">
                        <div class="row">
                            <!--div class="col-md-2">
                                <div class="form-group">
                                    <label for="Stage">Stage</label>
                                    <select name="Stage" class="form-control"></select>
                                </div>
                            </div-->

                            <div class="col-md-2">
                                <div class="form-group">
                                    <label for="Number">Number</label>
                                    <input type="hidden" name="id" readonly />
                                    <input type="text" name="Name" id="Name" class="form-control" readonly />
                                </div>
                            </div>

                            <div class="col-md-2">
                                <div class="form-group">
                                    <label for="IssuedByName">Issued By</label>
                                    <input type="text" name='IssuedByName' id='IssuedByName' class='form-control' readonly/>
                                </div>
                            </div>

                            <!--div class="col-md-4">
                                <div class="form-group">
                                    <label>Is commerce quotation</label>
                                    <select name='IsCommerceQuotation' id='IsCommerceQuotation' class='form-control'>
                                        <option value='0'>false</option>
                                    </select>
                                </div>
                            </div-->

                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="ExpirationDate">Expiration Date</label>
                                    <input type="text" name="ExpirationDate" id="ExpirationDate" class="form-control" />
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Seller Name</label>
                                    <input name="SellerName" id="SellerName" class="form-control" readonly/>
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="TransportationMode">Transportation Mode</label>
                                    <select name='TransportationMode' id='TransportationMode' class='form-control' />
                                    <option></option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Direction</label>
                                    <select name='Direction' id='Direction' class='form-control'>
                                        <option value='Outgoing'>Out Going</option>
                                        <option value='Incoming'>In comming</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Description of Goods</label>
                                    <textarea name='Description' id='Description' class='form-control'></textarea>
                                </div>
                            </div>
                        </div>


                        <!-- Items Products -->
                        <!-- tipos de paquetes, standares definidos en base a normas de
                        FIATA, IATA, OMC, UN, terminos fijos de todo lo que se importa y exporta-->
                        <!-- variable global e importarla para aca -->

                        <div class='row'>
                        <div class="col-md-12">
                                <div class="form-group" style="width:50%">
                                    <label>Measure System:</label>
                                    <select name='Measure_System' id='Measure_System' class='form-control' >
                                        <!--option value='SI'>International</option-->
                                        <option value='Enlglish'>English</option>
                                    </select>
                                </div>
                            </div>
                        <div class="col-md-1">
                            <label>Pieces</label>
                            <div class="form-group">
                                <input type="numeric" name="Item-Pieces" class='form-control' />
                            </div>
                        </div>

                        <div class="col-md-2">
                            <label>Package</label>
                            <div class="form-group">
                                <select id='select-package' name="select-package" class="form-control">

                                </select>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <label name="Length">Length</label>
                            <div class="form-group">
                                <input type="text" name="Item-Length" id="Item-Length" class='form-control' />
                            </div>
                        </div>

                        <div class="col-md-2">
                            <label name="Height">Height</label>
                            <div class="form-group">
                                <input type="text" name="Item-Height" class='form-control' />
                            </div>
                        </div>

                        <div class="col-md-2">
                            <label name="Width">Width</label>
                            <div class="form-group">
                                <input type="text" name="Item-Width" class='form-control' />
                            </div>
                        </div>

                        <div class="col-md-2">
                            <label name="Weight">Weight</label>
                            <div class="form-group">
                                <input type="text" name="Item-Weight" class='form-control' />
                            </div>
                        </div>

                        <div class="col-md-2">
                            <span class="btn btn-primary btn-sm" id="buton-package">Add</span>
                        </div>

                        </div> <!-- row -->


                        <div class='row'>
                            <div class="modal-body">

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
                                        <!--span id="fields-data"></span-->

                            </div>
                            </div>
                        </div>
                    </div>
                    </form>

                    <!---item cargos tab -->
                    <div class="tab-pane fade" id="nav-charges" role="tabpanel" aria-labelledby="nav-charges-tab">
                        <div class="row">
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label>Charge</label>
                                    <select name='ChargeType' id='ChargeType' class='form-control'>
                                        <option value="select"></option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-md-2">
                                <div class="form-group">
                                    <label>Tax</label>
                                    <input type="text" name='Tax' id='Tax' class='form-control' />
                                </div>
                            </div>

                            <div class="col-md-2">
                                <div class="form-group">
                                    <label>Currency</label>
                                    <select name='Currency' id='Currency' class='form-control'>
                                        <option value='USD'>USD</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-md-2">
                                <div class="form-group">
                                    <label>Description Charges</label>
                                    <input type="text" name='DescriptionCharges' id='DescriptionCharges' class='form-control' />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Apply To</label>
                                    <select name="ApplyToAccounts" id="ApplyToAccounts" class="form-control">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label>Quantity</label>
                                    <input type="text" name='Quantity' id='Quantity' class='form-control' />
                                </div>
                            </div>

                            <div class="col-md-2">
                                <div class="form-group">
                                    <label>Unity</label>
                                    <input type="text" name='Unity' id='Unity' class='form-control' />
                                </div>
                            </div>

                            <div class="col-md-2">
                                <div class="form-group">
                                    <label>Price</label>
                                    <input type="text" name='Price' id='Price' class='form-control' />
                                </div>
                            </div>

                            <div class="col-md-2">
                                <div class="form-group">
                                    <label>Amount</label>
                                    <input type="text" name='Amount' id='Amount' class='form-control' readonly/>
                                </div>
                            </div>

                        </div>

                        <div class="col-md-10">
                        <h4 class="mb-3"><a class="btn btn-success btn-sm float-left" id="addCharges">Add <i class="fa fa-plus"></i></a></h4>
                        <br />
                        <div class="card-body">

                        <div class="table-responsive">
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
                    </div>

                    <!-- routing tab -->
                    <div class="tab-pane fade" id="nav-routing" role="tabpanel" aria-labelledby="nav-routing-tab">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Carrier</label>
                                    <select name='Carrier' id='Carrier' class='form-control'>
                                        <option value="select"></option>
                                     </select>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Service</label>
                                    <select name='Service' id='Service' class='form-control'>
                                        <option value="PortToPort">PortToPort</option>
                                        <option value="PortToDoor">PortToDoor</option>
                                        <option value="DoorToDoor">DoorToDoor</option>
                                        <option value="DoorToPort">DoorToPort</option>
                                   </select>
                                </div>
                            </div>

                            <!--div class="col-md-6">
                                <div class="form-group">
                                    <label>Transportation Method</label>
                                    <input type='text' name='TransportationMethod' class='form-control' readonly />
                                </div>
                            </div-->


                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Shipper</label>
                                    <select name='ShipperName' id='Shipper' class='form-control' >
                                        <option></option>
                                    </select>
                                </div>
                            </div>

                           <div class="col-md-6">
                                <div class="form-group">
                                    <label>Consignee Name</label>
                                    <select name="ConsigneeName" id="ConsigneeName" class="form-control">
                                        <option></option>
                                    </select>
                                </div>
                            </div>

                        </div><!-- div row -->
                    </div><!-- div pane -->

                    <!--div class="tab-pane fade" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
                      Et et consectetur ipsum labore excepteur est proident excepteur ad velit occaecat qui minim occaecat veniam. Fugiat veniam incididunt anim aliqua enim pariatur veniam sunt est aute sit dolor anim. Velit non irure adipisicing aliqua ullamco irure incididunt irure non esse consectetur nostrud minim non minim occaecat. Amet duis do nisi duis veniam non est eiusmod tempor incididunt tempor dolor ipsum in qui sit. Exercitation mollit sit culpa nisi culpa non adipisicing reprehenderit do dolore. Duis reprehenderit occaecat anim ullamco ad duis occaecat ex.
                    </div-->
                  </div>

                </div><!-- div class col -->
            </div> <!-- div row -->

            </div><!-- div container -->
        </div>


      </div>
      <div class="modal-footer">
        <div class="alert alert-danger" id="quote-alert" style="display: none;"></div>
        <button id='sendQuote' class="btn btn-primary">Save</button>
        <button id='editQuote' class="btn btn-primary">Save Changes</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>


<!----- modal form ----->
<!-- div class card body -->

<!----- modal view quotation pdf ---->
<!-- modal form edit-->
<div class="modal fade" id="show-quote-id" role="dialog" style="overflow-y: scroll;">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">

                <div id="toPdf" class="btn btn-primary">Pdf</div>
                <div class="alert alert-success" id="message-pdf" style="position: absolute; left: 30px; top: 80px; z-index: 3; display: none"></div>

                <!--button type="button" class="btn btn-primary" >PDF</button-->
            </div>

            <div class="modal-body">
            <div class="container-fluid">
            <form id="show-quote">
            <!-- personal data -->
            <div class="card-body">
             <div class="loading"></div>
            <div id="htmlToPdf">
            <table width="100%" cellpadding="5px">
            <tbody>
                <tr>
                    <td></td>
                    <td style="text-align:right; float: right;vertical-align: top;">
                        <h1 style="font-size: 30px;">Quotation</h1>
                    </td>
                </tr>
                <tr>
                    <td width="50%">
                        <table id="contact_info" width="100%">
                            <tbody>

                            </tbody>
                        </table>
                    </td>
                    <td width="50%">
                        <table id="quotation_data" cellpadding="2px" cellspacing="0px" style="margin: 0px auto; width: 100%; border: none; vertical-align: top;">
                            <tbody>

                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <table id="destination_data" cellspacing="0px" cellpadding="5px" width="100%" style="margin: 0px auto; width: 100%; border: none; vertical-align: top;">
                            <tbody>

                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td colspan="12">
                        <table id="head" cellspacing="0px" cellpadding="5px" width="100%" style="margin: 0px auto; width: 100%; border: none; vertical-align: top;">
                            <thead>

                            </thead>
                        </table>

                        <table id="items" cellspacing="0px" cellpadding="5px" width="100%" style="margin: 0px auto; width: 100%; border: none; vertical-align: top;">
                            <thead>

                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td colspan="12">
                        <table id="charges" cellspacing="0px" cellpadding="5px" width="100%" style="margin: 0px auto; width: 100%; border: none; vertical-align: top;">
                            <thead>

                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td colspan="12">
                        <table id="notes" cellspacing="0px" cellpadding="5px" width="100%" style="margin: 0px auto; width: 100%; border: none; vertical-align: top;">
                            <tbody>

                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>Signature: ___________________</td>
                    <td></td>
                </tr>
            </tbody>
        </table>



            <!--    <div class="table-responsive">
                -- genral data --
                <table class="table table-bordered table-sm">
                    <tr style="background-color: #e6e6e6;"><td rowspan="5">Organization Data, Logo, Address</td>
                    <td>No</td><td></td></tr>
                    <tr><td>Stage</td><td><input type="text" class="no-border" name="magaya__Stage" readonly/></td></tr>
                    <tr><td>Creation Time</td><td></td></tr>
                    <tr><td>Expiration Date</td><td></td></tr>
                    <tr><td>Issued By</td><td></td></tr>
                </table>

               </div>-->


            <!-- applicable charges -->
            <!--<div class="card-body">
                <div class="table-responsive">
                    <table id="charges" class='table table-hover table-bordered table-sm'>
                        <thead style="background-color: #e6e6e6; font-color=grey">
                    <th colspan="10">Applicable Charges</th>
                    </thead>
                    <thead>
                    <th colspan="5" >Notes</th><th>Description</th><th>Quantity</th><th>Price</th><th>Amount</th>
                    </thead>
                    <tbody></tbody>
                    </table>

                    <table id="items" class='table table-hover table-bordered table-sm'>
                    <thead style="background-color: #e6e6e6; font-color=grey">
                        <th colspan="10">Cargo Items</th>
                    </thead>
                    <thead><th>Pieces</th><th>Package</th><th>Dimensions</th><th>Weight</th><th>Volume</th></thead>
                    <tbody>
                    </tbody>
                    </table>
                </div>

            </div>-->


                            <!-- client data -->
             <!--   <table class="table table-sm caption-top">
                    <caption>Client Details</caption>
                    <thead>
                    <tr><th colspan="4" style="background-color: #e6e6e6; font-color=grey">Client Details</th></tr>
                    </thead>
                        <tbody>
                            <tr><td>Client</td><td><input type="text" name="magaya__ContactName" class="no-border" readonly/></td></tr>
                            <tr><td>Email</td><td><input type="text" name="magaya__ContactEmail" class="no-border" /></td></tr>
                            <tr><td>Mobile</td><td><input type="text" name="magaya__ContactMobile" class="no-border" /></td></tr>
                            <tr><td>Contact Phone</td><td><input type="text" name="magaya__ContactPhone" class="no-border" /></td></tr>
                            <tr><td>Quote Description</td><td><input type="text" name="magaya__Description" class="no-border" /></td></tr>
                        </tbody>
                </table>
                <table class='table'>
                        <tr style="background-color: #e6e6e6; font-color=grey">
                            <td colspan="3" width="50%">Signature</td><td colspan="3">Notes</td>
                        </tr>
                        <tr><td colspan="5" rowspan="5"></td></tr>
                    </table>

            -->
            </div>

            </div>
            </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" id="cancel" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
</div>

<!----- modal show contacts and customers info ------>
<div class="modal fade" id="show-contact-customer" role="dialog" style="overflow-y: scroll;">
    <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">

            <div class="modal-body">

                <div class="container-fluid">

                    <div class="left">
                        <button type="button" class="btn btn-primary">
                            Accounts <span class="badge badge-light">CRM</span>
                        </button>
                        <div class="table-responsive">
                            <div id="account">

                            </div>
                        </div>
                    </div>

                    <div class="right">
                        <button type="button" class="btn btn-primary">
                        Customers <span class="badge badge-light">Magaya</span>
                        </button>
                        <div class="table-responsive">
                        <div id="customer">

                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" id="cancel" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<!----- modal edit Accounts ------>
<div class="modal fade" id="edit-contact" role="dialog" style="overflow-y: scroll;">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
            </div>

            <div class="modal-body">
            <div class="container-fluid">
            <!-- personal data -->
            <div class="card-body" id="form-contact">
            <form id="account-form">
            <div class='row'>
                <div class='col-lg-4'>
                    <legend>Created Time</legend>
                    <input class="form-control" name="Created_Time" readonly />
                </div>
                <div class='col-lg-4'>
                    <legend>Last Activity Time</legend>
                    <input class="form-control" name="Last_Activity_Time" readonly />
                </div>
                <input type='hidden' class="form-control" name="id" />
            </div>
            <div class='row'>
                <legend>Account Details</legend>
                <div class='col-lg-4'>
                    <legend>Name</legend>
                    <input class="form-control" name="Account_Name" />
                </div>
                <div class='col-lg-4'>
                    <legend>Description</legend>
                    <input class="form-control" name="Description" />
                </div>
                <div class='col-lg-2'>
                    <legend>Phone</legend>
                    <input class="form-control" name="Phone" />
                </div>
                <div class='col-lg-4'>
                    <legend>Website</legend>
                    <input class="form-control" name="Website" />
                </div>
                <div class='col-lg-4'>
                    <legend>Type</legend>
                    <input class="form-control" name="Account_Type" />
                </div>
                <div class='col-lg-2'>
                    <legend>Number</legend>
                    <input class="form-control" name="Account_Number" />
                </div>
                <div class='col-lg-4'>
                    <legend>Site</legend>
                    <input class="form-control" name="Account_Site" />
                </div>
                <div class='col-lg-4'>
                    <legend>Annual Revenue</legend>
                    <input class="form-control" name="Annual_Revenue" />
                </div>
                <div class='col-lg-4'>
                    <legend>Industry</legend>
                    <input class="form-control" name="Industry" />
                </div>

            </div>
            <div class='row'>
                <legend>Billing Address</legend><br />
                <div class="col-lg-4">
                    <legend>Billing City</legend>
                    <input class="form-control" name="Billing_City" />
                </div>
                <div class="col-lg-4">
                    <legend>Billing Code</legend>
                    <input class="form-control" name="Billing_Code" />
                </div>
                <div class="col-lg-4">
                    <legend>Billing Country</legend>
                    <input class="form-control" name="Billing_Country" />
                </div>
                <div class="col-lg-4">
                    <legend>Billing State</legend>
                    <input class="form-control" name="Billing_State" />
                </div>
                <div class="col-lg-4">
                    <legend>Billing Street</legend>
                    <input class="form-control" name="Billing_Street" />
                </div>
            </div>
            <div class='row'>
            <div class="col-lg-12">
                <nav id="menu">
                    <ul>
                    <li><a>Copy Address</a>
                        <ul>
                            <li><a class="addresstoshipping">Billing to Shipping</a></li>
                            <li><a class="shippingtoaddress">Shipping to Billing</a></li>
                        </ul>
                    </li>
                    </ul>
                </nav>
            </div>
            </div>
            <div class="row"></div><br /><br />

            <div class='row'>
                <legend>Shipping Address</legend>
                <div class="col-lg-4">
                    <legend>Shipping City</legend>
                    <input class="form-control" name="Shipping_City" />
                </div>
                <div class="col-lg-4">
                    <legend>Shipping Code</legend>
                    <input class="form-control" name="Shipping_Code" />
                </div>
                <div class="col-lg-4">
                    <legend>Shipping Country</legend>
                    <input class="form-control" name="Shipping_Country" />
                </div>
                <div class="col-lg-4">
                    <legend>Shipping State</legend>
                    <input class="form-control" name="Shipping_State" />
                </div>
                <div class="col-lg-4">
                    <legend>Shipping Street</legend>
                    <input class="form-control" name="Shipping_Street" />
                </div>

            </div>
            <div class='row'>
                <legend>Magaya Details</legend>
                <div class="col-lg-4">
                    <legend>Email</legend>
                    <input class="form-control" name="magaya__MagayaEmail" />
                </div>
                <div class="col-lg-4">
                    <legend>Magaya GUID</legend>
                    <input class="form-control" name="magaya__MagayaGUID" readonly/>
                </div>
            </div>
            </form>
            </div>
        <div class="modal-footer">
                <button type="button" class="btn btn-secondary" id="cancel" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="new-account" data-dismiss="modal">Save</button>
                <button type="button" class="btn btn-primary" id="edit-account" data-dismiss="modal">Save Changes</button>
            </div>
    </div>
</div>
</div></div></div>


@stop
@section('js')
<script src="{{ url('js/biblio.jquery3.js') }}"></script>
<script src="{{ url('js/quotation2.js') }}"></script>
<script src="{{ url('js/shipments2.js') }}"></script>

<script src="{{ url('js/contacts2.js') }}"></script>
<script src="{{ url('js/quotation_utils2.js') }}"></script>
<script src="{{ url('js/utils_cookies.js') }}"></script>


<script>
$(document).ready(function(){
    $('#date_range').daterangepicker(
        {"locale": {
            "format": "YYYY-MM-DD",
        }})


    accounts = [];
    deals = [];
    dealData = [];
    contacts = [];
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
    //var photo_id = 0;
    let dataVar = getMagayaVar()
    console.log("Getting data from cookies add newquote")

    ZOHO.CRM.CONFIG.getOrgInfo().then(function(data){
        organizationInfo = data.org;
        photo_id = organizationInfo[0]["photo_id"];
        return photo_id
    }).then(function(a) {
        var config = {
            id:a
            }

        //ZOHO.CRM.API.getFile(config).then(function (data) {
        //});
    })

    //QT
    drawQuotationMagaya();
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
                k.Name = sanitize(k.Name)
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

    //get all records of the given module
    /*ZOHO.CRM.API.getAllRecords({Entity: "Contacts", sort_order: "asc"})
        .then(function(response){
            if (!_.isEmpty (response.data)) {
                $.map (response.data, function (k, i){
                    //$("<option value='"+k.id+"'>"+k.Full_Name+"</option>").appendTo("#ApplyTo");
                    //$("<option value='"+k.Full_Name+"'>"+k.Full_Name+"</option>").appendTo("#ConsigneeName");
                    //contacts.push(k);
                })
            }
        })

    ZOHO.CRM.API.getAllRecords({Entity: "Accounts", sort_order: "asc"})
        .then(function(response){
            $.map (response.data, function (k, i) {
                //accounts.push(k);
                var accountId = k.id;
                $("<option value='"+k.id+"'>"+k.Account_Name+"</option>").appendTo("select[name=quotation-for-accounts]");
                $("<option value='"+k.id+"'>"+k.Account_Name+"</option>").appendTo("select[name=ShipperName]");
                $("<option value='"+k.id+"'>"+k.Account_Name+"</option>").appendTo("select[name=ConsigneeName]");
                //prueba, borrar
                //$("<option value='"+k.id+"'>"+k.Account_Name+"</option>").appendTo("select[name=OtherConsignee]");

            })
        })*/

    //get all records of the given module
    ZOHO.CRM.API.getAllRecords({Entity: "Deals", sort_order: "asc"})
        .then(function(response){
            $.map (response.data, function (k, i) {
                k.Deal_Name = sanitize(k.Deal_Name)
                deals.push(k);
                $("<option value='"+k.id+"'>"+k.Deal_Name+"</option>").appendTo("select[name=quotation-for-deals]");
            })
        })

    //get all transports methods
    ZOHO.CRM.API.getAllRecords({Entity: "magaya__TransportationMethods", sort_order: "asc"})
        .then(function(response){
            $.map (response.data, function (k, i) {
                k.Name = sanitize(k.Name)
                $("<option value='"+k.id+"'>"+k.Name+"</option>").appendTo("#TransportationMode");
                transpMethods.push (k);
            })
        })


    //stage quote
    ZOHO.CRM.API.getAllRecords({Entity: "magaya__Charges_Type", sort_order: "asc"})
        .then(function (response) {
            console.log(response)
            if (!_.isEmpty (response.data)) {
                $.map(response.data, function (k, i) {
                    //get just Income charges (AccountDefinition Type)
                    //if (k.magaya__AccountDefinitionType === "Income") {
                        k.magaya__ChargesCode = sanitize(k.magaya__ChargesCode)
                        k.Name = sanitize(k.Name)
                        $(`<option value="${k.magaya__ChargesCode}">${k.Name}</option>`).appendTo("select[name=ChargeType]");
                    //}

                })
            }
        })

    //get SQuotes from CRM
    drawQuotationCRM();
    //draw Contacts
    drawContactsCRM();

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
                    $("#message").html(`Great!!! Go to the General Tab to continue the proccess`).css("display", "inline").fadeIn("slow").delay(3000).fadeOut("slow");

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
                        k.Account_Name.name = sanitize(k.Account_Name.name)
                        $("<option value='"+k.Account_Name.id+"'>"+k.Account_Name.name+"</option>").appendTo("select[name=ContactName]");

                        ZOHO.CRM.API.getRelatedRecords({ Entity: "Accounts", RecordID: k.Account_Name.id, RelatedList: "Contacts", page: 1, per_page: 200 })
                        .then(function(response) {
                            if (!_.isEmpty(response.data)){
                                var contact = response.data;
                                $.each(contact, function (k, v) {
                                    v["Full_Name"] = sanitize(v["Full_Name"])
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

}); //jQuery


//////////////////////////////////////////////////////////////////////////
///////////   draw accounts and customer with same magaya GUID
//////////////////////////////////////////////////////////////////////////
function drawTableSameRecords(account, customer) {

    var account_order = [];
    var customer_order = [];
    //add field here to show in table, in order
    account_order.push("Account_Name", "magaya__MagayaEmail", "Phone", "Account_Number", "Account_Site", "Billing_Street", "Billing_City", "Billing_State", "Billing_Country", "Billing_Code", "Account_Type", "Industry", "Created_Time")
    customer_order.push("Name", "Email", "Phone", "AccountNumber", "Website", "BillingAddress", "CreatedOn")

    var tabla = document.createElement("table");
    var tblBody = document.createElement("tbody");
    var body = $("#account");

    //exists account
    if (_.isObject(account)) {
        var i = 0;
        $.each(account_order, function(k, v) {
            var hilera = document.createElement("tr");
            var celda = document.createElement("td");
            var textoCelda = document.createTextNode(v);
            var celda2 = document.createElement("td");
            textoCelda2 = document.createTextNode(account[v]);
            celda.appendChild(textoCelda);
            celda2.appendChild(textoCelda2);
            hilera.appendChild(celda);
            hilera.appendChild(celda2);

            tblBody.appendChild(hilera);

        })

        tabla.appendChild(tblBody);
        tabla.setAttribute("border", "3");
        tabla.setAttribute("class", "table table-striped")

    } else {
        tabla = '<div class="alert alert-danger" role="alert">Similar account not found on CRM</div>';
    }

    $("#account").append(tabla);

    var tablaCustomer = document.createElement("table");
    var tblBodyCustomer = document.createElement("tbody");
    if (_.isObject(customer)){
        $.each(customer_order, function(k, v) {

            if (!_.isObject(customer[v])) {
                var hileraCustomer = document.createElement("tr");
                var celdaCustomer1 = document.createElement("td");
                var textoCeldaCustomer1 = document.createTextNode(v);
                var celdaCustomer2 = document.createElement("td");
                textoCeldaCustomer2 = document.createTextNode(customer[v]);
                celdaCustomer1.appendChild(textoCeldaCustomer1);
                celdaCustomer2.appendChild(textoCeldaCustomer2);
                hileraCustomer.appendChild(celdaCustomer1);
                hileraCustomer.appendChild(celdaCustomer2);

                tblBodyCustomer.appendChild(hileraCustomer);
            } else {
                $.each(customer[v], function(k, y) {
                    var hileraCustomer = document.createElement("tr");
                    var celdaCustomer1 = document.createElement("td");
                    var textoCeldaCustomer1 = document.createTextNode(`${v} / ${k}`);
                    var celdaCustomer2 = document.createElement("td");
                    textoCeldaCustomer2 = document.createTextNode(y);
                    celdaCustomer1.appendChild(textoCeldaCustomer1);
                    celdaCustomer2.appendChild(textoCeldaCustomer2);
                    hileraCustomer.appendChild(celdaCustomer1);
                    hileraCustomer.appendChild(celdaCustomer2);

                    tblBodyCustomer.appendChild(hileraCustomer);
                })

            }
        })

        tablaCustomer.appendChild(tblBodyCustomer);
        tablaCustomer.setAttribute("border", "3");
        tablaCustomer.setAttribute("class", "table table-striped")
    } else {
        tablaCustomer = '<div class="alert alert-danger" role="alert">Similar customer not found on Magaya</div>'
    }
        $("#customer").append(tablaCustomer);

    }


    async function getMagayaVar(){
        let dataVar = await getMagayaVariables();
    }

</script>
    @stop



    <div class="modal fade" id="show-shipment">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Shipments Details</h5>
            </div>

            <div class="modal-body">
            <div class="row">
            <div class="card-body">
                <span id="shipment-general"></span>
            </div>
            </div>
            <div class="card-body">

            <div class="row">

                <div class="col-md-6">
                    <h5>Carrier Info</h5>
                    <div id="carrier-data" class="col-md-6"></div>
                </div>
                <div class="col-md-6">
                    <h5>Consignee Info</h5>
                    <div id="consignee-data" class="col-lg-9"></div>
                </div>
                <div class="col-md-6">
                    <h5>Billing Client</h5>
                    <div id="billing-data" class="col-lg-9"></div>
                </div>
            </div>
            </div>

            <div class="card-body">
            <h5 class="card-title">Cargo Items</h5>
                <div class="table-responsive">
                    <table id="cargo-shipment" class='table'><thead>
                        <th>Status</th>
                        <th>Pieces</th>
                        <th>Package Name</th>
                    </thead>
                    <tbody></tbody>
                    </table>
                </div>
            </div>


            <div class="card-body">
            <h5 class="card-title">Service Items</h5>
                <div class="table-responsive">
                    <table id="charges-shipment" class='table'><thead>
                        <th>Status</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Price in Currency</th>
                        <th>Apply To</th>
                    </thead>
                    <tbody></tbody>
                    </table>
                </div>
            </div>

            <div class="card-body">
                <div class="row">
                <div class="col-md-6">
                    <h5>Origin Port</h5><span id='origin-port'></span>
                </div>
                <div class="col-md-6">
                    <h5>Destination Port</h5><span id='destination-port'></span>
                </div>
                </div>
            </div>

            <div class="card-body">
                <div class="row">
                <div class="col-md-6">
                    <h5>Estimated Arrival Date</h5><span id='estimatedArrivalDate'></span>
                </div>
                <div class="col-md-6">
                    <h5>Estimated Departured Date</h5><span id='estimatedDepartureDate'></span>
                </div>
                </div>
            </div>


            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" id="cancel" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

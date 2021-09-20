@extends('base_listmquote')
@section('main')
<style>
    table{
        table-layout: fixed;
        width: 100%;
    }

    th, td {
        border: 1px solid blue;
        max-width: 200px;
        word-wrap: break-word;
        /*width: 1% !important;*/
    }

</style>


<div class="panel-search" id="panel-search">
    <div class="panel">
        <span class="material-icons close cursor-hand" data-close="panel-search">close</span>


        <div id="search">

            <table id="quote-search"><tr><th></th><th>Number</th><th>Cient</th><th>Amount</th><th>Modified Time</th></tr>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
</div>


    <div class="row">
		<div class="col-md-12">
			<div class="container-fluid" style="margin-top: 20px; padding: 0px;">
				<div class="card">
					<div class="card-header" style="padding: 0px;background-color: #0b3355;border-color:#0b3355;">

                    <div class="row">
							<div class="col-md-3" style="padding: 5px 0px;">
								<p style="color: white; font-weight: bold; font-size: 24px;padding-left: 20px;margin:0px">List mQuote</p>
							</div>
							<div class="col-md-7" style="padding: 5px 0px;">
								<form class="form-inline my-2 my-lg-0">
									<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" style="margin-left:-100px;">
									<span class="input-group-btn"><span class="btn btn-primary" id="search-by-name"><span class="material-icons">search</span></span></span>
								</form>
							</div>



                                    <div class="col-md-2" style="padding: 5px 0px;">
								 		<div class="btn-group">
									 		<button type="button" class="btn btn-primary addMquote" style="margin-right: 20px; font-weight: bold;">Add</button>

			 								<button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown">
                                            <span class="material-icons">more_horiz</span>
			  								</button>
											<div class="dropdown-menu">
												<!--a class="dropdown-item">Mass Update</a-->
												<a class="dropdown-item" id="deleteMquote">Mass Delete</a>
											</div>

								 		</div>

									</div>


								</div>
							</div>
							<div class="card-body">
								<div class="table-responsive">
									<table class="table table-bordred table-striped" id="table-quotes" width="100%" cellspacing="0">
										<thead>
											<tr style="text-transform:uppercase;font-weight: bold;">
												<td width="8%">Edit</td>
												<td width="18%">Number</td>
												<td width="18%">Customer</td>
												<td width="18%">Stage</td>
												<td width="18%">Amoumt</td>
												<td width="18%">Modify Time</td>
											</tr>
										</thead>
										<tbody>
												<tr>
													<td>
														<p data-placement="top" data-toggle="tooltip" title="Edit" style="padding:0px;margin:0px">
															<button class="btn btn-primary btn-xs btn-prin" data-title="Edit" data-toggle="modal" data-target="#edit" ><span class="glyphicon glyphicon-pencil"></span></button>
															<button class="btn btn-danger btn-xs btn-prin" data-title="Delete" data-toggle="modal" data-target="#delete" ><span class="glyphicon glyphicon-remove"></span></button>
														</p>
													</td>
													<td style="vertical-align: middle;"></td>
													<td style="vertical-align: middle;"></td>
													<td style="vertical-align: middle;"></td>
													<td style="vertical-align: middle;"></td>
													<td style="vertical-align: middle;"></td>
												</tr>
										</tbody>
									</table>
								</div>

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

<!-- Edit Modal HTML -->
<div id="mquoteModal" class="modal fade" id="edit" tabindex="-10" role="dialog" aria-labelledby="edit" aria-hidden="true" data-backdrop="static" data-keyboard="false">
			<div class="modal-dialog">
				<div class="modal-content">

					<div class="modal-header" style="background: #0b3355;color: white;">
						<h4 class="modal-title custom_align" style="font-weight: bold;" id="Heading">Edit mQuote</h4>
						<button type="button" class="close cerrar-modal" aria-hidden="true"><span class="material-icons">highlight_off</span></button>

					</div>
					<div class="modal-body">
                        <!--------------------------->
                        <!-- panel editing----------->
                        <div id="panel">
                            <div class="panel">
                                <span class="material-icons close cursor-hand" data-close="panel">close</span>


                            <fieldset class="fieldset"><legend class="legend">Item</legend>
                                <form class="edit-record">
                                <div id="info-datad"></div>
                                </form>
                            </fieldset>

                            </div>
                        </div>
                        <!-- end panel editing ------>
                        <!---------------------------->

						<div class="container" style="max-width:100%">
							<nav>
								<div class="nav nav-tabs" id="nav-tab" role="tablist">
									<a class="nav-link active" id="nav-home-tab" data-toggle="tab" href="#menu5" role="tab" aria-controls="nav-home" aria-selected="true">Customer</a>
									<a class="nav-link" id="nav-profile-tab" data-toggle="tab" href="#menu1" role="tab" aria-controls="nav-profile" aria-selected="false">General</a>
									<a class="nav-link" id="nav-contact-tab" data-toggle="tab" href="#menu3" role="tab" aria-controls="nav-contact" aria-selected="false">Routing</a>
									<a class="nav-link" id="nav-contact-tab" data-toggle="tab" href="#menu2" role="tab" aria-controls="nav-contact" aria-selected="false">Charges</a>
									<a class="nav-link" id="nav-contact-tab" data-toggle="tab" href="#menu4" role="tab" aria-controls="nav-contact" aria-selected="false">Items</a>
							  </div>
							</nav>
						  	<!-- ACA SE DEFINE PARA CADA TAB SU CONTENIDO -->
							<div class="tab-content" id="nav-tabContent">
                                <!------------------------------------------------------------->
                                <!----- tab general -------------------------->
                                <!------------------------------------------------------------->
                                <div class="tab-pane fade" id="menu1" role="tabpanel" aria-labelledby="menu1-tab" style="min-height: 600px;">
									<div class="row" style="margin-bottom:20px;margin-top: 20px;">
										<div class="col-md-2">
											<label class="col-md-12" style="font-weight: bold;">Number</label>
											<input type="text" name="Name" id="NameQuote" class="form-control no-border" placeholder="Quote Number" />
										</div>
										<div class="col-md-2">
											<label class="col-md-12" style="font-weight: bold;">Issued By</label>
                                            <input type="text" name='magaya__IssuedByName' class='form-control' readonly/>

										</div>
										<div class="col-md-4">
											<label class="col-md-12" style="font-weight: bold;">Expiration Date</label>
                                            <input type="text" name="magaya__ExpirationDate" class="form-control no-border" />
										</div>
										<div class="col-md-4">
											<label class="col-md-12" style="font-weight: bold;">Seller Name</label>
                                            <input name="magaya__SellerName" class="form-control" readonly/>
										</div>
									</div>
									<div class="row" style="margin-bottom:10px; margin-top: 30px;">
										<div class="col-md-4">
											<label class="col-md-12" style="font-weight: bold;">Trasnportation Mode</label>
                                            <select name='magaya__TransportationMode' class='form-control no-border' />
                                                <option></option>
                                            </select>

										</div>
										<div class="col-md-4">
											<label class="col-md-12" style="font-weight: bold;">Direction</label>
                                            <select name='magaya__Direction' class='form-control no-border'>
                                                <option value='Outgoing'>Out Going</option>
                                                <option value='Incoming'>In comming</option>
                                            </select>

										</div>
										<div class="col-md-4">
											<label class="col-md-12" style="font-weight: bold;">Description of Goods</label>
											<div class="form-group">
                                                <textarea rows="2" name='magaya__Description' id='magaya__Description' class='form-control no-border'></textarea>
											</div>
										</div>
									</div>
									<div class="row" style="margin-bottom:25px;">
										<div class="col-md-4">
											<label class="col-md-12" style="font-weight: bold;">Stage</label>
                                            <select name="magaya__Status" class="form-control no-border">
                                                <option value="Draft">Draft</option>
                                                <option value="Done">Done</option>
                                                <option value="Sent">Sent</option>
                                                <option value="Acepted">Acepted</option>
                                                <option value="Refused">Refused</option>
                                            </select>
                                        </div>

                                        <div class="col-md-4">
                                            <label class="col-md-12" style="font-weight: bold;">Origin</label>
                                            <input type="text" name="magaya__Origin" class="form-control"/>
                                        </div>

                                        <div class="col-md-4">
                                            <label class="col-md-12" style="font-weight: bold;">Destination</label>
                                            <input type="text" name="magaya__Destination" class="form-control" />
                                        </div>

									</div>
								</div>
                                <!------------------------------------------------------------->
                                <!-- end tab general -->
                                <!------------------------------------------------------------->

                                <!------------------------------------------------------------->
                                <!-- tab charges -->
                                <!------------------------------------------------------------->
								<div class="tab-pane fade" id="menu2" role="tabpanel" aria-labelledby="menu2-tab" style="min-height: 600px;">

                                    <label class="btn btn-sm btn-primary float-right open-panel" data-panel="panel-charge" for="btnControl" style="background-color: #0b3355; float: rigth;">Add Charge</label>
                                    <!---- wrapper for new charge form-->
                                    <div class="panel-charge" id="panel-charge">
                                        <div class="panel">
                                            <span class="material-icons close cursor-hand" data-close="panel-charge">close</span>

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
                                                                <option value="select"></option>
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

                                                    <!--div class="col-md-4">
                                                        <span>Tax Amount</span>
                                                            <div class="input-group">
                                                                <input type="text" name='TaxAmount' class='form-control'readonly/>
                                                            </div>
                                                    </div-->
                                                </div>


											</fieldset>

                                                <!--div class="row">
                                                    <--div class="col-md-2">
                                                    <span>Amount</span>
                                                        <div class="input-group">
                                                            <input type="text" name='Amount' id='Amount' class='form-control' readonly/>
                                                        </div>
                                                    </div->
                                                </div-->
                                                <div class="col-md-12" style="padding: 0px;">
                                                        <p style="width: 100%;text-align: right;">
                                                            <button id='sendCharges' for-table='#item-charges' class="btn btn-primary" style="background-color: #0b3355">Add Charge</button>
                                                            <button id='newCharges' for-table='#item-charges' class="btn btn-primary" style="background-color: #0b3355">Add Charge</button>
                                                        </p>
                                                    </div>
                                            </div>

                                        </div>




                                    <div class="table-responsive">
                                        <div id="info-charge"></div>
                                        <table id="table-charges" class="table table-bordered table-striped">
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

                                    <div class="table-responsive">
                                        <table id="table-charges-new" class="table table-bordered table-striped">
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
                                <!------------------------------------------------------------->
                                <!-- end tab charges -->
                                <!------------------------------------------------------------->

                                <!------------------------------------------------------------->
                                <!-- tab routing -->
                                <!------------------------------------------------------------->
								<div class="tab-pane fade" id="menu3" role="tabpanel" aria-labelledby="menu3-tab">
									<div class="row" style="margin-bottom:20px; margin-top:20px;">
										<div class="col-md-6">
											<label class="col-md-12" style="font-weight: bold;">Service Type</label>
											<select name='Service' id='Service' class='form-control'>
                                                <option value="PortToPort">PortToPort</option>
                                                <option value="PortToDoor">PortToDoor</option>
                                                <option value="DoorToDoor">DoorToDoor</option>
                                                <option value="DoorToPort">DoorToPort</option>
                                            </select>
										</div>
										<div class="col-md-6">
											<label class="col-md-12" style="font-weight: bold;">Mode of Transportation</label>
											<select id="Sel2" class="form-control">
												<option>2 - UNO</option>
												<option>2 - DOS</option>
												<option>2 - TRES</option>
												<option>2 - CUATRO</option>
												<option>2 - CINCO</option>
											</select>
										</div>
									</div>

									<div class="row" style="margin-bottom:20px; margin-top:20px;">
										<div class="col-md-6">
											<label class="col-md-12" style="font-weight: bold;">Main Carrier</label>
											<select name='magaya__Carrier' id='Carrier' class='form-control'>
                                                <option value="select"></option>
                                            </select>
										</div>

										<div class="col-md-6">
											<label class="col-md-12" style="font-weight: bold;">Route</label>
											<select id="Sel2" class="form-control">
												<option>2 - UNO</option>
												<option>2 - DOS</option>
												<option>2 - TRES</option>
												<option>2 - CUATRO</option>
												<option>2 - CINCO</option>
											</select>
										</div>
									</div>
									<hr>

									<div class="row" style="margin-bottom:20px; margin-top:20px;">
										<div class="col-md-6">
											<label class="col-md-12" style="text-align: center; font-weight: bold;">Origin</label>
										</div>
										<div class="col-md-6">
											<label class="col-md-12" style="text-align: center; font-weight: bold;">Destinitaion</label>
										</div>
									</div>
									<div class="row" style="margin-bottom:20px; margin-top:20px;">
										<div class="col-md-6">
											<label class="col-md-12" style="font-weight: bold;";>Port of Loading <span class="existingPorts"></span></label>
											<select name="magaya__PortofLoading" class="form-control">
												<option></option>
											</select>
										</div>
										<div class="col-md-6">
											<label class="col-md-12" style="font-weight: bold;">Port of Unloading <span class="existingPorts"></span></label>
											<select name="magaya__PortofUnloading" class="form-control">
												<option></option>
											</select>
										</div>
									</div>
									<div class="row" style="margin-bottom:20px; margin-top:20px;">
										<div class="col-md-6">
											<label class="col-md-12" style="font-weight: bold;">Place of Receipt</label>
											<input type="text" name="magaya__OriginReceipt" class="form-control no-border" />

										</div>
										<div class="col-md-6">
											<label class="col-md-12" style="font-weight: bold;">Place of Delivery</label>
											<input type="text" name="magaya__DestinationReceipt" class="form-control no-border" />
										</div>
									</div>
									<div class="row" style="margin-bottom:20px; margin-top:20px;">
										<div class="col-md-6">
											<label class="col-md-12" style="font-weight: bold;">Pre Carriage By</label>
											<input type="text" name="magaya__OriginPrecarriageBy" class="form-control no-border" />
										</div>
										<div class="col-md-6">
											<label class="col-md-12" style="font-weight: bold;">On Carriage By</label>
											<input type="text" name="magaya__DestinationPrecarriageBy" class="form-control" />
										</div>
									</div>
									<div class="row" style="margin-bottom:20px; margin-top:20px;">
										<div class="col-md-6" style="font-weight: bold;">
											<label class="col-md-12">Shipper</label>
											<select name="magaya__Shipper" class="form-control no-border">
												<option></option>
											</select>
										</div>
										<div class="col-md-6">
											<label class="col-md-12" style="font-weight: bold;">Consignee</label>
											<select name="magaya__ConsigneeName" class="form-control no-border">
												<option></option>
											</select>
										</div>
									</div>
									<!--div class="row" style="margin-bottom:20px; margin-top:20px;">
										<div class="col-md-6">
													<label class="col-md-12" style="font-weight: bold;">Address</label>

														<div class="row" style="margin-bottom:20px;">
															<div class="col-md-6" >
																<label class="col-md-12" style="width: 100%; font-weight: bold;">City</label>
																<input type="text" name="Shipper_City" class="form-control" />
															</div>
															<div class="col-md-6">
																<label class="col-md-12" style="font-weight: bold;">State</label>
																<input type="text" name="Shipper_State" class="form-control"/>
															</div>
														</div>
														<div class="row" style="margin-bottom:20px;">
															<div class="col-md-6">
																<label class="col-md-12" style="font-weight: bold;">Country</label>
																<input type="text" name="Shipper_Country" class="form-control"/>
															</div>
															<div class="col-md-6">
																<label class="col-md-12" style="font-weight: bold;">Street</label>
																<input type="text" name="Shipper_Street" class="form-control">
															</div>
														</div>
										</div>
										<div class="col-md-6">
													<label class="col-md-12" style="font-weight: bold;">Address</label>
														<div class="row" style="margin-bottom:20px;">
															<div class="col-md-6" >
																<label class="col-md-12" style="width: 100%; font-weight: bold;">City</label>
																<input type="text" name="Consignee_City" class="form-control">
															</div>
															<div class="col-md-6">
																<label class="col-md-12" style="font-weight: bold;">State</label>
																<input type="text" name="Consignee_State" class="form-control"/>
															</div>
														</div>
														<div class="row" style="margin-bottom:20px;">
															<div class="col-md-6">
																<label class="col-md-12" style="font-weight: bold;">Country</label>
																<input type="text" name="Consignee_Country" class="form-control"/>
															</div>
															<div class="col-md-6">
																<label class="col-md-12" style="font-weight: bold;">Street</label>
																<input type="text" name="Consignee_Street" class="form-control">
															</div>
														</div>
										</div>
									</div-->
								</div>
                                <!------------------------------------------------------------->
                                <!-- end tab routing -->
                                <!------------------------------------------------------------->

                                <!------------------------------------------------------------->
                                <!--tab items -->
                                <!------------------------------------------------------------->
								<div class="tab-pane fade" id="menu4" role="tabpanel" aria-labelledby="menu4-tab" style="min-height: 600px;">

                                    <label class="btn btn-sm btn-primary float-right open-panel" data-panel="panel-item" for="btnControl2" style="background-color: #0b3355; float: rigth;">Add Item</label>
                                    <!--label class="btn btn-sm btn-primary float-right btn-slide" data-id="-1" data-module="table-items" for="btnControl2" style="background-color: #0b3355; float: rigth;">Add Item</label-->



                                    <!---- wrapper for new charge form-->
                                    <div class="panel-item" id="panel-item">
                                        <div class="panel">
                                            <span class="material-icons close cursor-hand" data-close="panel-item">close</span>

											<fieldset class="fieldset"><legend class="legend">New Item</legend>

												<div class="row">
													<div class="col-md-8">
														<span>Measure System</span>
														<div class="input-group">
															<select name="magaya__Measure_System" class="form-control">
																<option value="International">International</option>
																<option value="English">English</option>
															</select>
														</div>
													</div>
												</div>

												<div class="row">
													<div class="col-md-2">
														<span>Quantity</span>
														<div class="input-group">
																<input type="text" class="number form-control" name="Item-Pieces" class='form-control' />
															</div>
													</div>

													<div class="col-md-2">
															<span>Package</span>
															<div class="input-group">
																<select id='select-package' name="select-package" class="form-control"></select>
															</div>
														</div>

														<div class="col-md-2">
															<span>Length</span>
															<div class="input-group">
																<input type="text" class="number form-control" name="Item-Length" id="Item-Length" class='form-control' />
															</div>
														</div>

														<div class="col-md-2">

														<span>Height</span>
														<div class="input-group">
															<input type="text" class="number form-control" name="Item-Height" class='form-control' />
														</div>
														</div>
														<div class="col-md-2">
															<span>Width</span>
															<div class="input-group">
																<input type="number" name="Item-Width" class='form-control' />
															</div>
														</div>

														<div class="col-md-2">
															<span>Weight</span>
															<div class="input-group">
																<input type="text" class="number form-control" name="Item-Weight" class='form-control' />
															</div>
														</div>
												</div>
											</fieldset>

                                                <div class="col-md-12 table-responsive" style="margin-top:20px;">
                                                    <div class="col-md-12">
                                                        <p style="width: 100%;text-align: right;">
                                                            <button id='sendItem' for-table='#table-items' class="btn btn-primary" style="background-color: #0b3355">Add Item</button>
                                                            <button id='newItem' for-table='#table-items-new' class="btn btn-primary" style="background-color: #0b3355">Add Item</button>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                    </div>


										<table id="table-items" class="table table-bordered table-striped" style="width:100%;">
											<thead>
												<tr>
                                                    <th style="width:10%"></th>
                                                    <th style="width:10%">Status</th>
                                                    <th style="width:26%">Description</th>
													<th style="width:9%">Pieces</th>
													<th style="width:9%">Length</th>
                                                    <th style="width:9%">Heigth</th>
													<th style="width:9%">Width</th>
													<th style="width:9%">Weigth</th>
													<th style="width:9%">Volume</th>
												</tr>
										   </thead>
										   <tbody></tbody>
										</table>

                                        <table id="table-items-new" class="table table-bordered table-striped" style="width:100%;">
											<thead>
												<tr>
                                                <th style="width:10%"></th>
                                                    <th style="width:10%">Status</th>
                                                    <th style="width:26%">Description</th>
													<th style="width:9%">Pieces</th>
													<th style="width:9%">Length</th>
                                                    <th style="width:9%">Heigth</th>
													<th style="width:9%">Width</th>
													<th style="width:9%">Weigth</th>
													<th style="width:9%">Volume</th>
												</tr>
										   </thead>
										   <tbody></tbody>
										</table>


								</div>
                                <!------------------------------------------------------------->
                                <!-- end tab items -->
                                <!------------------------------------------------------------->

                                <!------------------------------------------------------------->
                                <!-- tab customer -->
                                <!------------------------------------------------------------->
								<div class="tab-pane fade show active" id="menu5" role="tabpanel" aria-labelledby="menu5-tab">

									<div class="row" style="margin-bottom:20px;margin-top:20px;">
										<div class="col-md-4">
											<label class="col-md-12" style="font-weight: bold;">Deal</label>
                                            <select name="Deal" class="form-control">
                                                <option></option>
										    </select>
										</div>
										<div class="col-md-4">
											<label class="col-md-12" style="font-weight: bold;">Customer</label>
                                            <select name="Account" class="form-control no-border">
                                                <option></option>
                                            </select>
										</div>
										<div class="col-md-4" style="width: 100%;text-align: center;align-self: center;">
											<label class="col-md-12" style="font-weight: bold;">Customer Rol</label>
											<!-- Material inline 1 -->
											<div class="form-check form-check-inline">
											  <input type="checkbox" class="form-check-input" id="rol_shipper" name="inlineMaterialRadiosExample">
											  <label class="form-check-label" for="materialInline1">Shipper</label>
											</div>

											<!-- Material inline 2 -->
											<div class="form-check form-check-inline">
											  <input type="checkbox" class="form-check-input" id="rol_consignee" name="inlineMaterialRadiosExample">
											  <label class="form-check-label" for="materialInline2">Consignee</label>
											</div>

											<!-- Material inline 3 -->
											<div class="form-check form-check-inline">
											  <input type="checkbox" class="form-check-input" id="rol_other" name="inlineMaterialRadiosExample">
											  <label class="form-check-label" for="materialInline3">Other</label>
											</div>
										</div>
									</div>
									<hr>
									<div class="row" style="margin-bottom:20px;">
										<div class="col-md-4">
											<div class="row" style="margin-bottom:10px;"></div>
											<label class="col-md-12" style="font-weight: bold;">Representative</label>
                                            <select name="magaya__Representative" class="form-control no-border">
                                                <option></option>
                                            </select>
											<div class="row" style="margin-bottom:10px;"></div>
											<label class="col-md-12" style="font-weight: bold;">Phone</label>
											<input type="text" name="Phone" class="form-control no-border">
											<div class="row" style="margin-bottom:10px;"></div>
											<label class="col-md-12" style="font-weight: bold;">Mobile</label>
											<input type="text" name="Mobile" class="form-control no-border">
											<div class="row" style="margin-bottom:10px;"></div>
											<label class="col-md-12" style="font-weight: bold;">Email</label>
											<div class="row" style="margin-bottom:10px;"></div>
                                            <input type="text" name="Email" class="form-control no-border" style="margin-bottom: 20px;">


										</div>
										<div class="col-md-8">
											<div class="row" style="margin-bottom:10px;"></div>
											<div class="row" style="margin-bottom:20px;">
												<div class="col-md-6">
													<label class="col-md-12" style="font-weight: bold;">Billing Address Street</label>
													<div class="form-group">
                                                        <input type="text" name="Mailing_Street" class="form-control" style="height: 60px; word-break: break-word;"/>
														<!--textarea rows="2" class="form-control"></textarea-->
													</div>
													<div class="row" style="margin-bottom:20px;">
														<div class="col-md-6" >
															<label class="col-md-12" style="width: 100%; font-weight: bold;">City</label>
															<input type="text" name="Mailing_City" class="form-control">
														</div>
														<div class="col-md-6">
															<label class="col-md-12" style="font-weight: bold;">State</label>
															<input type="text" name="Mailing_State" class="form-control">
														</div>
													</div>
													<div class="row" style="margin-bottom:20px;">
														<div class="col-md-6">
															<label class="col-md-12" style="font-weight: bold;">Country</label>
															<input type="text" name="Mailing_Country" class="form-control">
														</div>
														<div class="col-md-6">
															<label class="col-md-12" style="font-weight: bold;">Zip Code</label>
															<input type="text" name="Mailing_Zip" class="form-control">
														</div>
													</div>

												</div>

											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer" >
						<div class="col-md-3">

                            <button type="button" id="Save" class="btn btn-primary" style="width:80px;margin-right: 20px; background-color: #0b3355">Save</button>
                            <button type="button" id="New" class="btn btn-primary" style="width:80px;margin-right: 20px; background-color: #0b3355">Save</button>
                            <button type="button" class="btn btn-danger cerrar-modal" style="width:80px;">Cancel</button>
						</div>
					</div>
			  </div>
		 		<!-- /.modal-content -->
	  		</div>
			<!-- /.modal-dialog -->
		</div>

@stop
@section('js')
    <script>
        Utils.blockUI();
        $(document).ready(function(){
    });
   </script>
    @stop

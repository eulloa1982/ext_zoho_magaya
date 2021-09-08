@extends('base_listmquote')
@section('main')

<div class="container">
    <div class="row">
		<div class="col-md-12">
			<div class="container-fluid" style="margin-top: 20px; padding: 0px;">
				<div class="card">
					<div class="card-header" style="padding: 0px;background-color: #0b3355;border-color:#0b3355;">
						<div class="row">
							<div class="col-md-3" style="padding: 5px 0px;">
								<p style="color: white; font-weight: bold; font-size: 24px;padding-left: 20px;margin:0px">Edit mQuote</p>
							</div>
							<div class="col-md-7" style="padding: 5px 0px;">
								<form class="form-inline my-2 my-lg-0">
									<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" style="margin-left:-100px;">
									<span class="input-group-btn"><button class="btn btn-primary"><span class="material-icons">search</span></button></span>
								</form>
							</div>
								 	<div class="col-md-2" style="padding: 5px 0px;">
								 		<div class="btn-group">
									 		<button type="button" class="btn btn-primary addMquote" style="margin-right: 20px; font-weight: bold;">Add</button>
			  								<button type="button" class="btn btn-primary"><span class="material-icons">more_horiz</span></button>
			 								<button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown">
			    							<span class="caret"></span>
			  								</button>
											<div class="dropdown-menu">
												<a class="dropdown-item" href="#">Mass Update</a>
												<a class="dropdown-item" href="#">Mass Delete</a>
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
													<td style="vertical-align: middle;">bcvbcvb</td>
													<td style="vertical-align: middle;">cvbcvb</td>
													<td style="vertical-align: middle;">bcvbcv</td>
													<td style="vertical-align: middle;">bcvbcv</td>
													<td style="vertical-align: middle;">cbcvbcv</td>
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
<div id="mquoteModal" class="modal fade" id="edit" tabindex="-10" role="dialog" aria-labelledby="edit" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header" style="background: #0b3355;color: white;">
						<h4 class="modal-title custom_align" style="font-weight: bold;" id="Heading">Edit mQuote</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>

					</div>
					<div class="modal-body">
                        <!--------------------------->
                        <!-- panel editing----------->
                        <div id="panel">
                            <div class="panel">
                                <div class="row principal">
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-success"><span class="material-icons">more_horiz</span></button>
                                        <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span class="sr-only">Toggle Dropdown</span>
                                        </button>
                                        <div class="dropdown-menu">
                                            <a class="dropdown-item" id="clone-item">Clone</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" id="delete-item">Delete</a>
                                        </div>
                                    </div>
                                </div>
                                <div id="info-datad"></div>

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
											<input type="text" name="Name" id="Name" class="form-control" placeholder="Quote Number" />
										</div>
										<div class="col-md-2">
											<label class="col-md-12" style="font-weight: bold;">Issued By</label>
                                            <input type="text" name='magaya__IssuedByName' id='magaya__IssuedByName' class='form-control' readonly/>

										</div>
										<div class="col-md-4">
											<label class="col-md-12" style="font-weight: bold;">Expiration Date</label>
                                            <input type="text" name="magaya__ExpirationDate" id="ExpirationDate" class="form-control" />
										</div>
										<div class="col-md-4">
											<label class="col-md-12" style="font-weight: bold;">Seller Name</label>
                                            <input name="magaya__SellerName" id="magaya__SellerName" class="form-control" readonly/>
										</div>
									</div>
									<div class="row" style="margin-bottom:10px; margin-top: 30px;">
										<div class="col-md-4">
											<label class="col-md-12" style="font-weight: bold;">Trasnportation Mode</label>
                                            <select name='magaya__TransportationMode' id='magaya__TransportationMode' class='form-control' />
                                                <option></option>
                                            </select>

										</div>
										<div class="col-md-4">
											<label class="col-md-12" style="font-weight: bold;">Direction</label>
                                            <select name='magaya__Direction' id='magaya__Direction' class='form-control'>
                                                <option value='Outgoing'>Out Going</option>
                                                <option value='Incoming'>In comming</option>
                                            </select>

										</div>
										<div class="col-md-4">
											<label class="col-md-12" style="font-weight: bold;">Description</label>
											<div class="form-group">
                                                <textarea rows="2" name='magaya__Description' id='magaya__Description' class='form-control'></textarea>
											</div>
										</div>
									</div>
									<div class="row" style="margin-bottom:25px;">
										<div class="col-md-4">
												<label class="col-md-12" style="font-weight: bold;">Stage</label>
                                                <select name="magaya__Status" class="form-control">
                                                    <option value="Draft">Draft</option>
                                                    <option value="Done">Done</option>
                                                    <option value="Sent">Sent</option>
                                                    <option value="Acepted">Acepted</option>
                                                    <option value="Refused">Refused</option>
                                                </select>
                                            </div>
										<div class="col-md-4">
												<label class="col-md-12" style="font-weight: bold;">Deal</label>
												<input type="text" name="Deal" class="form-control">
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

                                    <input type="checkbox" id="btnControl"/>
                                    <label class="btn btn-sm btn-primary float-right" for="btnControl" style="background-color: #0b3355; float: rigth;">Add Row</label>
                                    <!---- wrapper for new charge form-->
                                    <div class="panel-wrap">
                                        <div class="panel">
                                                <div class="row">
                                                    <div class="col-md-2">
                                                        <span>Status</span>
                                                        <div class="input-group">
                                                            <div class="input-group-text"><i class="fas fa-user-check"></i></div>
                                                                <select name='ChargeStatus' class='form-control'>
                                                                    <option value="Open">Open</option>
                                                                    <option value="Paid">Paid</option>
                                                                    <option value="Posted">Posted</option>
                                                                </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <span>Charge Type</span>
                                                        <div class="input-group">
                                                            <div class="input-group-text"><i class="fas fa-user-check"></i></div>
                                                                <select name='ChargeType' id='ChargeType' class='form-control'>
                                                                    <option value="select"></option>
                                                                </select>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-4">
                                                        <span>Description</span>
                                                        <div class="input-group">
                                                            <div class="input-group-text"><i class="fas fa-user-check"></i></div>
                                                                <input type="text" name='DescriptionCharges' id='DescriptionCharges' class='form-control' />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-4">
                                                    <span>Currency</span>
                                                        <div class="input-group">
                                                            <div class="input-group-text"><i class="fas fa-dollar-sign"></i></div>
                                                            <select name='Currency' id='Currency' class='form-control'>
                                                                <option value='USD'>USD</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-4">
                                                    <span>Paid As</span>
                                                        <div class="input-group">
                                                            <div class="input-group-text"><i class="fas fa-dollar-sign"></i></div>
                                                            <select name='PaidAs' class='form-control'>
                                                                <option value='Prepaid'>Prepaid</option>
                                                                <option value='Collect'>Collect</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-md-2">
                                                    <span>Quantity</span>
                                                        <div class="input-group">
                                                            <div class="input-group-text"><i class="fas fa-cash-register"></i></div>
                                                            <input type="text" name='Quantity' id='Quantity' class='form-control' />
                                                        </div>
                                                    </div>

                                                    <div class="col-md-2">
                                                    <span>Unity</span>
                                                        <div class="input-group">
                                                            <div class="input-group-text"><i class="fas fa-chart-pie"></i></div>
                                                                <select name='Unity' class='form-control'>
                                                                    <option value='U'>U</option>
                                                                    <option value='Lb'>Lb</option>
                                                                    <option value='Kg'>Kg</option>
                                                                </select>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-2">
                                                    <span>Price</span>
                                                        <div class="input-group">
                                                            <div class="input-group-text"><i class="fas fa-hand-holding-usd"></i></div>
                                                                <input type="text" name='Price' id='Price' class='form-control' />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-2">
                                                        <span>Tax Code</span>
                                                            <div class="input-group">
                                                                <div class="input-group-text"><i class="fas fa-coins"></i></div>
                                                                <select name="TaxCode" class='form-control'>
                                                                    <option></option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                    <div class="col-md-4">
                                                        <span>Tax Amount</span>
                                                            <div class="input-group">
                                                                <div class="input-group-text"><i class="fas fa-coins"></i></div>
                                                                <input type="text" name='TaxAmount' class='form-control'readonly/>
                                                            </div>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-md-2">
                                                    <span>Amount</span>
                                                        <div class="input-group">
                                                            <div class="input-group-text"><i class="fas fa-coins"></i></div>
                                                            <input type="text" name='Amount' id='Amount' class='form-control' readonly/>
                                                        </div>
                                                    </div>


                                                </div>
                                                <div class="col-md-12" style="padding: 0px;">
                                                        <p style="width: 100%;text-align: right;">
                                                            <button id='sendCharges' for-table='#item-charges' class="btn btn-primary" style="background-color: #0b3355">Add Row</button>
                                                            <button id='newCharges' for-table='#item-charges' class="btn btn-primary" style="background-color: #0b3355">Add Row</button>
                                                        </p>
                                                    </div>

                                                <input type="checkbox" id="btnControl"/>
                                                <label class="btn btn-sm btn-primary" for="btnControl" style="background-color: #0b3355; float: rigth;">Hide</label>

                                            </div>

                                        </div>




                                    <div class="table-responsive-sm">
										<table id="table-charges" class="table table-bordered table-striped">
											<thead>
												<tr>
                                                    <th></th>
													<th>Status</th>
													<th>Charge Type</th>
													<th>Amount</th>
													<th>Tax Rate</th>
													<th>Amount + Tax</th>
													<th>Total Amount</th>
												</tr>
										   </thead>
										   <tbody></tbody>
										</table>
                                    </div>

                                    <div class="table-responsive-sm">
                                        <table id="table-charges-new" class="table table-bordered table-striped">
											<thead>
												<tr>
                                                    <th></th>
                                                    <th>Status</th>
													<th>Charge Type</th>
													<th>Amount</th>
													<th>Tax Rate</th>
													<th>Amount + Tax</th>
													<th>Total Amount</th>
												</tr>
										   </thead>
										   <tbody></tbody>
										</table>
                                    </div>
                                    <table class="table table-bordred" id="dataTable" width="100%" cellspacing="0">
											<tr>
												<td colspan="3" style="width:42%"><b>Total Tax Amount:</b> <input type="text" name=""></td>
												<td colspan="3" style="width:58%"><b>Total Income:</b>  <input type="text" name=""></td>
											</tr>
										</table>

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
											<select name='Carrier' id='Carrier' class='form-control'>
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
											<label class="col-md-12" style="font-weight: bold;";>Port of Loading</label>
											<select id="Port_Loading" class="form-control">
												<option></option>
											</select>
										</div>
										<div class="col-md-6">
											<label class="col-md-12" style="font-weight: bold;">Port of Unloading</label>
											<select id="Port_Unloading" class="form-control">
												<option></option>
											</select>
										</div>
									</div>
									<div class="row" style="margin-bottom:20px; margin-top:20px;">
										<div class="col-md-6">
											<label class="col-md-12" style="font-weight: bold;">Place of Recept</label>
											<input type="text" name="Place_Receipt" class="form-control" />

										</div>
										<div class="col-md-6">
											<label class="col-md-12" style="font-weight: bold;">Place of Delivery</label>
											<input type="text" name="Place_Delivery" class="form-control" />
										</div>
									</div>
									<div class="row" style="margin-bottom:20px; margin-top:20px;">
										<div class="col-md-6">
											<label class="col-md-12" style="font-weight: bold;">Pre Carriage By</label>
											<input type="text" name="Pre_Carriage_By" class="form-control" />
										</div>
										<div class="col-md-6">
											<label class="col-md-12" style="font-weight: bold;">On Carriage By</label>
											<input type="text" name="On_Carriage_By" class="form-control" />
										</div>
									</div>
									<div class="row" style="margin-bottom:20px; margin-top:20px;">
										<div class="col-md-6" style="font-weight: bold;">
											<label class="col-md-12">Shipper</label>
											<select name="ShipperName" class="form-control">
												<option></option>
											</select>
										</div>
										<div class="col-md-6">
											<label class="col-md-12" style="font-weight: bold;">Consigne</label>
											<select name="ConsigneeName" class="form-control">
												<option></option>
											</select>
										</div>
									</div>
									<div class="row" style="margin-bottom:20px; margin-top:20px;">
										<div class="col-md-6">
													<label class="col-md-12" style="font-weight: bold;">Address</label>
														<div class="form-group">
															<textarea rows="2" class="form-control"></textarea>
														</div>
														<div class="row" style="margin-bottom:20px;">
															<div class="col-md-6" >
																<label class="col-md-12" style="width: 100%; font-weight: bold;">City</label>
																<input type="text" name="City_Origin" class="form-control" />
															</div>
															<div class="col-md-6">
																<label class="col-md-12" style="font-weight: bold;">State</label>
																<input type="text" name="State_Origin" class="form-control"/>
															</div>
														</div>
														<div class="row" style="margin-bottom:20px;">
															<div class="col-md-6">
																<label class="col-md-12" style="font-weight: bold;">Country</label>
																<input type="text" name="Country_Origin" class="form-control"/>
															</div>
															<div class="col-md-6">
																<label class="col-md-12" style="font-weight: bold;">Zip Code</label>
																<input type="text" name="Zip_Origin" class="form-control">
															</div>
														</div>
										</div>
										<div class="col-md-6">
													<label class="col-md-12" style="font-weight: bold;">Address</label>
														<div class="form-group">
															<textarea rows="2" class="form-control"></textarea>
														</div>
														<div class="row" style="margin-bottom:20px;">
															<div class="col-md-6" >
																<label class="col-md-12" style="width: 100%; font-weight: bold;">City</label>
																<input type="text" name="City_Destination" class="form-control">
															</div>
															<div class="col-md-6">
																<label class="col-md-12" style="font-weight: bold;">State</label>
																<input type="text" name="State_Destination" class="form-control"/>
															</div>
														</div>
														<div class="row" style="margin-bottom:20px;">
															<div class="col-md-6">
																<label class="col-md-12" style="font-weight: bold;">Country</label>
																<input type="text" name="Country_Origin" class="form-control"/>
															</div>
															<div class="col-md-6">
																<label class="col-md-12" style="font-weight: bold;">Zip Code</label>
																<input type="text" name="Zip_Destination" class="form-control">
															</div>
														</div>
										</div>
									</div>
								</div>
                                <!------------------------------------------------------------->
                                <!-- end tab routing -->
                                <!------------------------------------------------------------->

                                <!------------------------------------------------------------->
                                <!--tab items -->
                                <!------------------------------------------------------------->
								<div class="tab-pane fade" id="menu4" role="tabpanel" aria-labelledby="menu4-tab" style="min-height: 600px;">
                                    <input type="checkbox" id="btnControl2" />
                                    <label class="btn btn-sm btn-primary float-right" for="btnControl2" style="background-color: #0b3355; float: rigth;">Add Row</label>


                                    <!---- wrapper for new charge form-->
                                    <div class="panel-wrap2">
                                        <div class="panel">
                                            <div class="row">
                                                <div class="col-md-2">
                                                    <span>Measure System</span>
                                                    <div class="input-group">
                                                        <div class="input-group-text"><i class="fas fa-cash-register"></i></div>
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
                                                        <div class="input-group-text"><i class="fas fa-cash-register"></i></div>
                                                            <input type="numeric" name="Item-Pieces" class='form-control' />
                                                        </div>
                                                </div>

                                                <div class="col-md-2">
                                                        <span>Package</span>
                                                        <div class="input-group">
                                                            <div class="input-group-text"><i class="fas fa-cash-register"></i></div>
                                                            <select id='select-package' name="select-package" class="form-control"></select>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-2">
                                                        <span>Length</span>
                                                        <div class="input-group">
                                                            <div class="input-group-text"><i class="fas fa-arrows-alt-h"></i></div>
                                                            <input type="text" name="Item-Length" id="Item-Length" class='form-control' />
                                                        </div>
                                                    </div>

                                                    <div class="col-md-2">

                                                    <span>Height</span>
                                                    <div class="input-group">
                                                        <div class="input-group-text"><i class="fas fa-arrows-alt-v"></i></div>
                                                        <input type="text" name="Item-Height" class='form-control' />
                                                    </div>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <span>Width</span>
                                                        <div class="input-group">
                                                            <div class="input-group-text"><i class="fas fa-exchange-alt"></i></div>
                                                            <input type="text" name="Item-Width" class='form-control' />
                                                        </div>
                                                    </div>

                                                    <div class="col-md-2">
                                                        <span>Weight</span>
                                                        <div class="input-group">
                                                            <div class="input-group-text"><i class="fas fa-balance-scale"></i></div>
                                                            <input type="text" name="Item-Weight" class='form-control' />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-md-12 table-responsive" style="margin-top:20px;">
                                                    <div class="col-md-12">
                                                        <p style="width: 100%;text-align: right;">
                                                            <button id='sendItem' for-table='#table-items' class="btn btn-primary" style="background-color: #0b3355">Add Row</button>
                                                            <button id='newItem' for-table='#table-items-new' class="btn btn-primary" style="background-color: #0b3355">Add Row</button>
                                                        </p>
                                                    </div>
                                                </div>

                                            <input type="checkbox" id="btnControl2"/>
                                            <label class="btn btn-sm btn-primary" for="btnControl2" style="background-color: #0b3355;">Hide</label>

                                            </div>
                                    </div>


										<table id="table-items" class="table table-bordered table-striped" style="width:100%;">
											<thead>
												<tr>
													<th></th>
													<th>Pieces</th>
													<th>Description</th>
													<th>Length</th>
                                                    <th>Heigth</th>
													<th>Width</th>
													<th>Weigth</th>
													<th>Volume</th>
												</tr>
										   </thead>
										   <tbody></tbody>
										</table>

                                        <table id="table-items-new" class="table table-bordered table-striped" style="width:100%;">
											<thead>
												<tr>
													<th>ID</th>
													<th>Pieces</th>
													<th>Description</th>
													<th>Length</th>
                                                    <th>Heigth</th>
													<th>Width</th>
													<th>Weigth</th>
													<th>Volume</th>
												</tr>
										   </thead>
										   <tbody></tbody>
										</table>

                                        <table class="table table-bordred" id="dataTable" width="100%" cellspacing="0">
											<tr>
												<td colspan="3" style="width:42%"><b>Total Tax Amount:</b> <input type="text" name=""></td>
												<td colspan="3" style="width:58%"><b>Total Income:</b>  <input type="text" name=""></td>
											</tr>
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
                                            <select name="Deals" class="form-control">
                                                <option></option>
										    </select>
										</div>
										<div class="col-md-4">
											<label class="col-md-12" style="font-weight: bold;">Account</label>
                                            <select name="magaya__Account" class="form-control">
                                                <option></option>
                                            </select>
										</div>
										<div class="col-md-4" style="width: 100%;text-align: center;align-self: center;">
											<label class="col-md-12" style="font-weight: bold;">Customer Rol</label>
											<!-- Material inline 1 -->
											<div class="form-check form-check-inline">
											  <input type="radio" class="form-check-input" id="materialInline1" name="inlineMaterialRadiosExample">
											  <label class="form-check-label" for="materialInline1">Shipper</label>
											</div>

											<!-- Material inline 2 -->
											<div class="form-check form-check-inline">
											  <input type="radio" class="form-check-input" id="materialInline2" name="inlineMaterialRadiosExample">
											  <label class="form-check-label" for="materialInline2">Consignee</label>
											</div>

											<!-- Material inline 3 -->
											<div class="form-check form-check-inline">
											  <input type="radio" class="form-check-input" id="materialInline3" name="inlineMaterialRadiosExample">
											  <label class="form-check-label" for="materialInline3">Other</label>
											</div>
										</div>
									</div>
									<hr>
									<div class="row" style="margin-bottom:20px;">
										<div class="col-md-4">
											<label class="col-md-12" style="font-weight: bold; text-align: center;">Contact Info</label>
											<div class="row" style="margin-bottom:10px;"></div>
											<label class="col-md-12" style="font-weight: bold;">Representative</label>
                                            <select name="magaya__Representative" class="form-control">
                                                <option></option>
                                            </select>
											<div class="row" style="margin-bottom:10px;"></div>
											<label class="col-md-12" style="font-weight: bold;">Phone</label>
											<input type="text" name="Phone" class="form-control">
											<div class="row" style="margin-bottom:10px;"></div>
											<label class="col-md-12" style="font-weight: bold;">Movil</label>
											<input type="text" name="Mobile" class="form-control">
											<div class="row" style="margin-bottom:10px;"></div>
											<label class="col-md-12" style="font-weight: bold;">Email</label>
											<div class="row" style="margin-bottom:10px;"></div>
                                            <input type="text" name="Email" class="form-control" style="margin-bottom: 20px;">

											<div class="form-check">
  												<label class="form-check-label">
    												<input type="checkbox" class="form-check-input" value="" disabled>Update contact
 												</label>
											</div>
										</div>
										<div class="col-md-8">
											<label class="col-md-12" style="font-weight: bold; text-align: center;">Account Info
											</label>
											<div class="row" style="margin-bottom:10px;"></div>
											<div class="row" style="margin-bottom:20px;">
												<div class="col-md-6">
													<label class="col-md-12" style="font-weight: bold;">Billing Adress Street</label>
													<div class="form-group">
														<textarea rows="2" class="form-control"></textarea>
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
													<div class="form-check" style="margin-top: 52px;">
		  												<label class="form-check-label">
		    												<input type="checkbox" class="form-check-input" value="" disabled>Update Account
		 												</label>
													</div>
												</div>
												<div class="col-md-6">
													<label class="col-md-12" style="font-weight: bold;">Shipping Adress Street</label>
														<div class="form-group">
															<textarea rows="2" class="form-control"></textarea>
														</div>
														<div class="row" style="margin-bottom:20px;">
															<div class="col-md-6" >
																<label class="col-md-12" style="text-align:center;width: 100%; font-weight: bold;">City</label>
																<input type="text" name="Other_City" class="form-control">
															</div>
															<div class="col-md-6">
																<label class="col-md-12" style="font-weight: bold;">Stage</label>
																<input type="text" name="Other_State" class="form-control">
															</div>
														</div>
														<div class="row" style="margin-bottom:20px;">
															<div class="col-md-6">
																<label class="col-md-12" style="font-weight: bold;">Country</label>
																<input type="text" name="Other_Country" class="form-control">
															</div>
															<div class="col-md-6">
																<label class="col-md-12" style="font-weight: bold;">Zip Code</label>
																<input type="text" name="Other_Zip" class="form-control">
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
                            <button type="button" id="New" class="btn btn-primary" style="width:80px;margin-right: 20px; background-color: #0b3355">Add</button>
                            <button type="button" class="btn btn-danger cerrar" data-dismiss="modal" style="width:80px;">Cancel</button>
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
        $(".btn-slide").click(function(e){
            e.preventDefault()
            e.stopImmediatePropagation()

            $("#panel").slide();
            $(this).toggleClass("active"); return false;
        });
    });

   </script>
    @stop

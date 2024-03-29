<style>
    .add-accounts {
        cursor: pointer;
        margin-left: 10px;
    }
</style>
<!-- Edit Modal HTML -->
<div id="mquoteModal" class="modal fade" tabindex="-10" role="dialog" aria-labelledby="edit" aria-hidden="true" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog">
		<div class="modal-content">

			<div class="modal-header" style="background: #0b3355;color: white;">
				<h4 class="modal-title custom_align" style="font-weight: bold;" id="Title">Edit mQuote</h4><span class="arrows-quote" class="float-right"></span>
			    <span class="material-icons btn btn-primary cerrar-modal">close</span>
			</div>
			<div class="modal-body">
				<div class="container" style="max-width:100%">
					<nav>
						<div class="nav nav-tabs" id="nav-tab" role="tablist">
							<a class="nav-link active" id="nav-home-tab" data-toggle="tab" href="#menu5" role="tab" aria-controls="nav-home" aria-selected="true">Customer</a>
							<a class="nav-link" id="nav-general-tab" data-toggle="tab" href="#menu1" role="tab" aria-controls="nav-profile" aria-selected="false">General</a>
							<a class="nav-link" id="nav-items-tab" data-toggle="tab" href="#menu4" role="tab" aria-controls="nav-contact" aria-selected="false">Items</a>
							<a class="nav-link" id="nav-charges-tab" data-toggle="tab" href="#menu2" role="tab" aria-controls="nav-contact" aria-selected="false">Charges</a>
                            <a class="nav-link" id="nav-routing-tab" data-toggle="tab" href="#menu3" role="tab" aria-controls="nav-contact" aria-selected="false">Routing</a>
                            <a class="nav-link" id="nav-terms-tab" data-toggle="tab" href="#menu6" role="tab" aria-controls="nav-contact" aria-selected="false">Terms</a>
                            <!--a class="nav-link" id="nav-notes-tab" data-toggle="tab" href="#menu7" role="tab" aria-controls="nav-contact" aria-selected="false">Notes</a-->
                        </div>
					</nav>
					<!-- ACA SE DEFINE PARA CADA TAB SU CONTENIDO -->
					<div class="tab-content" id="nav-tabContent">
                    <!------------------------------------------------------------->
                    <!----- tab general -------------------------->
                    <!------------------------------------------------------------->
                        <div class="tab-pane fade" id="menu1" role="tabpanel" aria-labelledby="menu1-tab" style="min-height: 600px;">
                            <input type="hidden" name="RowRecord" />
                            <div class="row" style="margin-bottom:20px;margin-top: 20px;">
                                <div class="col-md-3">
									<label class="col-md-12" style="font-weight: bold;">Number</label>
									<input type="text" name="NameQuote" id="NameQuote" class="form-control no-border" placeholder="Quote Number" />
								</div>
								<div class="col-md-3">
									<label class="col-md-12" style="font-weight: bold;">Issued By</label>
                                    <input type="text" name='magaya__IssuedByName' class='form-control' readonly/>
								</div>

                                <div class="col-md-3">
									<label class="col-md-12" style="font-weight: bold;">Created By Name</label>
                                    <input type="text" name='magaya__CreatedByName' class='form-control' readonly/>
								</div>

                                <!--div class="col-md-3">
									<label class="col-md-12" style="font-weight: bold;">Owner</label>
                                    <select name='Owner' class='form-control'>
                                    </select>
								</div-->
                            </div>

                            <div class="row" style="margin-bottom:20px">
                                <div class="col-md-3">
									<label class="col-md-12" style="font-weight: bold;">Creation Date</label>
                                    <input type="text" name="magaya__AddedTime" class="form-control no-border" readonly/>
								</div>

								<div class="col-md-3">
									<label class="col-md-12" style="font-weight: bold;">Expiration Date</label>
                                    <input type="text" autocomplete="autocomplete_off_hack_xfr4!k" name="magaya__ExpirationDate" class="form-control no-border" />
								</div>
								<div class="col-md-3">
									<label class="col-md-12" style="font-weight: bold;">Salesperson</label>
                                    <input name="magaya__Seller" class="form-control" />
								</div>
							</div>

                            <div class="row" style="margin-bottom:10px; margin-top: 30px;">
								<div class="col-md-3">
									<label class="col-md-12" style="font-weight: bold;">Mode of Transportation</label>
                                    <select name='magaya__Mode_of_Transportation' class='form-control no-border'>
                                        <option></option>
                                        <option value="Vessel, Non-containerized">Vessel, Non-containerized</option>
                                        <option value="Vessel, Containerized">Vessel, Containerized</option>
                                        <option value="Barge">Barge</option>
                                        <option value="Rail, Non-containerized">Rail, Non-containerized</option>
                                        <option value="Rail, Containerized">Rail, Containerized</option>
                                        <option value="Truck, Non-containerized">Truck, Non-containerized</option>
                                        <option value="Truck, Containerized">Truck, Containerized</option>
                                        <option value="Auto">Auto</option>
                                        <option value="Pedestrian">Pedestrian</option>
                                        <option value="Road, other">Road, other</option>
                                        <option value="Air, Non-containerized">Air, Non-containerized</option>
                                        <option value="Air, Containerized">Air, Containerized</option>
                                        <option value="Mail">Mail</option>
                                        <option value="Passenger, Hand-carried">Passenger, Hand-carried</option>
                                        <option value="Fixed Transport Installations">Fixed Transport Installations</option>
                                    </select>
								</div>
								<div class="col-md-3">
									<label class="col-md-12" style="font-weight: bold;">Direction</label>
                                    <select name='magaya__Direction' class='form-control no-border'>
                                        <option value='Outgoing'>Outgoing</option>
                                        <option value='Incoming'>Incoming</option>
                                    </select>
								</div>

                                <div class="col-md-3">
									<label class="col-md-12" style="font-weight: bold;">Incoterm Rule</label>
                                    <select name='magaya__Incoterm_rule' class='form-control no-border'>
                                        <option value=""></option>
                                        <option value="EXW - Ex Works">EXW - Ex Works</option>
                                        <option value="FCA - Free Carrier">FCA - Free Carrier</option>
                                        <option value="CPT - Carriage Paid To">CPT - Carriage Paid To</option>
                                        <option value="CIP - Carriage and Insurance Paid To">CIP - Carriage and Insurance Paid To</option>
                                        <option value="DAP - Delivered at Place">DAP - Delivered at Place</option>
                                        <option value="DPU - Delivered at Place Unloaded">DPU - Delivered at Place Unloaded</option>
                                        <option value="DDP - Delivered Duty Paid">DDP - Delivered Duty Paid</option>
                                        <option value="FAS - Free Alongside Ship">FAS - Free Alongside Ship</option>
                                        <option value="FOP - Free On Board">FOP - Free On Board</option>
                                        <option value="CFR - Cost and Freight">CFR - Cost and Freight</option>
                                        <option value="CIF - Cost, Insurance and Freight">CIF - Cost, Insurance and Freight</option>
                                    </select>
								</div>
                            </div>

							<div class="row" style="margin-bottom:25px;">
                                <div class="col-md-3">
                                    <label class="col-md-12" style="font-weight: bold;">Origin</label>
                                    <input type="text" name="magaya__Origin" class="form-control"/>
                                </div>

                                <div class="col-md-3">
                                    <label class="col-md-12" style="font-weight: bold;">Destination</label>
                                    <input type="text" name="magaya__Destination" class="form-control" />
                                </div>

                                <div class="col-md-3">
                                    <label class="col-md-12" style="font-weight: bold;">Is Hazardous </label>
                                    <input type="checkbox" name="magaya__Is_Hazardous"/>
                                </div>
							</div>

                            <div class="row" style="margin-bottom:10px; margin-top: 30px;">
								<div class="col-md-4">
									<label class="col-md-12" style="font-weight: bold;">Description of Goods</label>
									<div class="form-group">
                                        <textarea rows="2" cols="50" name='magaya__Description' id='magaya__Description' class='form-control no-border'></textarea>
									</div>
								</div>
							</div>

                            <div class="row">
                                <div class="col-md-2">
									<label class="col-md-12" style="font-weight: bold;">Stage</label>
                                    <select name="magaya__mQuoteStatus" class="form-control no-border">
                                        <option value="Draft">Draft</option>
                                        <option value="Negotiation">Negotiation</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="On Hold">On Hold</option>
                                        <option value="Confirmed">Confirmed</option>
                                        <option value="Closed Won">Closed Won</option>
                                        <option value="Closed Lost">Closed Lost</option>
                                    </select>
                                </div>

                                <div class="col-md-2">
                                    <label class="col-md-12" style="font-weight: bold;">Magaya Status</label>
                                    <input name="magaya__Magaya_Status" class="form-control" readonly/>
                                </div>

                                <div class="col-md-3">
                                    <!-- Checked -->
                                    <div class="pretty p-icon p-jelly p-round p-bigger p-locked">
                                        <input type="checkbox" name="Magaya_updated"/>
                                        <div class="state p-info">
                                            <i class="icon material-icons">done</i>
                                            <label>Sent to Magaya</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="pretty p-icon p-jelly p-round p-bigger p-locked">
                                        <input type="checkbox" name="magaya__QuoteInMagaya"/>
                                        <div class="state p-info">
                                            <i class="icon material-icons">done</i>
                                            <label>Imported from Magaya</label>
                                        </div>
                                    </div>
                                </div>

                            </div>
						</div>
                        <!------------------------------------------------------------->
                        <!-- end tab general -->
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
									<input name="ModeOfTransportation" class="form-control" readonly/>
								</div>
							</div>

							<div class="row" style="margin-bottom:20px; margin-top:20px;">
								<div class="col-md-6">
									<label class="col-md-12" style="font-weight: bold;">Main Carrier</label>
									<select name='magaya__MainCarrier' id='Carrier' class='form-control'>
                                        <option value=""></option>
                                    </select>
								</div>
							</div>

							<hr>

							<div class="row" style="margin-bottom:20px; margin-top:20px;">
								<div class="col-md-6">
									<label class="col-md-12" style="text-align: center; font-weight: bold;">Origin</label>
								</div>

								<div class="col-md-6">
									<label class="col-md-12" style="text-align: center; font-weight: bold;">Destination</label>
								</div>
							</div>

                            <div class="row" style="margin-bottom:20px; margin-top:20px;">
								<div class="col-md-6">
									<label class="col-md-12" style="font-weight: bold;";>Port of Loading <span class="existingPorts"></span></label>
									<select name="magaya__Port_of_Loading" class="form-control">
										<option></option>
									</select>
								</div>

								<div class="col-md-6">
									<label class="col-md-12" style="font-weight: bold;">Port of Unloading <span class="existingPorts"></span></label>
									<select name="magaya__Port_of_Unloading" class="form-control">
										<option></option>
									</select>
								</div>
							</div>

							<!--div class="row" style="margin-bottom:20px; margin-top:20px;">
								<div class="col-md-6">
									<label class="col-md-12" style="font-weight: bold;">Place of Receipt</label>
									<input type="text" name="magaya__OriginReceipt" class="form-control no-border" />
								</div>

								<div class="col-md-6">
									<label class="col-md-12" style="font-weight: bold;">Place of Delivery</label>
									<input type="text" name="magaya__DestinationReceipt" class="form-control no-border" />
								</div>
							</div-->

							<!--div class="row" style="margin-bottom:20px; margin-top:20px;">
								<div class="col-md-6">
									<label class="col-md-12" style="font-weight: bold;">Pre Carriage By</label>
									<input type="text" name="magaya__OriginPrecarriageBy" class="form-control no-border" />
								</div>

								<div class="col-md-6">
									<label class="col-md-12" style="font-weight: bold;">On Carriage By</label>
									<input type="text" name="magaya__DestinationPrecarriageBy" class="form-control" />
								</div>
							</div-->

							<div class="row" style="margin-bottom:20px; margin-top:20px;">
								<div class="col-md-6" style="font-weight: bold;">
									<label class="col-md-12">Shipper<span class="material-icons add-accounts" onclick="addItems()">keyboard_arrow_right</span></label>
									<select name="magaya__Shipper" class="accounts form-control no-border">
										<option></option>
									</select>
								</div>

								<div class="col-md-6">
									<label class="col-md-12" style="font-weight: bold;">Consignee<span class="material-icons add-accounts" onclick="addItems()">keyboard_arrow_right</span></label>
									<select name="magaya__Consignee" class="accounts form-control no-border">
										<option></option>
									</select>
								</div>
							</div>

							<div class="row" style="margin-bottom:20px; margin-top:20px;">
								<div class="col-md-6">
									<label class="col-md-12" style="font-weight: bold;">Address</label>
									<div class="row" style="margin-bottom:20px;">
										<div class="col-md-6" >
											<label class="col-md-12" style="width: 100%; font-weight: bold;">City</label>
											<input type="text" name="magaya__ShipperCity" class="form-control" />
										</div>

										<div class="col-md-6">
											<label class="col-md-12" style="font-weight: bold;">State</label>
											<input type="text" name="magaya__ShipperState" class="form-control"/>
										</div>
									</div>

									<div class="row" style="margin-bottom:20px;">
										<div class="col-md-6">
											<label class="col-md-12" style="font-weight: bold;">Country</label>
											<input type="text" name="magaya__ShipperCountry" class="form-control"/>
										</div>

									    <div class="col-md-6">
											<label class="col-md-12" style="font-weight: bold;">Street</label>
											<input type="text" name="magaya__ShipperStreet" class="form-control">
										</div>
									</div>

                                    <div class="row" style="margin-bottom:20px;">
                                        <div class="col-md-6">
                                            <label class="col-md-12" style="font-weight: bold;">Zip Code</label>
                                            <input type="text" name="magaya__ShipperCode" class="form-control"/>
										</div>
                                    </div>
								</div>

								<div class="col-md-6">
									<label class="col-md-12" style="font-weight: bold;">Address</label>
									<div class="row" style="margin-bottom:20px;">
										<div class="col-md-6" >
											<label class="col-md-12" style="width: 100%; font-weight: bold;">City</label>
											<input type="text" name="magaya__ConsigneeCity" class="form-control">
									    </div>

										<div class="col-md-6">
											<label class="col-md-12" style="font-weight: bold;">State</label>
											<input type="text" name="magaya__ConsigneeState" class="form-control"/>
										</div>
									</div>

									<div class="row" style="margin-bottom:20px;">
										<div class="col-md-6">
										    <label class="col-md-12" style="font-weight: bold;">Country</label>
										    <input type="text" name="magaya__ConsigneeCountry" class="form-control"/>
										</div>

										<div class="col-md-6">
											<label class="col-md-12" style="font-weight: bold;">Street</label>
											<input type="text" name="magaya__ConsigneeStreet" class="form-control">
										</div>
									</div>

                                    <div class="row" style="margin-bottom:20px;">
                                        <div class="col-md-6">
											<label class="col-md-12" style="font-weight: bold;">Zip Code</label>
											<input type="text" name="magaya__ConsigneeCode" class="form-control"/>
										</div>
                                    </div>
							    </div>
							</div>
						</div>
                        <!------------------------------------------------------------->
                        <!-- end tab routing -->
                        <!------------------------------------------------------------->

                        <!------------------------------------------------------------->
                        <!-- tab customer -->
                        <!------------------------------------------------------------->
						<div class="tab-pane fade show active" id="menu5" role="tabpanel" aria-labelledby="menu5-tab">
                            <form id="customer_form" action="https://zm">
                                <div class="row" style="margin-bottom:20px;margin-top:20px;">
                                    <div class="col-md-4">
                                        <label class="col-md-12" style="font-weight: bold;">Deal</label>
                                        <select name="Deal" class="form-control">
                                            <option></option>
                                        </select>
                                    </div>

                                    <div class="col-md-4">
                                        <label class="col-md-12" style="font-weight: bold;">Customer <span class="material-icons add_contact_link" style="margin-left: 10px; cursor: pointer;" id="add_account">person_add</span><span style="margin-left: 10px; cursor: pointer;" class="material-icons add-accounts" onclick="addItems()">keyboard_arrow_right</span></label>
                                        <select  name="Account" class="accounts form-control no-border">
                                            <option></option>
                                        </select>
                                    </div>

                                    <div class="col-md-4" style="width: 100%;text-align: center;align-self: center;">
                                        <label class="col-md-12" style="font-weight: bold;">Customer Rol</label>
                                        <!-- Material inline 1 -->
                                        <div class="form-check form-check-inline">
                                            <input type="radio" class="form-check-input" id="rol_shipper" name="customer_rol" value="shipper">
                                            <label class="form-check-label" for="materialInline1">Shipper</label>
                                        </div>

                                        <!-- Material inline 2 -->
                                        <div class="form-check form-check-inline">
                                            <input type="radio" class="form-check-input" id="rol_consignee" name="customer_rol" value="consignee">
                                            <label class="form-check-label" for="materialInline2">Consignee</label>
                                        </div>
                                    </div>
                                </div>

                                <hr>

                                <div class="row" style="margin-bottom:20px;">
                                    <div class="col-md-4">
                                        <label class="col-md-12" style="font-weight: bold;">Representative <span class="material-icons add_contact_link" id="add_contact">person_add</span></label>
                                        <label class="col-md-12" style="font-weight: bold;"> Name</label>
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
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label class="col-md-12" style="font-weight: bold;">Billing Address</label>
                                                <label class="col-md-12" style="font-weight: bold;"> Street</label>
                                                <div class="row" style="margin-bottom:3px;"></div>
                                                <input type="text" name="Mailing_Street" class="form-control no-border">
                                                <div class="row" style="margin-bottom:11px;"></div>

                                                <div class="row" style="margin-bottom:8px;">
                                                    <div class="col-md-6" >
                                                        <label class="col-md-12" style="width: 100%; font-weight: bold;">City</label>
                                                        <input type="text" name="Mailing_City" class="form-control">
                                                    </div>

                                                    <div class="col-md-6">
                                                        <label class="col-md-12" style="font-weight: bold;">State</label>
                                                        <input type="text" name="Mailing_State" class="form-control">
                                                    </div>
                                                </div>

                                                <div class="row" style="margin-bottom:10px;">
                                                    <div class="col-md-6">
                                                        <label class="col-md-12" style="width: 100%; font-weight: bold;">Country</label>
                                                        <input type="text" name="Mailing_Country" class="form-control">
                                                    </div>
                                                    <div class="col-md-6">
                                                        <label class="col-md-12" style="font-weight: bold;">Zip Code</label>
                                                        <input type="text" name="Mailing_Zip" class="form-control">
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!------------------------------------------------------------->
                        <!-- tab charges -->
                        <!------------------------------------------------------------->
						<div class="tab-pane fade" id="menu2" role="tabpanel" aria-labelledby="menu2-tab" style="min-height: 600px;">

                            <label class="btn btn-sm btn-primary float-right open-panel" data-panel="panel-charge" for="btnControl" style="background-color: #0b3355; float: rigth;">Add Charge</label>
                            <!---- wrapper for new charge form-->
                            <div class="panel-charge" id="panel-charge">
                                <div class="panel">
									<fieldset class="fieldset">
                                        <legend class="legend"><span class="float-right" id="arrows-charge"></span><span id="title_legend">New Charge</span>
                                            <span class="material-icons close btn btn-danger float-right" style="margin: 0px 0px 0px 4px;color: white;background: none;border: none;" data-close="panel-charge">close</span>
                                            <span id="sendCharges" class="material-icons btn btn-primary float-right" style="background: none;border: none;">task_alt</span>
                                            <span id="newCharges" class="material-icons btn btn-primary float-right" style="background: none;border: none;">task_alt</span>
                                            <span id="updateCharge" class="material-icons btn btn-primary float-right" style="background: none;border: none;">task_alt</span>
                                            <span id="updateChargeNew" class="material-icons btn btn-primary float-right" style="background: none;border: none;">task_alt</span>
                                        </legend>
                                        <form id="new-charge" action="https://zm">
                                            <div class="row">
                                                <div class="col-md-3">Type</div>
                                                <div class="col-md-8"><select name="magaya__Charge_Type" class="form-control new-charge"><option value=""></option></select></div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-3">Description</div>
                                                <div class="col-md-8">
                                                    <textarea class="form-control text new-charge" id="Name" name="Name" aria-label="With textarea"></textarea>
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-3">Quantity</div>
                                                <div class="col-md-8"><input type="text" class="form-control number new-charge" name="magaya__CQuantity" style="text-align-last:right;"></div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-3">Unit</div>
                                                <div class="col-md-8"><select name="magaya__Unit" class="form-control new-charge"><option></option><option value="U">U</option><option value="Lb">Lb</option><option value="Kg">Kg</option></select></div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-3">Price</div>
                                                <div class="col-md-8"><input type="text" class="form-control number new-charge" name="magaya__Price" style="text-align-last:right;"></div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-3">Amount</div>
                                                <div class="col-md-8"><input type="text" class="form-control number" name="magaya__Amount" readonly style="text-align-last:right;"></div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-3">Tax</div>
                                                <div class="col-md-8"><select class="form-control new-charge" name="magaya__Tax"><option value=0></option></select></div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-3">Tax Rate %</div>
                                                <div class="col-md-8"><input type="text" class="form-control number new-charge" name="magaya__TaxRate" readonly style="text-align-last:right;"></div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-3">Tax Amount</div>
                                                <div class="col-md-8"><input type="text" class="form-control number new-charge" name="magaya__Tax_Amount" readonly style="text-align-last:right;"></div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-3">Amount + Tax</div>
                                                <div class="col-md-8"><input type="text" class="form-control number" name="magaya__Amount_Total" readonly style="text-align-last:right;"></div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-3">Currency</div>
                                                <div class="col-md-8"><select name="magaya__ChargeCurrency" class="form-control new-charge"><option></option><option value="USD">USD</option></select></div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-3">Paid As</div>
                                                <div class="col-md-8"><select name="magaya__Paid_As" class="form-control new-charge"><option></option><option value="Prepaid">Prepaid</option><option value="Collect">Collect</option></select></div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-3">Status</div>
                                                <div class="col-md-8"><select name="magaya__Status" class="form-control new-charge"><option></option><option value="Open">Open</option><option value="Posted">Posted</option><option value="Paid">Paid</option></select></div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-3">Apply To</div>
                                                <div class="col-md-8"><input type="text" class="form-control" name="applyToName" readonly=""></div>
                                            </div>
                                        </form>
                                    </fieldset>
                                </div>
                            </div>

                            <div class="scrollme col-12">
                                <div id="info-charge"></div>
                                <table id="table-charges" class="table table-responsive table-bordered table-striped">
									<thead style="text-align:center;">
                                        <tr>
                                            <th style="width:10%"></th>
											<th style="width:10%">Status</th>
                                            <th style="width:26%">Description</th>
											<th style="width:9%">Quantity</th>
                                            <th style="width:9%">Price</th>
                                            <th style="width:9%">Amount</th>
                                            <th style="width:9%">Tax Amount</th>
											<th style="width:9%">Amount + Tax</th>
										</tr>
									</thead>
									<tbody></tbody>
                                    <tfoot></tfoot>
								</table>
                            </div>

                            <div class="scrollme col-12">
                                <table id="table-charges-new" class="table table-responsive table-bordered table-striped">
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
										</tr>
									</thead>
									<tbody></tbody>
                                    <tfoot></tfoot>
								</table>
                            </div>
            	        </div>
                        <!------------------------------------------------------------->
                        <!-- end tab charges -->
                        <!------------------------------------------------------------->

                        <!------------------------------------------------------------->
                        <!--tab items -->
                        <!------------------------------------------------------------->
						<div class="tab-pane fade" id="menu4" role="tabpanel" aria-labelledby="menu4-tab" style="min-height: 600px;">

                            <label class="btn btn-sm btn-primary float-right open-panel" data-panel="panel-item" for="btnControl2" style="background-color: #0b3355; float: rigth;">Add Item</label> <br /> <br />
                                <div class="panel-item" id="panel-item">
                                    <div class="panel">
										<fieldset class="fieldset">
                                            <legend class="legend"><span class="float-right" id="arrows-item"></span><span id="title_legend2">New Item</span>
                                                <span class="material-icons close btn btn-danger float-right" style="margin: 0px 0px 0px 4px;color: white;background: none;border: none;" data-close="panel-item">close</span>
                                                <span id="sendItem" class="material-icons btn btn-primary float-right"style="background: none;border: none;">task_alt</span>
                                                <span id="newItem" class="material-icons btn btn-primary float-right"style="background: none;border: none;">task_alt</span>
                                                <span id="updateItemss" class="material-icons btn btn-primary float-right" style="background: none;border: none;">task_alt</span>
                                                <span id="updateItemNew" class="material-icons btn btn-primary float-right" style="background: none;border: none;">task_alt</span>
                                            </legend>
                                            <form id="new-item" action="https://zm">
                                                <div class="row">
                                                    <div class="col-md-3">Type</div>
                                                    <div class="col-md-8">
                                                        <select class="form-control text" name="magaya__Package_Type"><option value='-1'></option></select>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-md-3">Description</div>
                                                    <div class="col-md-8">
                                                        <textarea class="form-control new-item text" id="magaya__Package_Description" name="Name" aria-label="With textarea"></textarea>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-md-3">Pieces</div>
                                                    <div class="col-md-8">
                                                        <input type="text" class="form-control number new-item" name="magaya__Pieces"style="text-align-last:right;">
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-md-3">Length</div>
                                                    <div class="col-md-8">
                                                        <input type="text" class="form-control number new-item" name="magaya__Length"style="text-align-last:right;">
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-md-3">Height</div>
                                                    <div class="col-md-8">
                                                        <input type="text" class="form-control number new-item" name="magaya__Height"style="text-align-last:right;">
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-md-3">Width</div>
                                                    <div class="col-md-8">
                                                        <input type="text" class="form-control number new-item" name="magaya__Width"style="text-align-last:right;">
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-md-3">Weigth per Piece</div>
                                                    <div class="col-md-8">
                                                        <input type="text" class="form-control number new-item" name="magaya__Weigth"style="text-align-last:right;">
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-md-3">Volume per Piece</div>
                                                    <div class="col-md-8">
                                                        <input type="text" class="form-control number new-item" name="magaya__Volume0"style="text-align-last:right;" readonly>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-md-3">Measure System</div>
                                                    <div class="col-md-8">
                                                        <select name="magaya__Measure_System" class="form-control new-item"><option></option><option value="International">International</option><option value="English">English</option></select>
                                                    </div>
                                                </div>
                                            </form>
										</fieldset>
                                    </div>
                                </div>


                                <div class="scrollme col-12">
                                    <table id="table-items" class="table table-responsive table-striped" >
                                            <thead style="text-align:center;">
                                                <tr>
                                                    <th style="width:9%"></th>
                                                    <th style="width:31%">Description</th>
                                                    <th style="width:8%">Pieces</th>
                                                    <th colspan="2" style="width:14%">Length</th>
                                                    <th colspan="2" style="width:14%">Heigth</th>
                                                    <th colspan="2" style="width:14%">Width</th>
                                                    <th colspan="2" style="width:20%">Total Weigth</th>
                                                    <th colspan="2" style="width:20%">Total Volume</th>
                                                </tr>
                                            </thead>
                                            <tbody></tbody>
                                            <tfoot></tfoot>
                                        </table>
                                </div>

                                <div class="scrollme col-12">
                                    <table id="table-items-new" class="table table-responsive table-striped" >
                                            <thead style="text-align:center;">
                                                <tr>
                                                    <th style="width:9%"></th>
                                                    <th style="width:31%">Description</th>
                                                    <th style="width:8%">Pieces</th>
                                                    <th colspan="2" style="width:14%">Length</th>
                                                    <th colspan="2" style="width:14%">Heigth</th>
                                                    <th colspan="2" style="width:14%">Width</th>
                                                    <th colspan="2" style="width:20%">Total Weigth</th>
                                                    <th colspan="2" style="width:20%">Total Volume</th>
                                                </tr>
                                            </thead>
                                            <tbody></tbody>
                                            <tfoot></tfoot>
                                        </table>
                                </div>
						</div>
                        <!------------------------------------------------------------->
                        <!-- end tab items -->
                        <!------------------------------------------------------------->

                        <!------------------------------------------------------------->
                        <!-- tab terms -->
                        <!------------------------------------------------------------->
                        <div class="tab-pane fade" id="menu6" role="tabpanel" aria-labelledby="menu5-tab" style="min-height: 600px;">
                            <div class="row" style="margin-bottom:20px; margin-top:20px;">
                                <div class="col-md-12">
                                    <label class="col-md-12" style="font-weight: bold;">Terms and Conditions</label>
                                    <textarea name="magaya__Terms" id="magaya__Terms" cols="50" rows="5" class="form-control"></textarea>
                                </div>
                            </div>
                        </div>

                        <!------------------------------------------------------------->
                        <!-- tab notes -->
                        <!------------------------------------------------------------->
                        <div class="tab-pane fade" id="menu7" role="tabpanel" aria-labelledby="menu7-tab" style="min-height: 600px;">
                            <div class="row" style="margin-bottom:20px; margin-top:20px;">
                                <div class="col-md-12">
                                    <label class="col-md-12" style="font-weight: bold;">Notes</label>
                                    <table id="notes-new">
                                        <thead>
											<tr>
                                                <th style="width:25%"></th>
                                                <th style="width:40%"></th>
												<th style="width:20%"></th>
												<th style="width:15%"></th>
											</tr>
										</thead>
                                        <tbody></tbody>
                                    </table>

                                    <table id="notes">
                                        <thead>
                                            <tr>
                                                <th style="width:25%"></th>
                                                <th style="width:40%"></th>
                                                <th style="width:20%"></th>
                                                <th style="width:15%"></th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>

                                    <div class="col-md-3">
                                        <input name="notes_subject" class="form-control" />
                                    </div>
                                    <div class="col-md-4" style="margin-bottom:20px; margin-top:20px;">
                                        <textarea id="notes_body" rows="2" class="form-control"></textarea>
                                    </div>
                                    <span class="btn btn-outline-primary" id="addNoteNew">Add Note</span>
                                    <span class="btn btn-outline-primary" id="addNote">Add Note</span>
                                </div>
                            </div>
                        </div>
					</div><!-- tab content -->
				</div><!-- .container -->
			</div><!-- .modal-body -->

			<div class="modal-footer" >
				<div class="col-md-3">
                    <button type="button" id="Save" class="btn btn-primary" style="width:80px;margin-right: 20px; background-color: #0b3355">Save</button>
                    <button type="button" id="New" class="btn btn-primary" style="width:80px;margin-right: 20px; background-color: #0b3355">Save</button>
                    <button type="button" class="btn btn-danger cerrar-modal" style="width:80px;">Cancel</button>
                    <button type="button" class="btn btn-danger reload" style="width:80px; display: none;">Cancel</button>

				</div>
			</div>
		</div><!--modal-content-->
    </div><!-- .modal-dialog -->
</div><!-- #moquoteModal -->

<script type="text/javascript">
    //discriminar los option anteriores para no repetir los account en el select
    function addItems(){
        let number = localStorage.getItem('account_page');
        number = Number(number)

        getAllsRecordCRM("Accounts", number, 3)
            .then(function(data) {
                if (!_.isEmpty(data)) {
                    //obtener los valores del select
                    $.map(data, function(k, v) {
                        $(`<option value="${k.id}">${k.Account_Name}</option>`).appendTo("select[name=Account]");
                        $(`<option value="${k.id}">${k.Account_Name}</option>`).appendTo("select[name=magaya__Shipper]");
                        $(`<option value="${k.id}">${k.Account_Name}</option>`).appendTo("select[name=magaya__Consignee]");
                    })

                    storeAccounts.dispatch(addAccount(data))
                    localStorage.setItem('account_page', ++number)

                } else {
                    //no more data
                    $(".add-accounts").css("opacity", "0.25")
                }

                return data
            })
            .then(function(data) {
                //do not allow duplicates
                let map = {};
                $('select[name=Account] option').each(function () {
                    if (map[this.value]) {
                        $(this).remove()
                    }
                    map[this.value] = true;
                })

                map = {};
                $('select[name=magaya__Consignee] option').each(function () {
                    if (map[this.value]) {
                        $(this).remove()
                    }
                    map[this.value] = true;
                })

                map = {};
                $('select[name=magaya__Shipper] option').each(function () {
                    if (map[this.value]) {
                        $(this).remove()
                    }
                    map[this.value] = true;
                })


            })
            .catch(function(err) {
                console.log(`Err: ${errs}`)
            })

    }
</script>

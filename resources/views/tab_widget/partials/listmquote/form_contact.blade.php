<!-- Edit Modal HTML -->
<div id="modalContact" class="modal fade" tabindex="-10" aria-labelledby="modalContactLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">

			<div class="modal-header" style="background: #0b3355;color: white;">
				<h4 class="modal-title custom_align" style="font-weight: bold;" id="Title">Add Contact</h4><span class="arrows-quote" class="float-right"></span>
			    <span class="material-icons btn btn-primary" data-dismiss="modal">close</span>
			</div>
			<div class="modal-body">
                <form id="contact_form">
                    <div class="container" >
                        <div class="row">
                            <div class="col-md-12">
                                <label class="col-md-12" style="font-weight: bold;">Account</label>
                                <select name="Account_Name" class="form-control" ></select>
                            </div>
                        </div>
                        <div class="row" style="margin-top:20px">
                            <div class="col-md-6">
                                <label class="col-md-12" style="font-weight: bold;">First Name</label>
                                <input type="text" name='First_Name' class='form-control' />
                            </div>
                            <div class="col-md-6">
                                <label class="col-md-12" style="font-weight: bold;">Last Name</label>
                                <input type="text" name='Last_Name' class='form-control' />
                            </div>
                        </div>
                        <div class="row" style="margin-bottom:20px">
                            <div class="col-md-4">
                                <label class="col-md-12" style="font-weight: bold;">Email</label>
                                <input type="text" name='Email' class='form-control' />
                            </div>
                            <div class="col-md-4">
                                <label class="col-md-12" style="font-weight: bold;">Phone</label>
                                <input type="text" name='Phone' class='form-control' />
                            </div>
                            <div class="col-md-4">
                                <label class="col-md-12" style="font-weight: bold;">Home Phone</label>
                                <input type="text" name='Home_Phone' class='form-control' />
                            </div>
                            <div class="col-md-4">
                                <label class="col-md-12" style="font-weight: bold;">Mobile</label>
                                <input type="text" name='Mobile' class='form-control' />
                            </div>
                            <div class="col-md-4">
                                <label class="col-md-12" style="font-weight: bold;">Fax</label>
                                <input type="text" name='Fax' class='form-control' />
                            </div>
                        </div>

                        <div class="row" style="margin-top:35px">
                            <div class="col-md-4">
                                <label class="col-md-12" style="font-weight: bold;">Mailing City</label>
                                <input type="text" name='Mailing_City' class='form-control' />
                            </div>
                            <div class="col-md-4">
                                <label class="col-md-12" style="font-weight: bold;">Mailing Country</label>
                                <input type="text" name='Mailing_Country' class='form-control' />
                            </div>
                            <div class="col-md-4">
                                <label class="col-md-12" style="font-weight: bold;">Mailing State</label>
                                <input type="text" name='Mailing_State' class='form-control' />
                            </div>
                            <div class="col-md-4">
                                <label class="col-md-12" style="font-weight: bold;">Mailing Street</label>
                                <input type="text" name='Mailing_Street' class='form-control' />
                            </div>
                            <div class="col-md-4">
                                <label class="col-md-12" style="font-weight: bold;">Mailing Zip</label>
                                <input type="text" name='Mailing_Zip' class='form-control' />
                            </div>
                        </div>

                        <div class="row" style="margin-top:35px">
                            <div class="col-md-4">
                                <label class="col-md-12" style="font-weight: bold;">Other City</label>
                                <input type="text" name='Other_City' class='form-control' />
                            </div>
                            <div class="col-md-4">
                                <label class="col-md-12" style="font-weight: bold;">Other Country</label>
                                <input type="text" name='Other_Country' class='form-control' />
                            </div>
                            <div class="col-md-4">
                                <label class="col-md-12" style="font-weight: bold;">Other State</label>
                                <input type="text" name='Other_State' class='form-control' />
                            </div>
                            <div class="col-md-4">
                                <label class="col-md-12" style="font-weight: bold;">Other Street</label>
                                <input type="text" name='Other_Street' class='form-control' />
                            </div>
                            <div class="col-md-4">
                                <label class="col-md-12" style="font-weight: bold;">Other Zip</label>
                                <input type="text" name='Other_Zip' class='form-control' />
                            </div>
                        </div>
                    </form>
			    </div>
		    </div><!-- modal-body -->

			<div class="modal-footer" >
				<div class="col-md-3">
                    <button type="button" id="NewContact" class="btn btn-primary" style="width:80px;margin-right: 20px; background-color: #0b3355">Save</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
			</div>
		</div><!--modal-content-->
    </div><!-- .modal-dialog -->
</div><!-- #modalContact -->


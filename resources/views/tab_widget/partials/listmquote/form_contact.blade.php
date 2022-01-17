<style>
#contact_form form{
    width:90vw;
    max-width:768px;
    border:1px solid #ddd;
    padding:3vw;
    display:flex;
    flex-direction:column;
    border-radius:5px;
}

#contact_form label{
    margin-bottom:15px;
    position:relative;
    border-bottom:1px solid #ddd;
}
#contact_form input{
    width:100%;
    padding:10px 0px;
    margin-top:20px;
    border:none;
    outline:none;
}
#contact_form input::placeholder{
    opacity:0;
}
#contact_form span{
    position:absolute;
    top:0;
    left:0;
    transform:translateY(30px);
    font-size:0.825em;
    transition-duration:300ms;
}

#contact_form label:focus-within > span,
#contact_form input:not(:placeholder-shown) + span{
    color:purple;
    transform:translateY(0px);
}

.modal.fade:not(.in).right .modal-dialog {
    -webkit-transform: translate3d(25%, 0, 0);
    transform: translate3d(25%, 0, 0);
}
</style>
<!-- Edit Modal HTML -->
<div id="modalContact" class="modal fade right" tabindex="-10" aria-labelledby="modalContactLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">

			<div class="modal-header" style="background: #006494;color: white;">
				<h4 class="modal-title custom_align" style="font-weight: bold;" id="Title">Contact</h4>
			    <span class="material-icons btn btn-primary" data-dismiss="modal">close</span>
			</div>
			<div class="modal-body">
                <form id="contact_form">
                    <div class="container" >
                        <div class="w-45 p-1 bg-light">Contact Data</div>
                        <div class="row shadow p-3 border border-secondary mb-2 bg-white rounded">
                            <input type="hidden" name="Account_Name" />

                            <div class="col-md-6">
                                <label for="First Name">
                                    <input type="text" name='First_Name' placeholder="First Name" />
                                    <span>First Name</span>
                                </label>
                            </div>
                            <div class="col-md-6">
                                <label for="Last_Name">
                                    <input type="text" name='Last_Name' placeholder="Last Name"/>
                                    <span>Last Name</span>
                                </label>
                            </div>

                            <div class="col-md-4">
                                <label for="Email">
                                    <input type="text" name='Email' placeholder="Email" />
                                    <span>Email</span>
                                </label>
                            </div>
                            <div class="col-md-4">
                                <label for="Phone">
                                    <input type="text" name='Phone' placeholder="Phone" />
                                    <span>Phone</span>
                                </label>
                            </div>
                            <div class="col-md-4">
                                <label for="Home Phone">
                                    <input type="text" name='Home_Phone' placeholder="Home_Phone" />
                                    <span>Home Phone</span>
                                </label>
                            </div>
                            <div class="col-md-4">
                                <label for="Mobile">
                                    <input type="text" name='Mobile' placeholder="Mobile" />
                                    <span>Mobile</span>
                                </label>
                            </div>
                            <div class="col-md-2">
                                <label for="Fax">
                                    <input type="text" name='Fax' placeholder="Fax" />
                                    <span>Fax</span>
                                </label>
                            </div>
                        </div>

                        <div class="w-25 p-1 bg-light">Billing Address</div>
                        <div class="p-3 row border border-secondary bg-white rounded">
                            <div class="col-md-4">
                                <label for="Other_City">
                                    <input type="text" name='Other_City' placeholder="Other_City" />
                                    <span>Other City</span>
                                </label>
                            </div>
                            <div class="col-md-4">
                                <label for="Other_Country">
                                    <input type="text" name='Other_Country' placeholder="Other_Country" />
                                    <span>Other Country</span>
                                </label>
                            </div>
                            <div class="col-md-4">
                                <label for="Other_State">
                                    <input type="text" name='Other_State' placeholder="Other_State" />
                                    <span>Other State</span>
                                </label>
                            </div>
                            <div class="col-md-4">
                                <label for="Other_Street">
                                    <input type="text" name='Other_Street' placeholder="Other_Street" />
                                    <span>Other Street</span>
                                </label>
                            </div>
                            <div class="col-md-4">
                                <label for="Other_Zip">
                                    <input type="text" name='Other_Zip' placeholder="Other_Zip" />
                                    <span>Other_Zip</span>
                                </label>
                            </div>
                        </div>
                    </form>
			    </div>
		    </div><!-- modal-body -->

			<div class="modal-footer" >
				<div class="col-md-12">
                    <button type="button" id="NewContact" class="btn btn-primary" style="width:80px;margin-right: 20px; background-color: #0b3355">Save</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
			</div>
		</div><!--modal-content-->
    </div><!-- .modal-dialog -->
</div><!-- #modalContact -->


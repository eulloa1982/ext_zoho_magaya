<style>
#account_form form{
    width:90vw;
    max-width:768px;
    border:1px solid #ddd;
    padding:3vw;
    display:flex;
    flex-direction:column;
    border-radius:5px;
}

#account_form label{
    margin-bottom:15px;
    position:relative;
    border-bottom:1px solid #ddd;
}
#account_form input{
    width:100%;
    padding:10px 0px;
    margin-top:20px;
    border:none;
    outline:none;
}
#account_form input::placeholder{
    opacity:0;
}
#account_form span{
    position:absolute;
    top:0;
    left:0;
    transform:translateY(30px);
    font-size:0.825em;
    transition-duration:300ms;
}

#account_form label:focus-within > span,
#account_form input:not(:placeholder-shown) + span{
    color:purple;
    transform:translateY(0px);
}

.modal.fade:not(.in).right .modal-dialog {
    -webkit-transform: translate3d(25%, 0, 0);
    transform: translate3d(25%, 0, 0);
}
</style>
<!-- Edit Modal HTML -->
<div id="modalAccount" class="modal fade right" tabindex="-10" aria-labelledby="modalContactLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">

			<div class="modal-header" style="background: #006494;color: white;">
				<h4 class="modal-title custom_align" style="font-weight: bold;" id="Title">Account</h4>
			    <span class="material-icons btn btn-primary" data-dismiss="modal">close</span>
			</div>
			<div class="modal-body">
                <form id="account_form">
                    <div class="container" >
                        <div class="w-45 p-1 bg-light">Account Data</div>
                        <div class="row shadow p-3 border border-secondary mb-2 bg-white rounded">
                            <div class="col-md-6">
                                <label for="Account Name">
                                    <input type="text" name='Account_Name' placeholder="First Name" />
                                    <span>Account Name</span>
                                </label>
                            </div>
                            <div class="col-md-6">
                                <label for="Account_Number">
                                    <input type="text" name='Account_Number' placeholder="Last Name"/>
                                    <span>Account Number</span>
                                </label>
                            </div>

                            <div class="col-md-4">
                                <label for="magaya__MagayaEmail">
                                    <input type="text" name='magaya__MagayaEmail' placeholder="Magaya Email" />
                                    <span>Magaya Email</span>
                                </label>
                            </div>
                            <div class="col-md-4">
                                <label for="Phone">
                                    <input type="text" name='Phone' placeholder="Phone" />
                                    <span>Phone</span>
                                </label>
                            </div>
                            <div class="col-md-4">
                                <label for="Website">
                                    <input type="text" name='Website' placeholder="Home_Phone" />
                                    <span>Website</span>
                                </label>
                            </div>
                        </div>

                        <div class="w-25 p-1 bg-light">Billing Address</div>
                        <div class="p-3 row border border-secondary bg-white rounded">
                            <div class="col-md-4">
                                <label for="Billing_City">
                                    <input type="text" name='Billing_City' placeholder="Other_City" />
                                    <span>Billing City</span>
                                </label>
                            </div>
                            <div class="col-md-4">
                                <label for="Billing_Street">
                                    <input type="text" name='Billing_Street' placeholder="Other_Country" />
                                    <span>Billing Street</span>
                                </label>
                            </div>
                            <div class="col-md-4">
                                <label for="Billing_State">
                                    <input type="text" name='Billing_State' placeholder="Other_State" />
                                    <span>Billing State</span>
                                </label>
                            </div>
                            <div class="col-md-4">
                                <label for="Billing_Country">
                                    <input type="text" name='Billing_Country' placeholder="Other_Street" />
                                    <span>Billing Country</span>
                                </label>
                            </div>
                            <div class="col-md-4">
                                <label for="Billing Code">
                                    <input type="text" name='Billing_Code' placeholder="Other_Zip" />
                                    <span>Billing Code</span>
                                </label>
                            </div>
                        </div>
                    </form>
			    </div>
		    </div><!-- modal-body -->

			<div class="modal-footer" >
				<div class="col-md-12">
                    <button type="button" id="NewAccount" class="btn btn-primary" style="width:80px;margin-right: 20px; background-color: #0b3355">Save</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
			</div>
		</div><!--modal-content-->
    </div><!-- .modal-dialog -->
</div><!-- #modalContact -->


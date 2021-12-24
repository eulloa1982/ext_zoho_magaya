@extends('base_listmquote')
@section('main')
<style>
.number
{
    text-align-last:right;
}

.nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
    color: #007bff;
    background-color: #fff;
    border-color: #dee2e6 #dee2e6 #fff;
}

a {
    color: #495057;
    text-decoration: none;
    background-color: transparent;
}

.material-icons {
	font-size: 18px;
}

.panel select, .panel input {
    text-align-last: left;
    padding: 0px 5px 0px 10px;
    direction: initial;
}

.fieldset .legend {
    background: #0b3355;
    padding: 6px;
    font-weight: bold;
    color: white;
    padding-top: 2px;
    padding-bottom: 2px;
}

.modal {
  overflow-y:auto;
}
/**************************************** */
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900');

#table-quotes td:hover {
    text-shadow: -1px -1px 1px #fff, 1px 1px 1px #000;
	color: #000;
	opacity: 0.3;
	font: 'Museo700';
}
</style>


<!-- preview mquotes -->
@include('tab_widget.partials.listmquote.panel_search')


<!-- table list mquote -->
<div class="row">
	<div class="col-md-12">
		<div class="container-fluid" style="margin-top: 20px; padding: 0px;">
			<div class="card">
            	<div class="card-header" style="padding: 0px;background-color: #0b3355;border-color:#0b3355;">

                    <div class="row">
                        <div class="col-md-3" style="padding-top: 12px;">
                            <p style="color: white; font-weight: bold; font-size: 16px;padding-left: 20px;margin:0px">List mQuotes</p>
						</div>

                        <div class="col-md-9 float-right" style="padding: 5px 15px;">

                            <div class="float-right m-1">
                                <span id="magaya_link"></span>
                            </div>


                            <div class="btn-group float-right m-1">
								<button type="button" class="btn btn-primary addMquote " style="margin-right: 20px; font-weight: bold;">Add</button>
                                <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown">
                                    <span class="material-icons">more_horiz</span>
			  					</button>
								<div class="dropdown-menu">
									<a class="dropdown-item" id="deleteMquote">Mass Delete</a>
								</div>
                            </div>

                            <div class="btn-group float-right m-1">
                                <span class="material-icons dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="color: white;">view_week</span>
                                <div class="dropdown-menu" style="padding: 10px 5px 5px 10px;">
                                    <a class="toggle-vis dropdown-item"  data-column="1" ><span class="material-icons mr-2 oculto">check_box</span>Number</a>
                                    <a class="toggle-vis dropdown-item"  data-column="2"><span class="material-icons mr-2 oculto">check_box</span>Deal</a>
                                    <a class="toggle-vis dropdown-item" data-column="3"><span class="material-icons mr-2 oculto">check_box</span>Customer</a>
                                    <a class="toggle-vis dropdown-item" data-column="4"><span class="material-icons mr-2 oculto">check_box</span>Stage</a>
                                    <a class="toggle-vis dropdown-item" data-column="5"><span class="material-icons mr-2 oculto">check_box</span>Amount</a>
                                    <a class="toggle-vis dropdown-item" data-column="6"><span class="material-icons mr-2 oculto">check_box_outline_blank</span>Modified Time</a>
                                    <a class="toggle-vis dropdown-item" data-column="7"><span class="material-icons mr-2 oculto">check_box_outline_blank</span>Created Time</a>
                                    <a class="toggle-vis dropdown-item" data-column="8"><span class="material-icons mr-2 oculto">check_box_outline_blank</span>Magaya updated</a>
                                    <a class="toggle-vis dropdown-item" data-column="9"><span class="material-icons mr-2 oculto">check_box_outline_blank</span>Description</a>
                                    <a class="toggle-vis dropdown-item" data-column="10"><span class="material-icons mr-2 oculto">check_box_outline_blank</span>Destination</a>
                                    <a class="toggle-vis dropdown-item" data-column="11"><span class="material-icons mr-2 oculto">check_box_outline_blank</span>Origin</a>
                                    <a class="toggle-vis dropdown-item" data-column="12"><span class="material-icons mr-2 oculto">check_box_outline_blank</span>Seller</a>
                                    <a class="toggle-vis dropdown-item" data-column="13"><span class="material-icons mr-2 oculto">check_box_outline_blank</span>Service</a>
                                    <a class="toggle-vis dropdown-item" data-column="14"><span class="material-icons mr-2 oculto">check_box_outline_blank</span>Created By</a>
                                    <a class="toggle-vis dropdown-item" data-column="15"><span class="material-icons mr-2 oculto">check_box_outline_blank</span>Created By Name</a>
                                    <a class="toggle-vis dropdown-item" data-column="16"><span class="material-icons mr-2 oculto">check_box_outline_blank</span>Incoterms</a>
                                    <a class="toggle-vis dropdown-item" data-column="17"><span class="material-icons mr-2 oculto">check_box_outline_blank</span>Is Hazardous</a>
                                    <a class="toggle-vis dropdown-item" data-column="18"><span class="material-icons mr-2 oculto">check_box_outline_blank</span>Issued By</a>
                                    <a class="toggle-vis dropdown-item" data-column="19"><span class="material-icons mr-2 oculto">check_box_outline_blank</span>Added Time</a>
                                    <a class="toggle-vis dropdown-item" data-column="20"><span class="material-icons mr-2 oculto">check_box_outline_blank</span>Magaya Status</a>
                                    <a class="toggle-vis dropdown-item" data-column="21"><span class="material-icons mr-2 oculto">check_box_outline_blank</span>Modified By</a>
                                    <a class="toggle-vis dropdown-item" data-column="22"><span class="material-icons mr-2 oculto">check_box_outline_blank</span>Owner</a>
                                    <a class="toggle-vis dropdown-item" data-column="23"><span class="material-icons mr-2 oculto">check_box_outline_blank</span>Contact Email</a>
                                    <a class="toggle-vis dropdown-item" data-column="24"><span class="material-icons mr-2 oculto">check_box_outline_blank</span>Contact Home Phone</a>
                                    <a class="toggle-vis dropdown-item" data-column="25"><span class="material-icons mr-2 oculto">check_box_outline_blank</span>Contact Mobile</a>
                                    <a class="toggle-vis dropdown-item" data-column="26"><span class="material-icons mr-2 oculto">check_box_outline_blank</span>Contact Name</a>
                                    <a class="toggle-vis dropdown-item" data-column="27"><span class="material-icons mr-2 oculto">check_box_outline_blank</span>Contact Phone</a>
                                    <a class="toggle-vis dropdown-item" data-column="28"><span class="material-icons mr-2 oculto">check_box_outline_blank</span>Billing Street</a>
                                    <a class="toggle-vis dropdown-item" data-column="29"><span class="material-icons mr-2 oculto">check_box_outline_blank</span>Billing State</a>
                                    <a class="toggle-vis dropdown-item" data-column="30"><span class="material-icons mr-2 oculto">check_box_outline_blank</span>Billing Zip</a>
                                    <a class="toggle-vis dropdown-item" data-column="31"><span class="material-icons mr-2 oculto">check_box_outline_blank</span>Billing City</a>
                                    <a class="toggle-vis dropdown-item" data-column="32"><span class="material-icons mr-2 oculto">check_box_outline_blank</span>Billing Country</a>




                                </div>
					        </div>

						</div>
					</div>
				</div>
				<div class="card-body">
						<table class="display responsive nowrap table-hover" width="100%" id="table-quotes">
							<thead>
								<tr style="text-transform:uppercase;font-weight: bold;">
								<th class="border-top border-bottom border-right">Edit</th>
								<th class="border-top border-bottom border-right">Number</th>
                                <th class="border-top border-bottom border-right">Deal</th>
								<th class="border-top border-bottom border-right">Customer</th>
								<th class="border-top border-bottom border-right">Stage</th>
								<th class="border-top border-bottom border-right">Amount</th>
								<th class="border-top border-bottom border-right">Modify Time</th>
                                <th class="border-top border-bottom border-right">Created Time</th>
                                <th class="border-top border-bottom border-right">Magaya updated</th>
                                <th class="border-top border-bottom border-right">Description</th>
                                <th class="border-top border-bottom border-right">Destination</th>
                                <th class="border-top border-bottom border-right">Origin</th>
                                <th class="border-top border-bottom border-right">Seller</th>
                                <th class="border-top border-bottom border-right">Service</th>
                                <th class="border-top border-bottom border-right">Created By</th>
                                <th class="border-top border-bottom border-right">Created Name</th>
                                <th class="border-top border-bottom border-right">Incoterms</th>
                                <th class="border-top border-bottom border-right">Is Hazardous</th>
                                <th class="border-top border-bottom border-right">Issued By</th>
                                <th class="border-top border-bottom border-right">Added Time</th>
                                <th class="border-top border-bottom border-right">Mag Status</th>
                                <th class="border-top border-bottom border-right">Modified By</th>
                                <th class="border-top border-bottom border-right">Owner</th>
                                <th class="border-top border-bottom border-right">Representative Email</th>
                                <th class="border-top border-bottom border-right">Representative Home Phone</th>
                                <th class="border-top border-bottom border-right">Representative Mobile</th>
                                <th class="border-top border-bottom border-right">Representative Name</th>
                                <th class="border-top border-bottom border-right">Representative Phone</th>
                                <th class="border-top border-bottom border-right">Billing Street</th>
                                <th class="border-top border-bottom border-right">Billing State</th>
                                <th class="border-top border-bottom border-right">Billing Zip</th>
                                <th class="border-top border-bottom border-right">Billing City</th>
                                <th class="border-top border-bottom border-right">Billing Country</th>
								</tr>
							</thead>
							<tbody>

						    </tbody>
						</table>

                    <!-- get mquotes from CRM --
                    <span class="material-icons" id="less_page">arrow_back_ios</span-->
                    <span class="material-icons cursor-hand" id="more_page">arrow_forward_ios</span>

				</div>
			</div>
		</div>
	</div>
</div>

<!-- preview mquotes -->
@include('tab_widget.partials.listmquote.panel_preview')


<!-- modal to edit and insert mquotes -->
@include('tab_widget.partials.listmquote.form_modal')

<!-- modal contact form -->
@include('tab_widget.partials.listmquote.form_contact')

<!-- modal account form -->
@include('tab_widget.partials.listmquote.form_account')

@stop
@section('js')
<script src="{{ url('js/ui_listmquote/listmPagination.js', $extra = [], $secure = 1) }}"></script>
<script src="{{ url('js/store/storePagination.js', $extra = [], $secure = 1) }}"></script>

<script>
    Utils.blockUI();
    $(document).ready(function(){
        //Pagination from backend
        //add page
        $("#more_page").click(function(e) {
            storePagination.dispatch(addPage())
        })
        //minus page
        $("#less_page").click(function(e) {
            storePagination.dispatch(lessPage())
        })
        $(".material-icons").tooltip()

        //drop down menu fijo
        $('.dropdown-menu').on('click', function (e) {
            e.stopPropagation();
        });


       });
   </script>
@stop

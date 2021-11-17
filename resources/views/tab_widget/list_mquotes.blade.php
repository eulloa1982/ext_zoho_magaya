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
                            <p style="color: white; font-weight: bold; font-size: 16px;padding-left: 20px;margin:0px">List mQuote</p>
						</div>

                        <div class="col-md-3" style="padding-top: 12px;">
						</div>
                        <div class="col-md-2" style="padding: 5px 5px;">
                            <span id="magaya_link"></span>
                        </div>
                        <div class="col-md-2" style="padding: 5px 0px;">
							<div class="btn-group">
								<button type="button" class="btn btn-primary addMquote" style="margin-right: 20px; font-weight: bold;">Add</button>
                                <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown">
                                    <span class="material-icons">more_horiz</span>
			  					</button>
								<div class="dropdown-menu">
									<a class="dropdown-item" id="deleteMquote">Mass Delete</a>
								</div>
                            </div>
						</div>
                        <div class="col-md-2" style="padding: 5px 0px;">
                            <div class="btn-group">
                                <span class="material-icons dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="color: white;">view_week</span>
                                <div class="dropdown-menu" style="padding: 10px 5px 5px 10px;">
                                    <a class="toggle-vis dropdown-item"  data-column="1" ><span class="material-icons mr-2 oculto">visibility</span>Number</a>
                                    <a class="toggle-vis dropdown-item"  data-column="2"><span class="material-icons mr-2 oculto">visibility</span>Deal</a>
                                    <a class="toggle-vis dropdown-item" data-column="3"><span class="material-icons mr-2 oculto">visibility</span>Customer</a>
                                    <a class="toggle-vis dropdown-item" data-column="4"><span class="material-icons mr-2 oculto">visibility</span>Stage</a>
                                    <a class="toggle-vis dropdown-item" data-column="5"><span class="material-icons mr-2 oculto">visibility</span>Amount</a>
                                    <a class="toggle-vis dropdown-item" data-column="6"><span class="material-icons mr-2 oculto">visibility_off</span>Modified Time</a>
                                    <a class="toggle-vis dropdown-item" data-column="7"><span class="material-icons mr-2 oculto">visibility_off</span>Created Time</a>
                                    <a class="toggle-vis dropdown-item" data-column="8"><span class="material-icons mr-2 oculto">visibility_off</span>Magaya updated</a>
                                    <a class="toggle-vis dropdown-item" data-column="9"><span class="material-icons mr-2 oculto">visibility_off</span>Description</a>
                                    <a class="toggle-vis dropdown-item" data-column="10"><span class="material-icons mr-2 oculto">visibility_off</span>Destination</a>
                                    <a class="toggle-vis dropdown-item" data-column="11"><span class="material-icons mr-2 oculto">visibility_off</span>Origin</a>
                                    <a class="toggle-vis dropdown-item" data-column="12"><span class="material-icons mr-2 oculto">visibility_off</span>Seller</a>
                                    <a class="toggle-vis dropdown-item" data-column="13"><span class="material-icons mr-2 oculto">visibility_off</span>Service</a>
                                    <a class="toggle-vis dropdown-item" data-column="14"><span class="material-icons mr-2 oculto">visibility_off</span>Terms</a>
                                    <a class="toggle-vis dropdown-item" data-column="15"><span class="material-icons mr-2 oculto">visibility_off</span>Magaya GUID</a>

                                </div>
					        </div>
						</div>


					</div>
				</div>
				<div class="card-body">


						<table class="display responsive nowrap" width="100%" id="table-quotes">
							<thead>
								<tr style="text-transform:uppercase;font-weight: bold;">
								<th>Edit</th>
								<th>Number</th>
                                <th>Deal</th>
								<th>Customer</th>
								<th>Stage</th>
								<th>Amount</th>
								<th>Modify Time</th>
                                <th>Created Time</th>
                                <th>Magaya updated</th>
                                <th>Description</th>
                                <th>Destination</th>
                                <th>Origin</th>
                                <th>Seller</th>
                                <th>Service</th>
                                <th>Terms</th>
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

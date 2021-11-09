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
						<div class="col-md-4" style="padding: 5px 0px;">
							<form action="https://zm" class="form-inline my-2 my-lg-0">
								<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" style="margin-left:-100px;">
                                <span class="input-group-btn"><span class="btn btn-primary" id="search-by-name" style="padding-top: 10px; padding-bottom: 3px;height: 38px;"><span class="material-icons">search</span></span></span>
							</form>
						</div>
                        <div class="col-md-3" style="padding: 5px 5px;">
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
					</div>
				</div>
				<div class="card-body">
					<div class="table-responsive">
						<table class="table table-bordred table-striped" id="table-quotes" width="100%" cellspacing="0">
							<thead>
								<tr style="text-transform:uppercase;font-weight: bold;">
								<th>Edit</th>
								<th>Number</th>
								<th>Customer</th>
								<th>Stage</th>
								<th>Amount</th>
								<th>Modify Time</th>
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

<!-- modal contact -->
@include('tab_widget.partials.listmquote.form_contact')



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
            $(".material-icons").tooltip();
        });
   </script>
@stop

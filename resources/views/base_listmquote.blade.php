<!DOCTYPE html>
<html lang="en">
<head>
    <base href="{{ url('.') }}">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="generator" content="Visual Studio Code">
    <title>Magaya</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <!--link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
    <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid.min.css" />
    <!--link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid-theme.min.css" /-->

    <link href="{{ url('datetimepicker/jquery.datetimepicker.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="{{ url('css/preloader.css') }}"/>
    <link rel="stylesheet" href="{{ url('css/custom-lismquotes.css') }}"/>
    <!--link rel="stylesheet" href="{{ url('css/dataTables/dataTables.bootstrap.css') }}"/-->
    <link rel="stylesheet" href="{{ url('css/table_listmquote.css') }}"/>
    <!--link rel="stylesheet" href="{{ url('css/form_listmquote.css') }}"/-->
    <link rel="stylesheet" href="{{ url('css/font_css_material-design-iconic-font.min.css') }}"/>

</head>
<body style="margin-top:40px">

<div id="preloader" >
      <div class="loading-animation">
        <div class="line">
            <span class="break dot1"></span>
            <span class="break dot2"></span>
            <span class="break dot3"></span>
            <span class=""></span>
            <span class=""></span>
        </div>
      </div>
    </div>


    <div id="quote-alert" class="alert alert-danger alert-dismissible" style="position: absolute; display: none; z-index: 6000">
        <button class="noselect"><span class='text'>Close</span><span id="close-all" data-close="quote-alert" class="icon">X</span></button>
        <div id="message-alert"></div>

    </div>

    <div id="quote-info" class="alert alert-success alert-dismissible" style="position: absolute; display: none; z-index: 6000;">
        <button class="noselect"><span class='text'>Close</span><span id="close-all" data-close="quote-info" class="icon">X</span></button>
        <div id="message-info"></div>
    </div>



    @yield('main')
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>

    <script src="{{ url('js/moment.js') }}"></script>
    <script src="{{ url('js/magaya_api.js') }}"></script>
    <script src="{{ url('sweetalert/sweetalert.js') }}"></script>
    <script src="{{ url('select2/js/select2.full.js') }}"></script>
    <script src="{{ url('datetimepicker/build/jquery.datetimepicker.full.min.js') }}"></script>
    <script src="{{ url('underscore-master/underscore-min.js') }}"></script>
    <!--SDK CDN-->
    <script src="https://live.zwidgets.com/js-sdk/1.1/ZohoEmbededAppSDK.min.js"></script>
    <script src="{{ url('js/utils.js') }}"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/4.1.1/redux.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js"></script>
    <!--script src="https://cdn.rawgit.com/lexich/redux-api/0.9.8/dist/redux-api.js"></script-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid.min.js"></script>
    <!--script src="https://cdn.datatables.net/1.11.0/js/jquery.dataTables.min.js"></script-->

    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>

    <script src="{{ url('js/ui_listmquote/biblio_jquery.js') }}"></script>
    <!--script src="{{ url('js/quotation3.js') }}"></script>
    <script src="{{ url('js/quotation_utils3.js') }}"></script>
    <script src="{{ url('js/magaya_api.js') }}"></script>
    <script src="{{ url('js/utils.js') }}"></script-->

    <script src="{{ url('js/errors_handlers/errors.js') }}"></script>
    <script src="{{ url('js/store/constants.js') }}"></script>
    <script src="{{ url('js/store/storeError.js') }}"></script>
    <script src="{{ url('js/store/storeSuccess.js') }}"></script>
    <script src="{{ url('js/store/store.js') }}"></script>
    <script src="{{ url('js/store/storeAccounts.js') }}"></script>
    <script src="{{ url('js/store/storeQuotes.js') }}"></script>
    <script src="{{ url('js/store/storeItems.js') }}"></script>
    <script src="{{ url('js/store/storeCharges.js') }}"></script>
    <script src="{{ url('js/store/storeOrganization.js') }}"></script>

    <script src="{{ url('js/ui_listmquote/subscribers/subscribersCharges.js') }}"></script>
    <script src="{{ url('js/ui_listmquote/subscribers/subscribersItems.js') }}"></script>
    <script src="{{ url('js/ui_listmquote/subscribers/subscribersQuotes.js') }}"></script>

    <script type="text/javascript" src="{{ url('js/ui_listmquote/listmQuoteInitial.js') }}" async="async"></script>
    <script type="text/javascript" src="{{ url('js/ui_listmquote/listmQuote.js') }}" async="async"></script>
    <script type="text/javascript" src="{{ url('js/ui_listmquote/listmQuoteButtons.js') }}" async="async"></script>


    <!--script src="{{ url('js/store/storeForms.js') }}"></script-->

    @yield('js')


    <div class="modal fade" id="exampleModal4" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel4" aria-hidden="true">
  <div class="modal-dialog modal-dialog-slideout modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal sideout large</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body">
        <div id="info-datad"></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
  </body>
</html>

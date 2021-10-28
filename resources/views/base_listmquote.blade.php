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

    <link href="{{ url('datetimepicker/jquery.datetimepicker.css', $extra = [], $secure = 1) }}" rel="stylesheet">
    <link rel="stylesheet" href="{{ url('css/preloader.css', $extra = [], $secure = 1) }}"/>
    <link rel="stylesheet" href="{{ url('css/custom-lismquotes.css', $extra = [], $secure = 1) }}"/>
    <!--link rel="stylesheet" href="{{ url('css/dataTables/dataTables.bootstrap.css') }}"/-->
    <link rel="stylesheet" href="{{ url('css/table_listmquote.css', $extra = [], $secure = 1) }}"/>
    <!--link rel="stylesheet" href="{{ url('css/form_listmquote.css') }}"/-->
    <link rel="stylesheet" href="{{ url('css/font_css_material-design-iconic-font.min.css', $extra = [], $secure = 1) }}"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pretty-checkbox@3.0/dist/pretty-checkbox.min.css" />
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



    <div id="quote-alert" style="position: absolute; display: none; z-index: 6000">
        <div class="header"><span class="material-icons close cursor-hand" data-close="quote-alert" style="margin: 4px 4px 0px 4px; color: white; background: none; border: none;">close</span></div>
        <div id="message-alert" class="message-data"></div>
    </div>

    <div id="quote-info" style="position: absolute; display: none; z-index: 6000;">
        <div class="header"><span class="material-icons close cursor-hand" data-close="quote-info" style="margin: 4px 4px 0px 4px; color: white; background: none; border: none;">close</span ></div>
        <div id="message-info" class="message-data"></div>
    </div>
    <div class="alert alert-danger startSession" id="no-configuration-alert" style="display: none">
        Can´t reach Magaya, check Login data or try to Log in <a class="btn btn-outline-success" id="magaya-loguin">Login</a>
    </div>

    @yield('main')






    <script src="{{ url('js/jquery-3.5.1.min.js', $extra = [], $secure = 1) }} "></script>
    <script src="https://cdn.jsdelivr.net/gh/jitbit/HtmlSanitizer@master/HtmlSanitizer.js"></script>

    <script src="{{ url('js/utils/moment.js', $extra = [], $secure = 1) }}"></script>
    <script src="{{ url('sweetalert/sweetalert.js', $extra = [], $secure = 1) }}"></script>
    <script src="{{ url('select2/js/select2.full.js', $extra = [], $secure = 1) }}"></script>
    <script src="{{ url('datetimepicker/build/jquery.datetimepicker.full.min.js', $extra = [], $secure = 1) }}"></script>
    <script src="{{ url('underscore-master/underscore-min.js', $extra = [], $secure = 1) }}"></script>
    <!--script src="{{ url('decimal/decimal.js') }}"></script>
    <SDK CDN-->
    <script src="https://live.zwidgets.com/js-sdk/1.1/ZohoEmbededAppSDK.min.js"></script>
    <!--script src="{{ url('js/utils.js') }}"></script-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/4.1.1/redux.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js"></script>
    <!--script src="https://cdn.rawgit.com/lexich/redux-api/0.9.8/dist/redux-api.js"></script-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid.min.js"></script>
    <!--script src="https://cdn.datatables.net/1.11.0/js/jquery.dataTables.min.js"></script-->

    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>


    <script src="{{ url('js/ui_listmquote/utils/biblio_jquery.js', $extra = [], $secure = 1) }}"></script>
    <!--script src="{{ url('js/quotation3.js') }}"></script>
    <script src="{{ url('js/quotation_utils3.js') }}"></script-->
    <script src="{{ url('js/utils/magaya_api.js', $extra = [], $secure = 1) }}"></script>
    <script src="{{ url('js/utils/utils.js', $extra = [], $secure = 1) }}"></script>

    <!--script type="text/javascript" src="{{ url('js/ui_listmquote/listToolsInitial.js', $extra = [], $secure = 1) }}"></script-->
    <script type="text/javascript" src="{{ url('js/ui_listmquote/listmQuoteInitial.js', $extra = [], $secure = 1) }}"></script>
    <script src="{{ url('js/errors_handlers/errors.js', $extra = [], $secure = 1) }}"></script>
    <script src="{{ url('js/store/constants.js', $extra = [], $secure = 1) }}"></script>

    <script src="{{ url('js/store/storeError.js', $extra = [], $secure = 1) }}"></script>
    <script src="{{ url('js/store/storeSuccess.js', $extra = [], $secure = 1) }}"></script>
    <script src="{{ url('js/store/store.js', $extra = [], $secure = 1) }}"></script>
    <script src="{{ url('js/store/storeAccounts.js', $extra = [], $secure = 1) }}"></script>
    <script src="{{ url('js/store/storeQuotes.js', $extra = [], $secure = 1) }}"></script>
    <script src="{{ url('js/store/storeItems.js', $extra = [], $secure = 1) }}"></script>
    <script src="{{ url('js/store/storeCharges.js', $extra = [], $secure = 1) }}"></script>
    <script src="{{ url('js/store/storeOrganization.js', $extra = [], $secure = 1) }}"></script>
    <script src="{{ url('js/store/storeDeal.js', $extra = [], $secure = 1) }}"></script>
    <script src="{{ url('js/store/storePorts.js', $extra = [], $secure = 1) }}"></script>
    <script src="{{ url('js/store/storeChargesType.js', $extra = [], $secure = 1) }}"></script>


    <script src="{{ url('js/ui_listmquote/subscribers/subscribersAccounts.js', $extra = [], $secure = 1) }}"></script>
    <script src="{{ url('js/ui_listmquote/subscribers/subscribersCharges.js', $extra = [], $secure = 1) }}"></script>
    <script src="{{ url('js/ui_listmquote/subscribers/subscribersItems.js', $extra = [], $secure = 1) }}"></script>
    <script src="{{ url('js/ui_listmquote/subscribers/subscribersQuotes.js', $extra = [], $secure = 1) }}"></script>
    <script src="{{ url('js/ui_listmquote/subscribers/subscribersDeal.js', $extra = [], $secure = 1) }}"></script>
    <script src="{{ url('js/ui_listmquote/subscribers/subscribersPorts.js', $extra = [], $secure = 1) }}"></script>

    <script type="text/javascript" src="{{ url('js/ui_listmquote/utils/listmQuote.js', $extra = [], $secure = 1) }}"></script>
    <script type="text/javascript" src="{{ url('js/ui_listmquote/utils/listmQuoteButtons.js', $extra = [], $secure = 1) }}"></script>
    <script type="text/javascript" src="{{ url('js/ui_listmquote/utils/listmQuoteFormEdit.js', $extra = [], $secure = 1) }}"></script>
    <script type="text/javascript" src="{{ url('js/ui_listmquote/utils/triggers.js', $extra = [], $secure = 1) }}"></script>

    <script src="{{ url('js/ui_listmquote/validators/validators.js', $extra = [], $secure = 1) }}"></script>


    <script src="{{ url('html2pdf/html2canvas.min.js', $extra = [], $secure = 1) }}"></script>
    <script src="{{ url('html2pdf/html2pdf.bundle.min.js', $extra = [], $secure = 1) }}"></script>
    <!--script src="{{ url('js/store/storeForms.js') }}"></script-->

    @yield('js')


  </body>
</html>

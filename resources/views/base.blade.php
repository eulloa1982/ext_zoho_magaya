<!doctype html>
<html lang="en">
  <head>
    <base href="{{ url('.') }}">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="generator" content="Visual Studio Code">
    <title>Magaya</title>
    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link href="{{ url('bootstrap/css/bootstrap.min.css') }}" rel="stylesheet">
    <!-- Plugins -->
    <link href="{{ url('sweetalert/sweetalert2.min.css', $extra = [], $secure = 1) }}" rel="stylesheet">
    <link href="{{ url('font-awesome/css/all.min.css', $extra = [], $secure = 1) }}" rel="stylesheet">
    <link href="{{ url('css/jquery-ui.css', $extra = [], $secure = 1) }}" rel="stylesheet">

    <link href="{{ url('datetimepicker/jquery.datetimepicker.css', $extra = [], $secure = 1) }}" rel="stylesheet">
    <link href="{{ url('daterangepicker/daterangepicker.css', $extra = [], $secure = 1) }}" rel="stylesheet">
        <link href="{{ url('select2/css/select2.css', $extra = [], $secure = 1) }}" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="css/custom.css" rel="stylesheet">
  </head>
  <body>
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
    @yield('main')
    <script src="https://cdn.jsdelivr.net/gh/jitbit/HtmlSanitizer@master/HtmlSanitizer.js"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/4.1.1/redux.min.js"></script>
    <script src="{{ url('js/store/constants.js', $extra = [], $secure = 1) }}"></script>

    <script src="{{ url('js/store/storeError.js', $extra = [], $secure = 1) }}"></script>
    <script src="{{ url('js/store/storeSuccess.js', $extra = [], $secure = 1) }}"></script>
    <script src="{{ url('js/store/storeChargesDef.js', $extra = [], $secure = 1) }}"></script>
    <script src="{{ url('js/store/storeItemsCrm.js', $extra = [], $secure = 1) }}"></script>
    <script src="{{ url('js/store/storeCurrentModule.js', $extra = [], $secure = 1) }}"></script>
    <script src="{{ url('js/store/storePortsDef.js', $extra = [], $secure = 1) }}"></script>

    <script src="{{ url('html2pdf/html2canvas.min.js', $extra = [], $secure = 1) }}"></script>
    <script src="{{ url('html2pdf/html2pdf.bundle.min.js', $extra = [], $secure = 1) }}"></script>
    <script src="{{ url('js/utils/moment.js', $extra = [], $secure = 1) }}"></script>
    <script src="{{ url('js/utils/utils.js', $extra = [], $secure = 1) }}"></script>
    <script src="{{ url('js/utils/magaya_api.js', $extra = [], $secure = 1) }}"></script>
    <script src="{{ url('bootstrap/js/bootstrap.bundle.min.js', $extra = [], $secure = 1) }}"></script>
    <script src="{{ url('bootstrap/js/popper.min.js', $extra = [], $secure = 1) }}"></script>
    <!--script src="{{ url('js/biblio.jquery.js') }}"></script>
    <script src="{{ url('js/json2xml.js') }}"></script>
    <script src="{{ url('js/xml2json.js') }}"></script>
    <script src="{{ url('js/jquery.serializejson.js') }}"></script-->
    <script src="{{ url('js/jquery-ui.js', $extra = [], $secure = 1) }}"></script>
    <script src="{{ url('daterangepicker/daterangepicker.js', $extra = [], $secure = 1) }}"></script>
    <script src="{{ url('sweetalert/sweetalert.js', $extra = [], $secure = 1) }}"></script>
    <script src="{{ url('select2/js/select2.full.js', $extra = [], $secure = 1) }}"></script>
    <script src="{{ url('datetimepicker/build/jquery.datetimepicker.full.min.js', $extra = [], $secure = 1) }}"></script>
    <script src="{{ url('underscore-master/underscore-min.js', $extra = [], $secure = 1) }}"></script>
    <!--SDK CDN-->
    <script src="https://live.zwidgets.com/js-sdk/1.1/ZohoEmbededAppSDK.min.js"></script>

    <script src="{{ url('js/ui_madmin/madmin.js', $extra = [], $secure = 1) }}"></script>


    @yield('js')
  </body>
</html>

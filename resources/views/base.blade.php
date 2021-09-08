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
    <link href="{{ url('bootstrap/css/bootstrap.min.css') }}" rel="stylesheet">
    <!-- Plugins -->
    <link href="{{ url('sweetalert/sweetalert2.min.css') }}" rel="stylesheet">
    <link href="{{ url('font-awesome/css/all.min.css') }}" rel="stylesheet">
    <link href="{{ url('css/jquery-ui.css') }}" rel="stylesheet">
    
    <link href="{{ url('datetimepicker/jquery.datetimepicker.css') }}" rel="stylesheet">
    <link href="{{ url('daterangepicker/daterangepicker.css') }}" rel="stylesheet">
        <link href="{{ url('select2/css/select2.css') }}" rel="stylesheet">

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
    <script src="{{ url('js/jquery-3.6.0.js') }}"></script>
    <script src="{{ url('html2pdf/html2canvas.min.js') }}"></script>
    <script src="{{ url('html2pdf/html2pdf.bundle.min.js') }}"></script>
    <script src="{{ url('js/moment.js') }}"></script>
    <script src="{{ url('js/utils.js') }}"></script>
    <script src="{{ url('js/magaya_api.js') }}"></script>   
    <script src="{{ url('bootstrap/js/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ url('bootstrap/js/popper.min.js') }}"></script>
    <!--script src="{{ url('js/biblio.jquery.js') }}"></script>
    <script src="{{ url('js/json2xml.js') }}"></script>
    <script src="{{ url('js/xml2json.js') }}"></script>
    <script src="{{ url('js/jquery.serializejson.js') }}"></script-->
    <script src="{{ url('js/jquery-ui.js') }}"></script>
    <script src="{{ url('daterangepicker/daterangepicker.js') }}"></script>
    <script src="{{ url('sweetalert/sweetalert.js') }}"></script>
    <script src="{{ url('select2/js/select2.full.js') }}"></script>
    <script src="{{ url('datetimepicker/build/jquery.datetimepicker.full.min.js') }}"></script>
    <script src="{{ url('underscore-master/underscore-min.js') }}"></script>
    <!--SDK CDN-->
    <script src="https://live.zwidgets.com/js-sdk/1.1/ZohoEmbededAppSDK.min.js"></script>

    @yield('js')
  </body>
</html>

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

  </head>

  <style>

    @keyframes preloader {
    0% {
        height: 5px;
        transform: translateY(0px);
        background: #334E68;
    }
    25% {
        height: 30px;
        transform: translateY(15px);
        background: #3fbb91;
    }
    50% {
        height: 5px;
        transform: translateY(0px);
        background: #3e847e;
    }
    100% {
        height: 5px;
        transform: translateY(0px);
        background: #3d566e;
    }
}

#preloader {
    display: none;
    z-index: 1060;
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
}

#preloader .loading-animation {
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -30px;
    z-index: 100;
}

#preloader .loading-animation span {
    display: block;
    bottom: 0;
    width: 9px;
    height: 5px;
    background: #334E68;
    position: absolute;
    animation: preloader 1.5s infinite ease-in-out;
    -webkit-animation: preloader 1.5s infinite ease-in-out;
    -moz-animation: preloader 1.5s infinite ease-in-out;
    -ms-animation: preloader 1.5s infinite ease-in-out;
}

#preloader .loading-animation span:nth-child(2) {
    left: 11px;
    animation-delay: .2s;
    -webkit-animation-delay: .2s;
    -moz-animation-delay: .2s;
    -ms-animation-dealy: .2s;
}

#preloader .loading-animation span:nth-child(3) {
    left: 22px;
    animation-delay: .4s;
    -webkit-animation-delay: .4s;
    -moz-animation-delay: .4s;
    -ms-animation-dealy: .4s;
}

#preloader .loading-animation span:nth-child(4) {
    left: 33px;
    animation-delay: .6s;
    -webkit-animation-delay: .6s;
    -moz-animation-delay: .6s;
    -ms-animation-dealy: .6s;
}

#preloader .loading-animation span:nth-child(5) {
    left: 44px;
    animation-delay: .8s;
    -webkit-animation-delay: .8s;
    -moz-animation-delay: .8s;
    -ms-animation-dealy: .8s;
}








body {
  background-color: rgba(0, 0, 0, 0.3);
}

* {
  box-sizing: border-box;
}

a {
  text-decoration: none;
}

li {
    color: white;
}

.tall {
  height: 2000px;
  width: 100%;
  margin-top: 100px;
  margin-left: 10px;
}

.overlay {
  position: fixed;
  z-index: 1;
  background-color: #313715;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  pointer-events: none;
  transition: all 300ms ease-in-out;
}
.overlay .main-nav {
  width: 100%;
  margin: 100px 0 0 20px;
  position: absolute;
  top: 20%;
  transition: all 300ms ease-in-out;
}
.overlay .main-nav li {
  font-size: 20px;
  padding: 10px;
  width: auto;
}
.overlay .main-nav li a {
  color: white;
}

.nav-toggle {
  position: fixed;
  top: 20px;
  left: 0;
  width: 120px;
  height: 50px;
  background-color: black;
  z-index: 2;
  opacity: 0.3;
}

.nav-toggle .toggle-botton .middle .top-left .top-right :hover {
    opacity: 0.1;
}

.nav-toggle .toggle-botton {
  position: absolute;
  height: 100%;
  width: 30%;
  background-color: red;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.nav-toggle .toggle-botton .middle {
  width: 60%;
  height: 3px;
  opacity: 1;
  position: absolute;
  background-color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 300ms ease-in-out;
}
.nav-toggle .toggle-botton .top-left {
  width: 30%;
  height: 3px;
  position: absolute;
  background-color: white;
  top: 30%;
  left: 50%;
  transform: translate(-100%, -50%);
  transition: all 300ms ease-in-out;
}
.nav-toggle .toggle-botton .top-right {
  width: 30%;
  height: 3px;
  position: absolute;
  background-color: white;
  top: 30%;
  left: 50%;
  transform: translate(0%, -50%);
  transition: all 300ms ease-in-out;
}
.nav-toggle .toggle-botton .bottom-left {
  width: 30%;
  height: 3px;
  position: absolute;
  background-color: white;
  bottom: 25%;
  left: 50%;
  transform: translate(-100%, -50%);
  transition: all 300ms ease-in-out;
}
.nav-toggle .toggle-botton .bottom-right {
  width: 30%;
  height: 3px;
  position: absolute;
  background-color: white;
  bottom: 25%;
  left: 50%;
  transform: translate(0%, -50%);
  transition: all 300ms ease-in-out;
}
.nav-toggle.is-active .toggle-botton .middle {
  opacity: 0.3;
}
.nav-toggle.is-active .toggle-botton .top-left {
  top: 30%;
  left: 50%;
  transform: translate(-70%, -50%) rotate(45deg);
  transform-origin: left center;
}
.nav-toggle.is-active .toggle-botton .bottom-right {
  bottom: 25%;
  left: 50%;
  transform-origin: right center;
  transform: translate(-30%, -50%) rotate(45deg);
}
.nav-toggle.is-active .toggle-botton .top-right {
  top: 30%;
  left: 50%;
  transform-origin: right center;
  transform: translate(-30%, -50%) rotate(-45deg);
}
.nav-toggle.is-active .toggle-botton .bottom-left {
  bottom: 25%;
  left: 50%;
  transform-origin: left center;
  transform: translate(-70%, -50%) rotate(-45deg);
}
.nav-toggle.is-active + .overlay {
  opacity: 1;
  pointer-events: auto;
}
.nav-toggle.is-active + .overlay .main-nav {
  top: 0%;
}
.nav-toggle.is-active .logo {
  background-color: white;
  color: black;
}

.logo {
  display: block;
  position: absolute;
  width: 70%;
  height: 100%;
  background-color: transparent;
  left: 30%;
  color: white;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  transition: all 300ms ease-in-out;
  letter-spacing: 5px;
}

/*##############################*/
/*####### MEDIA QUERIES #######*/
/*##############################*/
/*@media screen and (max-width: 600px) {
  .tall {
    font-size: 40px;
  }

  .logo {
    font-size: 16px;
  }

  .overlay .main-nav li {
    font-size: 30px;
  }
}*/



</style>





  <body>
  <div id="quote-alert" class="alert alert-danger" style="position: absolute; display: none; z-index: 200"></div>
    <div id="quote-info" class="alert alert-info" style="position: absolute; display: none; z-index: 200;"></div>



  <div class="nav-toggle">
  <div class="toggle-botton">
    <div class="top-left"></div>
    <div class="top-right"></div>
    <div class="middle"></div>
    <div class="bottom-left"></div>
    <div class="bottom-right"></div>
  </div>
  <h1 class="logo"><i class="fas fa-plus"></i></h1>
</div>

<div class="overlay">

  <nav class="main-nav">
    <div class="row" style="padding:10px 10px 10px 40px;" >
        <div class="col-md-2">
            <label>Quantity</label>
            <div class="input-group">
                <div class="input-group-text"><i class="fas fa-cash-register"></i></div>
                    <input type="numeric" name="Item-Pieces" class='form-control' />
                </div>
        </div>

        <div class="col-md-2">
                <label>Package</label>
                <div class="input-group">
                    <div class="input-group-text"><i class="fas fa-cash-register"></i></div>
                    <select id='select-package' name="select-package" class="form-control"></select>
                </div>
            </div>

            <div class="col-md-2">
                <label>Length</label>
                <div class="input-group">
                    <div class="input-group-text"><i class="fas fa-arrows-alt-h"></i></div>
                    <input type="text" name="Item-Length" id="Item-Length" class='form-control' />
                </div>
            </div>

            <div class="col-md-2">
                <label>Height</label>
                <div class="input-group">
                    <div class="input-group-text"><i class="fas fa-arrows-alt-v"></i></div>
                    <input type="text" name="Item-Height" class='form-control' />
                </div>
            </div>
            <div class="col-md-2">
                <label>Width</label>
                <div class="input-group">
                    <div class="input-group-text"><i class="fas fa-exchange-alt"></i></div>
                    <input type="text" name="Item-Width" class='form-control' />
                </div>
            </div>

            <div class="col-md-2">
                <label>Weight</label>
                <div class="input-group">
                    <div class="input-group-text"><i class="fas fa-balance-scale"></i></div>
                    <input type="text" name="Item-Weight" class='form-control' />
                </div>
            </div>

        </div>
        <div class="row" style="padding:10px 10px 10px 40px;">
            <span class="btn btn-primary" id="sendItem"><i class="far fa-save fa-2x"></i></i></label>
        </div>

        <!--ul>
      <li></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Blog</a></li>
      <li><a href="#">Work</a></li>
      <li><a href="#">Contact</a></li>
    </ul-->
  </nav>
</div>

<div class="tall">
<div class="card">
            <div class="card-body">
                <div class="table-responsive-scroll">
                <table class="table" id="table-items">
                    <thead><tr>
                    <td>Delete</td>
                    <td>Status</td>
                    <td>Package</td>
                    <td>Quantity</td>
                    <td>Length</td>
                    <td>Height</td>
                    <td>Width</td>
                    <td>Weigth</td>
                    <td>Volume</td>
                    </tr></thead>
                    <tbody></tbody>
                </table>

            </div>

        </div>
</div>





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







</body>
</html>
    <script src="{{ url('js/jquery-3.6.0.js') }}"></script>
    <script src="{{ url('js/utils.js') }}"></script>
    <script src="{{ url('bootstrap/js/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ url('bootstrap/js/popper.min.js') }}"></script>
    <script src="{{ url('js/jquery-ui.js') }}"></script>
    <script src="{{ url('select2/js/select2.full.js') }}"></script>
    <script src="{{ url('underscore-master/underscore-min.js') }}"></script>
   <!--SDK CDN-->
    <script src="https://live.zwidgets.com/js-sdk/1.1/ZohoEmbededAppSDK.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/4.1.1/redux.min.js"></script>
    <script src="{{ url('js/biblio.jquery3.js') }}"></script>

    <script src="{{ url('js/store/storeError.js') }}"></script>
    <script src="{{ url('js/store/storeSuccess.js') }}"></script>
    <script src="{{ url('js/store/storeItems.js') }}"></script>




<script>



$(document).ready(function(){

    $(function(){
  $('.toggle-botton').on('click',function(){
    $('.nav-toggle').toggleClass('is-active')
  })

  $('.main-nav li a').on('click',function(){
    $('.nav-toggle').toggleClass('is-active');
  })
})


    var idQuote = 0;
    var packageType = []
    //get zoho data
    ZOHO.embeddedApp.on("PageLoad",function(data)
    {
        idQuote = data.EntityId;

        //charges types
        ZOHO.CRM.API.getAllRecords({Entity:"magaya__Package_Types",sort_order:"asc",per_page:20,page:1})
            .then(function(data){
                $("#select-package").empty();
                $.map (data.data, function (k, i){
                    packageType.push(k)
                    $("<option value='"+i+"'>"+k.Name+"</option>").appendTo("#select-package");
                    let name = k.Name;
                })

                console.log(packageType)
            })

        //get related records charges
        ZOHO.CRM.API.getRelatedRecords({ Entity: "magaya__SQuotes", RecordID: idQuote, RelatedList: "magaya__SQuote_Name1", page: 1, per_page: 200 })
            .then(function(response) {
                $("#table-items tbody").empty();
                if (!_.isEmpty(response.data)) {
                    idemItems = response.data
                    $.each(idemItems, function(i, k) {
                        let volume = k.magaya__Length * k.magaya__Height * k.magaya__Width;
                        console.log("Iniciando el store")
                        storeItem.dispatch(addItem({id: k.id, name: k.Name, pieces: k.magaya__Pieces, length: k.magaya__Length, height: k.magaya__Height, width: k.magaya__Width, weigth: k.magaya__Weigth, volume: volume}))

                    }) //each

                }
            }) //then

    })



    ZOHO.embeddedApp.init()

    //enviar el nuevo service item
    $("#sendItem").click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        //recibir los campos
        rowIndex = $("#select-package").val();

        var packageName = $('select[name="select-package"] option:selected').text();
        var pieces = ($(":input[name=Item-Pieces]").val()) > 0 ? $(":input[name=Item-Pieces]").val() : '1';
        var length = ($(":input[name=Item-Length]").val()) > 0 ? $(":input[name=Item-Length]").val() : (packageType[rowIndex]['magaya__PackageLenght'] >= 0 ? packageType[rowIndex]['magaya__PackageLenght'] : 0);
        var height = ($(":input[name=Item-Height]").val()) > 0 ? $(":input[name=Item-Height]").val() : (packageType[rowIndex]['magaya__PackageHeight'] >= 0 ? packageType[rowIndex]['magaya__PackageHeight'] : 0);
        var width = ($(":input[name=Item-Width]").val()) > 0 ? $(":input[name=Item-Width]").val() : (packageType[rowIndex]['magaya__PackageWidth'] >= 0 ? packageType[rowIndex]['magaya__PackageWidth'] : 0);
        var weight = ($(":input[name=Item-Weight]").val()) > 0 ? $(":input[name=Item-Weight]").val() : (packageType[rowIndex]['magaya__PackageWeigth'] >= 0 ? packageType[rowIndex]['magaya__PackageWeigth'] : 0);
        var volume = parseFloat(length) * parseFloat(width) * parseFloat(height);

        pieces = parseInt(pieces);
        length = parseFloat(length);
        height = parseFloat(height);
        width = parseFloat (width);
        weight = parseFloat(weight);
        volume = parseFloat(volume);

        //formar el objeto
        item = {
            'magaya__SQuote_Name': idQuote,
            'Name': packageName,
            'magaya__Status': 'InQuote',
            'magaya__Pieces': pieces,
            'magaya__Length': length,
            'magaya__Height': height,
            'magaya__Width': width,
            'magaya__Weigth': weight,
            'magaya__Volume': volume
        }

        ZOHO.CRM.API.insertRecord({ Entity: "magaya__ItemQuotes", APIData: item, Trigger: [] })
            .then(function(data) {
                res = data.data;
                $.map(res, function(k, v) {
                    if (k.code !== "SUCCESS") {
                        codeError = k.code;
                        field = k.details.api_name;
                        show = true;
                        module = 'Cargo Items'

                        storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))

                    } else {
                        console.log("New item response", data.data)
                        let res = data.data;
                        let idItem = res[0].details.id;
                        console.log("ID inserted", idItem)

                        //let appendData = `<tr><td class="Delete"><i class="fa fa-trash del-item-warehouse" aria-hidden="true" data-id='${idItem}'></i></td><td class="magaya__Status">InQuote</td><td class='Name'>${packageName}</td><td class='magaya__Pieces'>${pieces}</td><td class='magaya__Length'>${length}</td><td class='magaya__Height'>${height}</td><td class='magaya__Width'>${width}</td><td class="magaya__Weigth">${weight}</td><td class="magaya__Volume">${volume}</td></tr>`
                        //$("#table-items tbody").append(appendData);


                        $(":input[name=Item-Pieces]").val('');
                        $(":input[name=Item-Length]").val('');
                        $(":input[name=Item-Height]").val('');
                        $(":input[name=Item-Width]").val('');
                        $(":input[name=Item-Weight]").val('');

                        codeError = "";
                        field = "";
                        show = false;
                        module = 'Cargo Items'

                        storeItem.dispatch(addItem({id: idItem, name: packageName, pieces: pieces, length: length, height: height, width: width, weigth: weight, volume: volume}))
                        storeSuccess.dispatch(addSuccess({errorCode: codeError, showInfo: show, field: field, module: module}))

                        pieces = parseInt(pieces);
                        length = 0
                        height = 0
                        width = 0
                        weight = 0
                        volume = 0
                    }
                })
            })
            .catch(function(error){
                dataError = error.data;
                $.map(dataError, function(k, v) {
                errorCode = k.code;
                field = k.details.api_name;
                show = true;
                storeError.dispatch(addError({errorCode: codeError, showInfo: show, field: field, module: module}))

                })
            })
    })





    $('#table-items').bind("DOMSubtreeModified", function() {
        $(".del-item-warehouse").click (function () {
            let idItem = $(this).attr('data-id');

            ZOHO.CRM.API.deleteRecord({Entity:"magaya__ItemQuotes",RecordID: idItem})
                .then(function(data){
                    console.log(data)
                    storeItem.dispatch(deleteItem({id: idItem}))

                })
        });

    })

});





//redondear decimales
function roundDec(num) {
    if (typeof num === 'undefined' || num <= 0) return 0;
    let t = num.toString();
    let regex = /(\d*.\d{0,4})/;
    return t.match(regex)[0];

}

</script>

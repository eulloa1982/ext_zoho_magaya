@extends('tab_widget.layout')
@section('content')
    <h4 class="mb-3">Configuration</h4>
    <form action="">
        <div class="row">
            <div class="col col-sm-12 col-md-6 col-lg-4">
                <div class="form-group">
                    <label>Magaya API Wsdl Url</label>
                    <input type="url" name="url" class="form-control" required>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col col-ms-12 col-md-6 col-lg-2">
                <div class="form-group">
                    <label>User</label>
                    <input type="text" name="username" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" name="password" class="form-control" required>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col col-sm-12 col-md-6 col-lg-4">
                <div class="form-group">
                    <label>Magaya Network ID</label>
                    <input type="numeric" name="networkId" class="form-control">
                </div>
            </div>

        </div>
        <button type="submit" class="btn btn-primary">Save</button>
    </form>
 @stop
 @section('js')
<script src="{{ url('js/biblio.jquery2.js') }}"></script>
<script src="{{ url('js/utils_cookies.js') }}"></script>

<script>
$(document).ready(function(){
    accounts = [];
    MagayaUsers = [];

    localStorage.setItem('password', '');
    //set fields defaults value
    $("input[name=username]").val();
    $("input[name=password]").val();
    $("input[name=url]").val();
    $("input[name=networkId]").val();

    //get magaya users
    //drawCustomersMagaya();

    ZOHO.embeddedApp.on("PageLoad",function(data){
        ZOHO.CRM.API.getOrgVariable("magaya__magaya_url")
            .then(function (response) {
                console.log("Gettinf org variable dsfgdsfsdf" , response.Success.Content)
                url = response.Success.Content;
            })
            .catch(function(error) {
                    console.log("Error org variable url", error)
            })
        ZOHO.CRM.API.getOrgVariable("magaya__networkid")
            .then(function (response) {
                console.log("Gettinf network id" , response.Success.Content)
                   network_id = response.Success.Content;
            })
            .catch(function(error) {
                    console.log("Error org variable network id", error)
            })
        ZOHO.CRM.API.getOrgVariable("magaya__magaya_user")
            .then(function (response) {
                console.log("Gettinf user" , response.Success.Content)
                    user = response.Success.Content;
            })
            .catch(function(error) {
                    console.log("Error org variable user", error)
            })
        ZOHO.CRM.API.getOrgVariable("magaya__magaya_pass")
            .then(function (response) {
                console.log("Gettinf user" , response.Success.Content)
                    pass = response.Success.Content;
            })
            .catch(function(error) {
                    console.log("Error org variable pass", error)
            })

    });
    ZOHO.embeddedApp.init();

    $('form').on('submit', function(e){
        e.preventDefault()

        var magaya_user = $("input[name=username]").val();
        var magaya_password = $("input[name=password]").val();
        var magaya_url = $("input[name=url]").val();
        var magaya_networkId = $("input[name=networkId]").val();
        let nameCookie = 'url';
        //check url var
        var lastCharUrl = magaya_url[magaya_url.length -1];
        if (lastCharUrl === "/") {
            console.log("removing last /")
            magaya_url = magaya_url.substring(0, magaya_url.length - 1);

        }

        //set cookie magaya url
        //setCookie(nameCookie, magaya_url, 1);


        data = {
            method: 'StartSession',
                data: [
                    magaya_user,
                    magaya_password
                ]
        }
        MagayaAPI.sendRequest(data, function(result){
            if(result.error){
                Swal.fire({
                    title: 'Error',
                    text: result.data,
                    icon: 'error'
                })
            }else{
                /*update magaya url*/
                var func_name = "magaya__setMagayaUrl";
                var req_data ={
                    "magaya_url" : magaya_url
                };
                ZOHO.CRM.FUNCTIONS.execute(func_name, req_data).then(function(data){
                    console.log("response url", data)
                })

                /**update magaya user*/
                var func_name = "magaya__setMagayaUser";
                var req_data ={
                    "magaya_user" : magaya_user
                };
                ZOHO.CRM.FUNCTIONS.execute(func_name, req_data).then(function(data){

                })

                /*update magaya pass*/
                var func_name = "magaya__setMagayaPassword";
                var req_data ={
                    "magaya_password" : magaya_password
                };
                ZOHO.CRM.FUNCTIONS.execute(func_name, req_data).then(function(data){

                })


                /*update magaya pass*/
                var func_name = "magaya__SetNetworkId";
                var req_data ={
                    "network_id" : magaya_networkId
                };
                ZOHO.CRM.FUNCTIONS.execute(func_name, req_data).then(function(data){

                    magayaResponseAccessKey = result.data.access_key
                    var message = 'Your configuration was saved successfully'
                    if (magayaResponseAccessKey !== magaya_networkId){
                        message += `<br />Magaya return diferent access_key, we'll update the value now`;
                        //console.log("Changed access key", magayaResponseAccessKey);

                        $("input[name=networkId]").val(magayaResponseAccessKey);
                        //set cookie magaya url

                    }
                    //setCookie("access_key", magayaResponseAccessKey, 1);
                    Swal.fire({
                        title: 'Success',
                        html: message,
                        icon: 'success'
                    })
            })
                //drawCustomersMagaya();
            }
        })

    })
})

</script>
@stop

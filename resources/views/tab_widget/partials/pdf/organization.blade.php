@if (@isset($organization['orgData']))
<table cellspacing="0px" cellpadding="0px" style="border: none;" width="100%">
    <tr>
        <td width="40%">
            <table width="90%" cellspacing="0px" cellpadding="0px" style="border: none; text-align: right; margin-right:5%;">
                <tr>
                    <td>
                       <!-- <img class="headerIMG" src="{{ url('images/pdfv1/magaya.png') }}" alt="Logo" height="100" width="100" style="text-align: center;">-->
                       @if (@isset($organization['orgData']['photo_id']))
                            {{$organization['orgData']['photo_id']}}    
                        @endif 
                    </td>
                    <td class="session-first" style="float: left; font-size: 28px; vertical-align:top">
                        @if (@isset($organization['orgData']['company_name']))
                            {{$organization['orgData']['company_name']}}    
                        @endif 
                    </td>
                </tr>
                <tr></tr>
            </table>
        </td>
        <td width="40%">
            <table width="100%" cellspacing="0px" cellpadding="0px" style="border: none; text-align: right; vertical-align:center;">
                <tr>
                    <td colspan="12"class="headerFont">
                        <span><img src="{{ url('images/pdfv1/language.png') }}" alt="Language" width="24px" height="24px"/></span>
                        @if (@isset($organization['orgData']['website']))                            
                            {{$organization['orgData']['website']}}                            
                        @endif 
                    </td>
                </tr>
                <tr>
                    <td colspan="12" class="headerFont">
                        <span><img src="{{ url('images/pdfv1/phone.png') }}" alt="Phone" width="24px" height="24px"/></span>
                        @if (@isset($organization['orgData']['phone']))
                            {{$organization['orgData']['phone']}}    
                        @endif                        
                    </td>
                </tr>
                <tr>
                    <td colspan="12" class="headerFont">
                        <span><img src="{{ url('images/pdfv1/email.png') }}" alt="Email" width="24px" height="24px"/></span>
                        @if (@isset($organization['orgData']['primary_email']))
                            {{$organization['orgData']['primary_email']}}    
                        @endif                        
                    </td>
                </tr>
                <tr>
                    <td colspan="12" class="headerFont">
                        <span><img src="{{ url('images/pdfv1/home.png') }}" alt="Home" width="24px" height="24px"/></span>
                            @if (@isset($organization['orgData']['country'])) {{$organization['orgData']['country']}} @endif 
                            @if (@isset($organization['orgData']['city'])) , {{$organization['orgData']['city']}} @endif 
                            @if (@isset($organization['orgData']['state'])) , {{$organization['orgData']['state']}} @endif                            
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
@endif


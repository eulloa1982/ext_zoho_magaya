@if (@isset($organization['orgData']))
<table cellspacing="0px" cellpadding="2px" style="border: none;" width="100%">
    <tr>
        <th width="40%">
            <table width="90%" cellspacing="0px" cellpadding="0px" style="border: none; text-align: right; margin-right:5%;">
                <tr>
                    <th rowspan="2">
                        <img class="headerIMG" src="{{ url('/images/logo2.png', $extra = [], $secure = 1) }}" alt="Logo" height="100" width="100" style="text-align: center;">
                    </th>
                    <th class="session-first" style="float: left; font-size: 28px; vertical-align:top">
                        {{$organization['orgData']['company_name']}}
                    </th>
                </tr>
                <tr></tr>
            </table>
        </th>
        <th width="40%">
            <table id="header" width="100%" cellspacing="0px" cellpadding="0px" style="border: none; text-align: right; vertical-align:top;clear: right;">
                <tr>
                    <td colspan="12"class="headerFont">
                        <span><img src="{{ url('images/pdfv1/language.png', $extra = [], $secure = 1) }}" alt="Language" width="24px" height="24px"/>                            
                        </span>{{$organization['orgData']['website']}}
                    </td>
                </tr>
                <tr>
                    <td colspan="12" class="headerFont">
                        <span><img src="{{ url('images/pdfv1/phone.png', $extra = [], $secure = 1) }}" alt="Phone" width="24px" height="24px"/>
                        </span>{{$organization['orgData']['phone']}}
                    </td>
                </tr>
                <tr>
                    <td colspan="12" class="headerFont">
                        <span><img src="{{ url('images/pdfv1/email.png', $extra = [], $secure = 1) }}" alt="Email" width="24px" height="24px"/>
                        </span>{{$organization['orgData']['primary_email']}}
                    </td>
                </tr>
                <tr>
                    <td colspan="12" class="headerFont">
                        <span><img src="{{ url('images/pdfv1/home.png', $extra = [], $secure = 1) }}" alt="Home" width="24px" height="24px"/>
                        </span>{{$organization['orgData']['country']}}, {{$organization['orgData']['city']}}, {{$organization['orgData']['state']}}
                    </td>
                </tr>
            </table>
        </th>
    </tr>
    <tr></tr>
</table>
@endif


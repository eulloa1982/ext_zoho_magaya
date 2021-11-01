@if (@isset($organization['orgData']))
<table cellspacing="0px" cellpadding="2px" style="border: none;" width="100%">
    <tr>
        <th width="40%">
            <table>
                <tr>
                    <th rowspan="2">
                        <img class="headerIMG" width="100px" height="100px" src="{{ url('images/logo2.png', $extra = [], $secure = 1) }}" style="text-align: center; margin-left:15px;" />
                    </th>
                    <th>
                        <div class="session-first" style="float: left; font-size: 28px; vertical-align:top">
                            {{$organization['orgData']['company_name']}}
                        </div>
                    </th>
                </tr>
                <tr></tr>
            </table>
        </th>
        <th width="60%">
            <table id="header" cellspacing="0px" cellpadding="0px" style="border: none; text-align: right; vertical-align:top; float:right;">
                <tr>
                    <td colspan="12"class="headerFont">
                        <span><img src="{{ url('images/pdfv1/language.png', $extra = [], $secure = 1) }}" width="24px" height="24px"/>                            
                        </span>{{$organization['orgData']['website']}}
                    </td>
                </tr>
                <tr>
                    <td colspan="12" class="headerFont">
                        <span><img src="{{ url('images/pdfv1/phone.png', $extra = [], $secure = 1) }}" width="24px" height="24px"/>
                        </span>{{$organization['orgData']['phone']}}
                    </td>
                </tr>
                <tr>
                    <td colspan="12" class="headerFont">
                        <span><img src="{{ url('images/pdfv1/email.png', $extra = [], $secure = 1) }}" width="24px" height="24px"/>
                        </span>{{$organization['orgData']['primary_email']}}
                    </td>
                </tr>
                <tr>
                    <td colspan="12" class="headerFont">
                        <span><img src="{{ url('images/pdfv1/home.png', $extra = [], $secure = 1) }}" width="24px" height="24px"/>
                        </span>{{$organization['orgData']['country']}}, {{$organization['orgData']['city']}}, {{$organization['orgData']['state']}}
                    </td>
                </tr>
            </table>
        </th>
    </tr>
    <tr></tr>
</table>
@endif


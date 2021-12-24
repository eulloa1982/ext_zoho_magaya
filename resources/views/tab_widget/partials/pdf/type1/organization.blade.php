@if (@isset($organization['orgData']))
<table cellspacing="0px" cellpadding="0px" style="border: none;" width="100%">
    <tr>
        <td width="40%">
            <table width="90%" cellspacing="0px" cellpadding="0px" style="border: none; text-align: right; margin-right:5%;">
                <tr>
                    <td>
                        <img class="demo-bg" src="{{ url('images/pdfv1/shipment-cargo.jpg') }}" style="opacity: 0.2" width="150" height="65" alt="Language" />
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
                        @if (@isset($organization['orgData']['website']))
                            <span><img src="{{ url('images/pdfv1/language.png', $extra = [], $secure = 1) }}" alt="Language" width="24px" height="24px"/></span>
                            {{$organization['orgData']['website']}}
                        @endif
                    </td>
                </tr>
                <tr>
                    <td colspan="12" class="headerFont">
                        @if (@isset($organization['orgData']['phone']))
                            <span><img src="{{ url('images/pdfv1/phone.png', $extra = [], $secure = 1) }}" alt="Phone" width="24px" height="24px"/></span>
                            {{$organization['orgData']['phone']}}
                        @endif
                    </td>
                </tr>
                <tr>
                    <td colspan="12" class="headerFont">
                        @if (@isset($organization['orgData']['primary_email']))
                            <span><img src="{{ url('images/pdfv1/email.png', $extra = [], $secure = 1) }}" alt="Email" width="24px" height="24px"/></span>
                            {{$organization['orgData']['primary_email']}}
                        @endif
                    </td>
                </tr>
                <tr>
                    <td colspan="12" class="headerFont">
                        <span><img src="{{ url('images/pdfv1/home.png', $extra = [], $secure = 1) }}" alt="Home" width="24px" height="24px"/></span>
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


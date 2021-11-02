@if (@isset($organization['orgData']))
<table cellspacing="0px" cellpadding="2px" style="border: none;" width="100%">
            <tr>
                <th rowspan="2">
                    <table>
                        <tr>
                            <th>
                                <div class="session-first" style="float: left; font-size: 28px;">
                                <i class="fa3 fa-camera-retro" aria-hidden="true"></i>{{$organization['orgData']['company_name']}}
                                </div>
                            </th>
                        </tr>
                    </table>
                </th>
                <th>
                    <table id="header" cellspacing="0px" cellpadding="2px" style="border: none; text-align: right;float: right;">
                        <tr>
                            <td colspan="12">
                                {{$organization['orgData']['website']}}
                            </td>
                        </tr>
                        <tr>
                            <td colspan="12">
                                {{$organization['orgData']['phone']}}
                            </td>
                        </tr>
                        <tr>
                            <td colspan="12">
                                {{$organization['orgData']['primary_email']}}
                            </td>
                        </tr>
                        <tr>
                            <td colspan="12">
                                {{$organization['orgData']['country']}}, {{$organization['orgData']['city']}}, {{$organization['orgData']['state']}}
                            </td>
                        </tr>
                    </table>
                </th>
            </tr>
            <tr></tr>
            <tr></tr>
        </table>
@endif


@if (@isset($organization['orgData']))

    @if (@isset($organization['orgData']['company_name']))
        <span style="float: right; font-size: 28px; vertical-align:top;">{{$organization['orgData']['company_name']}}</span><br />
    @endif
    <div style="float: left; font-size: 14px; display: block; margin-top:30px">
        @if (@isset($organization['orgData']['website']))
            <span><img src="{{ url('images/pdfv1/language.png') }}" alt="Language" width="24px" height="24px"/></span>
            {{$organization['orgData']['website']}}
            <br />
        @endif

        @if (@isset($organization['orgData']['phone']))
            <span><img src="{{ url('images/pdfv1/phone.png') }}" alt="Phone" width="24px" height="24px"/></span>
            {{$organization['orgData']['phone']}} <br />
        @endif

        @if (@isset($organization['orgData']['primary_email']))
            <span><img src="{{ url('images/pdfv1/email.png') }}" alt="Email" width="24px" height="24px"/></span>
            {{$organization['orgData']['primary_email']}} <br />
        @endif

        <span><img src="{{ url('images/pdfv1/home.png') }}" alt="Home" width="24px" height="24px"/></span>
        @if (@isset($organization['orgData']['country'])) {{$organization['orgData']['country']}} , @endif
        @if (@isset($organization['orgData']['city'])) {{$organization['orgData']['city']}}  , @endif
        @if (@isset($organization['orgData']['state'])) {{$organization['orgData']['state']}} <br /> @endif

</div>
<div style="float: left; font-size: 14px; display: block; margin-left: 120px; margin-top:30px">
    @if (@isset($organization['mQuote']['Name']))
        <strong>Name: </strong>{{$organization['mQuote']['Name']}} <br />
    @endif

    @if (@isset($organization['mQuote']['Created_Time']))
        <strong>Creation Date:</strong> <?php echo explode('T',$organization['mQuote']['Created_Time'])[0]; ?>
        <br />
    @endif

    @if ( @isset($organization['mQuote']['magaya__ExpirationDate']) )
        <strong>Expiration Date:</strong> <?php echo explode('T',$organization['mQuote']['magaya__ExpirationDate'])[0]; ?>
        <br />
    @endif

    @if (@isset($organization['mQuote']['Owner']['name']))
        <strong>Contact To:</strong> {{$organization['mQuote']['Owner']['name']}},<br> {{$organization['mQuote']['Owner']['email']}}
    @endif
</div>
<br /><br /><br /><br /><br /><br /><br />
@endif


<style>
    .demo-wrap {
        overflow: hidden;
        position: relative;
    }

    .demo-bg {
        opacity: 0.4;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: auto;
    }

    .demo-content {
        position: relative;
    }
</style>

@if (@isset($organization['orgData']))
    <div class="demo-wrap">
        <img class="demo-bg" src="{{ url('images/pdfv2/shipment1.png') }}" alt="Language" />
  
        <div class="demo-content">
            @if (@isset($organization['orgData']['company_name']))
                <div style="text-align: right; font-size: 18px; vertical-align:top;">{{$organization['orgData']['company_name']}}</div>
            @endif
            @if (@isset($organization['orgData']['website']))
                <div style="text-align: right; font-size: 14px; vertical-align:top;"><strong>Website: </strong>{{$organization['orgData']['website']}}</div>
            @endif

            @if (@isset($organization['orgData']['phone']))
                <div style="text-align: right; font-size: 14px; vertical-align:top;"><strong>Phone: </strong>{{$organization['orgData']['phone']}}</div>
            @endif

            @if (@isset($organization['orgData']['primary_email']))
                <div style="text-align: right; font-size: 14px; vertical-align:top;"><strong>Email: </strong>{{$organization['orgData']['primary_email']}}</div>
            @endif

            <div style="text-align: right; font-size: 14px; vertical-align:top;"><strong>Address: </strong>
                @if (@isset($organization['orgData']['country'])) {{ $organization['orgData']['country']}} , @endif
                @if (@isset($organization['orgData']['city'])) {{$organization['orgData']['city']}}  , @endif
                @if (@isset($organization['orgData']['state'])) {{$organization['orgData']['state']}} @endif
            </div>
        </div>
    </div>

    
    <div style="width: 40%; padding: 5px 5px 5px 5px; float: left; font-size: 12px; display: block; margin-top:10px;"><strong>Customer Info</strong><br />
        @if (@isset($organization['mQuote']['Account']))
        <strong>Customer:</strong> {{$organization['mQuote']['Account']['name']}}
        <br />
        @endif

        @if (@isset($organization['mQuote']['magaya__Representative']))
            <strong>Representative: </strong>{{$organization['mQuote']['magaya__Representative']['name']}}
            <br />
        @endif

        @if (@isset($organization['mQuote']['magaya__ContactMobile']))
            <strong>Mobile:</strong> {{$organization['mQuote']['magaya__ContactMobile']}}
            <br />
        @endif

        @if (@isset($organization['mQuote']['magaya__ContactEmail']))
            <strong>Email:</strong> {{$organization['mQuote']['magaya__ContactEmail']}}
            <br />
        @endif

        <strong>Address:</strong>
        @if (@isset($organization['mQuote']['magaya__BillingStreet']))
            {{$organization['mQuote']['magaya__BillingStreet']}} ,
        @endif
        @if (@isset($organization['mQuote']['magaya__BillingCity']))
            {{$organization['mQuote']['magaya__BillingCity']}} ,
        @endif
        @if (@isset($organization['mQuote']['magaya__BillingState']))
            {{$organization['mQuote']['magaya__BillingState']}} , 
        @endif
        @if (@isset($organization['mQuote']['magaya__BillingCountry']))
            {{$organization['mQuote']['magaya__BillingCountry']}}
        @endif
    </div>
    <div style="width: 40%; padding: 5px 5px 5px 5px; float: left; font-size: 12px; display: block; margin-left: 120px; margin-top:10px; border: 1px solid brown;"><strong>Quote Info</strong><br />
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
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

@endif


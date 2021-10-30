@extends('base')
@section('main')
<style>
.carousel-indicators{padding: 10px 10px 10px 10px;
                    }
</style>
<nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
            {{-- <li class="nav-item @if(request()->segment(2) == 'employees') active @endif">
                <a class="nav-link" href="tab-widget/employees">Employees</a>
            </li> --}}
            {{-- <li class="nav-item @if(request()->segment(2) == 'customers') active @endif">
                <a class="nav-link" href="tab-widget/customers">Customers</a>
            </li> --}}
            {{--<li class="nav-item @if(request()->segment(2) == 'quotations') active @endif">
                <a class="nav-link" href="tab-widget/quotations">Quotations</a>
            </li>--}}
            @if(request()->segment(2) == 'config-crm') <li class="nav-item active">
                <span data-module="magaya__Charges_Type" class="module_search btn btn-success btn-sm">Charges Type</span>
                <span data-module="magaya__Ports" class="module_search btn btn-success btn-sm">Working Ports</span>
                <span data-module="magaya__Providers" class="module_search btn btn-success btn-sm">Carriers</span>
                <!--span class="show-form btn btn-success btn-sm">New Record</span>
                <span class="module_search btn btn-success btn-sm">magaya__Package_Types</span-->
            @endif
            @if(request()->segment(2) == 'quotations')

            <li class="nav-item">
                <a href="tab-widget/quotations">
                    <button type="button" data-target="#carouselExampleControls" data-slide-to="0" class="btn btn-outline-success">Quotes</button>
                </a>
            </li>

            <li class="nav-item">
                <a href="tab-widget/quotations">
                    <button type="button" data-target="#carouselExampleControls" data-slide-to="1" class="btn btn-outline-success">Accounts</button>
                </a>
            </li>

            <li class="nav-item">
                <a href="tab-widget/quotations">
                    <button type="button" data-target="#carouselExampleControls" data-slide-to="2" class="btn btn-outline-success">Shipments</button>
                </a>
            </li>
            @endif

        </ul>
        <!--a class="btn btn-outline-success" href="tab-widget/configuration">Configuration</a-->
    </div>
</nav>
<main role="main">
    <div class="alert alert-danger" id="no-configuration-alert">
        Can´t reach Magaya, check Login data or try to Log in <a class="btn btn-outline-success" id="magaya-loguin">Login</a>
    </div>
    <div class="alert alert-danger" id="error-alert">
    </div>
    @yield('content')
</main>
@stop

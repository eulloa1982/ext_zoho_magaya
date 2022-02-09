<style>
@import url('http://getbootstrap.com/dist/css/bootstrap.css');
.dropdown-menu > li{
  display: inline-block;
 }
.open> ul {
    display: inline-flex !important;
}
</style>

<div class="panel-preview" id="panel-preview">
    <div class="panel">
        <fieldset class="fieldset">
            <!-- pack of buttons -->
            <legend class="legend">
                <span class="float-right arrows-quote" id="arrows-preview"></span>
                <span>Quote Preview</span>
                <span title="Close panel" class="material-icons close btn btn-danger float-right" style="margin: 0px 0px 0px 4px;color: white;background: none;border: none;" data-close="panel-preview">close</span>
                <span title="Edit mQuote" id="edit-preview" data-toggle="modal" data-target="#mquoteModal" class="material-icons btn btn-primary float-right" style="background: none;border: none;">create</span>
                <span title="Send mQuote to Magaya" id="sendToMagaya" class="material-icons btn btn-primary float-right send" style="background: none;border: none;">send</span>
                <span title="Delete mQuote" id="deleteQuote" class="material-icons btn btn-primary float-right delete" style="background: none;border: none;">delete_forever</span>
                <span title="Duplicate mQuote" id="duplicateQuote" class="material-icons btn btn-primary float-right duplicate" style="background: none;border: none;">content_copy</span>

                <div class="btn-group float-right">
                    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" style="background: none;border: none;">
                        <span title="Get PDF mQuote" class="material-icons btn btn-primary" style="background: none;border: none;">picture_as_pdf</span>
                        <ul class="dropdown-menu" role="menu">
                            <li style="background: none;border: none; margin: 10px">
                                <a data-type="type1" class="toPdf">Plantilla 1</a>
                                <!--a data-type="type1" class="toPdf"><img src="{{ url('images/PDF/pdf_type1.jpg') }}" width="25px" height="25px" alt="T1"/></a-->
                            </li>
                            <li style="background: none;border: none; margin: 10px">
                                <a data-type="type2" class="toPdf">Plantilla 2</a>
                                <!--a data-type="type2" class="toPdf"><img src="{{ url('images/PDF/pdf_type2.jpg') }}" width="25px" height="25px" alt="T2"/></a-->
                            </li>

                        </ul>
                </div>

            </legend>
            <!-- end buttons -->

            <!-- Customes and Quote Details -->
            <div class="container">
                <div class="row">
                    <div class="col-sm">
                        <div class="col-sm-12 shadow p-3 border border-secondary mb-2 bg-white rounded">
                            <h5 class="text-monospace">Customer</h5>
                            <p class="secondary">Name: <span class="preview" id="AccountPreview"></span></p>
                            <h5 class="text-monospace">Representative</h5>
                            <p class="secondary">Name: <span class="preview" id="RepresentativeNamePreview"></span></p>
                            <p class="secondary">Email: <span class="preview" id="magaya__ContactEmailPreview"></span></p>
                            <p class="secondary">Phone: <span class="preview" id="magaya__ContactPhonePreview"></span></p>
                            <p class="secondary">Mobile: <span class="preview" id="magaya__ContactMobilePreview"></span></p>
                            <h5 class="text-monospace">Deal</h5>
                            <p class="secondary">Deal Name: <span class="preview" id="DealPreview"></span></p>
                        </div>
                    </div>

                    <div class="col-sm">
                        <div class="col-sm-12 shadow-sm p-1 mb-2 bg-white rounded" style="margin-right: 15px;">
                            <p>Quote Number: <span class="preview" id="NamePreview"></span></p>
                            <div class="row">
                                <div class="col-sm-6">
                                    <!-- Checked -->
                                    <div class="pretty p-icon p-jelly p-round p-bigger p-locked secondary">
                                        <input type="checkbox" name="In_Magaya"/>
                                        <div class="state p-info">
                                            <i class="icon material-icons">done</i>
                                            <label>Sent to Magaya</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-6">
                                    <!-- Checked -->
                                    <div class="pretty p-icon p-jelly p-round p-bigger p-locked secondary">
                                        <input type="checkbox" name="From_Magaya"/>
                                        <div class="state p-info">
                                            <i class="icon material-icons">done</i>
                                            <label>Imported from Magaya</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-12 shadow-sm p-1 mb-2 bg-white rounded">
                            <dl class="row secondary">
                                <dt class="col-sm-5">Salesperson</dt>
                                <dd class="col-sm-7 preview" id="magaya__SellerPreview"></dd>

                                <dt class="col-sm-5">Expiration Date</dt>
                                <dd class="col-sm-7 preview" id="magaya__ExpirationDatePreview"></dd>

                                <dt class="col-sm-5">Issued By</dt>
                                <dd class="col-sm-7 preview" id="magaya__IssuedByPreview"></dd>

                                <dt class="col-sm-5">Created By</dt>
                                <dd class="col-sm-7 preview" id="magaya__CreatedByNamePreview"></dd>

                                <dt class="col-sm-5">Creation Date</dt>
                                <dd class="col-sm-7 preview" id="magaya__AddedTimePreview"></dd>
                        </div>

                        <div class="col-sm-12">
                            <p><small><mark>Modified Date: </mark><span class="preview" id="Modified_TimePreview"></span></small></p>
                            <p><small><mark>Modified By: </mark><span class="preview" id="Modified_By"></span></small></p>
                        </div>
                    </div>
                </div>

                <!-- Quotation info -->
                <div class="row">
                    <div class="col-sm">
                        <div class="col-sm-12 shadow-sm p-3 mb-3 bg-white rounded">
                            <h5 class="text-monospace">Quotation Info</h5>
                            <p class="secondary">Description of Goods:<span class="preview" style="margin-left: 5px;" id="magaya__DescriptionPreview"></span></p>
                            <p class="secondary">Origin: <span class="preview" style="margin-left: 5px;" id="magaya__OriginPreview"></span></p>
                            <p class="secondary">Destination: <span class="preview" style="margin-left: 5px;" id="magaya__DestinationPreview"></span></p>
                        </div>
                    </div>
                    <div class="col-sm">
                        <div class="col-sm shadow-sm p-3 bg-white rounded">
                            <h5 class="text-monospace" >Other info</h5>
                            <p class="secondary">Incoterms:<span class="preview" style="margin-left: 5px;" id="magaya__Incoterm_rulePreview"></span></p>
                            <p class="secondary">Service: <span class="preview" style="margin-left: 5px;" id="magaya__ServicePreview"></span></p>
                            <p class="secondary">Direction: <span class="preview" style="margin-left: 5px;" id="magaya__DirectionPreview"></span></p>
                        </div>
                    </div>
                </div>

                <!-- Table Charges -->
                <div class="row">
                    <div class="col-sm">
                        <div class="col-sm-12 shadow-sm p-2 mb-3 bg-white rounded">
                            <h5>Charges</h5>
                            <table id="table-charges-preview" class="table table-sm table-bordered border-secondary">
                                <thead style="text-align:center;">
                                    <tr>
                                        <th style="width:26%">Charge Description</th>
                                        <th style="width:8%">Price</th>
                                        <th style="width:9%">Quantity</th>
                                        <th style="width:10%">Tax Amount</th>
                                        <th style="width:10%">Final Amount</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                                <tfoot></tfoot>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Table Items -->
                <div class="row">
                    <div class="col-sm">
                        <div class="col-sm-12 shadow-sm p-2 mb-3 bg-white rounded">
                            <h5>Items</h5>
                            <table id="table-items-preview" class="table table-bordered border-secondary table-striped">
                                <thead style="text-align:center;">
                                    <tr>
                                        <th style="width:23%">Package Type</th>
                                        <th style="width:23%">Description</th>
                                        <th style="width:10%">Quantity</th>
                                        <th style="width:20%">Dimensions</th>
                                        <th style="width:12%">Weigth</th>
                                        <th style="width:12%">Volume</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                                <tfoot></tfoot>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Table Terms -->
                <div class="row">
                    <div class="col-sm">
                        <div class="col-sm-12 shadow-sm p-2 mb-3 bg-white rounded">
                            <h5>Terms</h5>
                            <span class="preview" id="magaya__TermsPreview"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </fieldset>
</div>

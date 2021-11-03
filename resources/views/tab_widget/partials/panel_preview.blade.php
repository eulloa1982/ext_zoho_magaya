<div class="panel-preview" id="panel-preview">
    <div class="panel">
        <fieldset class="fieldset">
            <legend class="legend">
                <span class="float-right arrows-quote" id="arrows-preview"></span>
                <span>Quote Preview</span>
                <span title="Close panel" class="material-icons close btn btn-danger float-right" style="margin: 0px 0px 0px 4px;color: white;background: none;border: none;" data-close="panel-preview">close</span>
                <span title="Edit mQuote" id="edit-preview" data-toggle="modal" data-target="#mquoteModal" class="material-icons btn btn-primary float-right" style="background: none;border: none;">create</span>
                <span title="Get PDF mQuote" id="toPdf" class="material-icons btn btn-primary float-right toPdf" style="background: none;border: none;">picture_as_pdf</span>
                <span title="Send mQuote to Magaya" id="sendToMagaya" class="material-icons btn btn-primary float-right send" style="background: none;border: none;">send</span>
                <span title="Delete mQuote" id="deleteQuote" class="material-icons btn btn-primary float-right delete" style="background: none;border: none;">delete_forever</span>
                <span title="Duplicate mQuote" id="duplicateQuote" class="material-icons btn btn-primary float-right duplicate" style="background: none;border: none;">content_copy</span>

            </legend>

            <div class="container">
                <div class="row">
                    <div class="col-sm">
                        <div class="col-sm-12 shadow p-3 border border-secondary mb-2 bg-white rounded">
                            <h5 class="text-monospace">Customer</h5>
                            <p>Name: <span class="preview" id="AccountPreview"></span></p>
                            <h5 class="text-monospace">Representative</h5>
                            <p>Name: <span class="preview" id="RepresentativeNamePreview"></span></p>
                            <p>Email: <span class="preview" id="magaya__ContactEmailPreview"></span></p>
                            <p>Phone: <span class="preview" id="magaya__ContactPhonePreview"></span></p>
                            <p>Movile: <span class="preview" id="magaya__ContactMobilePreview"></span></p>
                            <h5 class="text-monospace">Deal</h5>
                            <p>Deal: <span class="preview" id="DealPreview"></span></p>
                        </div>
                    </div>

                    <div class="col-sm">
                        <div class="col-sm-12 shadow-sm p-1 mb-2 bg-white rounded">
                            <p>Quote Number: <span class="preview" id="NamePreview"></span></p>
                            <div class="row">
                                <div class="col-sm-6">
                                    <!-- Checked -->
                                    <div class="pretty p-icon p-jelly p-round p-bigger p-locked">
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
                                    <div class="pretty p-icon p-jelly p-round p-bigger p-locked">
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
                            <p>Sales Person: <span class="preview" id="magaya__SellerPreview"></span></p>
                            <p>Issued By: <span class="preview" id="magaya__IssuedByPreview"></span></p>
                            <p>Created By: <span class="preview" id="magaya__CreatedByNamePreview"></span></p>
                            <p>Creation: <span class="preview" id="magaya__AddedTimePreview"></span></p>
                       </div>

                        <div class="col-sm-12 p-1 mb-1">
                            <p>Expire Date: <span class="preview" id="magaya__ExpirationDatePreview"></span></p>
                            <p>Modified Date: <span class="preview" id="Modified_TimePreview"></span></p>
                            <p>Modified By: <span class="preview" id="Modified_By"></span></p>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm">
                        <div class="col-sm shadow-sm p-3 bg-white rounded">
                            <h5 class="text-monospace">Quotation Info</h5>
                            <p>Description of Goods:<span class="preview" id="magaya__DescriptionPreview"></span></p>
                            <p>Origin: <span class="preview" id="magaya__OriginPreview"></span></p>
                            <p>Destination: <span class="preview" id="magaya__DestinationPreview"></span></p>
                        </div>
                    </div>
                    <div class="col-sm">
                        <div class="col-sm shadow-sm p-3 bg-white rounded">
                            <h5></h5>
                            <p>Incoterms:<span class="preview" id="magaya__IncotermsPreview"></span></p>
                            <p>Service: <span class="preview" id="magaya__ServicePreview"></span></p>
                            <p>Direction: <span class="preview" id="magaya__DirectionPreview"></span></p>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm">
                        <div class="col-sm-12 shadow-sm p-3 mb-1 bg-white rounded">
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

                <div class="row">
                    <div class="col-sm">
                        <div class="col-sm-12 shadow-sm p-3 mb-1 bg-white rounded">
                            <h5>Items</h5>
                                <table id="table-items-preview" class="table table-bordered border-secondary table-striped">
                                    <thead style="text-align:center;">
                                        <tr>
                                            <th style="width:23%">Package Type</th>
                                            <th style="width:6%">Quantity</th>
                                            <th style="width:14%">Dimensions</th>
                                            <th style="width:10%">Weigth</th>
                                            <th style="width:10%">Volume</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                    <tfoot></tfoot>
                                </table>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm">
                        <div class="col-sm-12 shadow-sm p-3 mb-1 bg-white rounded">
                            <h5>Terms</h5>
                            <span class="preview" id="magaya__TermsPreview"></span>
                        </div>
                    </div>
                </div>


            </div>
        </fieldset>
    </div>
</div>

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
                        <div class="row border border-secondary">
                            <div class="col-sm-6">
                                <label>Deal</label>
                            </div>
                            <div class="col-sm-4">
                                <span class="preview" id="DealPreview"></span>
                            </div>
                        </div>
                        <div class="row border border-secondary">
                            <div class="col-sm-6">
                                <label>Customer</label>
                            </div>
                            <div class="col-sm-4">
                                <span class="preview" id="AccountPreview"></span>
                            </div>
                        </div>
                        <div class="row border border-secondary">
                            <div class="col-sm-6">
                                <label>Representative</label>
                            </div>
                            <div class="col-sm-4">
                                <span class="preview" id="RepresentativePreview"></span>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm">
                        <div class="row">
                            <div class="col-sm-4">
                                <label>Quote Number</label>
                            </div>
                            <div class="col-sm-4">
                                <span class="preview" id="NamePreview"></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-4">
                                <label>Creation</label>
                            </div>
                            <div class="col-sm-4">
                                <span class="preview" id="magaya__AddedTimePreview"></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-4">
                                <label>Expiration</label>
                            </div>
                            <div class="col-sm-6">
                                <span class="preview" id="magaya__ExpirationDatePreview"></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-4">
                                <label>Modified</label>
                            </div>
                            <div class="col-sm-6">
                                <span class="preview" id="Modified_TimePreview"></span>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-4">
                                <label>Modified By</label>
                            </div>
                            <div class="col-sm-6">
                                <span class="preview" id="Modified_By"></span>
                            </div>
                        </div>

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

                </div>


                <div class="row headerTable mr-5">
                    <div class="col-sm-6">
                        <label>Quotation Info</label>
                    </div>
                </div>
                <div class="row bordered mr-2">
                    <div class="col-sm-12">
                        <div class="col-sm-6">
                            <label>Description of Goods</label>
                        </div>
                        <div class="col-sm-6">
                            <span class="preview" id="magaya__DescriptionPreview"></span>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="col-sm-6">
                            <label>Origin</label>
                        </div>
                        <div class="col-sm-6">
                            <span class="preview" id="magaya__OriginPreview"></span>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="col-sm-6">
                            <label>Destination</label>
                        </div>
                        <div class="col-sm-6">
                            <span class="preview" id="magaya__DestinationPreview"></span>
                        </div>
                    </div>
                </div>

                <div class="row" style="margin-top: 10px;">
                    <table id="table-charges-preview" class="table table-sm table-bordered border-secondary">
                        <caption>Charges</caption>
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

                <div class="row" style="margin-top: 10px;">
                    <table id="table-items-preview" class="table table-bordered border-secondary table-striped">
                        <caption>Items</caption>
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

                <div class="row border headerTable mr-5">
                    <label>Terms</label>
                </div>
                <div class="row border border-secondary mr-2">
                        <span class="preview" id="magaya__TermsPreview"></span>
                    </div>
                </div>


        </fieldset>
    </div>
</div>

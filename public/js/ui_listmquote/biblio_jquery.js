/********************************************************
 * *******************************************************
 * *******************************************************
 */
//get row data, build json with squote id
//agregar filtrado
/******************************************************
 * ******************************************************
 * ****************************************************
 */
 (function($) {
    $.fn.tableToJson = function(table, id) {
        jsonData = '';
        json_items = ''
        $("#" + table + " tbody tr").each(function() {
            //get fields
            id_quote = id;
            //required field
            json_items += `"magaya__SQuote_Name": "${id_quote}"`
            $(this).find('td').each(function() {
                $this = $(this);
                var class_name = $this.attr('class');
                if (class_name == 'magaya__StatusA') {
                    json_items += ',"magaya__StatusA":"' + $("select[name=StatusA]").val() + '"';
                } else if (class_name === 'Delete' || class_name === "NoData") {
                    //
                } else {
                    let nameValue = $(this).html()
                    json_items += `, "${class_name}":"${nameValue}"`
                }

                /*else if (class_name === 'magaya__Measure_System' || class_name === 'magaya__ChargeCode' || class_name === "magaya__Amount" || class_name === "magaya__ChargeCurrency" || class_name === "magaya__Status") {
                    let nameValue = $(this).html()
                    json_items += `, "${class_name}":"${nameValue}"`
                }
                else {
                    json_items += ',"' + $this.attr('class') + '":"' + $this.children().val() + '"';
                }*/

            })

            jsonData += ',{' + json_items + '}';
            json_items = ''

        });

        jsonData = jsonData.substring(1)
        console.log("Returning literal", jsonData)
        return (jsonData)
    }

})(jQuery);




(function($) {
    $.fn.dataShow = function(module, id) {
        //console.log("Lanzando en modulo " + module + ", con id, "  + id)
        switch(module) {
            case "table-items": {
                storeItem.dispatch(getItemQuote({id: id}))
                break;
            }

            case "table-items-new": {
                //console.log("Table charges new")
                storeItem.dispatch(getItemQuoteOnNew({id: id}))
                break;
            }

            case "table-charges": {
                storeCharge.dispatch(getCharge({id: id}))
                break;
            }

            case "table-charges-new": {
                storeCharge.dispatch(getChargeOnNew({id: id}))
                break;
            }

            default:
                return "No data"
        }

    }

})(jQuery);



function sanitize(input) {
    /*
    var output = input.replace(/<script[^>]*?>.*?<\/script>/gi, '').
                 replace(/<[\/\!]*?[^<>]*?>/gi, '').
                 replace(/<style[^>]*?>.*?<\/style>/gi, '').
                 replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '');
    return output;
    */
   if (!_.isEmpty(input)) {
       /*if (input.match(/^[0-9a-zA-Z]\-\#{1,255}$/))
        return input;

    return false;*/
        let a = HtmlSanitizer.SanitizeHtml(input);
        return input.replace(/['"]+/g, '').replace(/[^a-zA-Z0-9]\-/g, ' ').replace(/<(|\/["]\/[&<>]\/|[^>\/bi]|\/[^>bi]|[^\/>][^>]+|\/[^>][^>]+)>/g, '');
   }
};


function limpiar_form() {
    let elementos = document.querySelectorAll("input[type=text], input[id=magaya__Description], select[name=magaya__TransportationMode], select[name=magaya__Direction]")
    elementos.forEach((elemento) => {
        elemento.value = ''
    })
}


//redondear decimales
function roundDec(num) {
    if (typeof num === 'undefined' || num <= 0) return 0;
    let t = num.toString();
    let regex = /(\d*.\d{0,3})/;

    let number = parseFloat(t.match(regex)[0]);

    if (typeof (number) === "number" && !isNaN(number)) {
        return number;
    }


    return 0;

}

/**
 * Created by ThyeJern on 1/03/2016.
 */
// autocomplet : this function will be executed every time we change the text

var jsonArray = [];

$.ajax({
    type: 'POST',
    url: 'ajax_refresh.php', //your server side script
    crossDomain: true,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
        $.each(data, function() {
            jsonArray = data;
        });
        return jsonArray;
    }

});


var autocomplete = function() {

    $("#suburb").autocomplete({
        delay: 0,

        source: function (request, response) {
            var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
            var results = $.map(jsonArray, function(item){
                var text = item.postcode;
                if ( text && ( !request.term || matcher.test(text) ) ) {
                    return {
                        value: item.description,
                        label: item.description,
                        abbrev:item.postcode
                    };
                }
            });
            response(results.slice(0,10));
        },
        select: function(event, ui) {
            var selectedObj = ui.item;
            $("#addressList").val(selectedObj.label);
            $('#suburbID').val(selectedObj.abbrev);
        },
        /*
         open: function($event, ui) {
         var $widget = $("ul.ui-autocomplete");
         var $input = $("#suburb");
         var position = $input.position();

         $("#container_suburb").append($widget);

         $widget.css("left", position.left);
         $widget.css("top", position.top + $input.height());
         },*/
        minLength: 2

    });
}

$(document).ready(function() {

    autocomplete();
    $("#suburb").on("focusout", function(){
        if($("#suburb").val() !=""){
        }else{
            $("#suburb").val("");
        }
    });

});
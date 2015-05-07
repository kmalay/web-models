/**
 * Created by malayk on 5/5/2015.
 */

function runModel1(){
    if ( xmin == undefined || xmin == "" ) { alert('Please use the Draw button to choose an AOI.'); return; }
    if ( $("input:checked").length == 0 ) { alert('Please choose which data source(s) you would like to use.'); return; }

    var resourceId = $("select#model-selector").val();
    var numDays = $("select#model-1-time-range").val();
    var cloudCover = $("select#model-1-cloud-cover").val();
    var predictedNiirs = $("select#model-1-predicted-niirs").val();
    var checkboxSocial = "true";
    var checkboxIr = "true";
    var checkboxComext = "true";
    var checkboxImagery = "true";
    var checkboxMidb = "true";
    var checkboxBvi = "true";

    if ( $("input#model-1-checkbox-social").prop('checked') == false ) { checkboxSocial = "false" };
    if ( $("input#model-1-checkbox-ir").prop('checked') == false ) { checkboxIr = "false" };
    if ( $("input#model-1-checkbox-comext").prop('checked') == false ) { checkboxComext = "false" };
    if ( $("input#model-1-checkbox-imagery").prop('checked') == false ) { checkboxImagery = "false" };
    if ( $("input#model-1-checkbox-midb").prop('checked') == false ) { checkboxMidb = "false" };
    if ( $("input#model-1-checkbox-bvi").prop('checked') == false ) { checkboxBvi = "false" };

    var baseUrl = "http://web-models.com";
    var modelUrl = "?modelUrl=http://web-models.com/resource/" + resourceId;
    var bbox = "&bbox=" + ymin + " " + xmin + " " + ymax + " " + xmax;
    var timeRange = "&timeRange=" + "[] -P" + numDays + "D";
    var booleanSocial = "&isSocial=" + checkboxSocial;
    var booleanIr = "&isIr=" + checkboxIr;
    var booleanComext = "&isComext=" + checkboxComext;
    var booleanImagery = "&isImagery=" + checkboxImagery;
    var booleanMidb = "&isMidb=" + checkboxMidb;
    var sqlStatement = '&select rows from table using sql.where column1=("column1" <= ' + cloudCover + ') OR ("column1" is null) AND ("column2" >= ' + predictedNiirs + ')';
    var booleanBvi = "&isBvi=" + checkboxBvi;
    var url = baseUrl + modelUrl + bbox + timeRange + booleanSocial + booleanIr + booleanComext + booleanImagery + booleanMidb + sqlStatement + booleanBvi;

    $(".panel").css("margin-bottom", "0px");
    $("#results-panel").removeClass("panel-success");
    $("#results-panel").removeClass("panel-danger");
    $("#results-panel").show();
    $("#results").show();
    $("#progress").html('<img src="spinner.gif">');
    $("#results").html("<p>Submitting, please wait...</p>");

    console.log(url);
    //window.location.href = url;
    /*
     $.ajax({
     url: url,
     success: function(result){
     var returnedHTML = $('<div/>').html(result).contents();
     var newHTML = "";
     returnedHTML.find("a").each(function( index ){
     newHTML = newHTML + '<a class="btn btn-info btn-xs spaced" href="' + $(this).attr('href') + '" target="_blank">' + $(this).text() + '</a><br />';
     });
     $("#progress").html(newHTML);
     $("#results").html("<p>Download Result(s)</p>");
     $("#results-panel").addClass("panel-success");
     },
     error: function(){
     $("#results-panel").addClass("panel-danger"):
     $("#results").html("<p>Download Failure</p>"):
     $("#progress").html('<strong>Response Status:  </strong> ' + textStatus + '<br /> <strong>Error Type: </strong> ' + errorThrown):
     },
     xhrFields: {
     withCredentials: true
     }
     });
     */
}

function getResourceId() {
    var id = window.location.search.replace('?pId=', '');
    $("select#model-selector").val(id);
}

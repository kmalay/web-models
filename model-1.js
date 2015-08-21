/**
 * Created by malayk on 5/5/2015.
 */

// Global vars for geo selection
var geoType = "circle";
var lat;
var lon;

function runModel1(){

    // Input validation
    // Verify that some type of geometry has been drawn (point or circle)
    if ( (xMin == undefined || xMin == "") && (lat == undefined || lat == "") ) {
        alert('Please use the Draw button to choose an AOI.');
        return;
    }
    // Verify that at least one data source was chosen
    if ( $("input:checked").length == 0 ) {
        alert('Please choose which data source(s) you would like to use.');
        return;
    }

    // Set up variables to hold select list values
    // Initialize checkbox var values
    var resourceId = $("select#model-selector").val();
    var numDays = $("select#time-range").val();
    var cloudCover = $("select#cloud-cover").val();
    var predictedNiirs = $("select#predicted-niirs").val();
    var radiusVal = $("select#radius").val();
    var checkboxSocial = "true";
    var checkboxIr = "true";
    var checkboxComext = "true";
    var checkboxImagery = "true";
    var checkboxMidb = "true";
    var checkboxBvi = "true";

    if ( $("input#checkbox-social").prop('checked') == false ) { checkboxSocial = "false" };
    if ( $("input#checkbox-ir").prop('checked') == false ) { checkboxIr = "false" };
    if ( $("input#checkbox-comext").prop('checked') == false ) { checkboxComext = "false" };
    if ( $("input#checkbox-imagery").prop('checked') == false ) { checkboxImagery = "false" };
    if ( $("input#checkbox-midb").prop('checked') == false ) { checkboxMidb = "false" };
    if ( $("input#checkbox-bvi").prop('checked') == false ) { checkboxBvi = "false" };

    // Set up the url and parameters
    var baseUrl = "http://web-models.com";
    var modelUrl = "?modelUrl=http://web-models.com/resource/" + resourceId;
    var boundingbox = "&bbox=" + yMin + " " + xMin + " " + yMax + " " + xMax;
    var point = "&point=" + lat + " " + lon;
    var radius = "&radius=" + radiusVal;
    var timeRange = "&timeRange=" + "[] -P" + numDays + "D";
    var booleanSocial = "&isSocial=" + checkboxSocial;
    var booleanIr = "&isIr=" + checkboxIr;
    var booleanComext = "&isComext=" + checkboxComext;
    var booleanImagery = "&isImagery=" + checkboxImagery;
    var booleanMidb = "&isMidb=" + checkboxMidb;
    var sqlStatement = '&select rows from table using sql.where column1=("column1" <= ' + cloudCover + ') OR ("column1" is null) AND ("column2" >= ' + predictedNiirs + ')';
    var booleanBvi = "&isBvi=" + checkboxBvi;
    var url;
    if ( geoType == "point" ) {
        url = baseUrl + modelUrl + point + radius + timeRange + booleanSocial + booleanIr + booleanComext + booleanImagery + booleanMidb + sqlStatement + booleanBvi;
    } else if (geoType == "circle") {
        url = baseUrl + modelUrl + boundingbox + timeRange + booleanSocial + booleanIr + booleanComext + booleanImagery + booleanMidb + sqlStatement + booleanBvi;
    } else {
        console.log('No geo type selected.');
        return;
    }

    // Show the results panel with a loading gif
    $(".panel").css("margin-bottom", "0px");
    $("#results-panel").removeClass("panel-success panel-danger").show();
    $("#results").show();
    $("#progress").html('<img width="80px" src="spinner.gif">');
    $("#results").html("<p>Submitting, please wait...</p>");

    //rkm - begin testing
    console.log(url);
    setTimeout(function() {
        var newHTML =
            '<a class="list-group-item" target="_blank" href="http://www.google.com">Result-1.kml</a>' +
            '<a class="list-group-item" target="_blank" href="http://sports.yahoo.com">Result2.kml</a>' +
            '<a class="list-group-item" target="_blank" href="http://news.google.com">Result3.kml</a>';
        $("#progress").html(newHTML);
        $("#results").html("<p>Download Result(s)</p>");
        $("#results-panel").addClass("panel-success");
    }, 5000);

    //window.location.href = url;

    // Make the ajax call to execute the model
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

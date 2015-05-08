/**
 * Created by malayk on 5/5/2015.
 */

// Global vars for geo selection
var geoType;
var lat;
var lon;

function runModel1(){

    // Input validation
    // Verify that some type of geometry has been drawn (point or circle)
    if ( (xmin == undefined || xmin == "") && (lat == undefined || lat == "") ) {
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
    var checkboxSocial = "true";
    var checkboxIr = "true";
    var checkboxComext = "true";
    var checkboxImagery = "true";
    var checkboxMidb = "true";
    var checkboxBvi = "true";

    // Update checkbox vars based on user input
    if ( $("input#checkbox-social").prop('checked') == false ) { checkboxSocial = "false" };
    if ( $("input#checkbox-ir").prop('checked') == false ) { checkboxIr = "false" };
    if ( $("input#checkbox-comext").prop('checked') == false ) { checkboxComext = "false" };
    if ( $("input#checkbox-imagery").prop('checked') == false ) { checkboxImagery = "false" };
    if ( $("input#checkbox-midb").prop('checked') == false ) { checkboxMidb = "false" };
    if ( $("input#checkbox-bvi").prop('checked') == false ) { checkboxBvi = "false" };

    // Set up the url and parameters
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

    // Show the results panel with a loading gif
    $(".panel").css("margin-bottom", "0px");
    $("#results-panel").removeClass("panel-success panel-danger").show();
    $("#results").show();
    $("#progress").html('<img src="spinner.gif">');
    $("#results").html("<p>Submitting, please wait...</p>");

    //rkm - begin testing
    console.log(url);
    setTimeout(function() {
        var newHTML = '<a class="btn btn-link spaced" target="_blank" href="www.google.com">Google</a><br /><a class="btn btn-link spaced" target="_blank" href="sports.yahoo.com">Yahoo Sports</a><br /><a class="btn btn-link spaced" target="_blank" href="news.google.com">Google News</a>';
        $("#progress").delay(1000).html(newHTML);
        $("#results").delay(1000).html("<p>Download Result(s)</p>");
        $("#results-panel").delay(1000).addClass("panel-success");
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

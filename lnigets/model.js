/**
 * Created by malayk on 5/5/2015.
 */
// Global vars for geo selection
var geoType = "circle";
var lat;
var lon;
var point;

function runModel1(){

    // Input validation
    // Verify that some type of geometry has been drawn (point or circle)
    if ( (xMin == undefined || xMin == "") && (lat == undefined || lat == "") ) {
        alert('Please use the Draw button to choose an area for your search.');
        return;
    }

    // Set up variables to hold select list values
    // Initialize checkbox var values
    var resourceId = $("select#model-selector").val();
    var numDays = $("select#time-range").val();
    var radiusVal = $("select#radius").val();

    // Set up the url and parameters
    var baseUrl = "http://web-models.com";
    var modelUrl = "?modelUrl=http://web-models.com/resource/" + resourceId;
    var boundingbox = "&bbox=" + yMin + " " + xMin + " " + yMax + " " + xMax;
    var manLat = $("input#lat").val();
    var manLon = $("input#lon").val();

    var radius = "&radius=" + radiusVal;
    var timeRange = "&timeRange=" + "[] -P" + numDays + "D";
    var url;

    if ( geoType == "point" ) {
        console.log("manLat: " + manLat);
        console.log("manLon: " + manLon);

        if ( manLat == '' || manLon == '' || manLat == 'undefined' || manLon == 'undefined' ) {
            point = "&point=" + lat + " " + lon;
        } else {
            point = "&point=" + manLat + " " + manLon;
        }

        url = baseUrl + modelUrl + point + radius + timeRange;
    } else if (geoType == "circle") {
        url = baseUrl + modelUrl + boundingbox + timeRange;
    } else {
        console.log('No geo type selected.');
        return;
    }

    // Show the results panel with a loading gif
    $(".panel").css("margin-bottom", "0px");
    $("#results-panel").removeClass("panel-success panel-danger").show();
    $("#results").show();
    $("#progress").html('<img width="80px" src="spinner.gif">');
    $("#results").html("<p>Executing model, please wait...</p>");

    //rkm - begin testing
    //console.log(url);
    setTimeout(function() {
        var newHTML =
            '<a class="list-group-item" href="#report" data-toggle="modal">Report 1</a>' +
            '<a class="list-group-item" href="#report" data-toggle="modal">Report 2</a>' +
            '<a class="list-group-item" href="#report" data-toggle="modal">Report 3</a>' +
            '<a class="list-group-item" href="#report" data-toggle="modal">Report 4</a>' +
            '<a class="list-group-item" href="#report" data-toggle="modal">Report 5</a>' +
            '<a class="list-group-item" href="#report" data-toggle="modal">Report 6</a>' +
            '<a class="list-group-item" href="#report" data-toggle="modal">Report 7</a>' +
            '<a class="list-group-item" href="#report" data-toggle="modal">Report 8</a>' +
            '<a class="list-group-item" href="#report" data-toggle="modal">Report 9</a>';
        $("#progress").html(newHTML);
        $("#results").html("<p>Model Result(s)</p>");
        $("#results-panel").addClass("panel-success");
    }, 5000);

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


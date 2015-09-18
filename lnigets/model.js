/**
 * Created by malayk on 5/5/2015.
 */
// Global vars for geo selection
var geoType = "circle";
var lat;
var lon;
var point;

function runModel1(){

    // Verify that some type of geometry has been drawn (point or circle)
    if ( (xMin == undefined || xMin == "") && (lat == undefined || lat == "") ) {
        alert('Please use the Draw button to choose an area for your search.');
        return;
    }

    // Set up variables to hold select list values
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
    url = "http://localhost:63342/web-models/lnigets/test-data.json";

    // Make the ajax call to execute the model
    $.ajax({
        url: url,
        success: function(results){
            var newHTML = "";

            $.each(results.docs, function( key, result ){
                //console.log('inside loop');
                //console.log(key + ":" + result);
                newHTML = newHTML +
                    // '<a class="list-group-item" href="javascript:showDoc(' + "'" + result.title + "','" + result.url + "'" + ');">' + result.title + '</a>';
                    '<a class="list-group-item" href="' + result.url + '" data-toggle="modal" data-target="#report">' + result.title + '</a>';
            });

            $("#progress").html(newHTML);
            $("#results").html("<p>Top Results</p>");
            $("#results-panel").addClass("panel-success");

            $('a[data-toggle="modal"]').on('click', function(){
                // update modal header with contents of button that invoked the modal
                $('#label').html( $(this).html() );
                //fixes a bootstrap bug that prevents a modal from being reused
                console.log($(this).attr('href'));
                $('.modal-content').load(
                    $(this).attr('href'),
                    function(response, status, xhr) {
                        if (status === 'error') {
                            //console.log('got here');
                            $('.modal-body').html('<h2>Oh snap!</h2><p>Error:' + xhr.status + ' ' + xhr.statusText+ '</p>');
                        }
                        return this;
                    }
                );
            });

        },
        error: function(xhr, status, error){
            $("#results-panel").addClass("panel-danger");
            $("#results").html("<p>Download Failure</p>");
            $("#progress").html('<strong>Error:  </strong> ' + xhr.responseText);
        }
        /*,
        xhrFields: {
            withCredentials: true
        }
        */
    });

}

function showDoc ( name, url ) {
    //console.log(name + ": " + url);
    $("#report").modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    $(".modal-title").text(name);
    $("iframe").attr('src', url);
    $("#report").modal('show');
}

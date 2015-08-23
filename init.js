$(document).ready(function(){
    $("div#results-panel").hide();
    $("div#results").hide();
    $("div#radius-div").hide();
    $('#model-selector').change(function(){
        var aoiModels = ['11111','22222','33333'];
        var pointModels = ['44444','55555','66666'];
        if ($.inArray($('#model-selector').val(), aoiModels) != -1) {
            $("div#radius-div").hide();
            geoType = "circle";
        } else {
            $("div#radius-div").show();
            geoType = "point";
        };
    });
    $("#run-btn").click(function(){
        runModel1();
    })
});

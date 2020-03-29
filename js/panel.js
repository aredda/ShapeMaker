var points = [];

function makePanel (unit)
{
    // Get the panel
    var panel = $("#panel");

    // Clear
    panel.empty();

    // Calculate
    var xAxis = panel.width() / unit;
    var yAxis = panel.height() / unit;

    // Distribute points
    for (var y=0; y < yAxis; y++)
    {
        for (var x=0; x < xAxis; x++)
        {
            // Create the point element
            var pointElement = $("<div class='point'></div>");
            // Append to the panel
            panel.append(pointElement);
            // Change point's position
            pointElement.css({
                left: (x * unit) - pointElement.width() / 2, 
                top: (y * unit) - pointElement.height() / 2
            });
            // Add the point
            points.push (new Point (x, y, pointElement));
        }
    }

    // Draw horizontal grid lines
    for (var y=0; y < yAxis; y++)
    {
        // Create a grid line
        var line = $("<div class='grid-line'></div>");
        // Append to the panel
        panel.append(line);
        // Change the line's position, size
        line.css ({
            left: 0,
            top: y * unit,
            width: panel.width()
        });
    }

    // Draw vertical grid lines
    for (var x=0; x < xAxis; x++)
    {
        // Create a grid line
        var line = $("<div class='grid-line'></div>");
        // Append to the panel
        panel.append(line);
        // Change the line's position, size
        line.css ({
            left: x * unit,
            top: 0,
            height: panel.height()
        });
    }

    // Configure point behaviour
    $(".point").click (function ()
    {
        $(this).toggleClass("selected");

        /*
        if ($(".selected").length > 1)
        {
            var a = $(".selected").first();
            var b = $(".selected").last();

            a = findPointByElement(a);
            b = findPointByElement(b);

            drawLine (a, b, $("#panel"), 50);

            $(".point").removeClass("selected");
        }
        */
    });
}

// Find a point by its element
function findPointByElement(element)
{
    for (var i=0; i < points.length; i++)
        if (points[i].element.is (element))
            return points[i];

    return null;
}

// Find a point by its coordinates
function findPointByCoords(point)
{
    for (var i=0; i < points.length; i++)
        if (points[i].getRealX() == point.getRealX() && points[i].getRealY() == point.getRealY())
            return points[i];

    return null;
}

function serializePoints()
{
    var points = $(".selected");
    var coords = [];

    for (var i=0; i<points.length; i++)
    {
        var point = findPointByElement(points.eq(i));

        coords.push(point.x + "," + point.y);
    }

    return coords.join(";");
}

function displayAdditionalData(serialized)
{
    // Get additional information
    request ("./models/handler.php", serialized, function(data) 
    {
        var jsonData = JSON.parse(data);

        for (var key in jsonData)
        {
            var row = $("<div class='row'></div>");
            var col1 = $("<div class='col-lg-6 text-success font-weight-bold'>"+ key +"</div>");
            var col2 = $("<div class='col-lg-6 text-center'>"+ jsonData[key] +"</div>");

            row.append(col1);
            row.append(col2);

            // append new elements
            $(".toast-body").append (row);
            // Show
            $(".toast").show (500);
            // Configure close event
            $(".toast .close").click (function ()
            {
                $(".toast").hide (500);
            });
        }
    });
}

$(document).ready(function ()
{
    makePanel(60);

    /**
     * Configuration of button click events
     */

    // Configure
    $("#btn-configure").click(function ()
    {
        var unit = $("#txt-unit").val();

        if (unit < 40)
            unit = 40;
        
        if (unit > 100)
            unit = 100;

        makePanel(unit);
    });

    // Clear
    $("#btn-clear").click(function (){
        // Clear all points, clear all lines
        $(".line").remove();
        // Clear selected
        $(".point").removeClass("selected");
    });

    // Toggle points
    $("#btn-points").click(function (){
        $(".point").toggle();
    });

    // Toggle lines
    $("#btn-lines").click(function (){
        $(".grid-line").toggle();
    });

    // Draw triangle
    $("#btn-triangle").click(function (){
        try
        {
            // Clear previous elements
            $(".toast-body").empty();
            // Serialize them
            var serialized = "triangle=" + serializePoints();
            // Try drawing
            drawTriangle($(".selected"));
            // Additional data
            displayAdditionalData(serialized);
        }
        catch (e)
        {
            alert (e);
        }
    });

    // Draw rectangle
    $("#btn-rectangle").click(function (){
        try
        {
            // Clear previous elements
            $(".toast-body").empty();
            // Serialize them
            var serialized = "rectangle=" + serializePoints();
            // Try drawing
            drawRectangle($(".selected"));
            // Additional data
            displayAdditionalData(serialized);
        }
        catch (e)
        {
            alert (e);
        }
    });
});
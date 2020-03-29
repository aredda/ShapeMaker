function drawTriangle(points)
{
    if (points.length > 3 || points.length < 3)
        throw "Triangle needs three points in space!";

    // retrieve panel
    var panel = $("#panel");

    // retrieve points individually
    var a = findPointByElement (points.first());
    var b = findPointByElement (points.eq(1));
    var c = findPointByElement (points.last());

    // draw three lines
    drawLine(a, b, panel);
    drawLine(a, c, panel);
    drawLine(b, c, panel);

    // Clear
    $(".point").removeClass("selected");
}

function drawRectangle(points)
{
    if (points.length > 4 || points.length < 4)
        throw "Rectangles need four points in space!";

    // find the longest edge
    var farVertices;
    var maxDistance = 0;
    for (var i=0; i<points.length; i++)
    {
        var v1 = findPointByElement (points.eq(i));

        for (var j=0; j<points.length; j++)
        {
            var v2 =  findPointByElement (points.eq(j));

            if (getMagnitude(getVector (v1, v2)) > maxDistance)
            {
                farVertices = [];
                farVertices.push (v1, v2);
                
                maxDistance = getMagnitude(getVector (v1, v2));
            }
        }
    }

    // Draw lines
    for (var j=0; j<farVertices.length; j++)
    {
        for (var i=0; i<points.length; i++)
        {
            var adjacent = findPointByElement (points.eq(i));

            if (farVertices.includes(adjacent))
                continue;

            // draw a line
            if (j == 0)
            drawLine(farVertices[j], adjacent, $("#panel"));
            else
            drawLine(adjacent, farVertices[j], $("#panel"));
        }
    }

    // Cear
    $(".point").removeClass("selected");
}

function drawLine(a, b, panel)
{
    // Get the distance
    var ab = getVector(a, b);

    // Get the rotation angle
    var angle = calculateAngle(a, b);

    // Check if the horizontal distance is bigger
    var isXGreater = Math.abs (ab.x) > Math.abs (ab.y); 

    // Fix angle
    // If it's an horizontal line, if a.x > b.x then flip the angle
    // If it's an vertical line, if a.x < b.x then flip the angle
    if (isXGreater && a.getRealX() > b.getRealX())
        angle = 180 - angle;
    else if (!isXGreater && a.getRealX() < b.getRealX())
        angle *= -1;

    // Get the line size
    var lineSize = getMagnitude(ab);

    // Create a line
    var line = $("<div class='line'></div>");

    // Append it
    panel.append (line);

    // Adjust the size, position, rotation, scale
    line.css (isXGreater ? "width" : "height", lineSize + "px");
    line.css ({
        top: a.getRealY() + ($(".point").height() / 2),
        left: a.getRealX() + ($(".point").width() / 2)
    });
    line.css ("transform-origin", "top left");
    line.css ("transform", "rotate("+ angle +"deg)");
    line.css ("border-color", $("#txt-color").val());
}

function getVector(a, b)
{
    return {
        x: b.getRealX() - a.getRealX(),
        y: b.getRealY() - a.getRealY()
    };
}

function getMagnitude(vector)
{
    return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
}

function getDotProduct(u, v)
{
    return (u.x * v.x) + (u.y * v.y); 
}

function calculateAngle(a, b)
{
    // Visualise the first vector
    var ab = getVector(a, b);

    // Virtual point
    var virtualPoint = (Math.abs(ab.x) > Math.abs(ab.y)) 
        ? new Point(b.getRealX(), a.getRealY(), null) 
        : new Point(a.getRealX(), b.getRealY(), null);

    // Visualise the second vector
    var av = getVector(a, virtualPoint);
    
    // Calculate the dot product
    var dotProduct = getDotProduct(ab, av);

    // Calculate the product of their magnitudes
    var magnitudeProduct = getMagnitude(ab) * getMagnitude(av);

    // Calculate the cosine
    var cosine = dotProduct / magnitudeProduct;

    // Get the angle
    return Math.acos(cosine) * (180 / Math.PI);
}
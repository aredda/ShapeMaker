<?php

include "point.php";
include "triangle.php";
include "rectangle.php";

function extractPoints($string)
{
    // Extract points
    $pointStringArr = explode(";", $string);

    $points = [];

    foreach ($pointStringArr as $pointString)
    {
        $pointCoord = explode (",", $pointString);

        array_push ($points, new Point($pointCoord[0], $pointCoord[1]));
    }

    return $points;
}

if (isset($_POST['triangle']))
{
    $points = extractPoints($_POST['triangle']);

    if (count ($points) == 3)
    {
        $triangle = new Triangle($points[0], $points[1], $points[2]);

        echo json_encode(["Equaletral" => $triangle->isEqualetral(), "Isocele" => $triangle->isIsocele()]);
    }
}
else if (isset($_POST['rectangle']))
{
    $points = extractPoints($_POST['rectangle']);

    if (count ($points) == 4)
    {
        $origin = $points[0];
        
        $distances = [];
    
        for ($i=1; $i<count($points); $i++)
            array_push($distances, $origin->distance($points[$i]));

        $maxDistance = max ($distances);
        $minDistance = min ($distances);
        $avgDistance = $maxDistance;

        for ($i=0; $i<count($distances); $i++)
            if ($distances[$i] != $maxDistance && $distances[$i] != $minDistance)
                $avgDistance = $distances[$i];


        $rectangle = new Rectangle($origin, $avgDistance, $minDistance);

        echo json_encode(["Surface" => $rectangle->surface()]);
    }
}
function spawnClouds (number)
{
    for (var i=0; i<number; i++)
    {
        // Generate a random number
        var cloudNumber = Math.floor((Math.random() * 4)) + 1;
        
        // Create a cloud
        var cloud = $("<img class='cloud' src='clouds/cloud" + cloudNumber + ".png' />");

        // Add it
        $("body").append (cloud);

        // Choose a random position
        var y = Math.floor((Math.random() * $(document).height() - 50));

        // Choose a random speed
        var speed = 6 + Math.floor((Math.random() * 5));

        // Re position
        cloud.css ("top", y+"px");
        cloud.css ("animation-duration", speed + "s");
    }
}

$(document).ready(function(){
    // Spawn some clouds
    spawnClouds(4);
});
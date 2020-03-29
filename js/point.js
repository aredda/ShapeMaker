this.Point = function (x, y, element)
{
    this.x = x;
    this.y = y;
    this.element = element;

    this.getRealX = function ()
    {
        if (element == null)
            return x;

        return element.position().left;  
    };
    this.getRealY = function ()
    {
        if (element == null)
            return y;

        return element.position().top;
    };
}
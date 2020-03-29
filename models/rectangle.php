<?php

class Rectangle
{
    public $origin;
    public $width, $height;

    public function __construct(Point $origin, float $width, float $height)
    {
        $this->origin = $origin;
        $this->width = $width;
        $this->height = $height;
    }

    public function surface()
    {
        return $this->width * $this->height;
    }

    public function maxBorder()
    {
        return new Point($this->origin->x + $this->width, $this->origin->y + $this->height);
    }

    public function overlapsPoint(Point $point)
    {
        if ($point->x >= $this->origin->x && $point->x <= $this->maxBorder()->x)
            if ($point->y >= $this->origin->y && $point->y <= $this->maxBorder()->y)
                return true;

        return false;
    }

    public function overlapsRectangle(Rectangle $rectangle)
    {
        return $this->overlapsPoint($rectangle->origin) && $this->overlapsPoint($rectangle->maxBorder());
    }

    public function equals(Rectangle $rectangle)
    {
        return $this->origin->equals($rectangle->origin) && $this->height == $rectangle->height && $this->width == $rectangle->width;
    }
}
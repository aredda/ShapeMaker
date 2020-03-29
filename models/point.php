<?php

class Point
{
    public $x;
    public $y;

    public function __construct(float $x, float $y)
    {
        $this->x = $x;
        $this->y = $y;
    }

    public function getX()
    {
        return $this->x;
    }

    public function getY()
    {
        return $this->y;
    }

    public function distance(Point $p)
    {
        return sqrt(pow($this->x - $p->x, 2) + pow($this->y - $p->y, 2));
    }

    public function equals(Point $point)
    {
        return $point->x == $this->x && $point->y == $this->y;
    }
}
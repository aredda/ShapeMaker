<?php

class Triangle
{
    public $a, $b, $c;

    public function __construct(Point $a, Point $b, Point $c)
    {
        $this->a = $a;
        $this->b = $b;
        $this->c = $c;
    }

    public function isIsocele()
    {
        $ab = $this->a->distance($this->b);
        $ac = $this->a->distance($this->c);
        $bc = $this->b->distance($this->c);

        return ($ab == $ac || $ab == $bc || $ac == $bc);
    }

    public function isEqualetral()
    { 
        $ab = $this->a->distance($this->b);
        $ac = $this->a->distance($this->c);
        $bc = $this->b->distance($this->c);

        return ($ab == $ac && $ab == $bc && $ac == $bc);
    }
}

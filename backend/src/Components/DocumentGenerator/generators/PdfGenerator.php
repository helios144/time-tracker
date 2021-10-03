<?php

namespace App\Components\DocumentGenerator;

use \Dompdf\Dompdf;
use \Dompdf\Options;

class  PdfGenerator implements DocumentGeneratorInterface
{
    private $html = '';

    public function setData(array $data)
    {
    }

    public function generate()
    {
        $options = new Options();
        $options->setIsHtml5ParserEnabled(true);
        $dompdf = new Dompdf($options);
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->loadHtml($this->html, 'UTF-8');
        //no clue kodėl tušias pdf, html gerai supranta, encoding lygtais ok
        $this->output = $dompdf->output();
        return $this->output;
    }

    public function output()
    {
        return $this->output;
    }

    public function setHtml(String $html = '')
    {
        $this->html = $html;
    }
}

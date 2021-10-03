<?php

namespace App\Components\DocumentGenerator;

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Csv;

class  CsvGenerator implements DocumentGeneratorInterface
{

    protected $output;
    protected $data = [];
    private $baseDir = __DIR__ . '/tmp';
    private $fileName;
    private $tempDir = null;

    function __construct($fileName = 'report.xlsx')
    {
        $this->fileName = $fileName;
        $this->tempDir = $this->baseDir . '/' . substr(md5(mt_rand()), 0, 7);
    }

    public function setData($data)
    {
        $this->data = $data;
    }

    public function generate()
    {

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->fromArray($this->data, NULL, 'A1');
        $writer = new Csv($spreadsheet);
        $writer->setUseBOM(true);
        $writer->setDelimiter(',');
        $writer->setEnclosure('');
        $writer->setLineEnding("\r\n");
        $writer->setSheetIndex(0);
        if (!file_exists($this->baseDir)) {
            mkdir($this->baseDir, 0777, true);
        }
        if (!file_exists($this->tempDir)) {
            mkdir($this->tempDir, 0777, true);
        }
        $writer->save($this->tempDir . '/' . $this->fileName);
        $this->output = file_get_contents($this->tempDir . '/' . $this->fileName);
        return $this->output;
    }

    public function output()
    {
        return $this->output;
    }

    function __destruct()
    {
        if (file_exists($this->tempDir . '/' . $this->fileName)) {
            unlink($this->tempDir . '/' . $this->fileName);
        }
        if (file_exists($this->tempDir) && count(scandir($this->tempDir)) == 2) {
            rmdir($this->tempDir);
        }
    }
}

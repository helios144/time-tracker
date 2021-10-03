<?php

namespace App\Components\DocumentGenerator;

class DocumentGeneratorFactory
{

    /**
     * Sets data for file generation.
     * @param string $type type of object to return
     * @throws InvalidTypeException;
     * @return DocumentGeneratorInterface
     */
    public static function getGenerator($type)
    {
        $obj = null;
        switch ($type) {
            case "csv":
                $obj = new CsvGenerator();
                break;
            case "pdf":
                $obj = new PdfGenerator();
                break;
            case "xlsx":
                $obj = new ExcelGenerator();
                break;
            default:
                throw new InvalidTypeException('File type not supported');
                break;
        }
        return $obj;
    }
}

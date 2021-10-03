<?php

namespace App\Components\DocumentGenerator;

interface DocumentGeneratorInterface
{

    /**
     * Sets data for file generation.
     * @param Array $data data to generate file from
     * @return void
     */
    public function setData(array $data);
    /**
     * Generates file.
     * @return mixed
     */
    public function generate();
    /**
     * Return generated file output.
     *
     * @param string $message    The message (may also be an object that can be cast to string)
     * @param string $locale     The message locale
     * @param array  $parameters An array of parameters for the message
     *
     * @return mixed
     */
    public function output();
}

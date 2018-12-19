<?php

function scan (string $file) {

    foreach (scandir($file) as $value) {

        switch ($value) {
            case  '..' :
            case  '.' :
                continue 2;
        }

        $path = $file . DIRECTORY_SEPARATOR . $value;

        if(is_dir($path)) {

            yield from scan($path);

        } else {

            yield $path;
        }
    }
}


foreach (scan(__DIR__) as $value) {

    var_dump($value);
}
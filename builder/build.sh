#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
CDIR="$DIR/../c"
require="${1}"
module="${2}"
version="${3}"

cmd="java -classpath '$DIR/vendor/requirejs/js.jar':'$DIR/vendor/closureCompiler/compiler.jar' org.mozilla.javascript.tools.shell.Main '$DIR/vendor/requirejs/r.js' -o '$DIR/../src/build.config.js' name=$require insertRequire=$require out=$CDIR/$module.$version.js && java -jar '$DIR/vendor/yuicompressor/yuicompressor.jar' --type css -v $CDIR/$module.$version.css -o $CDIR/$module.$version.css"

$SHELL -c "$cmd"

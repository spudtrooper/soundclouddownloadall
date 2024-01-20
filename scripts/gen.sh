#!/bin/sh

set -e

mkdir -p output
args=(
    --base_source_url
    https://github.com/spudtrooper/soundclouddownload/blob/main/src
    --js_dir
    src
    --outfile_html
    doc/bookmarklets.html
)
bookmarkletgen "${args[@]}"

open doc/bookmarklets.html

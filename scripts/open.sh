#!/bin/sh

set -e

scripts="$(dirname "$0")"

$scripts/gen.sh
open doc/bookmarklets.html
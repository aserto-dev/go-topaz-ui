#!/usr/bin/env bash

set -euo pipefail

version="${MONACO_VERSION:-0.52.2}"
destination="static/vendor/monaco"
archive="$(mktemp -t planbee-monaco.XXXXXX.tgz)"
cleanup() {
	rm -f "$archive"
}
trap cleanup EXIT

curl --fail --location --show-error --silent \
	"https://registry.npmjs.org/monaco-editor/-/monaco-editor-${version}.tgz" \
	--output "$archive"

tmpdir="$(mktemp -d -t planbee-monaco.XXXXXX)"
trap 'rm -rf "$tmpdir" "$archive"' EXIT
tar -xzf "$archive" -C "$tmpdir"

mkdir -p "$destination"
rm -rf "$destination/min"
cp -R "$tmpdir/package/min" "$destination/min"
cp "$tmpdir/package/LICENSE" "$destination/LICENSE"

printf 'downloaded Monaco %s to %s\n' "$version" "$destination"

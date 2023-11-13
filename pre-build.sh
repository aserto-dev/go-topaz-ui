#!/bin/sh

tag=$1
artifact="dist-self-hosted-console-"$tag".tar.gz"
list_asset_url="https://api.github.com/repos/aserto-dev/self-hosted-console/releases/tags/${tag}"
echo $list_asset_url

# get url for artifact with name==$artifact
asset_url=$(curl -H "Authorization:Bearer $READ_WRITE_TOKEN" "${list_asset_url}" | jq ".assets[] | select(.name==\"${artifact}\") | .url" | sed 's/\"//g')
echo $asset_url

# download the artifact
curl -vLJO -H 'Accept: application/octet-stream' -H "Authorization:Bearer $READ_WRITE_TOKEN" "${asset_url}"

rm -rf console
mkdir -p console/tar
tar -xvf $artifact -C console/tar
mv console/tar/build/* console/
rm -rf console/tar
rm $artifact

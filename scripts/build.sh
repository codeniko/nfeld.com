#!/bin/bash

BUILD='./build'

npm run build:css && REACT_APP_VERSION=$npm_package_version react-scripts build #&& cp sitemap/*.xml build/

# remove unnecessary images that we shouldn't deploy
if [ -d "$BUILD" ]; then
  rm -rf "$BUILD/images/no-publish"
fi

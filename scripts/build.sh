#!/bin/bash

BUILD='./build'

npm run build:css && react-scripts build && npm run build:sitemap

# remove unnecessary images that we shouldn't deploy
if [ -d "$BUILD" ]; then
  rm -rf "$BUILD/images/no-publish"
fi

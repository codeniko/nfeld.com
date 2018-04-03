#!/bin/bash

BUILD='./build'

react-scripts build && npm run build:sitemap && npm run build:api

# remove unnecessary images that we shouldn't deploy
if [ -d "$BUILD" ]; then
  rm -rf "$BUILD/images/no-publish"
fi

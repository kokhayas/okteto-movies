#! /bin/bash

export MONGODB_PASSWORD=password
export MONGODB_USERNAME=okteto
export MONGODB_DATABASE=okteto
export MONGODB_HOST=mongodb

yarn install
yarn test

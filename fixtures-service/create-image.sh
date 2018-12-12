#!/usr/bin/env bash

docker rm -f fixtures-service

docker rmi fixtures-service

docker image prune

docker volume prune

docker build -t fixtures-service .

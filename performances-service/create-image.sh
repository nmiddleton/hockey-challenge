#!/usr/bin/env bash

docker rm -f performances-service

docker rmi performances-service

docker image prune

docker volume prune

docker build -t performances-service .

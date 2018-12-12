#!/usr/bin/env bash

docker service create --replicas 1 --name performances-service -l=apiRoute='/performances' -p 3000:3000 ngmiddleton/performances-service

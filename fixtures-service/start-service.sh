#!/usr/bin/env bash

docker service create --replicas 1 --name fixtures-service -l=apiRoute='/fixtures' -p 3000:3000 ngmiddleton/fixtures-service

#!/bin/bash


if [ -n $1 -a -n $2 -a -n $3 ] 
then

    echo "Owner: $1"
    echo "Repo: $2"
    echo "Token: $3"

    curl -u $1:$3 -X POST https://api.github.com/repos/$1/$2/pages/builds -H "Accept: application/vnd.github.mister-fantastic-preview+json"
else
    echo "Missing arguments"
    echo "Use rebuild.sh <owner> <repo> <token>"
fi
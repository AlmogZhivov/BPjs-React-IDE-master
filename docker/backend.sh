#!/bin/bash

# turn on bash's job control
#set -m

cd BPjs-Debugger || exit 1

updateProjects=${UPDATE_PROJECTS:0}
if [[ $updateProjects -eq 1 ]]
then
    echo "Updating backend from GitHub"
    git pull
    echo "Installing backend dependencies"
    mvn install -DskipTests
fi

cd controller || exit 1
echo "Starting backend"
mvn spring-boot:run

# now we bring the primary process back into the foreground
# and leave it there
#fg %1
#!/bin/bash

# turn on bash's job control
#set -m

cd BPjs-React-IDE || exit 1

updateProjects=${UPDATE_PROJECTS:0}

if [[ $updateProjects -eq 1 ]]
then
    echo "Updating frontend from GitHub"
    git pull
    echo "Installing frontend dependencies"
    npm install --production
    echo "Building frontend"
    npm run build
fi


#export PORT=80
echo "Starting frontend"
serve -s build -p 80 &
#npm start

# now we bring the primary process back into the foreground
# and leave it there
#fg %1
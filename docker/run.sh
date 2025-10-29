#!/bin/bash

# turn on bash's job control
#set -m

./frontend.sh

./backend.sh

# now we bring the primary process back into the foreground
# and leave it there
#fg %1
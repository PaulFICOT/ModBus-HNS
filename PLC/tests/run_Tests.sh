#/bin/bash

# kill potentially current instance of node
killall node

# getting the path where the script is running and cd into
TESTS_PATH="`dirname \"$0\"`"             
TESTS_PATH="`( cd \"$TESTS_PATH\" && pwd )`"  
if [ -z "$TESTS_PATH" ] ; then
  exit 1  # fail
fi

cd $TESTS_PATH

# Go into the project directory
cd ..
# Install packages
npm i

#Run the server
node modbusServer.js &

#Let 1 second to init
sleep 1s

#Run tests
python ./tests/python/unitTests.py

# The option -k kill the server after the tests
if [ $1 == "-k" ] ; then
  killall node 
fi

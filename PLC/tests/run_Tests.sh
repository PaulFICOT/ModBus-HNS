#/bin/bash
killall node
cd ..
node modbusServer.js &
sleep 1s
python ./tests/python/unitTests.py


#/bin/bash
echo ".: Install PLC :."

#Update apps
apt update

#Git
apt-get install git
git clone https://github.com/PaulFICOT/ModBus-HNS
cd ModBus-HNS
git checkout dev

#enter repository
cd PLC

#Node
apt install nodejs npm
nodejs --version
npm i

#Python
apt-get install python3.6 python3-pip
python3 --version
pip3 --version
pip3 install umodbus

#Run
./tests/run_Tests.sh
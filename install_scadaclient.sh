#/bin/bash
echo ".: Install ScadaClient :."

#Update apps
apt update

#Git
apt-get install git
git clone https://github.com/PaulFICOT/ModBus-HNS
cd ModBus-HNS
git checkout dev

#enter repository
cd ScadaClient

#Node
apt install nodejs npm
nodejs --version
npm i

#Run
node server.js
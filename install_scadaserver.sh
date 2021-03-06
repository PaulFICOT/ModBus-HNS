#/bin/bash
echo ".: Install ScadaServer :."

#Update apps
apt update

#Git
apt-get install git
git clone https://github.com/PaulFICOT/ModBus-HNS
cd ModBus-HNS
git checkout dev

#enter repository
cd ScadaServer

#Python
apt-get install python3.6 python3-pip
python3 --version
pip3 --version
pip3 install $(cat pip_list.txt)
python3 manage.py migrate
python3 manage.py createsuperuser

#Run
python3 manage.py runserver 0.0.0.0:8000
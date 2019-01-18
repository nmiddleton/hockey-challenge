#!/bin/bash

sudo yum -y update
echo '[mongodb-org-4.0]'>mongodb-org-4.0.repo
echo 'name=MongoDB Repository'>>mongodb-org-4.0.repo
echo 'baseurl=https://repo.mongodb.org/yum/amazon/2/mongodb-org/4.0/x86_64/'>>mongodb-org-4.0.repo
echo 'gpgcheck=1'>>mongodb-org-4.0.repo
echo 'enabled=1'>>mongodb-org-4.0.repo
echo 'gpgkey=https://www.mongodb.org/static/pgp/server-4.0.asc'>>mongodb-org-4.0.repo
sudo cp mongodb-org-4.0.repo /etc/yum.repos.d/
sudo yum -y install httpd node git mongodb-org

echo '<html><h1>Hello </h1></html>" > /var/www/index.html
sudo service httpd start
sudo service mongod start
sudo chkconfig httpd on
sudo chkconfig mongod on
cd /home/ec2-user
echo 'db.createUser({user: "challenge",pwd: "challengepass123",roles: [ "readWrite", "dbAdmin" ]});'>> mongocfg.js

git clone https://github.com/nmiddleton/hockey-challenge.git
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash
export NVM_DIR="/home/ec2-user/.nvm"
. ~/.nvm/nvm.sh
nvm install 10.9.0
cd ./hockey-challenge
npm install
cd ./fixtures-service
npm install
cd ../performances-service
npm install
cd /home/ec2-user
nohup node /home/ec2-user/hockey-challenge/fixtures-service/src/index.js 2>&1>fixtures_api.log &
nohup node /home/ec2-user/hockey-challenge/performances-service/src/index.js 2>&1>performances_api.log &
cd /home/ec2-user/hockey-challenge

nohup npm start 2>&1>fixtures_api.log &

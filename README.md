HealthByte-Web is a Angular Project
For doctors its providing publishing tool platform.
Setup Codebase
--------------

* Clone the repository:

```
git clone https://github.com/vimalkaurani/healthByte-web.git
cd healthByte-web
```

* Install Dependencies and configure parameters

```sh
sudo npm install
npm install
sudo npm install -g bower
bower install
sudo npm install -g gulp
```
* Gulp Commands for Production environment

```sh
gulp
gulp version
```
* Gulp Commands for Staging environment

```sh
gulp staging
gulp version
```
* For Devs
```sh
gulp development
```

* Configuring nginx

Copy ```app/config/nginx/fit``` to ```/etc/nginx/sites-available/``` and edit configuration parameters in this config file

```sh
sudo cp app/config/nginx/fit /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/fit /etc/nginx/sites-enabled/
sudo service nginx restart
```

* Add entries in hosts files

Add following lines to /etc/hosts files on your machine and box

```
127.0.0.1 healthByte.fit.local
```


**Run mysql docker:
**
docker pull mysql:latest

docker run -itd --name mysql-test -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql

**Go to docker desktop, find mysql container, click open in terminal, enter:
**
mysql -u root -p

123456

create database comp4800;

create database comp4800test;

create database comp4800development;

**Go to backend folder, run:
**
npm install

npm start

**Go to frontend folder, run:
**
npm install

npm start

**node BE: http://localhost:3000/
react FE: http://localhost:8000/**
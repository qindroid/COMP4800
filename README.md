
**Run mysql docker:**

    docker pull mysql:latest
    docker run -itd --name mysql-test -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql

**Go to docker desktop, find mysql container, click open in terminal, enter:**

    mysql -u root -p
    123456
    create database comp4800;
    create database comp4800test;
    create database comp4800development;

**Go to backend folder, run:**

    npm install
    npm start
**Go to frontend folder, run:**

    npm install
    npm start

**node BE: [http://localhost:3000/](http://localhost:3000/)
react FE: [http://localhost:8000/](http://localhost:8000/)**

**Mysql server (for production only):**

    { 
	   "mysqlOptions": { 
         "authProtocol": "default" },
	     "server": "129.153.104.208", 
	     "port": 3306,
	     "driver": "MySQL",
	     "name": "choose_a_name",
         "database": "comp4800",
         "username": "root",
         "password": "comp4800!" 
    }


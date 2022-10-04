-- clearing of any existing database under this name and creating a fresh one
drop database if exists employees_db;
create database employees_db;

use employees_db;

-- creation of necessary tables for app
create table department (
    id INT NOT NULL auto_increment PRIMARY KEY,
    dept_name VARCHAR(30)
);

create table roles (
    id INT NOT NULL auto_increment PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL (9, 2) NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);

create table employee (
    id INT NOT NULL auto_increment PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (role_id) 
    REFERENCES roles(id)
);



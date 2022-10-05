// Dependencies
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

// Establishing connection to mysql
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employees_db'
},
console.log('Success! Connected to the employees database.')
);

// main userMenu function
function init() {
    inquirer
        .prompt({
            name: 'menu',
            type: 'list',
            message: 'Hey there, what would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add new department',
                'Add new role',
                'Add new employee',
                'Update employee',
                'Exit'
            ]
        })
        .then((res) => {
            switch (res.menu) {
                case 'View all departments': viewAllDepartments();
                    break;
                case 'View all roles': viewAllRoles();
                    break;
                case 'View all employees': viewAllEmployees();
                    break;
                case 'Add new department': addNewDepartment();
                    break;
                case 'Add new role': addNewRole();
                    break;
                case 'Add new employee': addNewEmployee();
                    break;
                case 'Update employee':
                    updateEmployee();
                    break;
                case 'Exit': console.log('See you later!');
                db.end();
            }
        })
};

function viewAllDepartments() {
    let query = 'select * from department'
    db.query(query, function (err, res){
        console.table(res);
        init();
    })
};

function viewAllRoles() {
    let query = 'select * from roles'
    db.query(query, function (err, res){
        console.table(res);
        init();
    })
};

function viewAllEmployees() {
    let query = 'select * from employee'
    db.query(query, function (err, res){
        console.table(res);
        init();
    })
};

function addNewDepartment() {
    inquirer
    .prompt({
        name: 'newDeptName',
        type: 'input',
        message: "What is this new department's name?"
    })
    .then(function(data) {
        let query = `insert into department (dept_name) values ('${data.newDeptName}')`
        db.query(query, function (err, res){
            if (err) throw err;
            console.log(`${data.newDeptName} department added to Departments table.`);
        })
    })
};

init();


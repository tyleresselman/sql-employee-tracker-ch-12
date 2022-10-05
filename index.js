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
});

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
                    console.clear();
            }
        })
};


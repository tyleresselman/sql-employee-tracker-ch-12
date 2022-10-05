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

// Function to display all departments in table form
function viewAllDepartments() {
    let query = 'select * from department'
    db.query(query, function (err, res) {
        console.table(res);
        init();
    })
};

// Function to display all roles in table form
function viewAllRoles() {
    let query = 'select * from roles'
    db.query(query, function (err, res) {
        console.table(res);
        init();
    })
};

// Function to display all employees in table form
function viewAllEmployees() {
    let query = 'select * from employee'
    db.query(query, function (err, res) {
        console.table(res);
        init();
    })
};

// Function to generate a new department
function addNewDepartment() {
    inquirer
        .prompt({
            name: 'newDeptName',
            type: 'input',
            message: "What is this new department's name?"
        })
        .then(function (data) {
            let query = `insert into department (dept_name) values ('${data.newDeptName}')`
            db.query(query, function (err, res) {
                if (err) throw err;
                console.log(`${data.newDeptName} department added to Departments table.`);
            })
        })
};

// Function to add a new employee
function addNewEmployee() {
    db.query('select * from roles', function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([{
                name: 'newEmpName',
                message: "What is this new employee's first name?",
                type: 'input'
            }, {
                name: 'newEmpLastName',
                message: "What is this new employee's last name?",
                type: 'input'
            }, {
                name: 'title',
                message: "What is this new employee's role's ID number?",
                type: 'list',
                choices: [
                    1,
                    2,
                    3,
                    4]
            }
            ])
            .then(function (data) {
                let getRole = `select id from roles where title = '${data.title}'`;
                db.query(getRole, function (err, results) {
                    if (err) throw err;
                    let query = `insert into employee (first_name, last_name, role_id) values ("${data.newEmpName}", "${data.newEmpLastName}", "${results}")`;
                    db.query(query, function (err, results) {
                        if (err) throw err;
                        console.log(`${data.newEmpName} ${data.newEmpLastName} has been added to the Employees table.`);
                        init();
                    })
                })
            })
    })
}

// Initiation function
init();


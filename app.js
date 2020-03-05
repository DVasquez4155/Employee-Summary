const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const q = require("./lib/questions");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");


const employees = [];
async function init() {
    await askForEmployees();
    const rendered = render(employees);
    writeFile(rendered)
}
function writeFile(rendered) {
    if (!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFile(outputPath, rendered, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}
async function askForEmployees() {
    while (true) {
        const anotherEmployee = await inquirer.prompt(q.anotherEmployee);
        if (!anotherEmployee.anotherEmployee) {
            return;
        }
        const emp = {}
        const name = await inquirer.prompt(q.employeeName);
        emp.employeeName = name.employeeName
        const info = await askForOthers(name.employeeName);
        emp.employeeTitle = info.employeeTitle;
        emp.employeeId = info.employeeId;
        emp.employeeEmail = info.employeeEmail;
        const contact = await inquirer.prompt(replaceReturn(replaceReturn(q.employeeContact, '${employeeName}', name.employeeName),'${employeeContact}',q.getEmployeeContact(emp.employeeTitle)))
        emp.employeeContact = contact.employeeContact
        employees.push(newEmployee(emp))
    }
}
function newEmployee(emp) {
    switch (emp.employeeTitle) {
        case 'Manager':
            return new Manager(emp.employeeName,emp.employeeId,emp.employeeEmail,emp.employeeContact)
        case 'Engineer':
            return new Engineer(emp.employeeName,emp.employeeId,emp.employeeEmail,emp.employeeContact)
        case 'Intern':
            return new Intern(emp.employeeName,emp.employeeId,emp.employeeEmail,emp.employeeContact)
    }
}
function replaceReturn(question, string, replace) {
    const q = question;
    q.message = q.message.replace(string, replace)
    return q;
}
async function askForOthers(name) {
    const questions = [
        replaceReturn(q.employeeTitle, '${employeeName}', name),
        replaceReturn(q.employeeId, '${employeeName}', name),
        replaceReturn(q.employeeEmail, '${employeeName}', name)
    ]
    return await inquirer.prompt(questions);
}

init();
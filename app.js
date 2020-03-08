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
    // const employee = new Manager('Name','email','ID','RM');
    // employees.push(employee)
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
        const questions = [q.employeeTitle,q.employeeId,q.employeeEmail]
        // const info = await inquirer.prompt(questions);
        const name = await inquirer.prompt(q.employeeName);
        emp.employeeName = name.employeeName;
        const info = await inquirer.prompt(questionsWithName(questions, emp.employeeName));
        emp.employeeTitle = info.employeeTitle;
        emp.employeeId = info.employeeId;
        emp.employeeEmail = info.employeeEmail;
        const contact = await askForContact(emp)
        emp.employeeContact = contact.employeeContact
        employees.push(newEmployee(emp))
    }
}
function questionsWithName(questions,name) {
    return JSON.parse(JSON.stringify(questions).split("${employeeName}").join(name))
}
async function askForContact(info) {
    const employeeContact = q.getEmployeeContact(info.employeeTitle);
    const contactQuestion = JSON.parse(
        JSON.stringify(q.employeeContact)
        .replace('${employeeContact}', employeeContact)
        .split("${employeeName}").join(info.employeeName)
    );
    return await inquirer.prompt(contactQuestion)

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

init();
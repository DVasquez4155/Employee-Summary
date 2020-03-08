exports.employeeName = {
    message: "What is the employee's name?",
    type: "input",
    name: "employeeName",
    default: "Daniel V"
}
exports.employeeTitle = {
    message: "What is the ${employeeName}'s job?",
    type: "list",
    name: "employeeTitle",
    choices: [
        'Manager',
        'Engineer',
        'Intern'
    ],
}
exports.employeeId = {
    message: "What is ${employeeName}'s ID?",
    type: "input",
    name: "employeeId",
    default: "01"
}
exports.employeeEmail = {
    message: "What is the ${employeeName}'s email?",
    type: "input",
    name: "employeeEmail",
    default: "main@dvasquez4155.com"
}
exports.employeeContact = {
    message: "What is the ${employeeName}'s ${employeeContact}?",
    type: "input",
    name: "employeeContact"
}
exports.getEmployeeContact = function(employeeTitle) {
    switch(employeeTitle) {
        case 'Manager':
            return 'Office Number'
        case 'Engineer':
            return 'Github'
        case 'Intern':
            return 'School'
    }
}
exports.anotherEmployee = {
    message: "Would you like to add another employee?",
    type: "list",
    name: "anotherEmployee",
    choices : [
        {
            name: 'Yes',
            value: true
        },
        {
            name: 'No',
            value: false
        }
    ]
}
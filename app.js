'use strict';

class Employee {
    constructor(firstname, lastname, baseSalary, experience) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.baseSalary = baseSalary;
        this.experience = experience;
    }

    calculateSalary() {
        let salary = 0;

        if (this.experience < 2) {
            salary = this.baseSalary;
        } else if (this.experience < 5) {
            salary = this.baseSalary + 200;
        } else if (this.experience >= 5) {
            salary = this.baseSalary * 1.2 + 500;
        }

        return salary;
    }
}

class Developer extends Employee {
    constructor(firstname, lastname, baseSalary, experience) {
        super(firstname, lastname, baseSalary, experience);
    }
}

class Designer extends Employee {
    constructor(firstname, lastname, baseSalary, experience, efficiency) {
        super(firstname, lastname, baseSalary, experience);

        if (efficiency < 0) {
            this.efficiency = 0;
        } else if (efficiency > 1) {
            this.efficiency = 1;
        } else {
            this.efficiency = efficiency;
        }
    }

    calculateSalary() {
        return super.calculateSalary() * this.efficiency;
    }
}

class Manager extends Employee {
    constructor(firstname, lastname, baseSalary, experience, team) {
        super(firstname, lastname, baseSalary, experience);
        this.team = team;
    }

    calculateSalary() {
        let salary = super.calculateSalary();
        if (this.team.length > 10) {
            salary += 300;
        } else if (this.team.length > 5) {
            salary += 200;
        }

        let developerCount = 0;
        for (let i = 0; i < this.team.length; i++) {
            if (this.team[i] instanceof Developer) {
                developerCount++;
            }
        }
        let coefficient = developerCount / this.team.length;

        if (coefficient > 0.5) {
            salary += salary * 0.1;
        }

        return salary;
    }
}

class Department {
    constructor(managers) {
        this.managers = managers;
    }

    giveSalary() {
        if (!this.managers || this.managers.length === 0) {
            return;
        }

        for (let i = 0; i < this.managers.length; i++) {
            this.logEmployeeInfo(this.managers[i]);
            for (let j = 0; j < this.managers[i].team.length; j++) {
                this.logEmployeeInfo(this.managers[i].team[j]);
            }
        }
    }

    logEmployeeInfo(employee) {
        console.log(
            `${employee.firstname} ${employee.lastname} - ${employee.calculateSalary()}$\n`
        );
    }
}

// Створення об'єктів
let developers = [];
for (let i = 1; i <= 8; i++) {
    let developer = new Developer(`Developer${i}`, `Lastname${i}`, i * 100, i);
    developers.push(developer);
}

let designers = [];
for (let i = 1; i <= 8; i++) {
    let designer = new Designer(`Designer${i}`, `Lastname${i}`, i * 100, i, i * 0.1);
    designers.push(designer);
}

let managerTeam = [...developers, ...designers]; // розкриває підмасиви та об'єднує їх

let manager = new Manager('Manager', 'Lastname', 900, 5, managerTeam);

let department = new Department([manager]);

department.giveSalary();
// Не закриваємо консоль
let readline = require('readline');
let rl = readline.createInterface(process.stdin, process.stdout);

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const outputPath = path.resolve(__dirname, "output", "team.html");

const render = require("./lib/htmlRenderer");
const Team = [];

inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: "What is your Manager's name?"
    },
    {
        type: "input",
        name: "email",
        message: "What is your Manager's email?"
    },
    {
        type: "input",
        name: "id",
        message: "What is your Manager's id?"
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is your Manager's office number?"
    },


]).then(function (response) {
    console.log(response);
    const manager = new Manager(response.name, response.email, response.id, response.officeNumber)
    Team.push(manager)
    createTeam()
})

function createTeam(){

    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "Who do you want to add to the team?",
            choices: ["Engineer","Intern","Finish"]
        }
    
    ]).then(function (response) {
        switch(response.choice){
            case "Engineer":
                addEngineer()
                break;
      
            case "Intern":
                addIntern()
                break;
    
            case "Finish":
                finish()
                break;
        
        }

    })

}

function addEngineer(){

    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your Engineer's name?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your Engineer's email?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your Engineer's id?"
        },
        {
            type: "input",
            name: "gitHub",
            message: "What is your Engineer's github username?"
        },
    
    
    ]).then(function (response) {
        console.log(response);
        const engineer = new Engineer(response.name, response.email, response.id, response.gitHub)
        Team.push(engineer)
        createTeam()
    })

}

function addIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your Intern's name?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your Intern's email?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your Intern's id?"
        },
        {
            type: "input",
            name: "school",
            message: "What is your Intern's school?"
        },
    
    
    ]).then(function (response) {
        console.log(response);
        const intern = new Intern(response.name, response.email, response.id, response.school)
        Team.push(intern)
        createTeam()
    })
}


function finish(){
    console.log(Team)
    var html = render(Team)
    console.log(html)
    fs.writeFileSync(outputPath, render(Team), "utf-8")

}

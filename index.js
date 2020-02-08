const inquirer = require("inquirer");
const fs = require("fs");
// const util = require("util");
const axios = require("axios");
// const generateHTML = require("generateHTML.js");
const path = require("path");
// const open = require("open");
     
// promptUser().then(res => console.log(res))
promptUser().then(res => getInfo(res.username))

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "username",
      message: "Enter your GitHub Username"
    },
    {
      type: "list",
      name: "color",
      message: "What is your favorite color?",
      choices: ['green', 'blue', 'pink', 'red'],
    }
  ]);
}

function getInfo(res) {
  const queryUrl = `https://api.github.com/users/${res.username}`;
  const queryStars = `https://api.github.com/users/${res.username}/repos`;
  // const colorChoice = answer.color

  axios.get(queryUrl).then(function (userinfo) {
    console.log(userinfo.data);
    userinfo.data.color = res.color;
    axios.get(queryStars).then(function (repos){

      for (const repo of repos.data) {
        totalStars += repo.stargazers_count;
      }

      const generateContent = generateHTML(userinfo.data);
        console.log(generateContent);
           
    }).catch(function (err){
      console.log("user not found");
      process.exit(1);
    });
          
  })
}

app.get("/", function(req, res) {
  res.sendfile(_dirname + 'generateHTML.js');
});
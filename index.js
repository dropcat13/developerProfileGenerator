const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const generateHTML = require("./generateHTML");

  
console.log(generateHTML);
promptUser().then(res => getInfo(res))

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
  ])
};

function getInfo(res) {
  const queryUrl = `https://api.github.com/users/${res.username}`;
  const queryStars = `https://api.github.com/users/${res.username}/repos`;

    axios.get(queryUrl).then(function (userinfo) {
      console.log(userinfo.data);
      userinfo.data.color = res.color;
      axios.get(queryStars).then(function (repos){

        let totalStars = 0;
        for (const repo of repos.data) {
          totalStars += repo.stargazers_count;
        }
        console.log(totalStars);
        userinfo.data.stars = totalStars;
        const generateContent = generateHTML(userinfo.data);
          console.log(generateContent);
          fs.writeFile("resume.html", generateContent, function(err) {

          });    
      }).catch(function (err){
        console.log("user not found");
        process.exit(1);
      });
            
    })
};

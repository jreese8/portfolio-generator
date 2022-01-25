// const profileDataArgs = process.argv.slice(2, process.argv.length);
// console.log(profileDataArgs);

// const printProfileData = profileDataArr => {
//   // This...
//   for (let i = 0; i < profileDataArr.length; i += 1) {
//     console.log(profileDataArr[i]);
//   }

//   console.log('================');

//   // Is the same as this...
//   profileDataArr.forEach(profileItem => console.log(profileItem));
  
// };

/////////////////////////////////////////////////////////

const fs = require('fs');
const generatePage = require('./src/page-template');

const inquirer = require('inquirer');

const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name? (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }
      }
    },

    { 
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub Username',
      validate: githubInput => {
        if (githubInput) {
          return true;
        } else {
          console.log('Please enter your GitHub Username!');
          return false;
        }
      }
    },
     
    {
        type: 'confirm',
        name: 'confirmAbout',
        message: 'Would you like to enter some information about yourself for an "About" section?',
        default: true
      },
      {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:',
        when: ({ confirmAbout }) => {
          if (confirmAbout) {
            return true;
          } else {
            return false;
          }
        }
      }
      
  ]);
};

const promptProject = portfolioData => {
  console.log(`
=================
Add a New Project
=================
`);

// If there's no 'projects' array property, create one
if (!portfolioData.projects) {
  portfolioData.projects = [];
}

  return inquirer.prompt([
    
    { 
        type: 'input',
        name: 'project',
        message: 'What is the name of your project?',
        validate: projectInput => {
          if (projectInput) {
            return true;
          } else {
            console.log('Please enter your project name!');
            return false;
          }
        }
    },

    {
      type: 'input',
        name: 'description',
        message: 'Provide a description of the project',
        validate: descInput => {
          if (descInput) {
            return true;
          } else {
            console.log('Please provide a description of the project!');
            return false;
      
          }
        }
    },

    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with? (Check all that apply)',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
    },

    {
      type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project',
        validate: descInput => {
          if (descInput) {
            return true;
          } else {
            console.log('Please enter the GitHub link to your project!');
            return false;

          }
        }
    },

    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false
    }
    
  ]);
  
};

promptUser()
  .then(promptProject)
  .then(portfolioData => {
       const pageHTML = generatePage(portfolioData);

    fs.writeFile('./index.html', pageHTML, err => {
      if (err) throw new Error(err);

      console.log('Page created! Check out index.html in this directory to see it!');
    });
  });

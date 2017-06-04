# Roots Web App
Prime Digital Academy Two-Week Solo Project  

## Getting Started 
These directions will get a copy of the project running on your local machine for development and testing purposes. 

### Prerequisites 
* Must have installed Git, Node, Postico, postgresql, and a text editor such as Atom. 

### Environment Setup
* Download a ZIP or fork the project
* If you download a ZIP file, create a github repository without a README.md
* Create a folder for the project on your local machine and open using a text editor
* Open Terminal and run `git init` to initialize a git repository
* Once that's complete, run `git remote add origin` followed by the url of the github repository and then .git
   ```
   git remote add origin https://github.com/username/roots_app.git
   ```
 * Run `git pull origin master` if you forked the project repository. Otherwise, run `git push origin master` if you downloaded a ZIP file and have an empty github repository. This command will sync your local and github repository
 * Run `npm install` to install all dependencies specified in the package.json
 * Open Postico
 * Copy the sql queries from data.sql to create sql tables and joins

In seperate terminal tabs run the commands below:
* `brew services start postgresql` - starts the database
* `grunt` - copies the client folder, minifies client.js, and watches for any changes
* `npm start` - starts the node server 


## Built With
* Angular JS 
* Bootstrap
* Passport - Base code provided by instructors
* grunt
* express
* moment.js
* bcrypt
* pg

## Deployment
* Heroku

## Acknowledgments
* Scott Bromander and Chris Black

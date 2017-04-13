# Signup_angular

This is a simple web application that contains signup page by using angular CLI version 1.0.0. In this application, the email field is validated and the submit button is disable until user enters the right format of email and password. <br/> <br/> There is also a feature to detect the typo mistake of email. For example, if user enter "user@gnail.com", the application will suggest that "Do you mean user@gmail.com". If user enter "usergmail.com", the application will suggest "Do you mean user@gmail.com". From my point of view, auto correction of email doesn't really provide good user experience and it may irritate user instead. However, suggesting email and giving user a choice to correct is a better option.
<br/><br/>
Demo link: https://youtu.be/dT02IMs9RrI

## Installation and Setup

Run ```npm install -g @angular/cli``` to install angular CLI <br/>
Download or clone project from https://github.com/iriekun/signup_angular.git <br/>
Go to folder <b>signup_angular</b> <br/>
Run command: 
```npm install``` to install dependency

## Run

Run command: ```ng serve ``` <br/>
Open browser and type http://localhost:4200/



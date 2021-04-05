# Zendesk Product Security
## Setting up
Platform: Ubuntu 18.04 (Or any Linux based platform)
1. Ensure that nodejs and npm are installed on the machine 
2. Clone the repository onto the machine
3. Navigate to /project folder
4. Locate and unzip rockyou.zip in the same folder
5. (Optional) Locate the file `ca.crt` in the /cert folder
6. (Optional) Add `ca.crt` as a trusted root certificate in your preferred browser (Mozilla Firefox etc.)
6. Open the terminal in the folder and run `npm i`
7. In the same terminal, run `npm start`
8. Visit https://localhost:3443 

## List of mechanisms implemented
1. Input sanitization and validation 
2. Password hashed
bcrypt was used to hash and store the password. 10 rounds of salt was used.
3. Prevention of timing attacks
Implemented by bcrypt, the bcrypt comparison function is not susceptible to timing attacks
4. Logging
Currently not implemented
5. CSRF prevention
Currently not implemented
6. Multi factor authentication
Currently not implemented
7. Password reset / forget password mechanism
Currently not implemented
8. Account lockout
Currently not implemented
9. Cookie
express-session and passportjs was used for authentication and user sessions.
10. HTTPS
Implemented with a self-signed certificate
11. Known password check
Registered passwords are checked against the rockyou.txt list. Any passwords in the list are rejected





### The Zendesk Product Security Challenge

Hello friend,

We are super excited that you want to be part of the Product Security team at Zendesk.

**To get started, you need to fork this repository to your own Github profile and work off that copy.**

In this repository, there are the following files:
1. README.md - this file
2. project/ - the folder containing all the files that you require to get started
3. project/index.html - the main HTML file containing the login form
4. project/assets/ - the folder containing supporting assets such as images, JavaScript files, Cascading Style Sheets, etc. You shouldn’t need to make any changes to these but you are free to do so if you feel it might help your submission

As part of the challenge, you need to implement an authentication mechanism with as many of the following features as possible. It is a non exhaustive list, so feel free to add or remove any of it as deemed necessary.

1. Input sanitization and validation
2. Password hashed
3. Prevention of timing attacks
4. Logging
5. CSRF prevention
6. Multi factor authentication
7. Password reset / forget password mechanism
8. Account lockout
9. Cookie
10. HTTPS
11. Known password check

You will have to create a simple binary (platform of your choice) to provide any server side functionality you may require. Please document steps to run the application. Your submission should be a link to your Github repository which you've already forked earlier together with the source code and binaries.

Thank you!

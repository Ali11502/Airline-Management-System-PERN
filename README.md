# Airline-Management-System-PERN
### Contributors:     UMAIRAHMED-111  (https://github.com/UMAIRAHMED-111/Airline-Management-System-PERN) and Ali11502 (https://github.com/Ali11502/Airline-Management-System-PERN)

#### Ali11502 (me) task: creating erd with logical cardinalities and creating `DDL-SCRIPT-AMS.sql`. In summary I was responsible for the database development and creation of procedures through PL/Sql.
#### UMAIRAHMED-111 task: creating front-end and backend using react.js and node.js, respectively. 

### Steps to run the app:

1) First setup postgres locally on your computer and create a database named 'Airline Management System - Database (Final)' .
2) Open the db.js file in ams-backend folder and make sure everything is setup right. Then inside ams-backend folder run npm install then npm start. This is will start your backend server.
3) Then using postman, you wil have to create a user with admin access which will be the root admin of your site with exclusive access.

Use this req url with POST: http://localhost:5000/api/auth/register
You can use this request.body:
{
  "username": "Root Admin",
  "email": "root@admin.com",
  "password": "rootAdmin123!",
  "isAdmin":true
}

4) Now you can open the ams-user folder and ams-employee folder respectively and run npm install then npm start on both of them.
5)The ams-user folder will be used by the end customers and the root admin of the website.
6)The ams-employee will be used by the employees which will be created by the root admin.

<h1 align="center">Users Management API</h1>

<h2>About API</h2>
<p>This is a Rest API developed to serve as the basis for any application that needs users management.</p><br>
<p>This API is running at port 8080, http://localhost:8080;</p>

 <h2>Requeriments</h2>

 - Node.JS at v14.17.6
 - NPM at 6.14.15

<h2>Getting Started</h2>

 - Clone this repository;
 - Install the dependencies: "yarn";
 - Set a JWT Secret, replacing the '#######' at "./src/controllers/UserController.ts" (line 9);
 - Add your MySql database connection credentials at "./src/database/connection.ts";
 - Unprotect the user creation route, removing "adminAuth" at "./src/routes/routes.ts" (line 12);
 - Create the JavaScript files: "npm run build";
 - Run the API: "npm run start";
 - Create your admin user: do a request to "http://localhost:8080/user" with credentials of your choice;
 ```
{
"name": "The Admin Name",
"email": "admin@email.com",
"password": "123456!aA",
"password2": "123456!aA",
"admin": true
}
  ```
 - Your password must have 6 characters and 1 upper case, 1 lower case and 1 symbol;
 - If the user is registered successfully, you will receive ("User ${name} registered");
 - Stop the server (pressing ^C at the terminal);
 - Reprotect the user creation route, re-adding "adminAuth" at "./src/routes/routes.ts" (line 12);
 - Update your JavaScript files: "npm run build";
 - And finally, re-run the API: "npm run start".

 <h1>Endpoints</h1>

 <h2>POST /user</h2>

<p>This endpoint is responsable for create an user (admin or not).</p>

 - To use this route, you must to insert a admin JSON WEB TOKEN (bearer authentication) at the request header;
 - Example of Request:

 ```
{
"name": "The Admin Name",
"email": "admin@email.com",
"password": "123456!aA",
"password2": "123456!aA",
"admin": true
}
 ```

 <h3>Responses:</h3>

 - (201) -> Your user have been registered;
 - (400) -> A request error have been ocurred and this will be return with details;
 - (500) -> A internal server error have been ocurred;

 <h2>DELETE /user/:id</h2>

 <p>This endpoint is responsable for delete an user.</p>

 - To use this route, you must to insert a admin JSON WEB TOKEN (bearer authentication) at the request header;
 
 - Parameter: you need to pass a user id, registered in database;

 <h3>Responses:</h3>

 - (200) -> The user have been deleted;
 - (400) -> A request error have been ocurred and this will be return with details;
 - (404) -> The user was not founded at database;
 - (500) -> A internal server error have been ocurred;

 <h2>PATCH /user/:id</h2>

 <p>This endpoint is responsable for update an user data (except the password).</p>

 - To use this route, you must to insert a admin JSON WEB TOKEN (bearer authentication) at the request header;
 
 - Parameter: you need to pass a user id, registered in database;
  - Example of Request:
 ```
{
"name": "The Admin Name",
"email": "admin@email.com",
"admin": true
}
 ```

 <h3>Responses:</h3>

 - (200) -> The user have been updated;
 - (400) -> A request error have been ocurred and this will be return with details;
 - (404) -> The user was not founded at database;
 - (500) -> A internal server error have been ocurred;

 <h2>GET /user/:id</h2>

 <p>This endpoint is responsable for return user data.</p>

 - To use this route, you must to insert a user JSON WEB TOKEN (bearer authentication) at the request header;
 
 - Parameter: you need to pass a user id, registered in database;

 <h3>Responses:</h3>

 - (200) -> The user data will be returned;
 - (400) -> A request error have been ocurred and this will be return with details;
 - (404) -> The user was not founded at database;
 - (500) -> A internal server error have been ocurred;

 <h2>GET /users</h2>

 <p>This endpoint is responsable for return data of all users.</p>

 - To use this route, you must to insert a user JSON WEB TOKEN (bearer authentication) at the request header;
 
 <h3>Responses:</h3>

 - (200) -> The users data will be returned;
 - (400) -> A request error have been ocurred and this will be return with details;
 - (404) -> The user was not founded at database;
 - (500) -> A internal server error have been ocurred;

 <h2>POST /recovery</h2>

 <p>This endpoint is responsable for generate a password recovery token.</p>

 - Anyone can use this route;
 
 - Example of request:

 ```
{
	"email": "user@email.com"
}
 ```

 <h3>Responses:</h3>

 - (200) -> A recovery password token will be returned;
 - (400) -> A request error have been ocurred and this will be return with details;
 - (404) -> The user was not founded at database;
 - (500) -> A internal server error have been ocurred;

 <h2>POST /changepassword</h2>

 <p>This endpoint is responsable for change an user password.</p>

 - Anyone can use this route;
 - The new password must respect the same conditions of POST /user route;
 - Example of request:

 ```
{
	"token": "a914dd64-625f-4dff-b41b-5db19e01851e",
	"email": "user@email.com",
	"password": "123456AAAa@",
	"password2": "123456AAAa@"
}
 ```

 <h3>Responses:</h3>

 - (200) -> User password changed;
 - (400) -> A request error have been ocurred and this will be return with details;
 - (404) -> The user was not founded at database;
 - (406) -> Invalid recovery token;
 - (500) -> A internal server error have been ocurred;

 <h2>POST /login</h2>

 <p>This endpoint is responsable to validate the user credentials and return a JSON WEB TOKEN that may be used to unlock the protected routes.</p>

 - Anyone can use this route;
 - Example of request:

 ```
{
	"email": "user@email.com",
	"password": "123456!aA"
}
 ```

 <h3>Responses:</h3>

 - (200) -> A token will be returned;
 - (400) -> A request error have been ocurred and this will be return with details;
 - (404) -> The user was not founded at database;
 - (406) -> Invalid password;
 - (500) -> A internal server error have been ocurred;
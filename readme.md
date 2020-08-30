**APP DESCRIPTION**
i.	The app is a reservation service for booking seats in an event hall.
ii.	The front end presents the user with the seat layout in the hall, and the status of all the hall reservations, showing either free or reserved seats
iii.	The user can register, log in and reserve a seat.
iv.	The seat reserved by a user is coloured distinctly from that of other reserved seats. The user on logging in sees his or her own reservations as well as that of the entire hall.
v.	The user is limited to a maximum of 3 reservations.
vi.	Administration of the reservations is done via the admin page.
VII.	The admin can add, delete and update reservations. 

**SOFTWARE REQUIREMENTS DOCUMENTATION**

A.	**System architecture:**
The MERN architecture – MongoDB, Express.js, React.js, Node.js - will be used. 
Back-end
1.	MongoDB Atlas (cloud-based) for the database
i.	Mongoose for the models, queries
2.	Node runtime for server, 
i.	Passport.js for Node for user authentication
3.	Express framework for routes,

Front-end
1.	Create React App for the front-end functionality and structure 
2.	Bootstrap mostly, for the styling, some CSS.

Reasons for choosing the MERN stack
1.	These are the tools I am comfortable with at the moment.
2.	The stack lends itself to a comprehensible, structured implementation of the individual components of the app. 
3.	The different components can be implemented almost independent of each until the last point where the front-end and back must be synced. This reduces the need for implementing each component simultaneously which also allows for increased oversight.
4.	For the styling I choose Bootstrap to quickly realise the concept

Development Testing
1.	Mocha, chai for unit back-end and front-end tests
2.	Jest for snapshot front-end test

Deployment
This will be done on the free service offering of Heroku cloud platform service. 
As the app, at this stage, is intended to showcase my understanding of the MERN stack, and as such will be used to test this understanding, the database requirements are minimal at best, and thus can be satisfied by Heroku’s free service.


B.	**System requirements specification**
How the app works
i.	The app is a reservation service for seats in a hall. 
ii.	The halls comprises three sections – A, B and C, and the seat numbers reflect the section of the hall where the seat is situated.
iii.	A user can have either one of two roles to use the service: “user” or “admin”.
iv.	The hall contains 94 seats. The reservation status of the seats can be seen on the app’s home page. Reserved seats are coloured blue
v.	A user is required to sign up for the service either by registering on the app with a username and password or by using either their Google or Twitter account.
vi.	After signing up, the user can then log in to use the service. Signing up through Google or Twitter accounts leads directly to the reservation page once user’s authentication is completed.
vii.	On logging in, a user is presented with a view of the halls’ reservation status, and his or her own reservations. Seat reserved by the user are coloured red, while the other reservations are coloured blue. 
viii.	To reserve a seat, user will click on the particular seat on hall template. Once clicked, the seat registers on the display above the “Reserve” button, and the clicked seat‘s background colour will change to red, and reveal a bold “R” alphabet on it indicating its “Reserved” status.
ix.	Once a seat is reserved, it cannot be reserved by another user. A user is allowed a maximum of 3 reservations.
x.	A key explaining the meaning of the colours, and symbols is presented to the user.
xi.	An admin can only register via the app’s “register“ page.
xii.	Admins are allowed to reserve a maximum of 6 seats
xiii.	Seats reserved by the admin are coloured green but are only recognized as such on the admin’s page.
xiv.	Admins can add, deleted and update reservations.
xv.	Admins can delete a user (not yet implemented)
xvi.	Admins can see all registered users names and reservations (not yet implemented).

Functional Requirements
i.	The app requires 274 MB disk space for installation.
ii.	It requires connection to the internet to work specifically for access to the MongoDB cloud-based database and for the bootstrap styling.


Market relevance
The app’s service can be found in any setting where reservation for access to a service is required such as in concert halls, airplanes, buses, etc.
 With some modification, its use can be extended to include access to service locations such as hospitals, 

Improvements
Checks against unexpected user inputs need to be added.
Additional functionalities and modifications can be added to make the app more comprehensive to include reservations for specific schedules and events (e.g. office, training, cinema, concert-hall type settings), or even registration for online meetings. 
In such a case, the user can see events schedules, register for those he or she wishes to attend, and view the reservations subsequently on his or her own private page.
 
C.	**How to Use the App**
Two directories are to be noted: “reservations” and “client”. The “reservations” directory is the main project directory, the folder that holds the entire app. The back-end files are stored here. The “client” folder is a subfolder of “reservations” folder. The front-end files are stored within this folder.
On delivery, two important folders are absent in the “reservations” and “client” folders. The name of both folders is “node_modules”. They were deleted because of their size but can easily be re-installed.

Please note that folder and directory both mean the same time and will be used interchangeably.

Installation
In the command line interface (CLI), navigate to “reservations” folder. Type “npm install”. The missing “node_modules” folder will be installed. 

Navigate to the “client” folder. Type “npm install”. The missing “node_modules” folder will be installed.

Navigate back to the “reservations” folder. Type “npm start” to start the app. Both the back-end and frontend will start simultaneously.

Testing
Three tests have been included with the package: a front-end snapshot test, a front-end unit test, and a back-end unit test.

Back-end unit test
In the CLI, navigate to the “reservations directory”, type “npm test”. 
This will connect to the database, 
•	insert a new (test) user in a new “testusers” collection, and confirm that the new user is now stored in the database, 
•	confirm the current number of users in the “users” collection, and lastly, 
•	confirm the current number of reservations in the reservations collection.
The number of reservations in the database and that displayed on the app’s Homepage should always be the same.
Please note that if new users are added via the app’s registration route (requiring a username, password, and role) or are deleted, this test will not pass. In order to pass, the constant “nrOfUsers” in the test file will have to be updated.
Likewise, if the number of reservations is updated, by increment or decrement, the test will also fail. In order to pass, the value of the constant “nrOfReservations” in the test file will have to be updated if the test is to pass.

Please note that the test may have to be run twice or thrice to get results due to asynchronous connection to database and “mocha’ test timeout limit of 2ms.
	
Front-end unit test
A snapshot test of the front-end “Login” component was done to check the integrity of the User Interface (UI). 
A unit test of the rendered front-end Login was done to test the component’s UI and props. Test carried out confirms the expected elements are present and match the props so as to detect the absence or change in props. This done with and without props separately. 

To start app
Navigate to “reservations” directory in the CLI, type “npm start”.

	To Modify MongoDB Database Connection or API keys
i.	In the CLI navigate to “reservations” directory”.
ii.	Change to the “config” subfolder. 
iii.	Open the “keys.js” file inside this folder.
iv.	The value of the object key, “mongoURI” can then be changed to the preferred URI or,
v.	The API keys required for users signing up or signing in via authentication using their Twitter or Google (gmail.com) accounts.

App Security
i.	Only registered users are allowed to use the app. Users registered via local registration route (requiring username, password and role), have their passwords checked during login against the original password in the database. Password is hashed prior to storage in database.
ii.	In the front-end, private routes were created to prevent unauthorized access to routes meant for only signed in users or for “admin”. See file (“src/App.js” in “client” folder). Each user can only view his or her own reservations.
iii.	Only users conferred with “admin’ role can change or delete user reservations.
iv.	Helmet.js was used at the back-end to secure Express.js HTTP headers.
v.	API keys, secret and hash secrets are kept separated from the front-end in a “keys.js” file in the “config” folder at the back-end.

Third-Party APIs/ tools
i.	Bootstrap was used for styling the front-end.
ii.	Passport.js was used for Twitter authentication
iii.	“Jasonwebtoken” (jwt) was used for hashing and for user session authentication
iv.	Google-auth-library and react-google-login was used for google user authentication.
v.	Mocha was used for the back-end test, and Enzyme, react-test-renderer, and Enzyme-adapter-react were used for the front-end test.

Deployment
App is deployed on Heroku.
Both the back-end and front-end were deployed as a unit with the help of Heroku’s Git deployment path.
This is because the file start command, starts both the back-end and front-end simultaneously, and both are linked via a proxy module, “http-proxy-middleware”, setup at the front-end.
**Link to deployed app: https://serene-waters-19728.herokuapp.com/**

To use the app: user
1.	Click on the “Register “link on the navigation bar, to register to use the app. On the register page, enter a username, password and role. Role entered must either be “user” or “admin”.
2.	After registration you will be redirected to the sign-in page.  
3.	Enter your registered username and password. On login success, you will be redirected to the ‘reservations’ page. 
4.	On the “reservations page”, you can make reservations by selecting the desired seat. On selection, the seat’s status will change to “R” standing for “Reserved”. Click on the “Reserve” button to complete the reservation. Reserved seats are immediately shown below the hall layout. User is allowed maximum of three reservations. Seats that are already reserved cannot be selected.
5.	Click on “logout” on the navigation bar to exit the app.
6.	User can view reservations by logging in. When user is logged in, user’s reserved seat are coloured red and indicated with the letter “R”. Reservations of other users are coloured blue and also indicated with the letter “R”. User’s reserved seats are also shown below the hall layout.

To use the app: admin
7.	Steps 1 to 5 of the above
8.	Admin can view all reservations by logging in. When admin is logged in, reservations made by admin’s are coloured green and indicated with the letter “R”. Reservations of other users are coloured blue and also indicated with the letter “R”. Admin’s reserved seats are also shown below the hall layout.
9.	To delete a reservation, enter the seat number to be deleted in the input box above the “Delete” button, e.g. b13, click on “Delete” button.
10.	To change a reservation, enter the seat to be changed, e.g. c13, and the new seat number, e.g. a23, in the indicated respective input boxes.

# reservations-app
![Home Page](https://github.com/benjitrix/reservations-app/blob/master/images_md/HomePage.JPG)
![User Page](https://github.com/benjitrix/reservations-app/blob/master/images_md/User%20reservation%20page.JPG)
![Admin Page](https://github.com/benjitrix/reservations-app/blob/master/images_md/Admin%20page.JPG)

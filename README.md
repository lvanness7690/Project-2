# Event Connect: Bringing communities together.
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents
* [Description](#description)
* [Installation](#installation)
* [Technologies Used](#technologies-used)
* [Live Application](#live-application)
* [Usage](#usage)
* [Features](#features)
* [Credits](#credits)
* [License](#license)

## Description

This project aimed to develop a comprehensive full-stack interactive application, adhering to a set of criteria including:

- Utilizing Node.js and Express.js to create a RESTful API.
- Employing Handlebars.js as the template engine.
- Implementing MySQL and the Sequelize ORM for the database.
- Incorporating both GET and POST routes for data retrieval and addition.
- Introducing at least one new library, package, or technology.
- Following a folder structure conforming to the MVC paradigm.
- Integrating authentication using express-session and cookies.
- Ensuring security by protecting API keys and sensitive information with environment variables.
- Deployment on Heroku with data.
- Designing a polished UI that is responsive and interactive, accepting and responding to user input.
- Adhering to good-quality coding standards.

The application utilizes Ticketmaster's Events API, chosen for its diverse functionalities and versatile content. The primary objective was to enable users to access Ticketmaster's API, featuring a dynamic database of musical artists, alongside local city search functionality. Additionally, a message board was integrated for users attending each show to communicate and share experiences, fostering community and connection through music.

Event Connect's current components include:
- Home Page
- Login and Registration functionality for new and existing users
- Date and city picker to reveal upcoming shows at venues
- Message board for users to communicate and share experiences

The development process began with building the database, followed by setting up routes and user pages as a template. The API integration was later performed to allow for a more flexible design. Handlebars played a significant role in forming the website's foundation and managing the creation of various pages and client-side input. Throughout development, challenges regarding the MVC architecture were encountered, leading to collaborative efforts to refactor the code for a cleaner and more streamlined application.

## Installation

To install Event Connect, follow these steps:

1. Clone the GitHub repository to your local machine:
2. Navigate to the project directory:
3. Install dependencies using npm:
4. Set up your MySQL database using the schema provided in the `db/schema.sql` file.
5. Optionally, populate your database with initial data using the `db/seeds.sql` file.
6. Create a `.env` file in the root directory and fill in your MySQL credentials, following the example provided in the `.env.EXAMPLE` file.
7. Run the application: npm start
8. Access the application through your web browser at `http://localhost:3000`.
9. You may need to register an account or log in to access certain features, depending on the functionality implemented in the application.
10. Enjoy using Event Connect to explore upcoming events, connect with other users, and share experiences!

## Technologies Used

This application is powered by Node.js (v16.19.1), Express.js (v.14.18.2), JavaScript, MySQL, Sequelize (ORM), and Handlebars (template engine). It utilizes the node package manager (npm) dependencies sequelize (v6.31.1), mysql2 (v3.3.0), express (v4.18.2), dotenv (16.0.3v), nodemon (v2.0.22), bcrypt (v.5.1.0), connect-session-sequelize(v.7.1.6), eslint (v.8.40.0), express-handlebars (v7.0.7), express-session (v1.17.3), and moment (v2.29.4). Jest (v.29.5.0) is installed for future unit testing. Also, the Insomnia application was utilized to test the functionality of routes within the program.

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Insomnia](https://img.shields.io/badge/Insomnia-black?style=for-the-badge&logo=insomnia&logoColor=5849BE)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

## Live Application

Event Connect
[https://project-2-event-planner-3ca0203f2eb1.herokuapp.com]

## Usage

1. **Registration and Login**:
   - Users can register for a new account or log in using their existing credentials.
   - Navigate to the registration page and fill out the required information to create a new account.
   - After registration, users can log in using their username and password.

2. **Exploring Events**:
   - Upon logging in, users are redirected to the home page where they can explore upcoming events.
   - Use the date and city picker interface to select a date and city to view relevant events.

3. **Viewing Event Details**:
   - Click on an event card to view more details about the event, including venue information, date, and time.

4. **Interacting with the Message Board**:
   - For each event, there is a message board where users attending the event can communicate and share experiences.
   - Navigate to the message board section of the event page to view and participate in discussions.

5. **Posting Messages**:
   - Logged-in users can post messages on the message board to share thoughts, ask questions, or engage with other attendees.
   - Enter your message in the provided input field and submit to post it to the message board.

6. **Updating User Profile**:
   - Users can update their profile information, including username, email, and profile picture.
   - Access the user profile settings to modify and save changes to the profile.

7. **Logging Out**:
   - To log out, click on the logout button in the navigation bar to securely end the session.

## Features

- **User Authentication**: Secure user authentication system implemented using express-session and cookies.
- **Ticketmaster Events Integration**: Utilizes Ticketmaster's Events API to provide access to a diverse database of upcoming events and shows.
- **City-Based Event Search**: Allows users to search for upcoming events in their local city using a date and city picker interface.
- **Message Board**: Integrated message board functionality where users attending each event can communicate and share experiences.
- **Responsive Design**: UI designed to be responsive, ensuring a seamless experience across various devices and screen sizes.
- **Polished User Interface**: Well-designed interface with a focus on usability and aesthetics to enhance user experience.
- **RESTful API**: Backend API follows REST principles, providing efficient data retrieval and manipulation.
- **CRUD Operations**: Supports CRUD (Create, Read, Update, Delete) operations for managing events, user accounts, and messages.
- **MVC Architecture**: Follows the MVC (Model-View-Controller) design pattern for a clear separation of concerns and maintainability.
- **Environment Variable Protection**: Sensitive information such as API keys and database credentials are protected using environment variables.
- **Heroku Deployment**: Deployed on Heroku with data, ensuring accessibility and availability for users.
- **Good-Quality Codebase**: Maintains high coding standards, including file structure, naming conventions, indentation, and comments.

## Credits

Developed by Leighton Van Ness, Kevin Pierce, Stephanie Nunez and Giovanni Strangio

## License

Please refer to the license in the repo.

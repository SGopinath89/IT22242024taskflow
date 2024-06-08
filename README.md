# Taskflow Task Management System

Taskflow is an efficient and user-friendly task management system designed to help individuals and teams organize, track, and manage their tasks seamlessly. Whether you are a professional managing a project or a student keeping track of assignments, Taskflow provides the tools you need to stay productive and on top of your tasks.
&nbsp;

## Purpose

The purpose of this project is to develop a comprehensive task management system to address these issues. By providing a single platform for task organization and collaboration, the project aims to streamline workflows, improve communication, and enhance productivity within the organization.


## Features

- **User Management:** Manage user accounts and profiles.
- **Board Management:** Create and organize boards to group related tasks.
- **List Management:** Create lists within boards to categorize tasks.
- **Card Management:** Add and manage tasks (cards) within lists.
- **Member Management:** Add and manage members to collaborate on tasks and projects.
- **Label Management:** Create and assign labels to tasks for better categorization.
- **Attachment Management:** Add and manage attachments to tasks.
- **Due Date Management:** Set and track due dates for tasks.
- **Checklist Management:** Create and manage checklists within tasks.
- **Comment Management:** Add and manage comments on tasks for better communication.

---

&nbsp;

## Technology Stack

#### Server Side

* **Node.js:** JavaScript runtime for running the backend server.
* **Express.js:** Web application framework for building the backend API.
* **MongoDB:** NoSQL database for storing task-related data.
* **Mongoose:** Object Data Modeling (ODM) library for MongoDB and Node.js.
* **bcryptjs:** Library for hashing passwords.
* **jsonwebtoken:** For secure authentication using JSON Web Tokens.
* **cors:** Middleware for enabling CORS (Cross-Origin Resource Sharing).
* **dotenv:** Module for loading environment variables from a `.env` file.
* **nodemon:** Tool for automatically restarting the server during development.

#### Client Side

* **React:** JavaScript library for building user interfaces.
* **Redux:** State management library.
* **@reduxjs/toolkit:** Official, recommended way to write Redux logic.
* **styled-components:** Library for styling React components.
* **material-ui:** React components for faster and easier web development.
* **axios:** Promise-based HTTP client for making requests.
* **react-beautiful-dnd:** Library for drag-and-drop interactions.
* **date-fns:** Modern JavaScript date utility library.
* **moment:** Library for parsing, validating, manipulating, and formatting dates.
* **atlaskit/css-reset:** CSS reset library.
* **react-hook/mouse-position:** Hook for tracking mouse position.
* **react-router:** Declarative routing for React applications.

---



## Step-by-Step Guide to Run TaskFlow

##### Prerequisites

- Download nodejs [here](https://nodejs.org/en/download/)
- For database, you can use local mongodb or mongo atlas. See [here](https://www.mongodb.com/)
- 
- For backend Testing use postman [here](https://www.postman.com/downloads/)

##### Installation

- Clone the repository:

  ```
  git clone https://github.com/SGopinath89/IT22242024taskflow.git
  ```
- Navigate to the Project Directory:

  ```
  cd taskflow
  ```
- Change directory of first terminal and install packages:

  ```
  cd backend
  ```

  ```
  npm install
  ```
- Create .env file in server directory like .env.example and enter required variables

  ```
  MONGODB_URI= "mongodb://localhost:27017/mydb"
  PORT= 3000
  JWT_SECRET=mysecretkey
  TOKEN_EXPIRE_TIME= xh
  ```

  **generate the JWT_SECRET, use the below command**

  ```
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- Start the Backend server:

  ```
  npm run start
  ```
- Switch to a second terminal
- Change directory of second terminal and install packages:

  ```
  cd frontend
  ```

  ```
  npm install --force
  ```
- Start the client:

  ```
  npm run start
  ```
- This command will start the server and you can access the application at `http://localhost:{port}`.


## Conclusion

TaskFlow is designed to simplify the complexities of task management, making it easier for users to stay organized and productive. By following the steps above, you can set up and run TaskFlow on your local machine, and start managing your tasks more efficiently.


##### For more details, check out the TaskFlow Documentation.

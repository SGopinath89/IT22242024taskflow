<a name="readme-top"></a>
<div align="center">
  <h1 align="center">Taskflow Task Management System</h1>

  <p align="center">
Taskflow is an efficient and user-friendly task management system designed to help individuals and teams organize, track, and manage their tasks seamlessly. Whether you are a professional managing a project or a student keeping track of assignments, Taskflow provides the tools you need to stay productive and on top of your tasks.
    <br />
    <a href="https://documenter.getpostman.com/view/34110602/2sA3XJkQ2z"><strong>Explore the API docs »</strong></a>
    <br />
    <br />
  <!--<a href="https://github.com/othneildrew/Best-README-Template">View Demo</a> -->
    
  </p>
</div>

<!-- TABLE OF CONTENTS 
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="##Purpose">Purpose</a></li>
    <li> <a href="#Features">Features</a></li>
    <li>
      <a href="#Technology Stack">Technology Stack</a>
      <ul>
        <li><a href="#Server Side">Server Side</a></li>
        <li><a href="#Client Side">Client Side</a></li>
      </ul>
    </li>
    <li><a href="#Step-by-Step Guide to Run TaskFlow">Step-by-Step Guide to Run TaskFlow</a></li>
    <ul>
        <li><a href="#Prerequisites">Prerequisites</a></li>
        <li><a href="#Installation">Installation</a></li>
    </ul>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>
-->
## Purpose

The purpose of this project is to develop a comprehensive task management system to address these issues. By providing a single platform for task organization and collaboration, the project aims to streamline workflows, improve communication, and enhance productivity within the organization.

## Features

- **User Management:** Manage user accounts and profiles.
  - Administrators can create user profiles by entering email and password. They can assign users to specific boards.
- **Board Management:** Create and organize boards to group related tasks.
- **List Management:** Create lists within boards to categorize tasks.
- **Card Management:** Add and manage tasks (cards) within lists.
- **Member Management:** Add and manage members to collaborate on tasks and projects.
- **Label Management:** Create and assign labels to tasks for better categorization.
- **Attachment Management:** Add and manage attachments to tasks.
- **Due Date Management:** Set and track due dates for tasks.
- **Checklist Management:** Create and manage checklists within tasks.
- **Comment Management:** Add and manage comments on tasks for better communication.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Technology Stack

### Server Side

- **Node.js:** JavaScript runtime for running the backend server.
- **Express.js:** Web application framework for building the backend API.
- **MongoDB:** NoSQL database for storing task-related data.
- **Mongoose:** Object Data Modeling (ODM) library for MongoDB and Node.js.
- **bcryptjs:** Library for hashing passwords.
- **jsonwebtoken:** For secure authentication using JSON Web Tokens.
- **cors:** Middleware for enabling CORS (Cross-Origin Resource Sharing).
- **dotenv:** Module for loading environment variables from a `.env` file.
- **nodemon:** Tool for automatically restarting the server during development.

### Client Side

- **React:** JavaScript library for building user interfaces.
- **Redux:** State management library.
- **@reduxjs/toolkit:** Official, recommended way to write Redux logic.
- **styled-components:** Library for styling React components.
- **material-ui:** React components for faster and easier web development.
- **axios:** Promise-based HTTP client for making requests.
- **react-beautiful-dnd:** Library for drag-and-drop interactions.
- **date-fns:** Modern JavaScript date utility library.
- **moment:** Library for parsing, validating, manipulating, and formatting dates.
- **atlaskit/css-reset:** CSS reset library.
- **react-hook/mouse-position:** Hook for tracking mouse position.
- **react-router:** Declarative routing for React applications.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Step-by-Step Guide to Run TaskFlow

### Prerequisites

- Download Node.js [here](https://nodejs.org/en/download/)
- For the database, you can use local MongoDB or MongoDB Atlas. See [here](https://www.mongodb.com/)
- For backend testing, use Postman [here](https://www.postman.com/downloads/)

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/SGopinath89/IT22242024taskflow.git
    ```

2. Navigate to the Project Directory:

    ```sh
    cd IT22242024taskflow
    ```

3. Open two Command terminals.

4. In the first terminal, navigate to the backend directory and install packages:

    ```sh
    cd backend
    npm install
    ```

5. Create a `.env` file in the backend directory similar to `.env.sample` and enter the required variables:

    ```env
    MONGODB_URI="mongodb://localhost:27017/mydb"
    PORT=3000
    JWT_SECRET=mysecretkey
    TOKEN_EXPIRE_TIME=xh
    ```

    **To generate the `JWT_SECRET`, use the following command:**

    ```sh
    node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
    ```

6. Start the backend server:

    ```sh
    npm run start
    ```

7. Switch to the second terminal. Navigate to the frontend directory and install packages:

    ```sh
    cd frontend
    npm install --force
    ```

    **Note:** `--force` is required to install the packages. Ignore the Vulnerabilities Warning.

8. Create a `.env` file in the frontend directory similar to `.env.sample` and enter the required variables:

    ```env
    REACT_APP_BACKEND_URL=http://localhost:port
    ```

    **Note:** Replace `port` with the backend server port number.

9. Start the client:

    ```sh
    npm run start
    ```

This command will start the server, and you can access the application at `http://localhost:3000`.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Conclusion

TaskFlow is designed to simplify the complexities of task management, making it easier for users to stay organized and productive. By following the steps above, you can set up and run TaskFlow on your local machine and start managing your tasks more efficiently.

For more details, check out the **TaskFlow Documentation** [here](https://documenter.getpostman.com/view/34110602/2sA3XJkQ2z).

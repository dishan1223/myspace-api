
# Myspace API

Myspace API is the powerhouse backend for a vibrant blogging platform, where users can unleash their creativity, share their thoughts, and connect with a like-minded community. With seamless account creation and intuitive posting capabilities, it’s the perfect space for anyone to express themselves freely and make their voice heard!
## 🏅 Badges

---

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License" />
  </a>&nbsp;
  <a href="https://nodejs.org/">
    <img src="https://img.shields.io/badge/Node.js-v18.20.5-green" alt="Node.js" />
  </a>&nbsp;
  <a href="https://expressjs.com/">
    <img src="https://img.shields.io/badge/Express.js-v4.18.2-blue" alt="Express.js" />
  </a>&nbsp;
  <a href="https://www.sqlite.org/">
    <img src="https://img.shields.io/badge/SQLite-v3.38.5-yellowgreen" alt="SQLite" />
  </a>&nbsp;
  <a href="https://www.javascript.com/">
    <img src="https://img.shields.io/badge/JavaScript-ES6-yellow" alt="JavaScript" />
  </a>
</p>

---

These badges highlight key aspects of the **Myspace API** project such as the technologies used, the open-source license, and the current versions.


## 🛠️ Tech Stack

### 🔧 Backend
- **Node.js**: JavaScript runtime for building scalable server-side applications.
- **Express.js**: Minimal and flexible Node.js web application framework.
- **SQLite**: Lightweight and efficient database for managing data.

### 🔐 Authentication
- **bcrypt**: Secure password hashing.
- **jsonwebtoken (JWT)**: For secure user authentication and session management.

### 🛎️ Tools & Utilities
- **dotenv**: Environment variable management.
- **EJS**: Simple templating engine for server-side rendering.

### 🖥️ Development Tools
- **Nodemon**: For live server reloading during development.
- **Postman**: API testing and debugging.
- **Git**: Version control system for source code management.
## 🌐 Environment Variables

The following environment variables are required to run this project. Create a `.env` file in the root directory and add these variables:

| Variable        | Description                              | Example Value        |
|-----------------|------------------------------------------|----------------------|
| `PORT`          | Port number for the server              | `4000`               |
| `JWT_SECRET`    | Secret key for signing JWT tokens        | `your_secret_key`    |

### Example `.env` File

```
PORT=4000
JWT_SECRET=your_secret_key
```
## 📖 API Reference

---

### Register a new user
`POST /auth/new`

| Parameter | Type   | Description                     |
|-----------|--------|---------------------------------|
| username  | string | Required. Username of the user  |
| password  | string | Required. Password of the user  |

---

### Log in a user
`POST /auth/login`

| Parameter | Type   | Description                     |
|-----------|--------|---------------------------------|
| username  | string | Required. Username of the user  |
| password  | string | Required. Password of the user  |

---

### Delete a user account
`DELETE /auth/delete`

| Parameter | Type   | Description                      |
|-----------|--------|----------------------------------|
| userId    | number | Required. ID of the user to delete |

---

### Get all posts
`GET /posts/`
*No parameters required*

---

### Create a new post
`POST /posts/new`

| Parameter | Type   | Description                     |
|-----------|--------|---------------------------------|
| username  | string | Required. Username of the poster |
| title     | string | Required. Title of the post     |
| post      | string | Required. Body of the post      |

---

### Edit an existing post
`PUT /posts/edit`

| Parameter | Type   | Description                              |
|-----------|--------|------------------------------------------|
| postId    | number | Required. ID of the post to edit         |
| title     | string | New title for the post (optional)        |
| post      | string | New body for the post (optional)         |

---

### Delete a post
`DELETE /posts/delete`

| Parameter | Type   | Description                      |
|-----------|--------|----------------------------------|
| postId    | number | Required. ID of the post to delete |

## 🚀 Features

The **Myspace API** offers a wide range of functionalities to build a complete blogging platform. Here are some of the key features:

- **User Authentication**: 
  - Secure user registration with password hashing.
  - JWT-based login and token authentication for a seamless and secure user experience.

- **Create, Read, Update, Delete Posts (CRUD)**:
  - Users can create new posts by submitting a title and content.
  - All posts can be fetched from the database, sorted by the latest.
  - Users can update their posts, allowing them to edit titles or content as they see fit.
  - Users can delete their posts from the system.
  
- **Account Management**:
  - Users can easily delete their accounts, with automatic removal of all their associated posts to ensure data consistency.

- **RESTful Endpoints**:
  - Clean and consistent API endpoints following REST principles for easy interaction.

- **Security**:
  - Passwords are securely stored using **bcrypt** hashing.
  - User sessions are managed via **JWT** (JSON Web Tokens) for secure and stateless authentication.

- **SQLite Database**:
  - Lightweight, fast, and simple SQLite database for storing user and post data.

Feel free to contribute or extend these features to further enhance the platform!
## 🚀 Deployment

### Prerequisites

Before deploying the **Myspace API**, make sure you have the following installed on your system:

- **Node.js** (v18.20.5 or higher)
- **npm** (Node Package Manager)
- **SQLite** (for database management)

### Steps to Deploy Locally

1. **Clone the Repository**:
   Clone the repository to your local machine:
   ```bash
   git clone https://github.com/dishan1223/myspace-api.git
   cd myspace-api
   ```
2. **Install Dependencies**:Install the necessary packages using npm:
   ```
   npm install
   ```
3. **Set Up Environment Variables**: Create a `.env` file in the root directory and add the following:
   ```
    DB_PATH=./db/myspace.db
    JWT_SECRET=your-secret-key
    PORT=4000
   ```
4. **Start the api**: 
    ```
    npm run dev
    ```
## Author

- [@ishtiaqdishan](https://www.github.com/dishan1223)


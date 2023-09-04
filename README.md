# React_User_Management
User Management using React and Jwt Token
# Django + React Redux Web Application

## Overview

This web application is built using Django for the backend, Django Rest Framework for building RESTful APIs, and React with Redux for the frontend. It also features JWT authentication and authorization, and you can use your preferred database for data storage. The application provides functionality for both users and administrators.

## Features

- **Django and Django Rest Framework**: The backend is built on Django and utilizes Django Rest Framework for creating RESTful APIs.

- **React with Redux**: The frontend is developed using React with Redux for efficient global state management.

- **JWT Authentication and Authorization**: Secure user authentication and authorization using JSON Web Tokens (JWT) for enhanced security.

- **Database**: You can choose your preferred database for data storage, such as PostgreSQL, MySQL, or SQLite.

### User Side

#### Login/Register

- Users can register for a new account or log in with existing credentials.

#### Home Page

- Upon login, users are directed to the home page.
- The home page provides navigation to the user profile page.

#### User Profile Page

- Users can access their profile, where they can:
  - Upload a profile image.
  - View and edit their profile information.

### Admin Side

#### Admin Login

- Administrators can log in with their credentials to access the admin dashboard.

#### User Management

- Administrators have the following capabilities:
  - View and search user data.
  - Create new user accounts.
  - Delete user accounts.
  - Edit user data.

## Setup

1. Clone the repository.
2. Install Python and required packages using `pip install -r requirements.txt`.

## Frontend Setup

1. Navigate to the `frontend` directory.
2. Install frontend dependencies using `npm install` or `yarn install`.

## Usage

1. Start the Django development server: `python manage.py runserver`
2. `cd frontend` and  `npm start` 
3. Access the application at [http://localhost:3000](http://localhost:3000) in your web browser.

4. Users can register and log in to access their profiles and upload profile images.

5. Administrators can log in to the admin dashboard for user management.

## Contributing

Contributions are welcome! Please follow our [contribution guidelines](CONTRIBUTING.md) to contribute to this project.

## License

This project is licensed under the [License Name] License - see the [LICENSE.md](LICENSE.md) file for details.






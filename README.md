#Softtech HR – Project Setup Guide
This document provides step-by-step instructions to set up and run the project locally.

#Prerequisites
Ensure the following are installed on your system:
Node.js: v25.2.1
npm: v11.6.2

#Verify versions:
node -v
npm -v

#Clone the Repository
Clone the repository and navigate to the project root:
git clone <repository-url>
cd <project-root>

#Backend Setup
Navigate to the backend folder:
cd backend

Create a .env file in the backend directory and add the following variables:
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
PORT=4000

#Install dependencies and start the backend server:
npm install
npm start
Backend will be running on:
http://localhost:4000

#Frontend Setup
Open a new terminal window.
Navigate to the frontend folder:
cd frontend
cd softtech-hr

#Install dependencies and start the frontend server:
npm install
npm start

Frontend will be running on:
http://localhost:3000

#Application Routes

Feature	URL
Signup Page	http://localhost:3000/
Login Page	http://localhost:3000/login
Home Page	http://localhost:3000/home
Post New Job	http://localhost:3000/post-job
Job List	http://localhost:3000/jobs
New Application	http://localhost:3000/job/695513c82402a431fbb89a07/new-application
Applications List	http://localhost:3000/job/695513c82402a431fbb89a07/applications

#Notes
Ensure MongoDB is accessible using the MONGO_URI provided.
Keep the .env file private and do not commit it to version control.
Backend and frontend must be running simultaneously for full functionality.

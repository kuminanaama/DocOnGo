# DocOnGo 🩺

DocOnGo is a full-stack virtual healthcare application developed as the final team project for the **MEST Web Developer Program**.

The application was designed to improve communication between patients and healthcare professionals. Patients can submit healthcare concerns, describe their symptoms, and optionally upload supporting images for review by a doctor.

I worked primarily as a **backend developer**, developing RESTful APIs, authentication and authorisation, database models, and the healthcare request workflow. The frontend was developed by another team member, and we collaborated to integrate both parts into the completed application.

---

## 🚀 Features

### 👤 Patient Features

* Register and log in securely
* Submit healthcare requests
* Describe symptoms and health concerns
* Upload supporting images alongside symptoms
* Receive responses from healthcare professionals
* Access general health tips
* Track healthcare requests and their status

### 👨‍⚕️ Doctor Features

* Log in as a healthcare professional
* Access relevant patient requests
* Review patient symptoms and supporting images
* Respond to patient healthcare requests
* Provide prescription information
* Update the status of healthcare requests
* Refer patients to another doctor or healthcare provider

### 🔐 Authentication & Authorisation

* JWT-based authentication
* Password hashing
* Role-based access control
* Patient, doctor and administrator roles
* Protected API routes
* Request validation

---

## 🔄 How DocOnGo Works

1. A patient creates an account and logs in.
2. The patient submits a healthcare request describing their symptoms or concern.
3. The patient can optionally upload an image to provide additional visual context.
4. The healthcare request is made available to an appropriate healthcare professional.
5. A doctor reviews the patient's symptoms and supporting information.
6. The doctor can respond to the request and provide prescription information where appropriate.
7. The status of the request can be updated as the case progresses.
8. Where necessary, a patient can be referred to another healthcare professional or provider.

---

## 👩🏾‍💻 My Contribution

I worked primarily as a **backend developer** on the DocOnGo team.

My contributions included:

* Developing RESTful API endpoints using Node.js and Express.js
* Designing MongoDB/Mongoose data models
* Implementing user registration and login functionality
* Implementing JWT-based authentication
* Developing role-based authorisation for patients, doctors and administrators
* Developing backend workflows for patient healthcare requests
* Supporting symptom submission and image uploads
* Developing doctor response and case-management functionality
* Supporting prescription and referral functionality
* Implementing request validation and error handling
* Testing REST API endpoints using Postman
* Collaborating with the frontend developer to integrate the user interface with the backend APIs
* Debugging integration issues between the frontend and backend

---

## 🛠️ Technologies Used

### Backend

* Node.js
* Express.js
* JavaScript

### Database

* MongoDB
* Mongoose

### Authentication & Validation

* JSON Web Tokens (JWT)
* bcrypt
* express-jwt
* Joi

### Image Upload & Communication

* Multer
* Cloudinary
* Nodemailer

### Development & Testing

* Git
* GitHub
* Postman
* VS Code

### Deployment

* Vercel – Frontend deployment

---

## 📁 Project Structure

```
DocOnGo/
├── controllers/       # Application and business logic
├── middlewares/       # Authentication and upload middleware
├── models/            # MongoDB/Mongoose data models
├── routes/            # REST API endpoints
├── utils/             # Reusable utility functions
├── validators/        # Request and input validation
├── index.js           # Application entry point
└── package.json       # Dependencies and project configuration
```

---

## 💻 Running the Backend Locally

### 1. Clone the repository

```
git clone https://github.com/kuminanaama/DocOnGo.git
```

### 2. Navigate into the project

```
cd DocOnGo
```

### 3. Install dependencies

```
npm install
```

### 4. Configure environment variables

Create a `.env` file in the root directory and add the environment variables required by the application, including the database connection, authentication configuration, and any external services used by the project.

> Do not commit passwords, API keys, database credentials, or other secrets to GitHub.

### 5. Start the application

```
npm start
```

The REST API endpoints can be tested using Postman.

---

## 🌐 Live Application

The DocOnGo frontend is deployed on Vercel.

**Live Demo:** [View DocOnGo](https://doc-on-go-liard.vercel.app)

> The frontend was developed by another member of the project team and integrated with the backend APIs developed for DocOnGo.

---

## 🎯 What I Learned

Working on DocOnGo strengthened my understanding of:

* RESTful API design
* Backend application architecture
* Authentication and authorisation
* Role-based access control
* MongoDB data modelling with Mongoose
* Input validation and error handling
* Image upload functionality
* Designing workflows for different user roles
* API testing and debugging using Postman
* Git and collaborative software development
* Frontend and backend integration
* Communicating and coordinating within a software development team

The project also gave me practical experience developing one part of a larger full-stack system and ensuring that my APIs could be successfully consumed by a frontend developed by another team member.

---

## 🔮 Future Improvements

Potential improvements include:

* Adding automated API tests
* Adding Swagger/OpenAPI documentation
* Expanding healthcare request functionality
* Improving error handling and validation
* Further strengthening application security
* Improving deployment and production configuration
* Expanding monitoring and logging

---

## 👩🏾‍💻 Author & Project Context

**Nana Ama Kumi Frempong**

Backend Developer – DocOnGo Team Project

DocOnGo was developed as the final team project for the **MEST Web Developer Program**, where I focused primarily on backend development and collaborated with a frontend developer to build and integrate the full-stack application.

**GitHub:** [kuminanaama](https://github.com/kuminanaama)

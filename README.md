# EduFlow-Registry 🎓

EduFlow-Registry is a modern, full-stack course registration platform designed to streamline academic enrollment. Built using the **MERN stack**, it provides students with a seamless registration experience and gives administrators a data-driven dashboard to manage the institution efficiently.

---

## ✨ Key Features

* **🔐 Secure Authentication:** Full implementation of JWT-based login and registration with Role-Based Access Control (RBAC).
* **📚 Course Catalog:** Interactive student portal to browse available courses and submit registration requests in real-time.
* **📊 Admin Analytics:** Professional dashboard featuring **Chart.js** to visualize faculty distribution, course popularity, and enrollment trends.
* **📑 Automated Workflows:** Admin console for managing student status (Approve/Reject) with high-visibility status badges.
* **✉️ Smart Notifications:** Integrated email logic designed to send automated updates and PDF confirmations upon registration status changes.
* **📱 Responsive Design:** A clean, SaaS-style professional UI optimized for both desktop and mobile devices.

---

## 🛠️ Tech Stack

| Technology | Usage |
| :--- | :--- |
| **React.js** | Frontend Library & Component Architecture |
| **Node.js** | Server-side Environment |
| **Express.js** | RESTful API Framework |
| **MongoDB** | NoSQL Database for Scalability |
| **Mongoose** | Object Data Modeling (ODM) |
| **Chart.js** | Dynamic Data Visualization |
| **JWT** | Secure Session & Identity Management |

---

## 🚀 Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites
* Node.js (v14 or higher)
* MongoDB Atlas account or local MongoDB instance

### Installation

1. **Clone the Repo**
   ```bash
   git clone [https://github.com/YourUsername/EduFlow-Registry.git](https://github.com/YourUsername/EduFlow-Registry.git)
   cd EduFlow-Registry

   Install Dependencies

Bash
# Install Backend dependencies
cd backend
npm install

# Install Frontend dependencies
cd ../frontend
npm install
Environment Setup
Create a .env file in the backend directory and add your credentials:

Code snippet
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Run the Application

Bash
# Start the backend (from backend folder)
npm start

# Start the frontend (from frontend folder)
npm start
📈 Database Schema
The project uses a structured relationship between three main entities:

Users: Stores student and admin credentials and roles.

Courses: Contains course details (Code, Name, Faculty, Program).

Registrations: Connects Users and Courses with a status tracker (Pending/Approved/Rejected).

🧠 Development Insights
This project highlights my ability to:

Build and secure a RESTful API from scratch.

Implement complex MongoDB Aggregation pipelines for the analytics engine.

Manage application-wide state and private routing in React.

Design a professional, minimalist UI/UX without relying on heavy external CSS frameworks.




Project Link: https://github.com/THISHA123/EduFlow-Registry/

# 🌀 Cycle Backend

Monolithic backend service for the **Cycle** platform 
Built using **Node.js**, **Express**, **MongoDB**, and **Passport.js** with structured modularity and middleware layering.

---

## 🚀 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express
- **Auth**: Passport.js (JWT strategy assumed)
- **Database**: MongoDB (Mongoose not shown but assumed)
- **Middleware**: Custom (Auth, Ownership, Multer for uploads, Validation)
- **DevOps**: Dockerized

---

## 🛣️ API Modules Overview

| Module      | Description                              |
|-------------|------------------------------------------|
| **/auth**   | User registration and login              |
| **/user**   | User profile management                  |
| **/articles** | Article creation, reading, updating     |
| **/comments** | Commenting system for articles         |
| **/search** | Multi-route search implementation        |
| **/likes**  | Like feature integration                 |
| **/upload** | Cloudinary-based file uploads (images)  |
| **/payment**| Handles payments (probably via Stripe)   |
| **/protected** | Authenticated-only actions            |

---

## 🧪 Run Locally

### 1. Clone & Install

```bash
git clone https://github.com/your-username/cycle-backend.git
cd cycle-backend/backend
npm install

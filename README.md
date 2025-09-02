

# Confess – Share Your Thoughts Anonymously

**Confess** is a platform that allows users to share their confessions, messages, poems, and stories anonymously.
Readers can explore these posts, while signed-in users get a secure and personalized experience.

**Live Demo (Frontend):** [https://confess-frontend.onrender.com/](https://confess-frontend.onrender.com/)
**Backend API:** Deployed with Render (Express + MongoDB)

---

## Features

* Post confessions, poems, and stories anonymously
* Browse and read content shared by others
* Secure authentication powered by [Clerk](https://clerk.com)
* RESTful backend API with Express and MongoDB
* Responsive and modern frontend with React, Tailwind CSS, and DaisyUI
* Deployed with Render for seamless hosting

---

## Tech Stack

### Frontend

* React
* Tailwind CSS + DaisyUI
* JavaScript, CSS

### Backend

* Node.js + Express
* REST API
* MongoDB (Mongoose ODM)
* Clerk (Authentication & User Management)

---

## Getting Started (Local Setup)

Clone the repository:

```bash
git clone https://github.com/your-username/confess.git
cd confess
```

### Backend Setup

```bash
cd backend
npm install
npm run dev   # starts backend with nodemon
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

Create a **.env** file in `backend/` with the following configuration:

```env

PORT=5000
MONGO_URI=...
NODE_ENV=development
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=
```

---

## Deployment

**Backend**

* Hosted on [Render](https://render.com)
* Root Directory: `backend`
* Start Command: `npm start`

**Frontend**

* Hosted on [Render](https://render.com)
* Public Link: [https://confess-frontend.onrender.com/](https://confess-frontend.onrender.com/)

---

## Screenshots

### HOMEPAGE
<img src="https://github.com/Chiefpatwal/CONFESS/blob/main/assets/home.png?raw=true" alt="Homepage" width="600">

### CREATE PAGE
<img src="https://github.com/Chiefpatwal/CONFESS/blob/main/assets/create_message.png?raw=true" alt="Create Confession" width="600">

---

## Contributing

Contributions are welcome. Please open an issue for discussion before submitting a pull request.

---

## License

This project is licensed under the **ISC License**.

---


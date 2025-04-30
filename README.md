# auth-clean-architecture-api
🎯 A robust authentication system built with Node.js, TypeScript, and Express following Clean Architecture principles.

✅ Features:
- User signup with email verification
- Secure login using JWT
- Forgot password and reset functionality
- Logout endpoint
- Full input validation with custom middleware
- Token-based authentication
- Scalable and clean folder structure

📁 Architecture:
This project follows the **Clean Architecture** approach to separate concerns between controllers, services, models, and utilities — making the codebase scalable, testable, and easier to maintain.

🔒 Technologies Used:
- Node.js
- TypeScript
- Express.js
- MongoDB + Mongoose
- JWT for authentication
- Nodemailer for email sending
- Custom middlewares and validators

📬 Email Features:
Emails are sent via Nodemailer. The system supports welcome emails, email verification, and password reset links.

📌 How to Use:
1. Clone the repo
2. Set up your `.env` file (see `.env.example`)
3. Run `npm install`
4. Run the server with `npm run dev`

## Postman Collection
You can test the full authentication API using Postman.  
👉 [Download the Postman Collection](https://drive.google.com/file/d/1C8LYdzKpw3mJv5tj0GNh9H4Kq8zR-vv6/view?usp=drive_link)


🤝 Contributions and feedback are welcome!


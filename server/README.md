# Chat Application - Server

A robust Express.js server powering the real-time chat application with Socket.IO integration and MongoDB database.

## Features

- 🔐 JWT-based authentication
- 🔄 Real-time communication
- 📦 MongoDB integration
- 🖼️ Image upload support
- 🛡️ Input validation
- 🔒 Password hashing
- 📝 Message persistence
- 👥 User management

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Real-time:** Socket.IO
- **Authentication:** JWT
- **Password Hashing:** Bcrypt
- **File Upload:** Multer
- **Input Validation:** Express-validator
- **Environment:** Dotenv

## Project Structure

```
server/
├── controllers/
│   ├── auth.controller.js
│   ├── message.controller.js
│   └── user.controller.js
├── models/
│   ├── user.model.js
│   └── message.model.js
├── routes/
│   ├── auth.routes.js
│   ├── message.routes.js
│   └── user.routes.js
├── middleware/
│   ├── auth.middleware.js
│   └── error.middleware.js
├── config/
│   └── db.js
└── socket/
    └── socket.js
```

## Getting Started

1. Clone the repository
2. Navigate to the server directory:
   ```bash
   cd chatApp/server
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the server directory with:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/logout` - User logout

### Messages
- `GET /api/messages/:userId` - Get messages with a user
- `POST /api/messages/send/:userId` - Send message to user

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:userId` - Get user profile
- `PUT /api/users/profile` - Update user profile

## Socket Events

### Emitted Events
- `messageReceived` - New message received
- `userOnline` - User came online
- `userOffline` - User went offline

### Listened Events
- `sendMessage` - Send new message
- `markMessageRead` - Mark message as read

## Environment Variables

| Variable | Description |
|----------|-------------|
| PORT | Server port number |
| MONGODB_URI | MongoDB connection string |
| JWT_SECRET | Secret for JWT signing |
| NODE_ENV | Environment (development/production) |

## Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Error Handling

The server implements a centralized error handling mechanism with custom error classes and middleware.

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Input validation and sanitization
- Rate limiting
- CORS configuration
- Secure HTTP headers

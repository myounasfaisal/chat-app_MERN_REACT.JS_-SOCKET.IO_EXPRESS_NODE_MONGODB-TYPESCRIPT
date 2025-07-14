
# Chat Application - Client

A modern real-time chat application built with React, featuring a clean UI with DaisyUI components and full responsive design.

## Features

- 🔐 Secure user authentication
- 👤 User profiles with avatars
- 💬 Real-time messaging
- 🌓 Dark/Light mode support
- 🔴 Online/Offline status indicators
- 📷 Image sharing support
- 📱 Fully responsive design
- ⚡ Message read status
- 🔄 Auto-scroll to latest messages
- 🎨 Modern UI with DaisyUI components

## Tech Stack

- **Framework:** React
- **State Management:** Zustand
- **Styling:** TailwindCSS + DaisyUI
- **Real-time Communication:** Socket.io-client
- **HTTP Client:** Axios
- **Routing:** React Router DOM
- **Form Handling:** React Hook Form
- **Time Formatting:** Day.js

## Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── ChatContainer/
│   │   ├── Sidebar/
│   │   └── ...
│   └── auth/
├── store/
│   ├── Auth/
│   └── Chat/
├── lib/
├── hooks/
└── contexts/
```

## Getting Started

1. Clone the repository
2. Navigate to the client directory:
   ```bash
   cd chatApp/client
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the client directory with:
   ```
   VITE_SERVER_URL=http://localhost:5000
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Features in Detail

### Authentication
- Secure login and registration
- Persistent sessions
- Protected routes

### Chat Features
- Real-time message delivery
- Image attachment support
- Message timestamps
- Online status indicators
- Read receipts
- Auto-scrolling to new messages
- Loading states and skeletons

### UI/UX
- Responsive design for all screen sizes
- Dark/Light theme support
- Modern and clean interface
- Loading skeletons for better UX
- Error handling and notifications

## Environment Variables

| Variable | Description |
|----------|-------------|
| VITE_SERVER_URL | Backend API URL |

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

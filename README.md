# Spotify Backend

A Node.js/Express backend application built with TypeScript for handling Spotify-related functionality.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/try/download/community) (for database)

## Setup

1. Clone the repository:
```bash
git clone https://github.com/Shrikanthale/spotifyBackend.git
cd spotifybackend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
# Add any other environment variables your application needs
```

## Running the Application

### Development Mode
To run the application in development mode with hot-reload:
```bash
npm run dev
```

The server will start on the port specified in your `.env` file (default: 3000).

## Project Structure

```
spotifybackend/
├── index.ts           # Application entry point
├── routes/            # API route definitions
├── middleware/        # Custom middleware functions
├── models/           # Database models
├── package.json      # Project dependencies and scripts
└── tsconfig.json     # TypeScript configuration
```

## Dependencies

Main dependencies:
- Express.js - Web framework
- TypeScript - Programming language
- MongoDB/Mongoose - Database and ODM
- JWT - Authentication
- Axios - HTTP client
- CORS - Cross-origin resource sharing
- dotenv - Environment variable management

## API Documentation

[Add your API documentation here]

## Contributing

[Add contribution guidelines here]

## License

This project is licensed under the ISC License. 
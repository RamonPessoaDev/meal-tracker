# Full Stack Meal Tracking Application

## Overview

This project is a Full Stack Project implementation of a meal tracking application. The application demonstrates full-stack development capabilities using modern web technologies and best practices.

### Project Demo GIF

![project demo GIF](./public/MealTrackerG.gif)

## Link do Projeto
[https://meal-tracker-gamma.vercel.app](https://meal-tracker-gamma.vercel.app)
##

## Technical Requirements Implemented

- **Frontend Development**
  - Built with Next.js 13 using the new App Router
  - Responsive design with Tailwind CSS
  - Component-based architecture with React
  - Form handling with React Hook Form and Zod validation
  - Modern UI using Headless UI components
  - Client-side state management
  - Date handling with date-fns

- **Backend Development**
  - RESTful API implementation using Next.js API Routes
  - Database integration with Prisma ORM
  - CRUD operations for meal management
  - Data validation and error handling
  - MongoDB (Atlas) database integration

## Architecture & Design Patterns

- **Frontend**
  - Component-based architecture
  - Custom hooks for data fetching
  - TypeScript for type safety
  - Modular CSS with Tailwind
  - Reusable UI components

- **Backend**
  - Service layer pattern
  - Data access layer with Prisma
  - API route handlers
  - Error handling middleware

## Local Development Setup

1. Clone and install dependencies:
```bash
git clone https://github.com/RamonPessoaDev/meal-tracker.git
cd meal-tracker
npm install
```

2. Set up environment variables, update ```DATABASE_URL``` in ```.env``` with your MongoDB connection string, following the ```.env.example``` file:

```bash
# Local development database URL
DATABASE_URL="mongodb://<mongo_user>:<mongo_password>@localhost:27017/<db_name>?authSource=admin"

# For production, use your MongoDB Atlas connection string
DATABASE_URL="mongodb+srv://<db_user>:<db_password>@<cluster_name>.<cluster_domain>.mongodb.net/<db_name>?retryWrites=true&w=majority&appName=<app_name>" 
```

3. Start the development server:
```bash
npm run dev
```

4. Access the application at [http://localhost:3000](http://localhost:3000)

## Testing Instructions

1. Start the application following the setup steps above
2. Navigate to the dashboard to view the meal tracking interface
3. Test the following functionalities:
   - Adding a new meal
   - Editing an existing meal
   - Deleting a meal
   - Filtering meals by type and date
   - Viewing daily calorie summaries

## Technologies Used

- Next.js 13 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- MongoDB
- Prisma ORM
- React Hook Form
- Zod
- date-fns
- Headless UI

## Project Structure Highlights

```
src/
├── app/              # Next.js App Router
│   ├── api/         # API endpoints
│   └── dashboard/   # Main application page
├── components/      # Reusable React components
├── lib/            # Database configuration
├── services/       # API service layer
└── types/          # TypeScript definitions
```

## Areas for Improvement

- User authentication implementation
- Unit and integration tests
- Error boundary implementation
- Performance optimization
- Accessibility improvements
- Additional data validation

## Running the Application Locally

```bash

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Start development server
npm run dev

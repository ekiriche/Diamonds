# Gaming Platform

A web application that allows users to explore games, manage virtual currency, and view top game creators.

## Vercel link
https://diamonds-chi.vercel.app/

## Features

- Google Authentication
- Game browsing with pagination
- Game details view
- Virtual currency (diamonds) system
- Leaderboard of top game creators
- Responsive design with mobile-first approach
- Protected routes for authenticated users

## Technologies Used

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- NextAuth.js
- RAWG API

## Prerequisites

Before running this project, you need to have:
- Node.js (v18 or higher)
- npm
- Google OAuth credentials
- RAWG API key

## Local Development Setup

1. Clone the repository:
```bash
git clone https://github.com/ekiriche/Diamonds.git
cd Diamonds
```
2. Install dependencies:
```bash
npm install
```
3. Create a .env.local file in the root directory with the following variables:
```bash
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_RAWG_API_KEY=your_rawg_api_key
```
4. Set up Google OAuth:
* Go to Google Cloud Console
* Create a new project or select existing one
* Enable Google OAuth API
* Create credentials (OAuth client ID)
* Add authorized redirect URIs:
  * http://localhost:3000/api/auth/callback/google
  * http://localhost:3000/api/auth/signin/google
5. Get RAWG API key:
* Go to https://rawg.io
* Create an account and get API key
6. Run the development server:
```bash
npm run dev
```
7. Open http://localhost:3000 in your browser

## Key Decisions and Assumptions
### 1. Authentication
* Used NextAuth.js for Google authentication
* Protected routes redirect to login page
* Session persistence handled by NextAuth.js
### 2. Routing
* Implemented using Next.js App Router
* Protected routes grouped in (protected) folder
* Authentication pages in (auth) folder
### 3. UI/UX
* Mobile-first approach with responsive design
* Navigation in header
* Loading states for better user experience
### 4. API Integration:
* Used RAWG API for games data
* Implemented pagination for games list
### 5. State Management:
* Used React's built-in state management
* Session management through NextAuth.js
* No external state management library for simplicity

## Potential Improvements
* Add image optimization and lazy loading
* Add loading skeletons for better UX
* Add search functionality for games
* Implement filtering and sorting options
* Add user favorites/bookmarks
* Add comprehensive error handling
* Add unit and e2e tests

# Clerk Authentication Setup

This project now uses Clerk for authentication. Follow these steps to complete the setup:

## 1. Create a Clerk Account
1. Go to [https://dashboard.clerk.com](https://dashboard.clerk.com)
2. Sign up for a free account
3. Create a new application

## 2. Get Your Clerk Keys
1. In your Clerk dashboard, go to "API Keys"
2. Copy your "Publishable Key"

## 3. Configure Environment Variables
1. Open the `.env.local` file in the frontend directory
2. Replace `your_clerk_publishable_key_here` with your actual Clerk publishable key:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
   ```

## 4. Run the Application
```bash
cd frontend
npm run dev
```

## What Changed
- Added Clerk authentication with minimal code changes
- Users must sign in before joining chat rooms
- Username is automatically pulled from Clerk user profile
- Added sign-in/sign-out buttons with Clerk's pre-built components
- Removed manual username input from join room form

## Features
- ✅ Secure authentication via Clerk
- ✅ Pre-built sign-in/sign-up UI
- ✅ User profile management
- ✅ Automatic username from user profile
- ✅ Clean sign-out functionality

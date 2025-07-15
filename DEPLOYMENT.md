# Vercel Deployment Guide

## Prerequisites
- Vercel account
- GitHub repository with your code
- MongoDB Atlas database
- Clerk account for authentication

## Option 1: Deploy as Separate Projects (Recommended)

### Backend Deployment
1. Create a new Vercel project for backend
2. Connect your GitHub repository
3. Set root directory to `backend`
4. Add environment variables:
   ```
   MONGODB_URI=mongodb+srv://ankit_user:B5h0sd4kyx@cluster0.ajc6xcq.mongodb.net/chatapp
   CLERK_WEBHOOK_SECRET=your_webhook_secret_here
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   PORT=3000
   ```
5. Deploy

### Frontend Deployment
1. Create a new Vercel project for frontend
2. Connect your GitHub repository
3. Set root directory to `frontend`
4. Add environment variables:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_Y29zbWljLWRydW0tNTcuY2xlcmsuYWNjb3VudHMuZGV2JA
   VITE_BACKEND_URL=https://your-backend-domain.vercel.app
   ```
5. Deploy

## Option 2: Monorepo Deployment

1. Deploy the entire repository to Vercel
2. Use the root `vercel.json` configuration
3. Add all environment variables in Vercel dashboard
4. Vercel will handle both frontend and backend

## Environment Variables Setup

### Backend Variables (Vercel Dashboard):
- `MONGODB_URI`: Your MongoDB connection string
- `CLERK_WEBHOOK_SECRET`: Generate new secret in Clerk dashboard
- `NODE_ENV`: production
- `FRONTEND_URL`: Your deployed frontend URL
- `PORT`: 3000

### Frontend Variables (Vercel Dashboard):
- `VITE_CLERK_PUBLISHABLE_KEY`: Your Clerk publishable key
- `VITE_BACKEND_URL`: Your deployed backend URL

## Security Notes
- Never commit .env files to git
- Regenerate webhook secrets if previously exposed
- Use Vercel environment variables for all sensitive data
- Update CORS settings to only allow your production domains

## Post-Deployment
1. Update Clerk dashboard with new production URLs
2. Test webhook endpoints
3. Verify socket connections work in production
4. Monitor application logs for any issues

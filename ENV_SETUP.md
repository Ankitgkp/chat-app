# Environment Variables Setup

## Backend (.env)
1. Copy `backend/.env.example` to `backend/.env`
2. Update the following variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `CLERK_WEBHOOK_SECRET`: Your Clerk webhook secret
   - `NODE_ENV`: Set to `production` for production

## Frontend (.env.local)
1. Copy `frontend/.env.example` to `frontend/.env.local`
2. Update the following variables:
   - `VITE_CLERK_PUBLISHABLE_KEY`: Your Clerk publishable key
   - `VITE_BACKEND_URL`: Your backend deployment URL

## Vercel Environment Variables
Set these in your Vercel dashboard:

### Backend Project:
- `MONGODB_URI`
- `CLERK_WEBHOOK_SECRET`
- `NODE_ENV=production`

### Frontend Project (if separate):
- `VITE_CLERK_PUBLISHABLE_KEY`
- `VITE_BACKEND_URL`

## Security Note
⚠️ **Never commit .env files to Git!** They contain sensitive information.

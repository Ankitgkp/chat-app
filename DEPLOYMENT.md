# Vercel Monorepo Deployment Guide

## Prerequisites
- Vercel account
- GitHub repository with your code
- MongoDB Atlas database
- Clerk account for authentication

## Monorepo Deployment Steps

### Step 1: Initial Deployment
1. Go to **Vercel Dashboard** → **New Project**
2. **Import Git Repository** → Select your `chat-app` repository
3. **Configure Project:**
   - Framework Preset: **Other**
   - Root Directory: **Leave empty** (uses root directory)
   - Build Command: `npm run vercel-build`
   - Output Directory: `frontend/dist`
4. **Add Initial Environment Variables:**
   ```
   MONGODB_URI=mongodb+srv://ankit_user:B5h0sd4kyx@cluster0.ajc6xcq.mongodb.net/chatapp
   NODE_ENV=production
   PORT=3000
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_Y29zbWljLWRydW0tNTcuY2xlcmsuYWNjb3VudHMuZGV2JA
   ```
5. **Click Deploy**

### Step 2: Get Your Domain
After deployment, you'll get a domain like:
```
https://chat-app-xyz123.vercel.app
```

### Step 3: Update Environment Variables
Go back to Vercel Dashboard → Your Project → Settings → Environment Variables

Add these with your actual domain:
```
FRONTEND_URL=https://chat-app-xyz123.vercel.app
VITE_BACKEND_URL=https://chat-app-xyz123.vercel.app
```

### Step 4: Configure Clerk Webhook
1. Go to **Clerk Dashboard** → **Webhooks**
2. **Add Endpoint:** `https://chat-app-xyz123.vercel.app/api/webhooks/clerk`
3. **Select Events:** `user.created`, `user.updated`, `user.deleted`
4. **Copy the Signing Secret** (starts with `whsec_`)
5. **Add to Vercel Environment Variables:**
   ```
   CLERK_WEBHOOK_SECRET=whsec_your_actual_secret_here
   ```

### Step 5: Final Deployment
Go to Vercel Dashboard → Your Project → Deployments → **Redeploy**

## How It Works

### Project Structure
```
realtime-chat/
├── backend/           # Node.js API and Socket.io server
├── frontend/          # React frontend
├── package.json       # Root package.json with build scripts
└── vercel.json        # Vercel configuration for monorepo
```

### URL Structure After Deployment
- **Frontend:** `https://your-domain.vercel.app/`
- **API Routes:** `https://your-domain.vercel.app/api/*`
- **Socket.io:** `https://your-domain.vercel.app/socket.io/`
- **Webhooks:** `https://your-domain.vercel.app/api/webhooks/clerk`

## Complete Environment Variables List

Copy all these to your Vercel Dashboard → Settings → Environment Variables:

```
MONGODB_URI=mongodb+srv://ankit_user:B5h0sd4kyx@cluster0.ajc6xcq.mongodb.net/chatapp
NODE_ENV=production
PORT=3000
VITE_CLERK_PUBLISHABLE_KEY=pk_test_Y29zbWljLWRydW0tNTcuY2xlcmsuYWNjb3VudHMuZGV2JA
FRONTEND_URL=https://your-actual-domain.vercel.app
VITE_BACKEND_URL=https://your-actual-domain.vercel.app
CLERK_WEBHOOK_SECRET=whsec_your_actual_secret_here
```

## Troubleshooting

### Build Errors
- Check if both `frontend/package.json` and `backend/package.json` exist
- Verify `npm run vercel-build` works locally
- Check Node.js version compatibility

### Socket.io Connection Issues
- Ensure `VITE_BACKEND_URL` points to your Vercel domain
- Check CORS settings in backend allow your frontend domain
- Verify WebSocket support is enabled

### Webhook Issues
- Test webhook endpoint: `https://your-domain.vercel.app/api/webhooks/clerk`
- Verify `CLERK_WEBHOOK_SECRET` is correct
- Check Clerk dashboard webhook configuration

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

# Clerk + MongoDB Integration Setup

This guide will help you connect Clerk authentication with your MongoDB database to automatically store user data when they sign up.

## 🚀 **IMPORTANT: Deploy First!**

Since Clerk webhooks require a **public URL** (not localhost), you need to deploy your backend first before configuring webhooks.

## 📋 **Step-by-Step Setup:**

### 1. Deploy Backend to Vercel

1. **Navigate to your backend directory:**
   ```bash
   cd /Users/personal/Desktop/realtime-chat/backend
   ```

2. **Initialize Git (if not already done):**
   ```bash
   git init
   git add .
   git commit -m "Initial backend setup with Clerk integration"
   ```

3. **Deploy to Vercel:**
   ```bash
   # Install Vercel CLI if you don't have it
   npm i -g vercel
   
   # Deploy
   vercel
   ```

4. **Follow the prompts:**
   - Link to existing project or create new one
   - Choose "backend" as the project name
   - Keep default settings

5. **Set Environment Variables in Vercel:**
   - Go to your Vercel dashboard
   - Select your project
   - Go to Settings → Environment Variables
   - Add these variables:
     ```
     MONGODB_URI=mongodb+srv://ankit_user:B5h0sd4kyx@cluster0.ajc6xcq.mongodb.net/chatapp
     CLERK_WEBHOOK_SECRET=whsec_your_webhook_secret_here
     NODE_ENV=production
     ```

### 2. Configure Clerk Webhooks (After Deployment)

1. **Go to your Clerk Dashboard:**
   - Visit [https://dashboard.clerk.com](https://dashboard.clerk.com)
   - Select your application

2. **Navigate to Webhooks:**
   - Click on "Webhooks" in the sidebar
   - Click "Add Endpoint"

3. **Configure the Webhook:**
   - **Endpoint URL:** `https://your-backend-domain.vercel.app/api/webhooks/clerk`
   - **Events to Subscribe:**
     - ✅ `user.created`
     - ✅ `user.updated` 
     - ✅ `user.deleted`

4. **Get the Webhook Secret:**
   - After creating the webhook, copy the "Signing Secret"
   - It starts with `whsec_`
   - Update this in your Vercel environment variables

### 3. Update Frontend for Production

Update your frontend to connect to the deployed backend:

```javascript
// In your frontend App.jsx or wherever you initialize socket
const socket = io.connect(
  process.env.NODE_ENV === 'production' 
    ? 'https://your-backend-domain.vercel.app'
    : 'http://localhost:3000'
)
```

## 🎯 **How It Works:**

### User Registration Flow:
1. **User signs up** through Clerk on your frontend
2. **Clerk sends webhook** to your backend (`/api/webhooks/clerk`)
3. **Backend verifies** the webhook signature for security
4. **User data is saved** to MongoDB automatically

### Data Stored in MongoDB:
```javascript
{
  clerkId: "user_xyz123",           // Unique Clerk user ID
  email: "user@example.com",        // Primary email
  firstName: "John",                // First name
  lastName: "Doe",                  // Last name
  username: "johndoe",              // Username (if provided)
  avatar: "https://...",            // Profile image URL
  isActive: true,                   // Account status
  lastLogin: "2025-01-15T...",      // Last login timestamp
  createdAt: "2025-01-15T...",      // Account creation
  updatedAt: "2025-01-15T..."       // Last update
}
```

## 🛠️ **Available API Endpoints:**

### Get All Active Users:
```bash
GET http://localhost:3000/api/users
```

### Get Specific User by Clerk ID:
```bash
GET http://localhost:3000/api/users/{clerkId}
```

## 🔒 **Security Features:**

- ✅ **Webhook Verification** - Uses Svix to verify webhook signatures
- ✅ **Environment Variables** - Secure credential storage
- ✅ **Input Validation** - Validates webhook payloads
- ✅ **Error Handling** - Comprehensive error logging

## 🧪 **Testing the Integration:**

1. **Start your backend server** (`npm start`)
2. **Start your frontend** (`npm run dev`)
3. **Create a new account** through the sign-in modal
4. **Check your MongoDB database** - You should see the new user data
5. **Check server logs** - You should see webhook events being processed

## 📊 **Monitoring:**

The backend will log all webhook events:
```
Received webhook: user.created
Creating user: user_xyz123
User created successfully: 507f1f77bcf86cd799439011
```

## 🎉 **Next Steps:**

1. **Production Setup** - Replace `localhost` with your actual domain in webhook URL
2. **Enhanced User Data** - Add custom fields to the User model as needed
3. **User Sync** - Implement additional sync logic if required
4. **Analytics** - Track user registration and activity metrics

---

**🔥 Benefits:**
- ✅ Automatic user data synchronization
- ✅ Real-time updates when users modify profiles
- ✅ Secure webhook verification
- ✅ Ready-to-use user API endpoints
- ✅ Scalable architecture for production use

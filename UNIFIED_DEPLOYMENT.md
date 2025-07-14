# Alternative: Express Serving Frontend

If you want to serve the frontend directly from your Express backend:

## 1. Update backend/package.json to include frontend build:

```json
{
  "scripts": {
    "build": "cd ../frontend && npm install && npm run build && cp -r dist/* ../backend/public/",
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```

## 2. Add static file serving to backend/index.js:

```javascript
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from frontend build
app.use(express.static(path.join(__dirname, 'public')));

// Serve frontend for all non-API routes
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
});
```

## 3. Deploy only the backend folder to Vercel with:
- Root Directory: `backend`
- Build Command: `npm run build`
- Output Directory: `public`

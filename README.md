# EXPRESS.JS AUTHENTICATION & AUTHORIZATION API



> A secure and modular Node.js / Express.js backend implementing JWT authentication, refresh/access tokens, HTTP-only cookies, role-based authorization, CORS configuration, and a clean scalable architecture using controllers, routes, and reusable middleware.

## FEATURES

### Authentication
- Login & logout system
- Access Token (short-lived)
- Refresh Token (long-lived, stored in HttpOnly cookies)
- Token rotation strategy
- Password hashing using bcrypt

### Authorization
- Role-Based Access Control (RBAC)
- Middleware-based permission checks
- JWT verification for protected routes

### Architecture
- Modular folder structure
- Reusable middlewares
- Global error handling
- Cookie and token utilities

## PROJECT STRUCTURE
```js
project/    
│── controllers/    
│── middlewares/    
│── routes/    
│── config/    
│── services/  
│── utils/  
│── app.js  
│── server.js  
```


## TECHNOLOGIES USED

- Node.js
- Express.js
- JSON Web Tokens (JWT)
- bcryptjs
- cookie-parser
- CORS
- dotenv


## INSTALL DEPENDENCIES
```bash
npm install
```

## CREATE A .env FILE

```dotenv
PORT=5000  
ACCESS_TOKEN_SECRET=your_access_token_secret  
REFRESH_TOKEN_SECRET=your_refresh_token_secret  
ACCESS_TOKEN_EXPIRE=15m  
REFRESH_TOKEN_EXPIRE=7d  
COOKIE_SECRET=your_cookie_secret  
CLIENT_URL=http://localhost:3000  
```



## START THE DEVELOPMENT SERVER
```bash
npm run dev
```


## SCRIPT COMMANDS
```json
{  
   "start": "node server.js",  
   "dev": "nodemon server.js"  
}  
```

## CONTACT

> For questions, improvements, or collaboration, feel free to reach out anytime.

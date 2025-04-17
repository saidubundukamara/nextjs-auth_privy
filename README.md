# Next.js + Privy Authentication
This is a simple Next.js project that integrates Privy for user authentication.

## 🔧 Setup Instructions
#### 1. Clone the repo

```
git clone https://github.com/saidubundukamara/nextjs-auth_privy
cd <your-project-name>
```
#### 2. Install dependencies
```
npm install
# or
yarn
```

#### 3. Add your environment variables
Create a `.env.local` file in the root directory and add the following:

```
NEXT_PUBLIC_PRIVY_APP_ID=your_app_id
NEXT_PUBLIC_PRIVY_APP_SECRET=your_app_secret
```
#### 4. Start the development server

```
npm run dev
# or
yarn dev

```
Visit http://localhost:3000 to view the app.

#### 🌐 Live Preview
You can preview the deployed project here:
🔗 https://nextjs-auth-privy-8h73.vercel.app/

(Replace with your actual Vercel link)

#### 🛠 Project Structure
```
/your-next-app
│
├── /app                       # Next.js App Router
│   ├── /api
│   │   └── /users
│   │       └── route.ts       # API route using services
│   └── page.tsx               # Your main page
│
├── /models                    # Mongoose models
│   └── user.model.ts
│
├── /repositories              # DB logic only (calls Mongoose methods)
│   └── user.repository.ts
│
├── /services                  # Business logic (calls repository methods)
│   └── user.service.ts
│
├── /lib
│   └── mongoose.ts            # MongoDB connection setup
│
├── /types                     # Optional: TypeScript types
│   └── user.type.ts
│
├── next.config.js
└── package.json

```

Authentication logic is handled via Privy.

#### 🚀 Deployment
To deploy the project, you can use Vercel or any platform that supports Next.js.


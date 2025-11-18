# eKYC System with RabbitMQ PDF Generation

This project implements an eKYC (Electronic Know Your Customer) form system with asynchronous PDF generation using RabbitMQ.

## Features

- ✅ Form submission with GPT analysis
- ✅ Admin dashboard with JWT authentication
- ✅ Asynchronous PDF generation via RabbitMQ
- ✅ Worker-based background processing
- ✅ Professional PDF reports with Puppeteer

## Architecture

- **Frontend**: React + TypeScript + Vite
- **Backend**: Express + TypeScript + MongoDB
- **Queue**: RabbitMQ for job scheduling
- **PDF Generation**: Puppeteer (headless Chrome)

## Prerequisites

1. **Node.js** (v16 or higher)
2. **MongoDB** (local or cloud instance)
3. **RabbitMQ** (local instance required)

### Install RabbitMQ on docker

```bash
# Install via Homebrew
docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:4-management
```

RabbitMQ management UI: http://localhost:15672 (guest/guest)

## Setup Instructions

## Mongo and Mongo Express

```
docker run -d \
> -p27017:27017 \
> --name mongo \
> --network mongo-network \
> -e MONGO_INITDB_ROOT_USERNAME=admin \
> -e MONGO_INITDB_ROOT_PASSWORD=qwerty \
> mongo
```

```
docker run -d \
> -p8081:8081 \
> --name mongo-express \
> --network mongo-network \
> -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
> -e ME_CONFIG_MONGODB_ADMINPASSWORD=qwerty \
> -e ME_CONFIG_MONGODB_URL="mongodb://admin:qwerty@mongo:27017" \
> mongo-express
```

### 1. Install Dependencies

```bash
# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Configuration

The `.env` file in `backend/` is already configured with:

- MongoDB connection
- JWT secret
- RabbitMQ URL (amqp://localhost)

### 3. Start the System

You need **THREE terminal windows**:

#### Terminal 1: Start Backend Server

```bash
cd backend
npm run dev
```

#### Terminal 2: Start PDF Worker

```bash
cd backend
npm run worker
```

#### Terminal 3: Start Frontend

```bash
cd frontend
npm run dev
```

## How PDF Generation Works

1. **User Action**: Admin clicks "PDF" button on a form entry
2. **API Call**: Frontend sends POST to `/api/forms/:id/generate-pdf`
3. **Queue Job**: Backend publishes job to RabbitMQ queue
4. **Worker Processing**: PDF worker picks up job and generates PDF
5. **PDF Storage**: Generated PDF saved to `backend/pdfs/` directory

### Workflow Diagram

```
AdminDashboard → API Endpoint → RabbitMQ Queue → PDF Worker → PDF File
     (UI)         (Express)      (amqplib)      (Puppeteer)   (File System)
```

## API Endpoints

### Forms

- `POST /api/forms` - Submit new form
- `GET /api/forms` - Get all forms
- `POST /api/forms/:id/generate-pdf` - Queue PDF generation

### Admin

- `POST /api/admin/register` - Create admin (testing only)
- `POST /api/admin/login` - Admin login (returns JWT)
- `GET /api/admin/me` - Get current admin info (protected)

## Testing PDF Generation

1. Start all three processes (server, worker, frontend)
2. Navigate to the admin dashboard
3. Click the "PDF" button on any form entry
4. Check the worker terminal for processing logs
5. Generated PDFs are saved to `backend/pdfs/`

## Creating a Test Admin

```bash
curl -X POST http://localhost:5001/api/admin/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"secret"}'
```

## Troubleshooting

### RabbitMQ Connection Errors

- Ensure RabbitMQ is running: `brew services list`
- Check RabbitMQ logs: `tail -f /opt/homebrew/var/log/rabbitmq/rabbit@*.log`
- Verify connection: http://localhost:15672

### PDF Generation Fails

- Check worker terminal for errors
- Ensure Puppeteer downloaded Chromium: `npx puppeteer browsers install chrome`
- Check disk space in `backend/pdfs/` directory

### TypeScript Errors

- Run `npm install` in backend to ensure all types are installed
- Some lint warnings are expected during development

## File Structure

```
backend/
├── src/
│   ├── controllers/
│   │   └── FormController.ts      # Form + PDF endpoint logic
│   ├── middleware/
│   │   └── auth.ts                # JWT verification
│   ├── models/
│   │   ├── AdminData.ts           # Admin schema
│   │   └── FormData.ts            # Form schema
│   ├── routes/
│   │   ├── AdminRoutes.ts         # Admin auth routes
│   │   └── formRoutes.ts          # Form + PDF routes
│   ├── services/
│   │   ├── RabbitMQService.ts     # Queue management
│   │   ├── PdfService.ts          # PDF generation
│   │   └── OpenRouterServices.ts  # GPT integration
│   ├── workers/
│   │   └── pdfWorker.ts           # Background PDF processor
│   ├── db.ts                      # MongoDB connection
│   └── index.ts                   # Express server
├── pdfs/                          # Generated PDFs (auto-created)
└── package.json

frontend/
├── src/
│   ├── components/
│   │   ├── AdminDashboard.tsx     # PDF button integration
│   │   ├── Form.tsx               # eKYC form
│   │   └── ...
│   └── routes/
│       └── Routes.tsx             # React Router config
└── package.json
```

## Production Considerations

⚠️ **This is a development setup. For production:**

1. **Security**

   - Use bcrypt for password hashing (currently plaintext for testing)
   - Store JWT tokens in httpOnly cookies, not localStorage
   - Add rate limiting and input validation

2. **RabbitMQ**

   - Use persistent queues
   - Add dead letter queues for failed jobs
   - Implement retry logic with exponential backoff

3. **PDF Storage**

   - Upload generated PDFs to S3/cloud storage
   - Add cleanup jobs for old PDFs
   - Implement PDF download endpoints

4. **Monitoring**
   - Add logging (Winston, Pino)
   - Monitor queue depth and worker health
   - Track PDF generation metrics

## License

ISC

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

# Testing Guide

This project uses **Vitest** for testing both frontend and backend code.

## Installation

Install dependencies for both frontend and backend:

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

## Running Tests

### Frontend Tests

```bash
cd frontend

# Run tests once
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### Backend Tests

```bash
cd backend

# Run tests once
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Test Structure

### Frontend Tests (`frontend/src/test/`)

- `Form.test.tsx` - Tests for form component (input handling, submission, validation)
- `Header.test.tsx` - Tests for header component
- `Footer.test.tsx` - Tests for footer component
- `setup.ts` - Test environment setup

### Backend Tests (`backend/src/test/`)

- `models/FormData.test.ts` - Tests for FormData model (CRUD operations)
- `models/AdminData.test.ts` - Tests for AdminData model
- `routes/formRoutes.test.ts` - API endpoint tests for forms
- `routes/AdminRoutes.test.ts` - API endpoint tests for admin (auth, login, register)
- `services/RabbitMQService.test.ts` - Tests for RabbitMQ service
- `setup.ts` - Test database setup (MongoDB Memory Server)

## Testing Features

### Frontend Testing

- Component rendering tests
- User interaction tests (form input, button clicks)
- API call mocking
- React Testing Library for DOM queries
- User-event for realistic interactions

### Backend Testing

- API endpoint testing with Supertest
- Database operations with in-memory MongoDB
- Service mocking (OpenRouter, RabbitMQ)
- JWT authentication testing
- Error handling tests

## Coverage Reports

Coverage reports are generated in:

- `frontend/coverage/` - Frontend coverage
- `backend/coverage/` - Backend coverage

Open `coverage/index.html` in a browser to view detailed coverage reports.

## Writing New Tests

### Frontend Component Test Example

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MyComponent from "../components/MyComponent";

describe("MyComponent", () => {
  it("renders correctly", () => {
    render(<MyComponent />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
```

### Backend API Test Example

```typescript
import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app";

describe("GET /api/endpoint", () => {
  it("should return data", async () => {
    const response = await request(app).get("/api/endpoint").expect(200);

    expect(response.body).toBeDefined();
  });
});
```

## Continuous Integration

To run tests in CI/CD:

```bash
# Run all tests
npm test -- --run

# With coverage
npm run test:coverage -- --run
```

## Troubleshooting

### Tests Not Running

- Ensure all dependencies are installed: `npm install`
- Check Node.js version (requires Node 18+)

### Import Errors

- Verify TypeScript configuration
- Check path aliases in `tsconfig.json`

### Database Connection Issues

- Backend tests use MongoDB Memory Server (no external DB needed)
- Ensure sufficient memory for in-memory database

## Best Practices

1. **Write isolated tests** - Each test should be independent
2. **Mock external services** - Don't make real API calls or DB connections in unit tests
3. **Use descriptive test names** - Make it clear what's being tested
4. **Test edge cases** - Include error scenarios and boundary conditions
5. **Keep tests fast** - Mock slow operations
6. **Maintain high coverage** - Aim for >80% code coverage

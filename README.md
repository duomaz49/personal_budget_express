# Envelope Budgeting API

### Overview

- The Envelope Budgeting API is a RESTful service that allows users to manage their financial envelopes for budgeting purposes. Users can create envelopes, transfer money between them, and track balances.

### Technologies Used

- Typescript

- Node.js with Express.js (Backend Framework)

- PostgreSQL (Database)

- TypeORM (ORM for database interactions)

### API Endpoints

1. Get All Envelopes

- GET /api/envelopes

- Description: Fetches all envelopes with their details.

- Response:

[
    {
        "id": 1,
        "name": "Food",
        "balance": "600.00",
        "limit": "2000.00",
        "created_at": "2025-02-06T14:19:42.998Z",
        "updated_at": "2025-02-06T14:19:42.998Z"
    }
]

2. Get Single Envelope by ID

- GET /api/envelopes/:id

- Description: Fetches details of a specific envelope.

- Response:

{
    "id": 1,
    "name": "Food",
    "balance": "600.00",
    "limit": "2000.00",
    "created_at": "2025-02-06T14:19:42.998Z",
    "updated_at": "2025-02-06T14:19:42.998Z"
}

3. Create a New Envelope

### POST /api/envelopes

- Request Body:

{
    "name": "Rent",
    "balance": 1000,
    "limit": 2000
}

- Response:

{
    "message": "Envelope created successfully",
    "envelope": {
        "id": 2,
        "name": "Rent",
        "balance": 1000,
        "limit": 2000
    }
}

4. Update an Envelope

### PUT /api/envelopes/:id

- Request Body:

{
    "balance": 1200
}

- Response:

{
    "message": "Envelope updated successfully",
    "envelope": {
        "id": 2,
        "balance": 1200
    }
}

5. Delete an Envelope

### DELETE /api/envelopes/:id

- Response:

{
    "message": "Envelope deleted successfully"
}

6. Transfer Money Between Envelopes

### POST /api/envelopes/transfer

- Request Body:

{
    "fromId": 3,
    "toId": 4,
    "amount": 200
}

- Response:

{
    "message": "Transfer successful",
    "fromEnvelope": {
        "id": 3,
        "balance": 600
    },
    "toEnvelope": {
        "id": 4,
        "balance": 1000
    }
}

### Error Handling

- 400 Bad Request - Invalid input or missing parameters.

- 404 Not Found - Envelope not found.

- 500 Internal Server Error - Server or database issues.

### Setup and Installation

Clone the repository:

- git clone https://github.com/your-repo/envelope-api.git

Install dependencies:

- npm install

Configure the database in .env:

- DATABASE_URL=postgres://user:password@localhost:5432/envelopes_db

Run migrations:

- npm run migration:run

Start the server:

- npm start

### Future Improvements

- User authentication and authorization.

- Recurring transactions.

##### Author

- Developed by Tuomas Sirviö. Reach out for questions or contributions!
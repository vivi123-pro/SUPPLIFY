# Supplify Backend API

This is the backend API for Supplify, a platform designed to support SMEs and suppliers with product listings, waste management, orders, and reviews.

## Technology Stack

- Python 3.x
- Django 5.2.6
- Django REST Framework
- Simple JWT for authentication
- drf-spectacular for API schema and documentation
- SQLite (default database)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd SUPPLIFY
   ```

2. Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```

4. Apply migrations:
   ```bash
   python backend/manage.py migrate
   ```

5. Create a superuser (optional, for admin access):
   ```bash
   python backend/manage.py createsuperuser
   ```

6. Run the development server:
   ```bash
   python backend/manage.py runserver
   ```

## API Base URL

All API endpoints are prefixed with `/api/v1/`.

## Authentication

- JWT authentication is used.
- Register a new user: `POST /api/v1/auth/register/`
- Obtain token: `POST /api/v1/auth/token/`
- Refresh token: `POST /api/v1/auth/token/refresh/`
- Get or update current user: `GET/PUT /api/v1/users/me/`

## API Documentation

- Swagger UI: `/api/v1/docs/`
- OpenAPI schema: `/api/v1/schema/`
- ReDoc: `/api/v1/schema/redoc/`

## Notes

- CORS is enabled for all origins.
- Default database is SQLite; configure `backend/backend/settings.py` for other databases.
- Authentication is required for most endpoints except registration and token obtain.

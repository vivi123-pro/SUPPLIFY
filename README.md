# Supplify

Supplify is a smart B2B platform for small and medium-sized manufacturers that connects suppliers, buyers, and waste recyclers in one seamless ecosystem. It helps SMEs:
- Find the right suppliers fast with real-time price comparison, location-based search, and supplier ratings.
- Optimize purchasing decisions to reduce costs and improve production efficiency.
- Turn waste into value by listing excess materials for other SMEs to buy or recycle, promoting a circular economy.
- Track performance and savings via dashboards showing cost, waste, and supplier metrics.

## Technology Stack

### Backend
- Python 3.x
- Django 5.2.6
- Django REST Framework
- Simple JWT for authentication
- drf-spectacular for API schema and documentation
- SQLite (default database)

### Frontend
- React 19.1.1
- Vite
- Tailwind CSS
- Axios for API calls
- React Router DOM
- Chart.js for data visualization
- Leaflet for maps

### Mobile App
- React Native (Expo)
- Expo Router
- TypeScript
- Lucide React Native for icons

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

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

### Mobile App Setup

1. Ensure you have Expo CLI installed globally:
   ```bash
   npm install -g @expo/cli
   ```

2. Navigate to the mobile-end directory:
   ```bash
   cd mobile-end
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the Expo development server:
   ```bash
   npm start
   ```

   - For Android: `npm run android`
   - For iOS: `npm run ios`
   - For Web: `npm run web`

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

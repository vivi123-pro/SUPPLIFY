# API Documentation

This document provides an overview of all available API endpoints, their expected inputs, and responses.

## Base URL

All API endpoints are prefixed with `/api/v1/`.

---

## Authentication Endpoints

### Register a new user
- **URL:** `/api/v1/auth/register/`
- **Method:** POST
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string",
    "first_name": "string",
    "last_name": "string",
    "phone": "string",
    "role": "string"  // e.g., "sme", "supplier"
  }
  ```
- **Response:**
  - 201 Created with user details and tokens
  - 400 Bad Request if validation fails

### Obtain JWT token
- **URL:** `/api/v1/auth/token/`
- **Method:** POST
- **Request Body:**
  ```json
  {
    "username": "string",  // or email
    "password": "string"
  }
  ```
- **Response:**
  - 200 OK with access and refresh tokens
  - 401 Unauthorized if credentials are invalid

### Refresh JWT token
- **URL:** `/api/v1/auth/token/refresh/`
- **Method:** POST
- **Request Body:**
  ```json
  {
    "refresh": "string"
  }
  ```
- **Response:**
  - 200 OK with new access token
  - 401 Unauthorized if refresh token is invalid or expired

---

## Users Endpoints

### Get or update current user
- **URL:** `/api/v1/users/me/`
- **Method:** GET, PUT
- **Request Body (PUT):**
  ```json
  {
    "email": "string",
    "first_name": "string",
    "last_name": "string",
    "phone": "string",
    "role": "string"
  }
  ```
- **Response:**
  - 200 OK with user details
  - 401 Unauthorized if not authenticated
  - 400 Bad Request if validation fails

---

## Core Endpoints

### Suppliers

#### List suppliers
- **URL:** `/api/v1/suppliers/`
- **Method:** GET
- **Query Params:** category, location, rating, search, ordering
- **Response:** 200 OK with list of suppliers

#### Create supplier
- **URL:** `/api/v1/suppliers/`
- **Method:** POST
- **Request Body:** Supplier fields (company_name, category, location, etc.)
- **Response:** 201 Created with supplier data

#### Retrieve supplier
- **URL:** `/api/v1/suppliers/{id}/`
- **Method:** GET
- **Response:** 200 OK with supplier data

#### Update supplier
- **URL:** `/api/v1/suppliers/{id}/`
- **Method:** PUT/PATCH
- **Request Body:** Supplier fields
- **Response:** 200 OK with updated supplier data

#### Delete supplier
- **URL:** `/api/v1/suppliers/{id}/`
- **Method:** DELETE
- **Response:** 204 No Content

#### Get supplier products
- **URL:** `/api/v1/suppliers/{id}/products/`
- **Method:** GET
- **Query Params:** category, min_price, max_price
- **Response:** 200 OK with list of products

### Products

#### List products
- **URL:** `/api/v1/products/`
- **Method:** GET
- **Query Params:** category, location, price, min_qty, search
- **Response:** 200 OK with list of products

#### Create product
- **URL:** `/api/v1/products/`
- **Method:** POST
- **Request Body:** Product fields (name, description, price, etc.)
- **Response:** 201 Created with product data

#### Retrieve product
- **URL:** `/api/v1/products/{id}/`
- **Method:** GET
- **Response:** 200 OK with product data

#### Update product
- **URL:** `/api/v1/products/{id}/`
- **Method:** PUT/PATCH
- **Request Body:** Product fields
- **Response:** 200 OK with updated product data

#### Delete product
- **URL:** `/api/v1/products/{id}/`
- **Method:** DELETE
- **Response:** 204 No Content

#### Compare product suppliers
- **URL:** `/api/v1/products/{id}/compare/`
- **Method:** GET
- **Query Params:** location
- **Response:** 200 OK with ranked list of suppliers offering the product

### Waste Listings

#### List waste listings
- **URL:** `/api/v1/waste/`
- **Method:** GET
- **Response:** 200 OK with list of waste listings

#### Create waste listing
- **URL:** `/api/v1/waste/`
- **Method:** POST
- **Request Body:** WasteListing fields (name, category, qty, price, etc.)
- **Response:** 201 Created with waste listing data

#### Retrieve waste listing
- **URL:** `/api/v1/waste/{id}/`
- **Method:** GET
- **Response:** 200 OK with waste listing data

#### Update waste listing
- **URL:** `/api/v1/waste/{id}/`
- **Method:** PUT/PATCH
- **Request Body:** WasteListing fields
- **Response:** 200 OK with updated waste listing data

#### Delete waste listing
- **URL:** `/api/v1/waste/{id}/`
- **Method:** DELETE
- **Response:** 204 No Content

#### Offer on waste listing
- **URL:** `/api/v1/waste/{id}/offer/`
- **Method:** POST
- **Request Body:** WasteOffer fields (price, message, etc.)
- **Response:** 201 Created with offer data

#### Mark waste listing as sold
- **URL:** `/api/v1/waste/{id}/mark_sold/`
- **Method:** POST
- **Response:** 200 OK with status

### Orders

#### List orders
- **URL:** `/api/v1/orders/`
- **Method:** GET
- **Response:** 200 OK with list of orders

#### Create order
- **URL:** `/api/v1/orders/`
- **Method:** POST
- **Request Body:** Order fields (product, qty, etc.)
- **Response:** 201 Created with order data

#### Retrieve order
- **URL:** `/api/v1/orders/{id}/`
- **Method:** GET
- **Response:** 200 OK with order data

#### Update order
- **URL:** `/api/v1/orders/{id}/`
- **Method:** PUT/PATCH
- **Request Body:** Order fields
- **Response:** 200 OK with updated order data

#### Delete order
- **URL:** `/api/v1/orders/{id}/`
- **Method:** DELETE
- **Response:** 204 No Content

#### Update order status
- **URL:** `/api/v1/orders/{id}/update_status/`
- **Method:** POST
- **Request Body:** {"status": "accepted|rejected|completed"}
- **Response:** 200 OK with updated order data

### Search Suppliers
- **URL:** `/api/v1/search/suppliers/`
- **Method:** GET
- **Query Params:** product_name, location
- **Response:** 200 OK with ranked list of suppliers/products

---

## Services Endpoints

### Reviews

#### List reviews
- **URL:** `/api/v1/reviews/`
- **Method:** GET
- **Response:** 200 OK with list of reviews

#### Create review
- **URL:** `/api/v1/reviews/`
- **Method:** POST
- **Request Body:** Review fields (supplier, rating, comment, etc.)
- **Response:** 201 Created with review data

#### Retrieve review
- **URL:** `/api/v1/reviews/{id}/`
- **Method:** GET
- **Response:** 200 OK with review data

#### Update review
- **URL:** `/api/v1/reviews/{id}/`
- **Method:** PUT/PATCH
- **Request Body:** Review fields
- **Response:** 200 OK with updated review data

#### Delete review
- **URL:** `/api/v1/reviews/{id}/`
- **Method:** DELETE
- **Response:** 204 No Content

### Dashboard Summary
- **URL:** `/api/v1/dashboard/summary/`
- **Method:** GET
- **Response:** 200 OK with summary data (total_savings, total_waste_earnings, active_listings, recent_activity)

### Waste Trends Analytics
- **URL:** `/api/v1/analytics/waste-trends/`
- **Method:** GET
- **Query Params:** start, end
- **Response:** 200 OK with waste trends data

### Search Suppliers (by product)
- **URL:** `/api/v1/search/suppliers/`
- **Method:** GET
- **Query Params:** product_id, location
- **Response:** 200 OK with list of suppliers

### Pending Suppliers (Admin)
- **URL:** `/api/v1/admin/pending_suppliers/`
- **Method:** GET
- **Response:** 200 OK with list of pending suppliers

### Verify Supplier (Admin)
- **URL:** `/api/v1/admin/verify_supplier/`
- **Method:** POST
- **Request Body:** {"supplier_id": int}
- **Response:** 200 OK with status

### File Upload
- **URL:** `/api/v1/uploads/`
- **Method:** POST
- **Request Body:** Multipart form with file
- **Response:** 200 OK with file URL

### Insights
- **URL:** `/api/v1/insights/`
- **Method:** GET
- **Query Params:** refresh (true/false)
- **Response:** 200 OK with insights data

---

## Notes

- Most endpoints require JWT authentication except registration and token obtain.
- Admin endpoints require admin user.
- Use the Swagger UI at `/api/v1/docs/` for interactive API exploration.
- OpenAPI schema is available at `/api/v1/schema/`.
- ReDoc documentation is available at `/api/v1/schema/redoc/`.


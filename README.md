# Rental Booking System

## Overview

Welcome to the Rental Booking System! This project implements a seamless rental booking platform that allows users to register as Renters or Hosts. Renters can book properties while Hosts can list, update, and delete their properties. The platform ensures secure user authentication using Google Sign-In and maintains booking records to avoid double bookings.

## Features

### Backend
- **User Authentication**: Secure login and logout using Google Sign-In (OAuth).
- **User Roles**: Users can register as Renters or Hosts.
- **Property Listing**: Hosts can create, update, and delete property listings. Renters can view all available properties.
- **Booking System**: Renters can book properties by specifying check-in and check-out dates. Bookings have statuses: Pending, Confirmed, and Canceled.

### Frontend
- **Home Page**: A well-designed homepage showcasing available properties.
- **Property Management**: Hosts can manage their property listings.
- **Booking Interface**: Renters can book properties and view booking statuses.

## Technology Stack

### Backend
- Node.js with Express.js
- PostgreSQL 
- OAuth 2.0 for Google Sign-In

### Frontend
- React.js

## Getting Started

### Prerequisites
- Node.js and npm installed
- PostgreSQL
- Google Cloud project for OAuth setup

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Y-elv/Easy-Rent-Hub.git
    cd Easy-Rent-Hub
    ```

2. Set up the backend:
    ```bash
    cd backend
    npm install
    ```

3. Set up the frontend:
    ```bash
    cd frontend
    npm install
    ```

### Configuration

1. **Backend**: Configure your database and Google OAuth credentials in the `backend/.env` file.
    ```env
    DATABASE_URL=your_database_url
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    ```

2. **Frontend**: Configure your Google OAuth client ID in the `frontend/.env` file.
    ```env
    REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
    ```

### Running the Application

1. **Backend**:
    ```bash
    cd backend
    npm run dev 
    ```

2. **Frontend**:
    ```bash
    cd frontend
    npm run dev 
    ```

## License

This project is licensed under the MIT License.


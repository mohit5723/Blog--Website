# Blog Website

This is a full-stack blog website where users can register, log in, create and read blogs, search for blogs by keywords, and filter them by categories.

## Features

- **Authentication & Authorization**: Users can register and log in to their accounts securely.
- **Create Blogs**: Authenticated users can create new blogs.
- **Read Blogs**: Both registered and guest users can read blogs.
- **Filter Blogs by Categories**: Users can filter blogs based on categories.
- **Search Blogs**: Blogs can be searched by keywords from their titles.

## Running the Project

To run this project locally, follow the steps below:

### Client (Frontend)

1. Navigate to the `client` directory:
    ```bash
    cd client
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

The client will run on `http://localhost:3000`.

### API (Backend)

1. Navigate to the `api` directory:
    ```bash
    cd api
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the API server:
    ```bash
    node index.js
    ```


## Technologies Used

- **Frontend**: React 
- **Backend**: Node.js, Express.js
- **Database**: MongoDB 
- **Authentication**: JSON Web Token (JWT)
- **Styling**: Tailwind CSS / CSS



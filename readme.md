<p align="center" style="margin-top: 120px">

  <h3 align="center">Bill Split Application</h3>


</p>

## About Bill Split Application 🏓

The Bill Split Application is a simple web application that allows users to create 2-3 orders, add friends to each order, and then calculate and display the bill divided equally among the friends for each order.


Application URL
[bill-split](https://main--frabjous-crostata-28a242.netlify.app)


## Built with 🛠️

- React.js
- Tailwind CSS
- AntDesign
- Node.js
- Prisma ORM
  

## Getting Started 🚀

### Requirements

- [Node.js](https://nodejs.org/en/) >= 18.0.0
- [npm](https://npm.io/)

### Setup 

Clone the repository

   ```sh
   git clone https://github.com/shanifkshareef-hub/bill-split.git
   ```

### Run Backend

1. Install dependencies

   ```sh
   cd backend
   npm install
   ```

2. Set up your .env file

   From frontend directory, you will find .env.example. Create your
   own copy.


3. Migrate the SQL schema

   ```sh
   npx prisma migrate dev
   ```

4. Update the Prisma Client

   ```sh
   npx prisma generate
   ```   
   
5. Start the server

   ```sh
    npm start
   ```

   It will:

   - run the server on port `8000` or in the PORT given in the env file


### Run Frontend

1. Install dependencies

   ```sh
   cd frontend
   npm install
   ```

2. Set up your .env file

   From frontend directory, you will find .env.example. Create your
   own copy.



3. Start the frontend

   ```sh
    npm run dev
   ```

   It will:

   - run the web app on port `5173`

4. See the results:

- open [http://localhost:5173](http://localhost:5173) for the frontend



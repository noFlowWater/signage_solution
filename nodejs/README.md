
# **Getting Started - NodeJS Kiosk-API Server & Init Database**
This guide provides step-by-step instructions for setting up and running the kiosk server and database as part of the signage solution project. Follow these steps to ensure the server is configured and operational.

## Prerequisites

Before getting started, make sure you have the following software installed on your system
- **Node.js:** Make sure you have Node.js installed. You can download it [here](https://nodejs.org/).
- **MySQL 8.0:** Ensure that MySQL version 8.0 is installed on your machine. You can find the installation instructions [here](https://dev.mysql.com/doc/mysql-installation-excerpt/8.0/en/).


## Basic Setup

1. Navigate to the NODEJS Directory:
   ```sh
   cd signage_solution/nodejs
   ```
   
2. Install npm Modules:
   ```sh
   npm install
   ```

3. Create a **`.env`** file in the nodejs project's root directory and configure the database connection information, admin password, and port number.
   Here is an example of what the contents of the .env file might look like:
   ```sh
   touch .env
   ```
   
   example of `.env` content:
   ```sh
   DATABASE_URL="mysql://<database username e.g. root>:<database password e.g. pass@word>@<database host e.g. localhost>:3306/<database name e.g. kioskDB>"
   PORT=4000(the number what you want to change)
   ```

4. To create a database, open MySQL Shell and start your MySQL server:
   ```sh
   mysql -u root -p
   ```
   and
   ```sql
   CREATE DATABASE <database name> e.g. kioskDB;
   ```
   If successful, stop your MySQL server by execute the following command:
   ```sql
   quit
   ```
5. Execute the migration to create database tables in mysql database:
   ```sh
   npx prisma migrate dev
   ```
6. Generate dummy data for testing using the following command:
   ```sh
   npm run seed
   ```

   If successful, the following message will be displayed:
  
   ```plaintext
   Connected
   Success
   ```
   After successfully generating dummy data using the `npm run seed` command, you may need to terminate the seed command to proceed with other tasks or steps. press `Ctrl + C`.

7. To run the program, use the following command:
   ```sh
   npm run start
   ```

   If successful, you should see a message similar to the following:
  
   ```plaintext
   Server is running on port {port number (default port number is 4000)}.
   Connected
   ```

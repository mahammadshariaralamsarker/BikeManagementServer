Front_End_Requirements:https://github.com/Apollo-Level2-Web-Dev/L2B4-Frontend-Track-Assignment-4/blob/main/2-Bike-Shop-Assignment-Requirement.md

Bike Management API
A simple Node.js-based API for managing a bike inventory. The API allows you to create, read, update, and delete bike records, as well as search for bikes by query terms such as name, brand, or category.

Features
1.Create, update, delete, and retrieve bikes from the database
2.Search bikes by query (e.g., name, brand, or category)
3.Handle error responses with meaningful messages
4.Basic validation for bike data
5.Make order 
7.when you make the order the quantity is checked ata the same time quantity is updated with product quantity and instock

Tech Stack
1.Node.js: JavaScript runtime environment
2.Express: Web framework for building the API
3.MongoDB: Database for storing bike data
4.Mongoose: MongoDB object modeling for Node.js


Prerequisites
Before running the project, ensure you have the following installed:
Node.js
MongoDB (or use MongoDB Atlas for a cloud database)
Installation
Clone the repository:
Navigate into the project folder:
npm install
Set up your environment variables:

Create a .env file in the root directory and add:
PORT=5000
DATABASE_URL=make it from your mongodb cluster 

Running the Project
To run the project in development mode: npm run start:dev
This will start the server on http://localhost:5000.

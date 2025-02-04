# 🚲 Bike Store API

A Node.js, Express.js and MongoDB based API designed to manage a Bike store. The API enables Admin can Create Bike and Manage and users can Create Account place orders and Complete Payment using ShurjoPay.

## 🚀 Features

1. **Order Bikes:** Users can place orders with Product id and Quantity. Total Price and User Info Automatically Calculate and Added from Backend.
2. **Payment System:** User Can pay Using ShurjoPay Payment Gateway.
3. **Profile Manage:** User Can Create and Update Personal Profile Information.

## 🛠️ Installation and Setup

Follow these steps to set up the project locally:

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2.Install the required dependencies:

```bash
npm install
```

3. Create a .env file in the root directory and configure the following environment variables:

```bash
 PORT=5000
MONGODB_URL=<your-mongodb-url>
NODE_ENV=<deployment>
BCRYPT_SALT_ROUNDS=<bcrypt_salt_number>
JWT_ACCESS_TOKEN_SECRET=<jwt_access_token_secret>
JWT_ACCESS_EXPIRES_IN=<jwt_access_experies_in>
SP_ENDPOINT=<shurjo_pay_sp_end_point>
SP_USERNAME=<shurjo_pay_sp_username>
SP_PASSWORD=<shurjo_pay_sp_password>
SP_PREFIX=<shurjo_pay_sp_prefix>
SP_RETURN_URL=<shurjo_pay_sp_return_url>
DB_FILE=<shurjo_pay_db_file>
```

4. Start the server:

```bash
 npm run start:dev
```

5. The API will be available at

```bash
http://localhost:5000
```

# 📚 API Endpoints

## Product Endpoints

1. Create a Bike
   Method: POST

URL:

```bash
/api/v1/Bike
```

Description: Add a new Bike to the database.

2. Get All Bikes
   Method: GET
   URL:

```bash
/api/v1/Bike
```

Description: Retrieves All Bikes. Optional search by type using the searchTerm query parameter by brand, Bike name, or category and Filters for price range, model, brand, category, and availability.

3. Get a Single Bike
   Method: GET
   URL:

```bash
/api/v1/Bike/:productId
```

Description: Fetch details of a specific Bike by ID.

4. Update a Bike
   Method: PATCH
   URL:

```bash
/api/v1/Bike/:productId
```

Description: Admin Can Updates the details of a specific Bike by ID.

5. Delete a Bike
   Method: DELETE
   URL:

```bash
/api/v1/Bike/:productId
```

Description: Deletes a Bike by ID.

## Order Endpoints

1. Place an Order
   Method: POST
   URL:

```bash
/api/v1/order/create
```

Description: User can Place an order for a Bike.

2. Update Oder Delivery Status
   Method: PATCH
   URL:

```bash
/api/v1/order/delivery/status/:orderId
```

Description: Admin Can Update a Order Delivery Status.

3. Payment Verify
   Method: GET
   URL:

```bash
/api/v1/order/verify
```

Description: User Can Verify Payment.

4. Get Loggedin user Order
   Method: GET
   URL:

```bash
/api/v1/order/all
```

Description: User Can See All Orders.

5. All Orders
   Method: GET
   URL:

```bash
/api/v1/order/all-orders
```

Description: Get All Orders For Admin.

6. Delete Orders
   Method: DELETE
   URL:

```bash
/api/v1/order/delete/:orderId
```

Description: Admin Can Delete Any Orders.

## User Endpoints

1. Create User
   Method: POST
   URL:

```bash
/api/v1/user
```

Description: User can Create Account.

2. Get All User
   Method: GET
   URL:

```bash
/api/v1/user
```

Description:Get All User From DB.

3. User Status Update
   Method: PATCH
   URL:

```bash
/api/v1/user/update
```

Description: Admin Can Update User Status.

## Auth Endpoints

1. Login User
   Method: POST
   URL:

```bash
/api/v1/auth/login
```

Description: User can Login.

2. Update User Profile Info
   Method: PATCH
   URL:

```bash
/api/v1/auth/update
```

Description: User can Update Profile Info.

3. Get Logged in User Info
   Method: GET
   URL:

```bash
/api/v1/auth/me
```

Description: User can Get Profile Info.

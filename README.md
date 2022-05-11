# Egy-FWD-Storefront-Backend-API-Project
 EGY-FWD Storefront Backend API Project

[About]
 This is an API that can be used in E-Commerce websites, it's allow you to create users, products categories, products, and place orders with the selected products.

[Note]
node_modules & build folders are deleted, you need to run "npm install" before you build the project

[How to test the api server]
1- First of all you need to run command (npm i) to install all dependencies
2- Then you need to run (npm run build) to build our api and creates our .js files.
3- You need to run (npm run test) to do the following:
    * Delete the test database if its exists
    * Create the test database
    * Run migrate up to create our database schema tables
    * Run jasmine test units
    * Run migrate down to drop our database tables
    * Drop the database after the test is done

[How to run the api server]
1- First of all you need to run command (npm i) to install all dependencies
2- Then you need to run (npm run build) to build our api and creates our .js files.
3- You need to run (npm run start) to start the server
    * You can run (npm run start-build) to start the server on .js files.

[Command's]
To build the project: run ('npm run build') command
To use prettier check: run ('npm run prettier') command
To use eslint check: run ('npm run eslint') command
To use jasmine test: run ('npm run test') command
To build the test database and run migrations files before and after the test and run build, pretteir, eslint and jasmine: run ('npm run check') command
To start the server development env: run ('npm run start-ts')
To start the server production env: run ('npm run start-js')
To Initalize the development database and create tables: run ('npm run dev-db:initialize')
To start the server with nodemon run ('npm run start-live')

[How to setup and connect database]
1- You need to make sure postgres is installed on your machine.

2- Open .env file to edit the environment variables:
        DATABASE_HOST,DATABASE_CATALOG,DATABASE_CATALOG_TEST,DATABASE_USERNAME,DATABASE_PASSWORD,DATABASE_PORT

3- Open database.json and edit values to yours. [YOU MUST edit maindb to match your postgres main database info]





[Endpoints]
    
[Admin_Users]
        
[Users]

            1- 'http://localhost:6060/api/administration/management/users'
            Loads all system users 

            2- 'http://localhost:6060/api/administration/management/users/admins'
            Loads all system admin users

            3- 'http://localhost:6060/api/administration/management/users/non-admins'
            Loads all system normal users 'Non-Admin'

            4- 'http://localhost:6060/api/administration/management/users/create'
            Create an admin user
            request body = {
                first_name: 'first_name',
                last_name: 'last_name',
                email: 'email@domain.com',
                password: 'password'
            }

            5- 'http://localhost:6060/api/administration/management/users/:user_id/delete'
            5- 'http://localhost:6060/api/administration/management/users/1/delete'
            Delete user with id 1
        
[Categories]

            1- 'http://localhost:6060/api/administration/eshop/categories'
            Loads all system categories

            2- 'http://localhost:6060/api/administration/eshop/categories/create'
            Creates a category
            request body = {
                name: 'category_name'
            } 

            3- 'http://localhost:6060/api/administration/eshop/categories/:id'
            3- 'http://localhost:6060/api/administration/eshop/categories/1'
            Loads category with id 1

            4- 'http://localhost:6060/api/administration/eshop/categories/:id/edit'
            4- 'http://localhost:6060/api/administration/eshop/categories/1/edit'
            Edit category with id 1
            request body = {
                id: 1
                name: 'new_category_name'
            } 

            5- 'http://localhost:6060/api/administration/eshop/categories/:id/delete'
            5- 'http://localhost:6060/api/administration/eshop/categories/1/delete'
            Delete category with id 1
        
[Products]

            1- 'http://localhost:6060/api/administration/eshop/categories/:category_id/products'
            1- 'http://localhost:6060/api/administration/eshop/categories/1/products'
            Loads all category with id 1 products

            2- 'http://localhost:6060/api/administration/eshop/categories/:category_id/products/create'
            2- 'http://localhost:6060/api/administration/eshop/categories/1/products/create'
            Create a product for category with id 1
            request body = {
                name: 'product_name'
                price: 500
            }

            3- 'http://localhost:6060/api/administration/eshop/categories/:category_id/products/:id'
            3- 'http://localhost:6060/api/administration/eshop/categories/1/products/1'
            Loads product with id 1 in a category with id 1 

            4- 'http://localhost:6060/api/administration/eshop/categories/:category_id/products/:id/edit'
            4- 'http://localhost:6060/api/administration/eshop/categories/1/products/1id/edit'
            Edit product with id 1 in category with id 1
            request body = {
                name: 'new_product_name'
                price: 550
            } 

            5- 'http://localhost:6060/api/administration/eshop/categories/:category_id/products/:id/delete'
            5- 'http://localhost:6060/api/administration/eshop/categories/1/products/1/delete'
            Delete product with id 1 in category with id 1
        
[Orders]

            1- 'http://localhost:6060/api/administration/eshop/orders'
            Loads all system orders

            2- 'http://localhost:6060/api/administration/eshop/users/:user_id/orders'
            2- 'http://localhost:6060/api/administration/eshop/users/1/orders'
            Loads all orders for user with id 1

            3- 'http://localhost:6060/api/administration/eshop/users/:user_id/orders/:id'
            3- 'http://localhost:6060/api/administration/eshop/users/1/orders/1'
            Loads order with id 1 for a user with id 1

            4- 'http://localhost:6060/api/administration/eshop/users/:user_id/orders/:id/delete'
            4- 'http://localhost:6060/api/administration/eshop/users/1/orders/1/delete'
            Delete order with id 1 for user with id 1
        
[Order-Products]

            1- 'http://localhost:6060/api/administration/eshop/users/:user_id/orders/:order_id/products'
            1- 'http://localhost:6060/api/administration/eshop/users/1/orders/1/products'
            Loads all order products for order with id 1 and user with id 1

            2- 'http://localhost:6060/api/administration/eshop/users/:user_id/orders/:order_id/products/:id'
            2- 'http://localhost:6060/api/administration/eshop/users/1/orders/1/products/1'
            Loads order product with id 1 for order with id 1 and user with id 1

            3- 'http://localhost:6060/api/administration/eshop/users/:user_id/orders/:order_id/products/:id/delete'
            3- 'http://localhost:6060/api/administration/eshop/users/1/orders/1/products/1/delete'
            Delete order product with id 1 for order with id 1 and user with id 1

[Dashboard]

            1- 'http://localhost:6060/api/administration/eshop/dashboard/orders/products'
            Loads all order products

            2- 'http://localhost:6060/api/administration/eshop/dashboard/orders/users'
            Loads all users with orders

            2- 'http://localhost:6060/api/administration/eshop/dashboard/products/top5'
            Loads most top 5 expensive products




************************************************************************************************************************************************************************************************************

[Members_Users]

[Users]

            1- 'http://localhost:6060/api/eshop/users/create'
            Create an normal user [Non-Admin]
            request body = {
                first_name: 'first_name',
                last_name: 'last_name',
                email: 'email@domain.com',
                password: 'password'
            }

            2- 'http://localhost:6060/api/eshop/users/authenticate'
            Authenticate user and return the jwt [Json Web Token]
            request body = {
                email: 'email@domain.com',
                password: 'password'
            }

            3- 'http://localhost:6060/api/eshop/users/:id'
            3- 'http://localhost:6060/api/eshop/users/1'
            Load user with id 1

            4- 'http://localhost:6060/api/eshop/users/:id/edit'
            4- 'http://localhost:6060/api/eshop/users/1/edit'
            Edit user with id 1
            request body = {
                first_name: 'new_first_name',
                last_name: 'new_last_name'
            }
        
[Categories]

            1- 'http://localhost:6060/api/eshop/categories'
            Loads all system categories

            2- 'http://localhost:6060/api/eshop/categories/:id'
            2- 'http://localhost:6060/api/eshop/categories/1'
            Loads category with id 1
        
[Products]

            1- 'http://localhost:6060/api/eshop/categories/:category_id/products'
            1- 'http://localhost:6060/api/eshop/categories/1/products'
            Loads all category with id 1 products

            2- 'http://localhost:6060/api/eshop/categories/:category_id/products/:id'
            2- 'http://localhost:6060/api/eshop/categories/1/products/1'
            Loads product with id 1 in a category with id 1 
        
[Orders]

            1- 'http://localhost:6060/api/eshop/users/:user_id/orders'
            1- 'http://localhost:6060/api/eshop/users/1/orders'
            Loads all orders for user with id 1

            2- 'http://localhost:6060/api/eshop/users/:user_id/orders/create'
            2- 'http://localhost:6060/api/eshop/users/1/orders/create'
            Create a new order for user with id 1

            3- 'http://localhost:6060/api/eshop/users/:user_id/orders/:id'
            3- 'http://localhost:6060/api/eshop/users/1/orders/1'
            Loads order with id 1 for a user with id 1

            4- 'http://localhost:6060/api/eshop/users/:user_id/orders/:id/complete'
            4- 'http://localhost:6060/api/eshop/users/1/orders/1/complete'
            Change order state to complete for order with id 1 for user with id 1

            5- 'http://localhost:6060/api/eshop/users/:user_id/orders/:id/delete'
            5- 'http://localhost:6060/api/eshop/users/1/orders/1/delete'
            Delete order with id 1 for user with id 1
        
[Order-Products]

            1- 'http://localhost:6060/api/eshop/users/:user_id/orders/:order_id/products'
            1- 'http://localhost:6060/api/eshop/users/1/orders/1/products'
            Loads all order products for order with id 1 and user with id 1

            2- 'http://localhost:6060/api/eshop/users/:user_id/orders/:order_id/products/:id'
            2- 'http://localhost:6060/api/eshop/users/1/orders/1/products/1'
            Loads order product with id 1 for order with id 1 and user with id 1

            3- 'http://localhost:6060/api/eshop/users/:user_id/orders/:order_id/products/create'
            3- 'http://localhost:6060/api/eshop/users/1/orders/1/products/create'
            Create order product for order with id 1 and user with id 1
            request body = {
                product_id: 1,
                quantity: 1
            }

            4- 'http://localhost:6060/api/eshop/users/:user_id/orders/:order_id/products/:id/edit'
            4- 'http://localhost:6060/api/eshop/users/1/orders/1/products/1/edit'
            Edit order product with id 1 for order with id 1 and user with id 1
            request body = {
                product_id: 2,
                quantity: 3
            }

            5- 'http://localhost:6060/api/eshop/users/:user_id/orders/:order_id/products/:id/delete'
            5- 'http://localhost:6060/api/eshop/users/1/orders/1/products/1/delete'
            Delete order product with id 1 for order with id 1 and user with id 1


[Environment]
01- API_HOST=localhost
    for api host server
02- API_PORT=6060
    for anp connection port
03- API_BACKLOG=100
    for api socket back log
04- DATABASE_HOST=localhost
    for the postgres database host server
05- DATABASE_CATALOG=egyfwd_db
    postgres database name
06- DATABASE_CATALOG_TEST=egyfwd_db_test
    test postgres database name
07- DATABASE_USERNAME=egyfwd
    postgres database connection username
08- DATABASE_PASSWORD=egyfwd
    postgres database connection password
09- DATABASE_PORT=5432
    postgres database connection port
10- ENV=dev
    default environment
11- BCRYPT_PASSWORD=dr0w$$@P
    for user password hashing.
12- SALT_ROUNDS=10
    a salt tounds for user password salt.
13- TOKEN_SECRET=UsErSeCrEtToKeNdr0w$$@P
    for Json Web token
# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
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

## Data Shapes

#### user
- id                [serial]
- first_name        [varchar(25)]
- last_name         [varchar(25)]
- email             [varchar(100)]
- password          [text]
- is_admin          [boolean]
- create_date       [date]
- last_login_date   [date]

#### category
-  id               [serial]
- name              [varchar(50)]
- create_date       [date]

#### product
-  id               [serial]
- name              [varchar(50)]
- price             [integer]
- category_id       [integer]
- create_date       [date]

#### order
-  id               [serial]
- user_id           [integer]
- order_status      [integer]
- create_date       [date]

#### order_products
-  id               [serial]
- product_id        [integer]
- quantity          [integer]
- order_id          [integer]
- create_date       [date]


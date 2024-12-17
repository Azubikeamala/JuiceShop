In this project, I developed a web application for a Juice Shop to manage customer orders efficiently. The application connects to a database to store and retrieve all orders.

Technologies Used
Frontend: HTML, CSS, JavaScript
Backend: Node.js, Express.js, EJS
Database: MongoDB
Features
Customer Order Placement

Customers are required to provide their Student Number and Student ID to place an order.
Server-side Validation ensures:
Student Name is not empty, is a string, and has a minimum length of 3 characters.
Student ID follows the format XXX-XXXX (a 7-digit number).
Users can select any number of items, but a minimum of one item is required to complete the order.
Order Confirmation

Upon successful order placement, a Receipt Page is generated displaying:
Order details
Subtotal, tax, and total amount
Admin Panel

Admin Login: A secure login system that grants access to the Juice Shop owner.
Order Management:
Admin can view all orders in a tabular format.
A Delete Button allows the admin to remove orders. Any deletion is synchronized with the database in real-time.
Session Management: The "View Orders" page is accessible only to the Admin while logged in. A Logout Functionality ensures proper session termination.
Database Design

Database Name: JuiceShop
Collections:
admins: Stores admin login credentials.
orders: Stores all customer orders placed through the app.
This application ensures a seamless process for customers to place orders and provides the shop owner with an intuitive interface for managing and monitoring orders.

# JuiceShop
Tech Stack Used: ✅ Frontend: HTML, CSS, JavaScript ✅ Backend: Node.js, Express.js, EJS ✅ Database: MongoDB

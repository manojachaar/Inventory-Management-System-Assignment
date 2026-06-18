# Inventory-Management-System-Assignment

## Overview

The Inventory Management System is a full-stack web application developed using HTML, CSS, JavaScript, Python (Flask), and MySQL. The application helps users manage product inventory by adding products, updating stock levels, preventing negative stock values, displaying inventory details, and identifying low-stock items.

Additional features implemented include:

* User Login System
* Product Search
* Date Added Tracking
* Dashboard Cards
* Low Stock Alerts

---

## Features

### Authentication

* Login using username and password
* Logout functionality

### Inventory Management

* Add Product
* Update Product Stock
* Delete Product
* Prevent Negative Stock
* Display All Products
* Low Stock Detection

### Additional Features

* Search Product
* Date Added Column
* Dashboard Statistics

---

## Technology Stack

Frontend:

* HTML5
* CSS3
* JavaScript (ES6)

Backend:

* Python
* Flask
* Flask-CORS

Database:

* MySQL

Tools:

* VS Code
* Git
* GitHub
* XAMPP
* MySQL Command Line Client

---

## Database Setup

Create Database:

CREATE DATABASE inventory_db;

USE inventory_db;

Create Products Table:

CREATE TABLE products(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
quantity INT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Create Users Table:

CREATE TABLE users(
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(100) UNIQUE NOT NULL,
password VARCHAR(100) NOT NULL
);

Insert Demo User:

INSERT INTO users(username,password)
VALUES('admin','admin123');

---

## Installation Steps

### Clone Repository

git clone <repository-link>

### Backend Setup

cd backend

Install dependencies:

pip install flask flask-cors mysql-connector-python

Run application:

python app.py

### Frontend Setup

Open login.html using Live Server in VS Code.

---

## Demo Credentials

Username: admin

Password: admin123

---

## Assumptions Made During Development

* Low stock threshold is set to less than 5.
* Product names are unique for demonstration purposes.
* Inventory quantity cannot be negative.
* Login authentication is implemented for demonstration purposes using database-stored credentials.
* The application is intended for a single administrator user.

---

## Future Improvements

* Password hashing
* Multi-user support
* Product categories
* Export inventory to CSV
* Stock history tracking
* Product image upload
* Role-based authentication

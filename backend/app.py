from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)


def get_db():
    return mysql.connector.connect(
        host="127.0.0.1",
        user="root",
        password="Manoj@5675",
        database="inventory_db",
        ssl_disabled=True
    )


# LOGIN
@app.route('/login', methods=['POST'])
def login():

    data = request.json
    username = data['username']
    password = data['password']

    db = get_db()
    cursor = db.cursor(dictionary=True)

    cursor.execute(
        """
        SELECT *
        FROM users
        WHERE username=%s
        AND password=%s
        """,
        (username, password)
    )

    user = cursor.fetchone()

    cursor.close()
    db.close()

    if user:
        return jsonify({
            "message": "Login Successful"
        })

    return jsonify({
        "message": "Invalid Username or Password"
    }), 401


# GET PRODUCTS
@app.route('/products', methods=['GET'])
def get_products():

    db = get_db()
    cursor = db.cursor(dictionary=True)

    cursor.execute("""
        SELECT
        id,
        name,
        quantity,
        DATE_FORMAT(created_at,
        '%d-%m-%Y %H:%i')
        AS created_at
        FROM products
    """)

    products = cursor.fetchall()

    cursor.close()
    db.close()

    return jsonify(products)


# ADD PRODUCT
@app.route('/products', methods=['POST'])
def add_product():

    data = request.json

    name = data['name'].strip()
    quantity = int(data['quantity'])

    if quantity < 0:
        return jsonify({
            "message":
            "Quantity cannot be negative"
        }), 400

    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        """
        INSERT INTO products
        (name, quantity)
        VALUES (%s,%s)
        """,
        (name, quantity)
    )

    db.commit()

    cursor.close()
    db.close()

    return jsonify({
        "message":
        "Product Added Successfully"
    })


# UPDATE STOCK
@app.route('/products/<int:id>',
           methods=['PUT'])
def update_product(id):

    data = request.json
    quantity = int(data['quantity'])

    if quantity < 0:
        return jsonify({
            "message":
            "Stock cannot be negative"
        }), 400

    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        """
        UPDATE products
        SET quantity=%s
        WHERE id=%s
        """,
        (quantity, id)
    )

    db.commit()

    cursor.close()
    db.close()

    return jsonify({
        "message":
        "Stock Updated Successfully"
    })


# DELETE PRODUCT
@app.route('/products/<int:id>',
           methods=['DELETE'])
def delete_product(id):

    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        """
        DELETE FROM products
        WHERE id=%s
        """,
        (id,)
    )

    db.commit()

    cursor.close()
    db.close()

    return jsonify({
        "message":
        "Product Deleted Successfully"
    })


# LOW STOCK
@app.route('/low-stock',
           methods=['GET'])
def low_stock():

    db = get_db()
    cursor = db.cursor(dictionary=True)

    cursor.execute(
        """
        SELECT *
        FROM products
        WHERE quantity < 5
        """
    )

    products = cursor.fetchall()

    cursor.close()
    db.close()

    return jsonify(products)


if __name__ == '__main__':
    app.run(debug=True)
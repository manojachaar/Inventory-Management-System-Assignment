const API = "http://127.0.0.1:5000";

if (
    localStorage.getItem(
        "loggedIn"
    ) !== "true"
) {
    window.location =
        "login.html";
}

window.onload = () => {
    loadProducts();
    loadLowStock();
};


async function addProduct() {

    const name =
        document.getElementById(
            "name"
        ).value;

    const quantity =
        document.getElementById(
            "quantity"
        ).value;

    if (
        name === "" ||
        quantity === ""
    ) {
        alert(
            "Enter all fields"
        );
        return;
    }

    await fetch(
        `${API}/products`,
        {
            method: "POST",

            headers: {
                "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
                name,
                quantity
            })
        }
    );

    document.getElementById(
        "name"
    ).value = "";

    document.getElementById(
        "quantity"
    ).value = "";

    loadProducts();
    loadLowStock();
}


async function loadProducts() {

    const response =
        await fetch(
            `${API}/products`
        );

    const products =
        await response.json();

    let html = "";

    let totalStock = 0;

    products.forEach(product => {

        totalStock +=
            product.quantity;

        let status =
            product.quantity < 5
            ?
            '<span class="red">Low Stock</span>'
            :
            '<span class="green">In Stock</span>';

        html += `

        <tr>

            <td>
                ${product.name}
            </td>

            <td>
                ${product.quantity}
            </td>

            <td>
                ${product.created_at}
            </td>

            <td>
                ${status}
            </td>

            <td>

                <button
                onclick="increase(${product.id},${product.quantity})">
                +
                </button>

                <button
                onclick="decrease(${product.id},${product.quantity})">
                -
                </button>

                <button
                onclick="deleteProduct(${product.id})">
                Delete
                </button>

            </td>

        </tr>

        `;
    });

    document.getElementById(
        "productTable"
    ).innerHTML = html;

    document.getElementById(
        "totalProducts"
    ).innerHTML =
        products.length;

    document.getElementById(
        "totalStock"
    ).innerHTML =
        totalStock;
}


async function increase(
    id,
    quantity
) {

    quantity++;

    await fetch(
        `${API}/products/${id}`,
        {
            method: "PUT",

            headers: {
                "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
                quantity
            })
        }
    );

    loadProducts();
    loadLowStock();
}


async function decrease(
    id,
    quantity
) {

    if (quantity <= 0) {

        alert(
            "Stock cannot be negative"
        );

        return;
    }

    quantity--;

    await fetch(
        `${API}/products/${id}`,
        {
            method: "PUT",

            headers: {
                "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
                quantity
            })
        }
    );

    loadProducts();
    loadLowStock();
}


async function deleteProduct(id) {

    const confirmDelete =
        confirm(
            "Delete Product?"
        );

    if (!confirmDelete)
        return;

    await fetch(
        `${API}/products/${id}`,
        {
            method: "DELETE"
        }
    );

    loadProducts();
    loadLowStock();
}


async function loadLowStock() {

    const response =
        await fetch(
            `${API}/low-stock`
        );

    const products =
        await response.json();

    let html = "";

    products.forEach(product => {

        html += `
        <p>

        ⚠
        ${product.name}
        (${product.quantity})

        </p>
        `;
    });

    if (
        products.length === 0
    ) {
        html =
            "No low stock items.";
    }

    document.getElementById(
        "lowStock"
    ).innerHTML =
        html;

    document.getElementById(
        "lowCount"
    ).innerHTML =
        products.length;
}


/* SEARCH PRODUCT */

function searchProduct() {

    const value =
        document.getElementById(
            "search"
        )
        .value
        .toLowerCase();

    const rows =
        document.querySelectorAll(
            "#productTable tr"
        );

    rows.forEach(row => {

        const text =
            row.innerText
            .toLowerCase();

        row.style.display =
            text.includes(value)
            ? ""
            : "none";

    });
}


/* LOGOUT */

function logout() {

    localStorage.removeItem(
        "loggedIn"
    );

    window.location =
        "login.html";
}
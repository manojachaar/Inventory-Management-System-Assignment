const API = "http://127.0.0.1:5000";

async function login() {

    const username =
        document.getElementById(
            "username"
        ).value;

    const password =
        document.getElementById(
            "password"
        ).value;

    const response =
        await fetch(
            `${API}/login`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                    "application/json"
                },

                body: JSON.stringify({
                    username,
                    password
                })
            }
        );

    const data =
        await response.json();

    if (response.ok) {

        localStorage.setItem(
            "loggedIn",
            "true"
        );

        window.location =
            "index.html";
    }
    else {
        alert(data.message);
    }
}
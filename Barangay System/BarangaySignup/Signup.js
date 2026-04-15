async function signup(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        })
    });

    if (!response.ok) {
        alert("Signup failed");
        return;
    }

    const data = await response.json();
    alert("Signup successful!");
    window.location.href = "/Barangay System/BarangayLogin/Login.html";
}
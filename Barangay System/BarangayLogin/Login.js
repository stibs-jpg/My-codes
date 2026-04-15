async function login(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        if (!response.ok) {
            throw new Error("Login failed");
        }

        const data = await response.json();

        console.log("LOGIN SUCCESS:", data);

        // SAVE LOGIN DATA (optional but useful)
        localStorage.setItem("user", JSON.stringify(data));

        // ROLE-BASED REDIRECT
        if (data.role === "ADMIN") {
            window.location.href = "/admin/dashboard.html";
        } else if (data.role === "CAPTAIN") {
            window.location.href = "/captain/dashboard.html";
        } else if (data.role === "SECRETARY") {
            window.location.href = "/secretary/dashboard.html";
        } else {
            window.location.href = "/Barangay System/HomePage/Prac.html";
        }

    } catch (error) {
        console.error(error);
        alert("Invalid email or password");
    }
}
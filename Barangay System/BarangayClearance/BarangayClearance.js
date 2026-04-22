document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("cedulaForm");

    if (!form) {
        console.error("Form not found!");
        return;
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Helper to safely get values
        function getValue(id) {
            const el = document.getElementById(id);
            if (!el) {
                console.error("Missing element with id:", id);
                return "";
            }
            return el.value.trim();
        }
           //  Get logged in user
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.userId) {
            alert("You must be logged in to submit.");
            return;
        }

        const data = {
            lname: getValue("lname"),
            fname: getValue("fname"),
            mname: getValue("mname"),
            address: getValue("address"),
            gender: getValue("gender"),
            civilStatus: getValue("civilStatus"),
            bday: getValue("bday"),
            birthplace: getValue("birthplace"),
            occupation: getValue("occupation"),
            annualIncome: getValue("annualincome"),
            userId: user.userId
        };

        //Basic validation
        if (!data.lname || !data.fname || !data.address) {
            alert("Please fill in Last Name, First Name, and Address.");
            return;
        }

        fetch("http://localhost:8080/api/cedulas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to submit");
            }
            return response.json();
        })
        .then(result => {
            alert("Cedula submitted successfully!");
            console.log("Server response:", result);

            form.reset();
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Something went wrong while submitting.");
        });
    });

});
document.getElementById("cedulaForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let fields = [
        "lname", "fname", "mname", "address",
        "gender", "status", "birthday",
        "birthplace", "occupation", "income"
    ];

    let valid = true;

    fields.forEach(id => {
        let value = document.getElementById(id).value.trim();
        if (value === "") {
            valid = false;
        }
    });

    if (!valid) {
        alert("Please fill out all fields.");
        return;
    }

    alert("Application submitted successfully!");
    this.reset();
});


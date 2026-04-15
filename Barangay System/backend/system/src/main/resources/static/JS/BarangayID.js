async function submitForm() {
    // Personal Info
    const lname = document.getElementById("lname").value.trim();
    const fname = document.getElementById("fname").value.trim();
    const mname = document.getElementById("mname").value.trim();
    const address = document.getElementById("address").value.trim();
    const contact = document.getElementById("contact").value.trim();
    const birthday = document.getElementById("birthday").value.trim();

    // Radio buttons
    const sex = document.querySelector('input[name="sex"]:checked')?.value;
    const civilStatus = document.querySelector('input[name="civil"]:checked')?.value;
    const residency = document.querySelector('input[name="res"]:checked')?.value;
    const yearsOfStay = document.getElementById("yearsOfStay").value;

    // Emergency Contact
    const emergencyName = document.getElementById("emergencyName").value.trim();
    const emergencyContact = document.getElementById("emergencyContact").value.trim();
    const emergencyRelationship = document.getElementById("emergencyRelationship").value.trim();
    const emergencyAddress = document.getElementById("emergencyAddress").value.trim();

    // ID Details
    const idNumber = document.getElementById("idNumber").value.trim();
    const precinctNumber = document.getElementById("precinctNumber").value.trim();
    const remarks = document.getElementById("remarks").value.trim();
    const orNumber = document.getElementById("orNumber").value.trim();
    const signature = document.getElementById("signature").files[0]; // optional file

    // Basic validation
    if (!lname || !fname || !address || !contact) {
        alert("Please fill all required fields.");
        return;
    }

    // data for backend
    const data = {
        userId: 1, // temporary, replace with actual user ID if you implement login
        documentType: "Barangay ID",
        lname,
        fname,
        mname,
        address,
        contact,
        birthday,
        sex,
        civilStatus,
        residency,
        yearsOfStay: yearsOfStay ? parseInt(yearsOfStay) : null,
        emergencyName,
        emergencyContact,
        emergencyRelationship,
        emergencyAddress,
        idNumber,
        precinctNumber,
        remarks,
        orNumber
        // Note: signature upload requires FormData and backend support
    };

    try {
        const response = await fetch("http://localhost:8080/api/documents/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const savedData = await response.json();
            alert("Registration submitted successfully!");
            console.log("Saved Data:", savedData);
        } else {
            const errorData = await response.text();
            console.error("Error response:", errorData);
            alert("Error submitting registration");
        }
    } catch (error) {
        console.error(error);
        alert("Cannot connect to server");
    }
}
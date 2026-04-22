// API endpoint
const API_URL = "http://localhost:8080/api/complaints";

// Wait for form submission
document.getElementById("reportForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get logged in user
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.userId) {
        alert("You must be logged in to submit.");
        return;
    }

    // Get values from form
    const complaint = {
        incidentType: document.getElementById("incidentType").value,
        incidentStart: document.getElementById("incidentStart").value,
        incidentEnd: document.getElementById("incidentEnd").value || null,
        location: document.getElementById("location").value,
        involvedPersons: document.getElementById("involvedPersons").value,
        narrative: document.getElementById("narrative").value,
        userId: user.userId,   
        fname: user.fname,     
        lname: user.lname 
    };

    console.log("Sending:", complaint);

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(complaint)
        });

        if (!response.ok) {
            throw new Error("Failed to submit complaint");
        }

        const result = await response.json();

        alert("Complaint submitted successfully!");
        console.log(result);

        document.getElementById("reportForm").reset();

    } catch (error) {
        console.error(error);
        alert("❌ Error submitting complaint. Check backend.");
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const applyBtn = document.getElementById("applyBtn");

    applyBtn.addEventListener("click", async () => {

        // Determine ownership type (pick one)
        let ownershipType = "";
        if (document.getElementById("singleProprietor").checked) ownershipType = "Single Proprietor";
        else if (document.getElementById("cooperative").checked) ownershipType = "Cooperative";
        else if (document.getElementById("partnership").checked) ownershipType = "Partnership";
        else if (document.getElementById("nonProfitCorp").checked) ownershipType = "Non-stock & Non-profit Corporation";
        else if (document.getElementById("proprietaryCorp").checked) ownershipType = "Proprietary Corporation";
        else if (document.getElementById("othersOwnership").checked) {
            ownershipType = document.getElementById("othersOwnershipText").value;
        }

        // Determine office type
        let officeType = "";
        if (document.getElementById("mainOffice").checked) officeType = "Main Office";
        else if (document.getElementById("branchOffice").checked) officeType = "Branch";

        const data = {
            lastName: document.getElementById("lastName").value,
            firstName: document.getElementById("firstName").value,
            middleName: document.getElementById("middleName").value,

            businessName: document.getElementById("businessName").value,
            tin: document.getElementById("tin").value,
            tradeName: document.getElementById("tradeName").value,
            representativeName: document.getElementById("representativeName").value,

            buildingNo: document.getElementById("buildingNo").value,
            street: document.getElementById("street").value,
            barangay: document.getElementById("barangay").value,
            city: document.getElementById("city").value,

            contactNumber: document.getElementById("contactNumber").value,
            email: document.getElementById("email").value,

            ownershipType: ownershipType,
            officeType: officeType,
            branchAddress: document.getElementById("branchAddress").value,

            calendarYear: document.getElementById("calendarYear").value || null,
            assessmentDate: document.getElementById("assessmentDate").value || null,
            permitNumber: document.getElementById("permitNumber").value,
            capitalBreakdown: document.getElementById("capital").value
        };

        console.log("Sending data:", data); // debug

        try {
            const response = await fetch("http://localhost:8080/api/business-permits", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Server error:", errorText);
                alert("Failed: " + errorText);
                return;
            }

            const result = await response.json();
            alert("Application submitted successfully!");
            console.log(result);

        } catch (error) {
            console.error(error);
            alert("Error submitting application.");
        }
    });
});
function submitForm() {

  const user = JSON.parse(localStorage.getItem("user"));
  
  if (!user || !user.userId) {
    alert("You must be logged in to submit this form.");
    return;
  }

  const yearsValue = document.getElementById("yearsOfStay").value;

  const payload = {

    lname: document.getElementById("lname").value,
    fname: document.getElementById("fname").value,
    mname: document.getElementById("mname").value,
    address: document.getElementById("address").value,
    contact: document.getElementById("contact").value,

    sex: document.querySelector('input[name="sex"]:checked')?.value || "",
    civilStatus: document.querySelector('input[name="civil"]:checked')?.value || "",
    residency: document.querySelector('input[name="res"]:checked')?.value || "",

    yearsOfStay: yearsValue ? parseInt(yearsValue) : null,

    emergencyName: document.getElementById("emergencyName").value,
    emergencyContact: document.getElementById("emergencyContact").value,
    emergencyRelationship: document.getElementById("emergencyRelationship").value,
    emergencyAddress: document.getElementById("emergencyAddress").value,

    idNumber: document.getElementById("idNumber").value,
    precinctNumber: document.getElementById("precinctNumber").value,
    orNumber: document.getElementById("orNumber").value,

    remarks: document.getElementById("remarks").value,

    userId: user?.userId || null,
    documentType: "BARANGAY_ID"
  };

  fetch("http://localhost:8080/api/barangay-id", {
  method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
  .then(async res => {
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText);
    }
    return res.json();
  })
  .then(data => {
    console.log("SUCCESS:", data);
    alert("Barangay ID submitted successfully!");
  })
  .catch(err => {
    console.error("ERROR:", err);
    alert("Request failed. Check console for details.");
  });
}
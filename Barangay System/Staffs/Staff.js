document.addEventListener("DOMContentLoaded", () => {
  setupSidebar();
  loadBarangay();
});

// ==========================
// TRACK CURRENT STATE
// ==========================
let currentType = null;

// ==========================
// SIDEBAR
// ==========================
function setupSidebar() {
  const menus = document.querySelectorAll(".menu");

  menus.forEach(menu => {
    menu.addEventListener("click", () => {
      menus.forEach(m => m.classList.remove("active"));
      menu.classList.add("active");

      const page = menu.dataset.page;

      if (page === "id") loadBarangay();
      if (page === "cedula") loadCedula();
      if (page === "complaints") loadComplaints();
      if (page === "business") loadBusiness();
    });
  });
}

// ==========================
// LOAD FUNCTIONS
// ==========================
async function loadBarangay() {
  try {
    const res = await fetch("http://localhost:8080/api/barangay-id")

    if (!res.ok) {
      throw new Error("HTTP error " + res.status);
    }

    const data = await res.json();

    console.log("Barangay data:", data);

    renderBarangay(data);

  } catch (err) {
    console.error(err);
    showError("Failed to load Barangay ID requests.");
  }
}

async function loadCedula() {
  try {
    const res = await fetch("http://localhost:8080/api/cedulas");
    const data = await res.json();
    renderCedula(data);
  } catch (err) {
    showError("Failed to load Cedula requests.");
  }
}

async function loadBusiness() {
  try {
    const res = await fetch("http://localhost:8080/api/business-permits");
    const data = await res.json();
    renderBusiness(data);
  } catch (err) {
    showError("Failed to load Business Permit requests.");
  }
}

async function loadComplaints() {
  try {
    const res = await fetch("http://localhost:8080/api/complaints");
    const data = await res.json();
    renderComplaints(data.filter(r => r.type === "COMPLAINT"));
  } catch (err) {
    showError("Failed to load Complaints.");
  }
}

// ==========================
// RENDERS
// ==========================
function renderBarangay(data) {
  const list = document.getElementById("requestList");

  if (!data.length) {
    list.innerHTML = `<h2>No Barangay ID Requests</h2>`;
    return;
  }

  list.innerHTML = `
    <h2>Barangay ID Requests</h2>
    ${data.map(req => `
      <div class="card" onclick="openModal('BARANGAY_ID', ${req.id})">
        <h3>${req.fname || ""} ${req.mname || ""} ${req.lname || ""}</h3>
        <p><b>Address:</b> ${req.address || "N/A"}</p>
        <p><b>Contact:</b> ${req.contact || "N/A"}</p>
        <p><b>Sex:</b> ${req.sex || "N/A"}</p>
        <p><b>Civil Status:</b> ${req.civilStatus || "N/A"}</p>
        <p><b>Residency:</b> ${req.residency || "N/A"}</p>
        <p><b>Years:</b> ${req.yearsOfStay ?? "N/A"}</p>
        <p><b>Status:</b> ${req.status || "PENDING"}</p>
      </div>
    `).join("")}
  `;
}

function renderCedula(data) {
  const list = document.getElementById("requestList");

  if (!data.length) {
    list.innerHTML = `<h2>No Cedula Requests</h2>`;
    return;
  }

  list.innerHTML = `
    <h2>Cedula Requests</h2>
    ${data.map(req => `
      <div class="card" onclick="openModal('CEDULA', ${req.id})">
        <h3>${req.fname} ${req.lname}</h3>
        <p><b>Status:</b> ${req.status || "PENDING"}</p>
        <p><small>${formatDate(req.createdAt)}</small></p>
      </div>
    `).join("")}
  `;
}

function renderBusiness(data) {
  const list = document.getElementById("requestList");

  if (!data.length) {
    list.innerHTML = `<h2>No Business Permit Requests</h2>`;
    return;
  }

  list.innerHTML = `
    <h2>Business Permit Requests</h2>
    ${data.map(req => `
      <div class="card" onclick="openModal('BUSINESS', ${req.id})">
        <h3>${req.businessName}</h3>
        <p><b>Owner:</b> ${req.firstName} ${req.lastName}</p>
        <p><b>Status:</b> ${req.status || "PENDING"}</p>
      </div>
    `).join("")}
  `;
}

function renderComplaints(data) {
  const list = document.getElementById("requestList");

  if (!data.length) {
    list.innerHTML = `<h2>No Complaints</h2>`;
    return;
  }

  list.innerHTML = `
    <h2>Complaints</h2>
    ${data.map(req => `
      <div class="card" onclick="openModal('COMPLAINT', ${req.id})">
        <p><b>${req.incidentType}</b></p>
        <p>${req.location}</p>
      </div>
    `).join("")}
  `;
}

// ==========================
// OPEN MODAL
// ==========================
async function openModal(type, id) {
  currentType = type;

  let req;

  try {
    if (type === "BARANGAY_ID") {
      const res = await fetch(`http://localhost:8080/api/barangay-id/${id}`)
      req = await res.json();
    } else if (type === "CEDULA") {
      const res = await fetch(`http://localhost:8080/api/cedulas/${id}`);
      req = await res.json();
    } else if (type === "BUSINESS") {
      const res = await fetch(`http://localhost:8080/api/business-permits/${id}`);
      req = await res.json();
    } else if (type === "COMPLAINT") {
      const res = await fetch("http://localhost:8080/api/staff/all-requests");
      const all = await res.json();
      req = all.find(r => r.type === "COMPLAINT" && r.id === id);
    }
  } catch (err) {
    console.error("Failed to fetch request details:", err);
    return;
  }

  if (!req) {
    console.warn("Request not found:", type, id);
    return;
  }

  const modal = document.getElementById("modal");
  const content = document.getElementById("modalContent");
  let html = "";

  // ==========================
  // BARANGAY ID MODAL
  // ==========================
  if (type === "BARANGAY_ID") {
    html = `
      <h2>Barangay ID Details</h2>
      <p><b>Name:</b> ${req.fname || ""} ${req.mname || ""} ${req.lname || ""}</p>
      <p><b>Address:</b> ${req.address || "N/A"}</p>
      <p><b>Contact:</b> ${req.contact || "N/A"}</p>
      <hr>
      <p><b>Sex:</b> ${req.sex || "N/A"}</p>
      <p><b>Civil Status:</b> ${req.civilStatus || "N/A"}</p>
      <p><b>Residency:</b> ${req.residency || "N/A"}</p>
      <p><b>Years of Stay:</b> ${req.yearsOfStay ?? "N/A"}</p>
      <hr>
      <p><b>Emergency Name:</b> ${req.emergencyName || "N/A"}</p>
      <p><b>Emergency Contact:</b> ${req.emergencyContact || "N/A"}</p>
      <p><b>Relationship:</b> ${req.emergencyRelationship || "N/A"}</p>
      <p><b>Emergency Address:</b> ${req.emergencyAddress || "N/A"}</p>
      <hr>
      <p><b>ID Number:</b> ${req.idNumber || "N/A"}</p>
      <p><b>Precinct:</b> ${req.precinctNumber || "N/A"}</p>
      <p><b>OR Number:</b> ${req.orNumber || "N/A"}</p>
      <p><b>Status:</b> ${req.status || "PENDING"}</p>
      <p><b>Submitted:</b> ${formatDate(req.submittedAt)}</p>
    `;
  }

  // ==========================
  // CEDULA MODAL
  // ==========================
  else if (type === "CEDULA") {
    html = `
      <h2>Cedula Details</h2>
      <p><b>Name:</b> ${req.fname} ${req.mname || ""} ${req.lname}</p>
      <p><b>Address:</b> ${req.address}</p>
      <p><b>Birthplace:</b> ${req.birthplace}</p>
      <p><b>Birthday:</b> ${formatDate(req.bday)}</p>
      <p><b>Occupation:</b> ${req.occupation}</p>
      <p><b>Annual Income:</b> ${req.annualIncome}</p>
      <p><b>Status:</b> ${req.status || "PENDING"}</p>
    `;
  }

  // ==========================
  // BUSINESS MODAL
  // ==========================
  else if (type === "BUSINESS") {
    html = `
      <h2>Business Permit Details</h2>
      <p><b>Business Name:</b> ${req.businessName}</p>
      <p><b>Owner:</b> ${req.firstName} ${req.lastName}</p>
      <p><b>Trade Name:</b> ${req.tradeName}</p>
      <p><b>TIN:</b> ${req.tin}</p>
      <hr>
      <p><b>Ownership:</b> ${req.ownershipType}</p>
      <p><b>Office Type:</b> ${req.officeType}</p>
      <p><b>Address:</b> ${req.buildingNo}, ${req.street}, ${req.barangay}, ${req.city}</p>
      <p><b>Email:</b> ${req.email}</p>
      <p><b>Contact:</b> ${req.contactNumber}</p>
      <hr>
      <p><b>Capital:</b> ${req.capitalBreakdown}</p>
      <p><b>Status:</b> ${req.status || "PENDING"}</p>
    `;
  }

  // ==========================
  // COMPLAINT MODAL
  // ==========================
  else if (type === "COMPLAINT") {
    html = `
      <h2>Complaint Details</h2>
      <p><b>Type:</b> ${req.incidentType}</p>
      <p><b>Location:</b> ${req.location}</p>
      <p><b>Start:</b> ${formatDate(req.incidentStart)}</p>
      <p><b>End:</b> ${formatDate(req.incidentEnd)}</p>
      <p><b>Details:</b> ${req.narrative}</p>
    `;
  }

  // Approve / Reject buttons
  html += `
    <div style="margin-top: 15px;">
      <button onclick="approve(${req.id})">Approve</button>
      <button onclick="reject(${req.id})">Reject</button>
    </div>
  `;

  content.innerHTML = html;
  modal.style.display = "block";
}

// ==========================
// CLOSE MODAL
// ==========================
function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// ==========================
// APPROVE / REJECT
// ==========================
async function approve(id) {
  try {
    const url = getApproveUrl(id, "approve");
    if (!url) return;
    const res = await fetch(url, { method: "PUT" });
    if (!res.ok) throw new Error("Approve failed");
    alert("Request approved!");
    closeModal();
    reloadCurrentTab();
  } catch (err) {
    console.error("Approve failed:", err);
    alert("Failed to approve request.");
  }
}

async function reject(id) {
  try {
    const url = getApproveUrl(id, "reject");
    if (!url) return;
    const res = await fetch(url, { method: "PUT" });
    if (!res.ok) throw new Error("Reject failed");
    alert("Request rejected!");
    closeModal();
    reloadCurrentTab();
  } catch (err) {
    console.error("Reject failed:", err);
    alert("Failed to reject request.");
  }
}

function getApproveUrl(id, action) {
  if (currentType === "BARANGAY_ID")  return `http://localhost:8080/api/barangay-id/${action}/${id}`;
  if (currentType === "CEDULA")       return `http://localhost:8080/api/cedulas/${action}/${id}`;
  if (currentType === "BUSINESS")     return `http://localhost:8080/api/business-permits/${action}/${id}`;
  if (currentType === "COMPLAINT")    return `http://localhost:8080/api/complaints/${action}/${id}`;
  console.error("Unknown currentType:", currentType);
  return null;
}

// ==========================
// RELOAD CORRECT TAB
// ==========================
function reloadCurrentTab() {
  if (currentType === "BARANGAY_ID") loadBarangay();
  else if (currentType === "CEDULA") loadCedula();
  else if (currentType === "BUSINESS") loadBusiness();
  else if (currentType === "COMPLAINT") loadComplaints();
}

// ==========================
// HELPERS
// ==========================
function formatDate(date) {
  if (!date) return "N/A";
  return new Date(date).toLocaleString();
}

function showError(msg) {
  const list = document.getElementById("requestList");
  list.innerHTML = `<p style="color: red;">${msg}</p>`;
}
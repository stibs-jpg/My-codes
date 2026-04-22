let allRequests = [];

document.addEventListener("DOMContentLoaded", () => {
  loadMyRequests();
  setupSidebarNav();
});

async function loadMyRequests() {
  const user = JSON.parse(localStorage.getItem("user"));

  console.log("FULL USER OBJECT:", user);

  if (!user || !user.userId) {
    document.getElementById("requestTable").innerHTML =
      "<p>Please log in to view your requests.</p>";
    return;
  }

  const userId = user.userId;

  try {
    const [barangayRes, cedulaRes, complaintsRes, businessRes] = await Promise.allSettled([
  fetch(`http://localhost:8080/api/barangay-id/user/${userId}`).then(r => r.json()),
  fetch(`http://localhost:8080/api/cedulas/user/${userId}`).then(r => r.json()),    
  fetch(`http://localhost:8080/api/complaints/user/${userId}`).then(r => r.json()),      
  fetch(`http://localhost:8080/api/business-permits/user/${userId}`).then(r => r.json()) 
]);

allRequests = [
  ...formatRequests(barangayRes.value,   "BARANGAY_ID"),
  ...formatRequests(cedulaRes.value,     "CEDULA"),
  ...formatRequests(complaintsRes.value, "COMPLAINT"),
  ...formatRequests(businessRes.value,   "BUSINESS_PERMIT"),
];

    console.log("ALL MERGED REQUESTS:", allRequests);

    renderRequests(allRequests);
    updateStats(allRequests);
    updateSidebarBadges(allRequests);

  } catch (error) {
    console.error("ERROR:", error);
    document.getElementById("requestTable").innerHTML =
      "<p>Error loading requests. Please try again.</p>";
  }
}

// Normalize each type into a common shape matching your entity field names
function formatRequests(data, type) {
  if (!data || !Array.isArray(data)) return [];
  return data.map(req => ({
    fname: req.fname,
    lname: req.lname,
    status: req.status,
    submittedAt: req.submittedAt,
    documentType: type,
  }));
}

function setupSidebarNav() {
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach(item => {
    item.addEventListener("click", () => {
      navItems.forEach(n => n.classList.remove("active"));
      item.classList.add("active");

      const type = item.getAttribute("data-type");
      const filtered = type === "ALL"
        ? allRequests
        : allRequests.filter(req => req.documentType === type);

      renderRequests(filtered);
    });
  });
}

function renderRequests(requests) {
  const container = document.getElementById("requestTable");

  if (!requests || requests.length === 0) {
    container.innerHTML = "<p>No requests found.</p>";
    return;
  }

  container.innerHTML = `
    <div class="table-header">
      <div>Name</div>
      <div>Document Type</div>
      <div>Date Submitted</div>
      <div>Status</div>
    </div>
  ` + requests.map(req => `
    <div class="table-row">
      <div>${req.fname || ""} ${req.lname || ""}</div>
      <div>${formatDocType(req.documentType)}</div>
      <div>${formatDate(req.submittedAt)}</div>
      <div><span class="tag ${getTagClass(req.status)}">${req.status || "PENDING"}</span></div>
    </div>
  `).join("");
}

function updateStats(requests) {
  let pending = 0, approved = 0, rejected = 0;
  requests.forEach(req => {
    const s = (req.status || "").toUpperCase();
    if (s === "APPROVED") approved++;
    else if (s === "REJECTED") rejected++;
    else pending++;
  });
  document.getElementById("stat-pending").textContent = pending;
  document.getElementById("stat-approved").textContent = approved;
  document.getElementById("stat-rejected").textContent = rejected;
}

function updateSidebarBadges(requests) {
  const counts = { ALL: requests.length, BARANGAY_ID: 0, CEDULA: 0, COMPLAINT: 0, BUSINESS_PERMIT: 0 };
  requests.forEach(req => {
    if (counts[req.documentType] !== undefined) counts[req.documentType]++;
  });
  Object.keys(counts).forEach(type => {
    const badge = document.getElementById(`badge-${type}`);
    if (badge) badge.textContent = counts[type];
  });
}

function getTagClass(status) {
  if ((status || "").toUpperCase() === "APPROVED") return "tag-approved";
  if ((status || "").toUpperCase() === "REJECTED") return "tag-reject";
  return "tag-pending";
}

function formatDate(date) {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-PH", { year: "numeric", month: "short", day: "numeric" });
}

function formatDocType(type) {
  const map = { BARANGAY_ID: "Barangay ID", CEDULA: "Cedula", COMPLAINT: "Complaint", BUSINESS_PERMIT: "Business Permit" };
  return map[type] || type || "Unknown";
}
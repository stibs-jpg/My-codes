document.addEventListener("DOMContentLoaded", () => {
  loadMyRequests();
});

// ==========================
// LOAD USER REQUESTS ONLY
// ==========================
async function loadMyRequests() {
  const user = JSON.parse(localStorage.getItem("user"));

  console.log("LOGGED USER:", user);

  if (!user || !user.userId) {
    console.error("No user logged in or missing userId");
    document.querySelector(".request-table").innerHTML =
      "<p>Please log in to view your requests.</p>";
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:8080/api/documents/user/${user.userId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch requests");
    }

    const data = await response.json();
    console.log("REQUEST DATA:", data);

    renderRequests(data);
    updateStats(data);

  } catch (error) {
    console.error("ERROR:", error);
    document.querySelector(".request-table").innerHTML =
      "<p>Error loading your requests.</p>";
  }
}

// ==========================
// RENDER REQUEST TABLE
// ==========================
function renderRequests(requests) {
  const container = document.querySelector(".request-table");

  if (!requests || requests.length === 0) {
    container.innerHTML = "<p>No requests found.</p>";
    return;
  }

  container.innerHTML = `
    <div class="table-header">
      <div>Name / Request</div>
      <div>Date Submitted</div>
      <div>Status</div>
    </div>
  ` + requests.map(req => `
    <div class="table-row">
      <div>${req.fname} ${req.lname} - Barangay ID</div>
      <div>${formatDate(req.submittedAt)}</div>
      <div>
        <span class="tag ${getTagClass(req.status)}">
          ${req.status || "PENDING"}
        </span>
      </div>
    </div>
  `).join("");
}

// ==========================
// UPDATE STATS (optional but useful)
// ==========================
function updateStats(requests) {
  let pending = 0;
  let approved = 0;
  let rejected = 0;

  requests.forEach(req => {
    if (req.status === "APPROVED") approved++;
    else if (req.status === "REJECTED") rejected++;
    else pending++;
  });

  document.querySelector(".stats-container").innerHTML = `
    <div class="stat-card">
      <p>Pending Requests</p>
      <div class="stat-value text-pending">${pending}</div>
    </div>

    <div class="stat-card">
      <p>Approved Requests</p>
      <div class="stat-value text-approved">${approved}</div>
    </div>

    <div class="stat-card">
      <p>Rejected Requests</p>
      <div class="stat-value text-reject">${rejected}</div>
    </div>
  `;
}

// ==========================
// STATUS STYLING
// ==========================
function getTagClass(status) {
  if (status === "APPROVED") return "tag-approved";
  if (status === "REJECTED") return "tag-reject";
  return "tag-pending";
}

// ==========================
// DATE FORMAT
// ==========================
function formatDate(date) {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
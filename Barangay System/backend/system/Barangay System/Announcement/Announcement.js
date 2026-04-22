// Load announcements when page is ready
document.addEventListener("DOMContentLoaded", loadAnnouncements);

function loadAnnouncements() {
  fetch('http://localhost:8080/api/announcements')
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch announcements");
      }
      return response.json();
    })
    .then(data => {
      const container = document.getElementById("announcementList");
      container.innerHTML = "";

      // If no announcements
      if (data.length === 0) {
        container.innerHTML = "<p>No announcements available.</p>";
        return;
      }

      data.forEach(a => {
        const box = document.createElement("section");
        box.classList.add("announcement-box");

        box.innerHTML = `
          <h2 class="announcement-header">${escapeHtml(a.title)}</h2>
          <p class="announcement-body">${escapeHtml(a.content)}</p>
          <small>${formatDate(a.createdAt)}</small>
        `;

        container.appendChild(box);
      });
    })
    .catch(error => {
      console.error("Error:", error);
      document.getElementById("announcementList").innerHTML =
        "<p style='color:red;'>Failed to load announcements.</p>";
    });
}

// Format date nicely
function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleString();
}

// Prevent XSS (basic protection)
function escapeHtml(text) {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// OPTIONAL: Auto-refresh every 15 seconds
setInterval(loadAnnouncements, 15000);
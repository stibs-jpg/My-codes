document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("announcementForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // prevent page reload
    postAnnouncement("PUBLISHED");
  });
});

function postAnnouncement(statusType) {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const status = document.getElementById("statusMessage");

  if (!title || !content) {
    status.innerText = "Please fill in all fields.";
    return;
  }

  fetch('http://localhost:8080/api/announcements', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title,
      content: content,
      active: statusType === "PUBLISHED"
    })
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to save");
      return res.json();
    })
    .then(data => {
      status.innerText = "✅ Announcement saved!";

      // clear form
      document.getElementById("title").value = "";
      document.getElementById("content").value = "";

      console.log("Saved:", data);
    })
    .catch(err => {
      console.error(err);
      status.innerText = "❌ Error saving announcement.";
    });
}

// Save as draft
function saveDraft() {
  postAnnouncement("DRAFT");
}
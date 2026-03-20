// SAMPLE ANNOUNCEMENTS DATA
announcements = [
    "MAGNAYES RESEARCH WAS PROVEN TO BE PUBLISHED IN 2024"
];

// DISPLAY ANNOUNCEMENTS
const announcementContainer = document.getElementById("announcements");

announcements.forEach(item => {
    const p = document.createElement("p");
    p.textContent = "• " + item;
    announcementContainer.appendChild(p);
});

// LOGIN BUTTON
document.getElementById("loginBtn").addEventListener("click", () => {
    alert("Login feature coming soon!");
});
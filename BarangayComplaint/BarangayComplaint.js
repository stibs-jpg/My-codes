document.getElementById("reportForm").addEventListener("submit", function(e) {
    e.preventDefault();

    alert("Report submitted successfully!");

    this.reset();
});
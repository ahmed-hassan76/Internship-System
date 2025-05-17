document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const student = params.get("student");
    const title = params.get("title");
    const user = JSON.parse(localStorage.getItem("activeUser"));
  
    if (!user || user.role !== "company") {
      alert("Unauthorized access.");
      window.location.href = "index.html";
      return;
    }
  
    const key = `evaluation-${user.email}-${student}-${title}`;
    const existing = JSON.parse(localStorage.getItem(key)) || {};
  
    document.getElementById("feedback").value = existing.feedback || "";
    document.getElementById("rating").value = existing.rating || "";
  
    document.getElementById("evaluation-form").addEventListener("submit", e => {
      e.preventDefault();
      const feedback = document.getElementById("feedback").value;
      const rating = document.getElementById("rating").value;
  
      localStorage.setItem(key, JSON.stringify({ feedback, rating }));
      alert("Evaluation saved!");
      location.href = "employer-dashboard.html";
    });
  
    document.getElementById("delete-btn").addEventListener("click", () => {
      localStorage.removeItem(key);
      alert("Evaluation deleted.");
      location.href = "employer-dashboard.html";
    });
  });
  
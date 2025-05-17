document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(location.search);
    const internshipId = params.get("id");
    const user = JSON.parse(localStorage.getItem("activeUser"));
    const key = `company-eval-${user.email}-${internshipId}`;
  
    const saved = JSON.parse(localStorage.getItem(key)) || {};
    document.getElementById("feedback").value = saved.feedback || "";
    document.getElementById("recommend").checked = saved.recommend || false;
  
    document.getElementById("evaluation-form").addEventListener("submit", e => {
      e.preventDefault();
      const feedback = document.getElementById("feedback").value;
      const recommend = document.getElementById("recommend").checked;
  
      localStorage.setItem(key, JSON.stringify({ feedback, recommend }));
      alert("Evaluation saved!");
      location.href = "student-dashboard.html";
    });
  
    document.getElementById("delete-btn").addEventListener("click", () => {
      localStorage.removeItem(key);
      alert("Evaluation deleted.");
      location.href = "student-dashboard.html";
    });
  });
  
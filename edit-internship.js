document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const internshipId = urlParams.get("id");

  
    const form = document.getElementById("internship-form");
    const internships = JSON.parse(localStorage.getItem("internships")) || [];
    const index = internships.findIndex(i => String(i.id) === internshipId);
  
    if (index === -1) {
      alert("Internship not found.");
      window.location.href = "employer-dashboard.html";
      return;
    }
  
    const data = internships[index];
  
    // Pre-fill form
    document.getElementById("title").value = data.title;
    document.getElementById("location").value = data.location;
    document.getElementById("duration").value = data.duration;
    document.getElementById("salary").value = data.salary || "";
    document.getElementById("skills").value = data.skills?.join(", ") || "";
    document.getElementById("category").value = data.category;
    document.getElementById("description").value = data.description;
    document.querySelector(`input[name="paid"][value="${data.paid}"]`).checked = true;
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      // Update values
      data.title = document.getElementById("title").value;
      data.location = document.getElementById("location").value;
      data.duration = document.getElementById("duration").value;
      data.paid = document.querySelector('input[name="paid"]:checked')?.value || "no";
      data.salary = document.getElementById("salary").value || "N/A";
      data.skills = document.getElementById("skills").value.split(",").map(s => s.trim());
      data.category = document.getElementById("category").value;
      data.description = document.getElementById("description").value;
  
      internships[index] = data;
      localStorage.setItem("internships", JSON.stringify(internships));
  
      alert("Internship updated successfully.");
      window.location.href = "employer-dashboard.html";
    });
  });
  
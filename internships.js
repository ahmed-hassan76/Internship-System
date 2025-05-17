document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("internship-form");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const user = JSON.parse(localStorage.getItem("activeUser"));
      if (!user || user.role !== "company") {
        alert("You must be logged in as a company to post an internship.");
        return;
      }
  
      const paid = document.querySelector('input[name="paid"]:checked')?.value || "no";
  
      const internship = {
        id: Date.now(),
        title: document.getElementById("title").value,
        location: document.getElementById("location").value,
        duration: document.getElementById("duration").value,
        paid,
        salary: document.getElementById("salary").value || "N/A",
        skills: document.getElementById("skills").value.split(",").map(s => s.trim()),
        description: document.getElementById("description").value,
        category: document.getElementById("category").value,
        companyEmail: user.email,
        applicants: []
      };
  
      const allInternships = JSON.parse(localStorage.getItem("internships")) || [];
      allInternships.push(internship);
      localStorage.setItem("internships", JSON.stringify(allInternships));
  
      alert("Internship Posted Successfully!");
      form.reset();
      window.location.href = "employer-dashboard.html";
    });
  });
  
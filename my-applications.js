document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("application-list");
    const user = JSON.parse(localStorage.getItem("activeUser"));
  
    if (!user || user.role !== "student") {
      alert("Unauthorized access.");
      location.href = "index.html";
      return;
    }
  
    const internships = JSON.parse(localStorage.getItem("internships")) || [];
    const users = JSON.parse(localStorage.getItem("users")) || [];
  
    const myApplications = [];
  
    internships.forEach(internship => {
      (internship.applicants || []).forEach(app => {
        if (app.email === user.email) {
          const company = users.find(u => u.email === internship.companyEmail);
          const companyName = company?.name || "Unknown Company";
  
          myApplications.push({
            title: internship.title,
            company: companyName,
            status: app.status || "Pending",
            duration: internship.duration
          });
        }
      });
    });
  
    if (myApplications.length === 0) {
      container.innerHTML = "<p>You have not applied to any internships yet.</p>";
      return;
    }
  
    myApplications.forEach(app => {
      const div = document.createElement("div");
      div.className = "application-card";
      div.innerHTML = `
        <h4>${app.title}</h4>
        <p><strong>Company:</strong> ${app.company}</p>
        <p><strong>Duration:</strong> ${app.duration}</p>
        <p><strong>Status:</strong> ${app.status}</p>
      `;
      container.appendChild(div);
    });
  });
  
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const internshipId = urlParams.get("id");
    const isApplyMode = urlParams.get("apply") === "true";
  
    const internships = JSON.parse(localStorage.getItem("internships")) || [];
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const student = JSON.parse(localStorage.getItem("activeUser"));
  
    const internship = internships.find(i => String(i.id) === internshipId);
    const container = document.getElementById("details-card");
  
    if (!internship || !container) {
      container.innerHTML = "<p>Internship not found.</p>";
      return;
    }
  
    const company = users.find(u => u.email === internship.companyEmail);
    const companyName = company?.name || "Unknown Company";
  
    container.innerHTML = `
      <h3>${internship.title}</h3>
      <p><strong>Company:</strong> ${companyName}</p>
      <p><strong>Duration:</strong> ${internship.duration}</p>
      <p><strong>Paid:</strong> ${internship.paid}</p>
      <p><strong>Expected Salary:</strong> ${internship.salary}</p>
      <p><strong>Required Skills:</strong> ${internship.skills?.join(", ")}</p>
      <p><strong>Description:</strong></p>
      <p>${internship.description}</p>
    `;
  
    if (isApplyMode && student?.role === "student") {
      document.getElementById("apply-section").style.display = "block";
  
      document.getElementById("apply-form").addEventListener("submit", e => {
        e.preventDefault();
  
        const message = document.getElementById("message").value;
        const files = [...document.getElementById("fileUpload").files].map(f => f.name);
  
        const applicantData = {
          name: student.name,
          email: student.email,
          message,
          resume: files.join(", "),
          status: "Pending"
        };
  
        internship.applicants = internship.applicants || [];
        internship.applicants.push(applicantData);
  
        const updated = internships.map(i => i.id === internship.id ? internship : i);
        localStorage.setItem("internships", JSON.stringify(updated));
  
        alert("Application submitted!");
        location.href = "student-dashboard.html";
      });
    }
  });
  
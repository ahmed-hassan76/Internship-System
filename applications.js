function renderApplications() {
    const container = document.getElementById("application-list");
    const user = JSON.parse(localStorage.getItem("activeUser"));
  
    if (!user || user.role !== "company") {
      alert("Access denied.");
      window.location.href = "index.html";
      return;
    }
  
    const internships = JSON.parse(localStorage.getItem("internships")) || [];
    const myInternships = internships.filter(i => i.companyEmail === user.email);
  
    const selectedTitle = document.getElementById("internship-filter")?.value || "";
  
    container.innerHTML = "";
  
    if (myInternships.length === 0) {
      container.innerHTML = "<p>You haven't posted any internships yet.</p>";
      return;
    }
  
    let hasApplicants = false;
  
    const filterDropdown = document.getElementById("internship-filter");
    if (filterDropdown && filterDropdown.options.length <= 1) {
      myInternships.forEach(i => {
        const option = document.createElement("option");
        option.value = i.title;
        option.textContent = i.title;
        filterDropdown.appendChild(option);
      });
    }
  
    myInternships.forEach(internship => {
      if (selectedTitle && internship.title !== selectedTitle) return;
  
      const applicants = internship.applicants || [];
  
      applicants.forEach(app => {
        hasApplicants = true;
  
        const div = document.createElement("div");
        div.classList.add("application-card");
  
        div.innerHTML = `
          <h4>${app.name} applied for <em>${internship.title}</em></h4>
          <p><strong>Email:</strong> ${app.email}</p>
          <p><strong>Message:</strong> ${app.message || "No message provided."}</p>
          <p><a href="${app.resume}" target="_blank">View Resume</a></p>
          <label for="status">Application Status:</label>
          <select onchange="updateApplicationStatus(${internship.id}, '${app.email}', this.value)">
            <option value="">-- Select Status --</option>
            <option value="Finalized" ${app.status === "Finalized" ? "selected" : ""}>Finalized</option>
            <option value="Accepted" ${app.status === "Accepted" ? "selected" : ""}>Accepted</option>
            <option value="Rejected" ${app.status === "Rejected" ? "selected" : ""}>Rejected</option>
            <option value="Current Intern" ${app.status === "Current Intern" ? "selected" : ""}>Current Intern</option>
            <option value="Internship Complete" ${app.status === "Internship Complete" ? "selected" : ""}>Internship Complete</option>
          </select>
        `;
  
        container.appendChild(div);
      });
    });
  
    if (!hasApplicants) {
      container.innerHTML = "<p>No applications match your filter.</p>";
    }
  }
  
  function updateApplicationStatus(internshipId, email, newStatus) {
    const internships = JSON.parse(localStorage.getItem("internships")) || [];
    const internship = internships.find(i => i.id === internshipId);
    if (!internship) return;
  
    const applicant = internship.applicants.find(a => a.email === email);
    if (!applicant) return;
  
    applicant.status = newStatus;
    localStorage.setItem("internships", JSON.stringify(internships));
  
    alert(`Updated status for ${applicant.name} to "${newStatus}"`);
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    renderApplications();
    document.getElementById("internship-filter")?.addEventListener("change", renderApplications);
  });
  
  
  document.addEventListener("DOMContentLoaded", renderApplications);
  
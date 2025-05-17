// Fetch all internships posted by the logged-in company
function getCompanyInternships() {
    const user = JSON.parse(localStorage.getItem("activeUser"));
    if (!user) return [];
  
    const allInternships = JSON.parse(localStorage.getItem("internships")) || [];
    return allInternships.filter(i => i.companyEmail === user.email);
  }
  
  // Render only the current company's internships
  function renderInternships() {
    const container = document.getElementById("internship-list");
    container.innerHTML = "";
  
    const user = JSON.parse(localStorage.getItem("activeUser"));
    if (!user) return;
  
    const search = document.getElementById("my-search")?.value.toLowerCase() || "";
    const filterCategory = document.getElementById("my-category")?.value || "";
    const filterPaid = document.getElementById("my-paid")?.value || "";
    const filterDuration = document.getElementById("my-duration")?.value || "";
  
    const allInternships = JSON.parse(localStorage.getItem("internships")) || [];
  
    const filtered = allInternships.filter(job => {
      const isMine = job.companyEmail === user.email;
      const matchSearch = job.title.toLowerCase().includes(search);
      const matchCategory = !filterCategory || job.category === filterCategory;
      const matchPaid = !filterPaid || job.paid === filterPaid;
      const matchDuration = !filterDuration || job.duration === filterDuration;
  
      return isMine && matchSearch && matchCategory && matchPaid && matchDuration;
    });
  
    if (filtered.length === 0) {
      container.innerHTML = "<p>No internships match your filters.</p>";
      return;
    }
  
    filtered.forEach(job => {
      const applicantCount = job.applicants?.length || 0;
  
      const div = document.createElement("div");
      div.className = "application-card";
      div.innerHTML = `
        <h4>${job.title}</h4>
        <p><strong>Location:</strong> ${job.location}</p>
        <p><strong>Duration:</strong> ${job.duration}</p>
        <p><strong>Paid:</strong> ${job.paid} | <strong>Salary:</strong> ${job.salary}</p>
        <p><strong>Skills:</strong> ${job.skills?.join(", ")}</p>
        <p><strong>Applicants:</strong> ${applicantCount}</p>
        <p><strong>Description:</strong> ${job.description}</p>
        <button onclick="location.href='edit-internship.html?id=${job.id}'">Edit</button>
        <button onclick="deleteInternship(${job.id})">Delete</button>
      `;
      container.appendChild(div);
    });
  }
  
  
  // Delete an internship and re-render
  function deleteInternship(id) {
    const allInternships = JSON.parse(localStorage.getItem("internships")) || [];
    const updated = allInternships.filter(job => job.id !== id);
    localStorage.setItem("internships", JSON.stringify(updated));
    renderInternships();
    renderAllInternships();
  }
  
  // Show all internships in the system (title, company, duration)
  function renderAllInternships() {
    const container = document.getElementById("all-internships-list");
    const search = document.getElementById("search-input")?.value.toLowerCase() || "";
    const filterIndustry = document.getElementById("industry-filter")?.value || "";
    const filterDuration = document.getElementById("duration-filter")?.value || "";
    const filterPaid = document.getElementById("paid-filter")?.value || "";
  
    const internships = JSON.parse(localStorage.getItem("internships")) || [];
    const users = JSON.parse(localStorage.getItem("users")) || [];
  
    const filtered = internships.filter(job => {
      const company = users.find(u => u.email === job.companyEmail);
      const companyName = company?.name?.toLowerCase() || "";
  
      const matchSearch = job.title.toLowerCase().includes(search) || companyName.includes(search);
      const matchIndustry = !filterIndustry || job.category === filterIndustry;
      const matchDuration = !filterDuration || job.duration === filterDuration;
      const matchPaid = !filterPaid || job.paid === filterPaid;
  
      return matchSearch && matchIndustry && matchDuration && matchPaid;
    });
  
    container.innerHTML = "";
  
    if (!filtered.length) {
      container.innerHTML = "<p>No internships match your filters.</p>";
      return;
    }
  
    filtered.forEach(job => {
      const company = users.find(u => u.email === job.companyEmail);
      const companyName = company?.name || "Unknown Company";
  
      const div = document.createElement("div");
      div.className = "application-card";
      div.innerHTML = `
        <strong>${job.title}</strong><br />
        <em>${companyName}</em><br />
        <span>Duration: ${job.duration}</span><br />
        <button onclick="viewInternshipDetails(${job.id})">View Details</button>
      `;
      container.appendChild(div);
    });
  }
  document.getElementById("search-input")?.addEventListener("input", renderAllInternships);
  document.getElementById("industry-filter")?.addEventListener("change", renderAllInternships);
  document.getElementById("duration-filter")?.addEventListener("change", renderAllInternships);
  document.getElementById("paid-filter")?.addEventListener("change", renderAllInternships);
    
  
  // DOM Load
  document.addEventListener("DOMContentLoaded", () => {
    renderInternships();
    renderAllInternships();
  
    const form = document.getElementById("company-form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("company-name").value;
        const email = document.getElementById("company-email").value;
        const desc = document.getElementById("company-description").value;
  
        alert(`Company Info Saved:\n${name}, ${email}\n${desc}`);
        form.reset();
      });
    }
    document.getElementById("my-search")?.addEventListener("input", renderInternships);
document.getElementById("my-category")?.addEventListener("change", renderInternships);
document.getElementById("my-paid")?.addEventListener("change", renderInternships);
document.getElementById("my-duration")?.addEventListener("change", renderInternships);
renderInterns();
document.getElementById("intern-search")?.addEventListener("input", renderInterns);
document.getElementById("intern-status-filter")?.addEventListener("change", renderInterns);
document.getElementById("verification-upload-form")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const fileInput = document.getElementById("verification-doc");
    const status = document.getElementById("verification-status");
    const user = JSON.parse(localStorage.getItem("activeUser"));
    if (!user) return;
  
    const fileName = fileInput.files[0]?.name;
    if (!fileName) {
      status.textContent = "Please select a file.";
      return;
    }
  
    const key = `company-doc-${user.email}`;
    localStorage.setItem(key, fileName);
    status.textContent = `📁 Uploaded: ${fileName}`;
  });
  
  });
  function viewInternshipDetails(id) {
    location.href = `internship-details.html?id=${id}`;
  }
 
  function renderInterns() {
    const container = document.getElementById("intern-list");
    const user = JSON.parse(localStorage.getItem("activeUser"));
    if (!user) return;
  
    const search = document.getElementById("intern-search")?.value.toLowerCase() || "";
    const filterStatus = document.getElementById("intern-status-filter")?.value || "";
  
    const internships = JSON.parse(localStorage.getItem("internships")) || [];
    const myInternships = internships.filter(i => i.companyEmail === user.email);
  
    const interns = [];
  
    myInternships.forEach(internship => {
      const applicants = internship.applicants || [];
      applicants.forEach(app => {
        if (["Current Intern", "Internship Complete"].includes(app.status)) {
          interns.push({
            ...app,
            internshipTitle: internship.title,
            status: app.status
          });
        }
      });
    });
  
    const filtered = interns.filter(intern => {
      const matchSearch =
        intern.name.toLowerCase().includes(search) ||
        intern.internshipTitle.toLowerCase().includes(search);
      const matchStatus = !filterStatus || intern.status === filterStatus;
      return matchSearch && matchStatus;
    });
  
    container.innerHTML = "";
  
    if (!filtered.length) {
      container.innerHTML = "<p>No interns match your filters.</p>";
      return;
    }
  
    filtered.forEach(intern => {
        const div = document.createElement("div");
        div.className = "application-card";
        div.innerHTML = `
          <h4>${intern.name} — <em>${intern.internshipTitle}</em></h4>
          <p><strong>Email:</strong> ${intern.email}</p>
          <p><strong>Status:</strong> ${intern.status}</p>
          ${intern.status === "Internship Complete" ? `
            <button onclick="openEvaluation('${intern.email}', '${intern.internshipTitle}')">Evaluate</button>
          ` : ""}
        `;
        container.appendChild(div);
      });
      
  }
  function openEvaluation(studentEmail, internshipTitle) {
    const encodedEmail = encodeURIComponent(studentEmail);
    const encodedTitle = encodeURIComponent(internshipTitle);
    location.href = `evaluate-student.html?student=${encodedEmail}&title=${encodedTitle}`;
  }
  
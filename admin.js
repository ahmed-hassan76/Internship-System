// Company Approvals
function renderCompanyApprovals() {
    const container = document.getElementById("user-approval-table");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const internships = JSON.parse(localStorage.getItem("internships")) || [];
  
    const search = document.getElementById("company-search")?.value.toLowerCase() || "";
    const filterIndustry = document.getElementById("industry-filter")?.value || "";
  
    const companiesWithPosts = [...new Set(internships.map(i => i.companyEmail))];
  
    const pendingCompanies = users.filter(u =>
      u.role === "company" && companiesWithPosts.includes(u.email) && !u.approved
    );
  
    const filtered = pendingCompanies.filter(c =>
      c.name.toLowerCase().includes(search) &&
      (!filterIndustry || c.industry === filterIndustry)
    );
  
    container.innerHTML = filtered.length
      ? ""
      : "<p>No pending companies found.</p>";
  
    filtered.forEach(company => {
      const div = document.createElement("div");
      div.innerHTML = `<strong>${company.name}</strong> (${company.industry})<br><small>${company.email}</small>`;
  
      const approveBtn = createButton("Approve", "approve", () => {
        company.approved = true;
        const updatedUsers = users.map(u => u.email === company.email ? company : u);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        alert(`Approved ${company.name}`);
        renderCompanyApprovals();
      });
  
      const rejectBtn = createButton("Reject", "reject", () => {
        const updatedUsers = users.filter(u => u.email !== company.email);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        alert(`Rejected ${company.name}`);
        renderCompanyApprovals();
      });
  
      div.appendChild(approveBtn);
      div.appendChild(rejectBtn);
      container.appendChild(div);
    });
  }
  
  // Internship Approvals (mock-based)
  function renderInternshipApprovals() {
    const container = document.getElementById("internship-approval-table");
    container.innerHTML = "";
  
    const internships = JSON.parse(localStorage.getItem("internships")) || [];
  
    const unapproved = internships.filter(job => !job.approved);
  
    if (unapproved.length === 0) {
      container.innerHTML = "<p>No internships pending approval.</p>";
      return;
    }
  
    unapproved.forEach(job => {
      const div = document.createElement("div");
      div.className = "application-card";
      div.innerHTML = `
        <h4>${job.title}</h4>
        <p><strong>Company:</strong> ${job.company}</p>
        <p><strong>Duration:</strong> ${job.duration}</p>
        <p><strong>Paid:</strong> ${job.paid} | <strong>Salary:</strong> ${job.salary}</p>
        <p><strong>Skills:</strong> ${job.skills?.join(", ") || "N/A"}</p>
        <p><strong>Description:</strong> ${job.description}</p>
      `;
  
      const approveBtn = createButton("Approve", "approve", () => {
        job.approved = true;
        const updated = internships.map(i => i.id === job.id ? job : i);
        localStorage.setItem("internships", JSON.stringify(updated));
        alert(`Approved internship: ${job.title}`);
        renderInternshipApprovals();
      });
  
      const rejectBtn = createButton("Reject", "reject", () => {
        const updated = internships.filter(i => i.id !== job.id);
        localStorage.setItem("internships", JSON.stringify(updated));
        alert(`Rejected internship: ${job.title}`);
        renderInternshipApprovals();
      });
  
      div.appendChild(approveBtn);
      div.appendChild(rejectBtn);
      container.appendChild(div);
    });
  }
  
  
    if (container.innerHTML === "") {
      container.innerHTML = "<p>No internships pending approval.</p>";
    }
  
  
  // Internship Cycle
  function renderInternshipCycle() {
    const display = document.getElementById("current-cycle");
    const cycle = JSON.parse(localStorage.getItem("internship-cycle"));
    display.textContent = cycle ? `Current Cycle: ${cycle.start} to ${cycle.end}` : "Current Cycle: Not Set";
  
    document.getElementById("cycle-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const start = document.getElementById("start-date").value;
      const end = document.getElementById("end-date").value;
      if (new Date(end) <= new Date(start)) return alert("End date must be after start date.");
      localStorage.setItem("internship-cycle", JSON.stringify({ start, end }));
      renderInternshipCycle();
      alert("Internship cycle saved.");
    });
  }
  
  // Student List
  function renderStudentManagement() {
    const container = document.getElementById("student-list");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const filter = document.getElementById("internship-status-filter")?.value;
    const students = users.filter(u => u.role === "student");
    const filtered = filter ? students.filter(s => s.internshipStatus === filter) : students;
  
    container.innerHTML = filtered.length ? "" : "<p>No students match the filter.</p>";
  
    filtered.forEach(s => {
      const profile = JSON.parse(localStorage.getItem(`student-profile-${s.email}`)) || {};
      const academic = JSON.parse(localStorage.getItem(`student-academic-${s.email}`)) || {};
      const status = s.internshipStatus || "Not Started";
  
      const div = document.createElement("div");
      div.className = "application-card";
      div.innerHTML = `
        <h4>${s.name}</h4>
        <p><strong>Email:</strong> ${s.email}</p>
        <p><strong>Major:</strong> ${academic.major || "N/A"}</p>
        <p><strong>Semester:</strong> ${academic.semester || "N/A"}</p>
        <p><strong>Status:</strong> ${status}</p>
        <button onclick="viewStudentProfile('${s.email}')">View Profile</button>
      `;
      container.appendChild(div);
    });
  }
  
  function viewStudentProfile(email) {
    const profile = JSON.parse(localStorage.getItem(`student-profile-${email}`)) || {};
    const academic = JSON.parse(localStorage.getItem(`student-academic-${email}`)) || {};
    const user = JSON.parse(localStorage.getItem("users"))?.find(u => u.email === email) || {};
    alert(`Student: ${user.name}\nEmail: ${user.email}\nMajor: ${academic.major || "N/A"}\nSemester: ${academic.semester || "N/A"}\nInterests: ${profile.interests || "N/A"}\nExperience: ${profile.experience || "N/A"}\nActivities: ${profile.activities || "N/A"}`);
  }
  
  // Internship Reports
  function renderInternshipReports() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const majorFilter = document.getElementById("major-filter")?.value;
    const statusFilter = document.getElementById("report-status-filter")?.value;
    const container = document.getElementById("report-list");
    container.innerHTML = "";
  
    let reports = [];
  
    users.filter(u => u.role === "student").forEach(user => {
      const internships = JSON.parse(localStorage.getItem("internships")) || [];
      internships.forEach(intern => {
        intern.applicants?.forEach(app => {
          if (app.email === user.email && app.status === "Internship Complete") {
            const report = JSON.parse(localStorage.getItem(`internship-report-${user.email}-${intern.id}`));
            if (report) reports.push({ ...report, user, internshipId: intern.id });
          }
        });
      });
    });
  
    if (majorFilter) reports = reports.filter(r => {
      const academic = JSON.parse(localStorage.getItem(`student-academic-${r.user.email}`)) || {};
      return academic.major === majorFilter;
    });
  
    if (statusFilter) reports = reports.filter(r => (r.status || "pending") === statusFilter);
  
    if (!reports.length) return container.innerHTML = "<p>No reports found matching the filter.</p>";
  
    reports.forEach(report => {
      const academic = JSON.parse(localStorage.getItem(`student-academic-${report.user.email}`)) || {};
      const div = document.createElement("div");
      div.className = "application-card";
      div.innerHTML = `
        <h4>${report.title} by ${report.user.name}</h4>
        <p><strong>Major:</strong> ${academic.major || "N/A"}</p>
        <p><strong>Status:</strong> ${report.status || "pending"}</p>
        <button onclick="viewFullReport('${report.user.email}', '${report.internshipId}')">View Details</button>
        <button onclick="updateReportStatus('${report.user.email}', '${report.internshipId}', 'accepted')">Accept</button>
        <button onclick="updateReportStatus('${report.user.email}', '${report.internshipId}', 'rejected')">Reject</button>
        <button onclick="updateReportStatus('${report.user.email}', '${report.internshipId}', 'flagged')">Flag</button>
        <button onclick="requestClarification('${report.user.email}', '${report.internshipId}')">Add Clarification</button>
      `;
      container.appendChild(div);
    });
  }
  
  function updateReportStatus(email, internshipId, newStatus) {
    const report = JSON.parse(localStorage.getItem(`internship-report-${email}-${internshipId}`));
    if (!report) return;
    report.status = newStatus;
    localStorage.setItem(`internship-report-${email}-${internshipId}`, JSON.stringify(report));
    alert(`Report status set to: ${newStatus}`);
    renderInternshipReports();
  }
  
  function viewFullReport(email, internshipId) {
    const report = JSON.parse(localStorage.getItem(`internship-report-${email}-${internshipId}`)) || {};
    alert(`Title: ${report.title}\n\nIntro:\n${report.intro}\n\nBody:\n${report.body}\n\nCourses: ${report.courses?.join(", ") || "N/A"}`);
  }
  
  function requestClarification(email, internshipId) {
    const comment = prompt("Enter clarification or reason:");
    if (comment) {
      localStorage.setItem(`report-comment-${email}-${internshipId}`, comment);
      alert("Clarification saved.");
    }
  }
  
  // Evaluation Reports
  function renderEvaluationReports() {
    const container = document.getElementById("evaluation-list");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const internships = JSON.parse(localStorage.getItem("internships")) || [];
    const evaluations = [];
  
    users.filter(u => u.role === "student").forEach(student => {
      internships.forEach(intern => {
        intern.applicants?.forEach(app => {
          if (app.email === student.email && app.status === "Internship Complete") {
            const evalKey = `evaluation-${student.email}-${intern.id}`;
            const evaluation = JSON.parse(localStorage.getItem(evalKey));
            if (evaluation) {
              const company = users.find(u => u.email === intern.companyEmail);
              evaluations.push({
                student,
                internship: intern,
                company: company?.name || "Unknown Company",
                ...evaluation
              });
            }
          }
        });
      });
    });
  
    container.innerHTML = evaluations.length
      ? evaluations.map(ev => `
          <div class="application-card">
            <h4>${ev.student.name} — ${ev.company}</h4>
            <p><strong>Student Email:</strong> ${ev.student.email}</p>
            <p><strong>Supervisor:</strong> ${ev.supervisor}</p>
            <p><strong>Internship Dates:</strong> ${ev.startDate} to ${ev.endDate}</p>
            <p><strong>Evaluation:</strong> ${ev.feedback}</p>
          </div>`).join("")
      : "<p>No evaluation reports available.</p>";
  }
  
  // Init
  document.addEventListener("DOMContentLoaded", () => {
    renderCompanyApprovals();
    renderInternshipApprovals();
    renderInternshipCycle();
    renderStudentManagement();
    renderInternshipReports();
    renderEvaluationReports();
  
    document.getElementById("company-search")?.addEventListener("input", renderCompanyApprovals);
    document.getElementById("industry-filter")?.addEventListener("change", renderCompanyApprovals);
    document.getElementById("internship-status-filter")?.addEventListener("change", renderStudentManagement);
    document.getElementById("major-filter")?.addEventListener("change", renderInternshipReports);
    document.getElementById("report-status-filter")?.addEventListener("change", renderInternshipReports);
    renderWorkshops();
    renderUpcomingWorkshops();
  });
  function renderWorkshops() {
    const list = document.getElementById("workshop-list");
    const workshops = JSON.parse(localStorage.getItem("workshops")) || [];
  
    list.innerHTML = "";
  
    if (workshops.length === 0) {
      list.innerHTML = "<p>No workshops created yet.</p>";
      return;
    }
  
    workshops.forEach(workshop => {
      const div = document.createElement("div");
      div.className = "application-card";
      div.innerHTML = `
        <h4>${workshop.name}</h4>
        <p><strong>Start:</strong> ${new Date(workshop.start).toLocaleString()}</p>
        <p><strong>End:</strong> ${new Date(workshop.end).toLocaleString()}</p>
        <p><strong>Description:</strong> ${workshop.description}</p>
        <p><strong>Speaker:</strong> ${workshop.speaker}</p>
        <p><strong>Agenda:</strong> ${workshop.agenda}</p>
      `;
  
      const editBtn = createButton("Edit", "approve", () => {
        document.getElementById("workshop-id").value = workshop.id;
        document.getElementById("workshop-name").value = workshop.name;
        document.getElementById("workshop-start").value = workshop.start;
        document.getElementById("workshop-end").value = workshop.end;
        document.getElementById("workshop-description").value = workshop.description;
        document.getElementById("workshop-speaker").value = workshop.speaker;
        document.getElementById("workshop-agenda").value = workshop.agenda;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  
      const deleteBtn = createButton("Delete", "reject", () => {
        const updated = workshops.filter(w => w.id !== workshop.id);
        localStorage.setItem("workshops", JSON.stringify(updated));
        renderWorkshops();
      });
  
      div.appendChild(editBtn);
      div.appendChild(deleteBtn);
      list.appendChild(div);
    });
  }
  
  document.getElementById("workshop-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("workshop-id").value || Date.now().toString();
    const workshop = {
      id,
      name: document.getElementById("workshop-name").value,
      start: document.getElementById("workshop-start").value,
      end: document.getElementById("workshop-end").value,
      description: document.getElementById("workshop-description").value,
      speaker: document.getElementById("workshop-speaker").value,
      agenda: document.getElementById("workshop-agenda").value
    };
  
    const workshops = JSON.parse(localStorage.getItem("workshops")) || [];
    const existing = workshops.find(w => w.id === id);
    if (existing) {
      const updated = workshops.map(w => w.id === id ? workshop : w);
      localStorage.setItem("workshops", JSON.stringify(updated));
    } else {
      workshops.push(workshop);
      localStorage.setItem("workshops", JSON.stringify(workshops));
    }
  
    e.target.reset();
    renderWorkshops();
  });
  function renderUpcomingWorkshops() {
    const container = document.getElementById("workshop-view-list");
    const workshops = JSON.parse(localStorage.getItem("workshops")) || [];
    const now = new Date();
  
    const upcoming = workshops
      .filter(w => new Date(w.start) > now)
      .sort((a, b) => new Date(a.start) - new Date(b.start));
  
    container.innerHTML = "";
  
    if (upcoming.length === 0) {
      container.innerHTML = "<p>No upcoming workshops scheduled.</p>";
      return;
    }
  
    upcoming.forEach(w => {
      const div = document.createElement("div");
      div.className = "application-card";
      div.innerHTML = `
        <h4>${w.name}</h4>
        <p><strong>Start:</strong> ${new Date(w.start).toLocaleString()}</p>
        <p><strong>End:</strong> ${new Date(w.end).toLocaleString()}</p>
        <p><strong>Description:</strong> ${w.description}</p>
        <p><strong>Speaker:</strong> ${w.speaker}</p>
        <p><strong>Agenda:</strong> ${w.agenda}</p>
      `;
      container.appendChild(div);
    });
  }
  
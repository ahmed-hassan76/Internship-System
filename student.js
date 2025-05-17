function renderSuggestedInternships() {
    const container = document.getElementById("internship-cards");
    if (!container) return;
  
    container.innerHTML = "";
  
    const user = JSON.parse(localStorage.getItem("activeUser"));
    const allInternships = JSON.parse(localStorage.getItem("internships")) || [];
    const users = JSON.parse(localStorage.getItem("users")) || [];
  
    if (!user || user.role !== "student") {
      container.innerHTML = "<p>Login as a student to view suggestions.</p>";
      return;
    }
  
    const profile = JSON.parse(localStorage.getItem(`student-profile-${user.email}`)) || {};
    const academic = JSON.parse(localStorage.getItem(`student-academic-${user.email}`)) || {};
  
    const interests = profile.interests?.split(",").map(i => i.trim().toLowerCase()) || ["design", "data"];
    const major = academic.major?.toLowerCase() || "";
    const semester = parseInt(academic.semester) || 0;
  
    const preferredIndustry = user.industry || "Development";
  
    const filtered = allInternships.filter(job => {
      const title = job.title.toLowerCase();
      const categoryMatch = job.category === preferredIndustry;
      const interestMatch = interests.some(keyword => title.includes(keyword));
      const majorMatch = title.includes(major); // basic logic
  
      const recommended = job.recommended === true;
  
      return interestMatch || categoryMatch || majorMatch || recommended;
    });
  
    if (filtered.length === 0) {
      container.innerHTML = "<p>No suggested internships match your current profile.</p>";
      return;
    }
  
    filtered.forEach(job => {
      const company = users.find(u => u.email === job.companyEmail);
      const companyName = company?.name || "Unknown Company";
  
      const div = document.createElement("div");
      div.className = "application-card";
      div.innerHTML = `
        <h4>${job.title}</h4>
        <p><strong>Company:</strong> ${companyName}</p>
        <p><strong>Duration:</strong> ${job.duration}</p>
        <p><strong>Industry:</strong> ${job.category}</p>
        <p><strong>Paid:</strong> ${job.paid}</p>
        <a href="internship-details.html?id=${job.id}">View Details</a>
      `;
      container.appendChild(div);
    });
  }
  
  
  document.addEventListener("DOMContentLoaded", () => {
    renderSuggestedInternships();
  
    const form = document.getElementById("resume-form");
    if (form) {
      form.addEventListener("submit", e => {
        e.preventDefault();
        alert("Resume saved!");
      });
    }
    // Academic info logic
const academicForm = document.getElementById("academic-form");
if (academicForm) {
  const majorField = document.getElementById("major");
  const semesterField = document.getElementById("semester");

  const user = JSON.parse(localStorage.getItem("activeUser"));
  const key = `student-academic-${user.email}`;
  const saved = JSON.parse(localStorage.getItem(key)) || {};

  if (saved.major) majorField.value = saved.major;
  if (saved.semester) semesterField.value = saved.semester;

  academicForm.addEventListener("submit", e => {
    e.preventDefault();
    const data = {
      major: majorField.value,
      semester: semesterField.value
    };
    localStorage.setItem(key, JSON.stringify(data));
    alert("Academic info saved!");
  });
}
renderInternshipHistory();
document.getElementById("intern-search")?.addEventListener("input", renderInternshipHistory);
document.getElementById("intern-status")?.addEventListener("change", renderInternshipHistory);
renderUpcomingWorkshops();
document.addEventListener("DOMContentLoaded", () => {
    renderProfileViews();
    renderAssessments();
  });
  
  });
  function renderInternshipHistory() {
    const container = document.getElementById("intern-history-list");
    const user = JSON.parse(localStorage.getItem("activeUser"));
    if (!user) return;
  
    const search = document.getElementById("intern-search")?.value.toLowerCase() || "";
    const filterStatus = document.getElementById("intern-status")?.value;
  
    const internships = JSON.parse(localStorage.getItem("internships")) || [];
    const users = JSON.parse(localStorage.getItem("users")) || [];
  
    const myInternships = [];
  
    internships.forEach(internship => {
      (internship.applicants || []).forEach(app => {
        if (app.email === user.email && ["Current Intern", "Internship Complete"].includes(app.status)) {
          const company = users.find(u => u.email === internship.companyEmail);
          const companyName = company?.name || "Unknown Company";
  
          myInternships.push({
            id: internship.id,
            title: internship.title,
            company: companyName,
            status: app.status,
            date: internship.date || "N/A"
          });
        }
      });
    });
  
    const filtered = myInternships.filter(app => {
      const matchSearch = app.title.toLowerCase().includes(search) || app.company.toLowerCase().includes(search);
      const matchStatus = !filterStatus || app.status === filterStatus;
      return matchSearch && matchStatus;
    });
  
    container.innerHTML = "";
  
    if (!filtered.length) {
      container.innerHTML = "<p>No matching internships found.</p>";
      return;
    }
  
    filtered.forEach(app => {
      const div = document.createElement("div");
      div.className = "application-card";
      div.innerHTML = `
        <h4>${app.title} — ${app.company}</h4>
        <p><strong>Status:</strong> ${app.status}</p>
        <p><strong>Date:</strong> ${app.date}</p>
        ${app.status === "Internship Complete" ? `
          <button onclick="location.href='evaluate-company.html?id=${app.id}'">Company Evaluation</button>
          <button onclick="location.href='internship-report.html?id=${app.id}'">Internship Report</button>
        ` : ""}
      `;
      container.appendChild(div);
    });
  }
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
  function renderProfileViews() {
    const viewed = JSON.parse(localStorage.getItem("profile-views")) || [];
    const user = JSON.parse(localStorage.getItem("activeUser"));
    const list = document.getElementById("company-views");
  
    const mine = viewed.filter(v => v.viewed === user.email);
    list.innerHTML = mine.length ? mine.map(v => `<li>${v.company}</li>`).join("") : "<li>No views yet</li>";
  }
  
  // Dummy Assessments
  const assessments = [
    { id: 1, title: "HTML Basics", questions: [
      { q: "What does HTML stand for?", options: ["Hyper Trainer Marking Language", "HyperText Markup Language", "HighText Machine Language"], answer: 1 },
      { q: "Which tag creates a link?", options: ["<a>", "<link>", "<href>"], answer: 0 }
    ]},
    { id: 2, title: "JavaScript Logic", questions: [
      { q: "What keyword declares a constant?", options: ["var", "let", "const"], answer: 2 },
      { q: "Which symbol means strict equality?", options: ["===", "==", "="], answer: 0 }
    ]}
  ];
  
  function renderAssessments() {
    const list = document.getElementById("assessment-list");
    list.innerHTML = assessments.map(a => `
      <div>
        <strong>${a.title}</strong>
        <button onclick="takeAssessment(${a.id})">Take</button>
      </div>
    `).join("");
  }
  
  function takeAssessment(id) {
    const quizDiv = document.getElementById("assessment-quiz");
    const scoreDisplay = document.getElementById("score-display");
    const assessment = assessments.find(a => a.id === id);
    let score = 0;
  
    quizDiv.innerHTML = assessment.questions.map((q, i) => `
      <p>${q.q}</p>
      ${q.options.map((opt, j) => `
        <label><input type="radio" name="q${i}" value="${j}"> ${opt}</label><br>
      `).join("")}
    `).join("") + `<button onclick="submitAssessment(${id})">Submit</button>`;
  
    scoreDisplay.innerHTML = "";
  }
  
  function submitAssessment(id) {
    const assessment = assessments.find(a => a.id === id);
    let score = 0;
  
    assessment.questions.forEach((q, i) => {
      const answer = document.querySelector(`input[name="q${i}"]:checked`);
      if (answer && parseInt(answer.value) === q.answer) score++;
    });
  
    const percent = Math.round((score / assessment.questions.length) * 100);
    const user = JSON.parse(localStorage.getItem("activeUser"));
    const resultKey = `assessment-score-${user.email}-${id}`;
  
    localStorage.setItem(resultKey, percent);
    document.getElementById("score-display").innerHTML = `
      <p><strong>Your Score:</strong> ${percent}%</p>
      <button onclick="publishScore('${resultKey}', '${assessment.title}')">Post to My Profile</button>
    `;
  }
  
  function publishScore(key, title) {
    const user = JSON.parse(localStorage.getItem("activeUser"));
    const score = localStorage.getItem(key);
    const profileKey = `student-profile-${user.email}`;
    const profile = JSON.parse(localStorage.getItem(profileKey)) || {};
    profile[`assessment-${title}`] = `${score}%`;
    localStorage.setItem(profileKey, JSON.stringify(profile));
    alert("Score posted to profile!");
  }
   
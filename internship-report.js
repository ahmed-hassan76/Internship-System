document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(location.search);
    const internshipId = params.get("id");
    const user = JSON.parse(localStorage.getItem("activeUser"));
    const key = `internship-report-${user.email}-${internshipId}`;
  
    const saved = JSON.parse(localStorage.getItem(key)) || {};
    const academic = JSON.parse(localStorage.getItem(`student-academic-${user.email}`)) || {};
    const major = academic.major || "General";
  
    // Sample course list by major (extendable)
    const coursesByMajor = {
      "Computer Science": ["Data Structures", "Web Development", "Algorithms", "Operating Systems"],
      "Design": ["Typography", "UX/UI", "Color Theory", "3D Design"],
      "Business": ["Accounting", "Management", "Finance", "Marketing"],
      "Marketing": ["Consumer Behavior", "Digital Strategy", "Ad Design"],
      "Engineering": ["Thermodynamics", "Circuits", "Mechanics", "CAD"]
    };
  
    const courseList = coursesByMajor[major] || ["Intro to Internships", "Professional Skills"];
    const courseContainer = document.getElementById("course-list");
  
    courseList.forEach(course => {
      const id = `course-${course.replace(/\s+/g, "-")}`;
      const checked = saved.courses?.includes(course) ? "checked" : "";
      courseContainer.innerHTML += `
        <label><input type="checkbox" id="${id}" value="${course}" ${checked}/> ${course}</label><br/>
      `;
    });
  
    // Load existing values
    document.getElementById("title").value = saved.title || "";
    document.getElementById("intro").value = saved.intro || "";
    document.getElementById("body").value = saved.body || "";
    document.getElementById("finalized").checked = saved.finalized || false;
  
    const disabled = saved.finalized;
    ["title", "intro", "body", "finalized"].forEach(id => {
      document.getElementById(id).disabled = disabled;
    });
    document.querySelectorAll("#course-list input").forEach(input => input.disabled = disabled);
  
    document.getElementById("report-form").addEventListener("submit", e => {
      e.preventDefault();
  
      const selectedCourses = Array.from(document.querySelectorAll("#course-list input:checked")).map(c => c.value);
  
      const report = {
        title: document.getElementById("title").value,
        intro: document.getElementById("intro").value,
        body: document.getElementById("body").value,
        courses: selectedCourses,
        finalized: document.getElementById("finalized").checked
      };
  
      localStorage.setItem(key, JSON.stringify(report));
      alert("Report saved!");
      location.href = "student-dashboard.html";
    });
  
    document.getElementById("delete-report").addEventListener("click", () => {
      localStorage.removeItem(key);
      alert("Report deleted.");
      location.href = "student-dashboard.html";
    });
  });
  
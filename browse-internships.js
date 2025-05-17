document.addEventListener("DOMContentLoaded", () => {
    renderInternshipList();
  
    document.getElementById("search-input").addEventListener("input", renderInternshipList);
    document.getElementById("industry-filter").addEventListener("change", renderInternshipList);
    document.getElementById("duration-filter").addEventListener("change", renderInternshipList);
    document.getElementById("paid-filter").addEventListener("change", renderInternshipList);
  });
  
  function renderInternshipList() {
    const container = document.getElementById("internship-list");
    const search = document.getElementById("search-input").value.toLowerCase();
    const filterIndustry = document.getElementById("industry-filter").value;
    const filterDuration = document.getElementById("duration-filter").value;
    const filterPaid = document.getElementById("paid-filter").value;
  
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
        <h4>${job.title}</h4>
        <p><strong>Company:</strong> ${companyName}</p>
        <p><strong>Duration:</strong> ${job.duration}</p>
        <button onclick="viewInternshipDetails(${job.id})">View Details / Apply</button>
      `;
      container.appendChild(div);
    });
  }
  
  function viewInternshipDetails(id) {
    location.href = `internship-details.html?id=${id}&apply=true`;
  }
  
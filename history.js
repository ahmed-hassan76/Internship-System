const mockHistory = [
    {
      internship: "Frontend Developer Intern",
      company: "TechCorp",
      status: "Pending"
    },
    {
      internship: "Marketing Intern",
      company: "AdGen",
      status: "Accepted"
    }
  ];
  
  document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("history-list");
    container.innerHTML = "";
  
    mockHistory.forEach(app => {
      const div = document.createElement("div");
      div.className = "application-card";
      div.innerHTML = `
        <h4>${app.internship}</h4>
        <p>Company: ${app.company}</p>
        <p>Status: ${app.status}</p>
      `;
      container.appendChild(div);
    });
  });
  
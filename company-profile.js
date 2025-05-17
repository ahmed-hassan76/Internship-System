document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("company-form");
    const user = JSON.parse(localStorage.getItem("activeUser"));
  
    if (!user || user.role !== "company") {
      alert("Access denied.");
      window.location.href = "index.html";
      return;
    }
  
    // Load saved profile
    const profileKey = `company-profile-${user.email}`;
    const data = JSON.parse(localStorage.getItem(profileKey)) || {};
  
    document.getElementById("company-name").value = data.name || user.name || "";
    document.getElementById("company-email").value = data.email || user.email || "";
    document.getElementById("company-description").value = data.description || "";
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const updatedProfile = {
        name: document.getElementById("company-name").value,
        email: document.getElementById("company-email").value,
        description: document.getElementById("company-description").value
      };
  
      localStorage.setItem(profileKey, JSON.stringify(updatedProfile));
      alert("Profile saved successfully!");
      window.location.href = "employer-dashboard.html";
    });
  });
  
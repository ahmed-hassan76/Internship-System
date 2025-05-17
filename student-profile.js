document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("activeUser"));
    if (!user || user.role !== "student") {
      alert("Access denied.");
      window.location.href = "index.html";
      return;
    }
  
    const profileKey = `student-profile-${user.email}`;
    const saved = JSON.parse(localStorage.getItem(profileKey)) || {};
  
    document.getElementById("interests").value = saved.interests || user.interests?.join(", ") || "";
    document.getElementById("experience").value = saved.experience || "";
    document.getElementById("activities").value = saved.activities || "";
  
    // Show saved resume status
    const resumeStatus = document.getElementById("resume-status");
    if (saved.resumeName) {
      resumeStatus.textContent = `Resume uploaded: ${saved.resumeName}`;
    }
  
    document.getElementById("profile-form").addEventListener("submit", e => {
      e.preventDefault();
  
      const fileInput = document.getElementById("resume");
      const file = fileInput.files[0];
  
      const profile = {
        interests: document.getElementById("interests").value,
        experience: document.getElementById("experience").value,
        activities: document.getElementById("activities").value,
        resumeName: file ? file.name : saved.resumeName || ""
      };
  
      localStorage.setItem(profileKey, JSON.stringify(profile));
      alert("Profile saved!");
      window.location.href = "student-dashboard.html";
    });
  });
  
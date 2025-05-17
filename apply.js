document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("apply-form");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const message = form.querySelector("textarea").value;
      const resumeLink = form.querySelector("input[type='url']").value;
  
      console.log("Application Submitted:", { message, resumeLink });
  
      alert("Your application was submitted!");
  
      // Simulated saving
      // Save to localStorage or backend in real implementation
      form.reset();
    });
  
    // Populate dummy job details
    document.getElementById("job-title").textContent = "Frontend Developer Intern";
    document.getElementById("job-company").textContent = "TechCorp";
    document.getElementById("job-description").textContent = "You’ll build web UI using HTML, CSS, JS.";
  });
  
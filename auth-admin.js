// SCAD Admin Registration & Login with Redirect Support
document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");
  
    if (registerForm) {
      registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
  
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const exists = users.find(u => u.email === email);
  
        if (exists) {
          document.getElementById("register-error").textContent = "Admin already registered.";
          return;
        }
  
        users.push({ name, email, password, role: "admin" });
        localStorage.setItem("users", JSON.stringify(users));
  
        alert("Admin registration successful! Please log in.");
        window.location.href = "scad-login.html";
      });
    }
  
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
  
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const match = users.find(u => u.email === email && u.password === password && u.role === "admin");
  
        const params = new URLSearchParams(window.location.search);
        const nextPage = params.get("next") || "admin-dashboard.html";
  
        if (match) {
          localStorage.setItem("activeUser", JSON.stringify(match));
          alert("Login successful!");
          window.location.href = nextPage;
        } else {
          document.getElementById("login-error").textContent = "Invalid email, password, or role.";
        }
      });
    }
  });
  
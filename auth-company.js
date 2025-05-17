// Company Registration & Login with Redirect Handling
document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");
  
    if (registerForm) {
      registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
const industry = document.getElementById("industry").value;
const size = document.getElementById("size").value;
const email = document.getElementById("email").value;
const logo = document.getElementById("logo").value;
const password = document.getElementById("password").value;

  
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const exists = users.find(u => u.email === email);
  
        if (exists) {
          document.getElementById("register-error").textContent = "User already registered.";
          return;
        }
  
        users.push({
            name,
            industry,
            size,
            email,
            logo,
            password,
            role: "company"
          });
          
        localStorage.setItem("users", JSON.stringify(users));
  
        alert("Registration successful! Please log in.");
        window.location.href = "company-login.html";
      });
    }
  
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
  
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const match = users.find(u => u.email === email && u.password === password && u.role === "company");
  
        const params = new URLSearchParams(window.location.search);
        const nextPage = params.get("next") || "employer-dashboard.html";
  
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
  
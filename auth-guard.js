// auth-guard.js

document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("activeUser"));
  
    // Redirect logic by page
    const page = window.location.pathname;
  
    if (!user) {
      if (
        page.includes("student-dashboard") ||
        page.includes("employer-dashboard") ||
        page.includes("admin-dashboard") ||
        page.includes("view-applications") ||
        page.includes("post-internship") ||
        page.includes("internship-detail") ||
        page.includes("application-history")
      ) {
        alert("You must be logged in to access this page.");
        window.location.href = "../index.html";
      }
    }
  
    // Role mismatch logic
    if (user) {
      if (page.includes("student-dashboard") && user.role !== "student") {
        alert("You are not allowed to access the student dashboard.");
        window.location.href = "../index.html";
      }
      if (page.includes("employer-dashboard") && user.role !== "company") {
        alert("You are not allowed to access the employer dashboard.");
        window.location.href = "../index.html";
      }
      if (page.includes("admin-dashboard") && user.role !== "admin") {
        alert("You are not allowed to access the admin dashboard.");
        window.location.href = "../index.html";
      }
    }
  });
  
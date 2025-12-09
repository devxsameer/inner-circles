const userMenuBtn = document.getElementById("userMenuBtn");
const userDropdown = document.getElementById("userDropdown");
const userMenuWrapper = document.getElementById("userMenuWrapper");

// Toggle menu on click
userMenuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  userDropdown.classList.toggle("hidden");
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!userMenuWrapper.contains(e.target)) {
    userDropdown.classList.add("hidden");
  }
});

// MOBILE NAV
const mobileBtn = document.getElementById("mobileMenuBtn");
const mobileNav = document.getElementById("mobileNav");

mobileBtn?.addEventListener("click", () => {
  mobileNav.classList.toggle("hidden");
});

// USER DROPDOWN
const userBtn = document.getElementById("userMenuBtn");
const dropdown = document.getElementById("userDropdown");

document.addEventListener("click", (e) => {
  if (userBtn?.contains(e.target)) {
    dropdown.classList.toggle("hidden");
  } else if (!dropdown?.contains(e.target)) {
    dropdown?.classList.add("hidden");
  }
});

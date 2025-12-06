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

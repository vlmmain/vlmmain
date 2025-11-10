/*
Codes by VLM
*/
const body = document.body;
//toast ..
function showToast(message, type = 'success', duration = 2000) {
    Swal.fire({
        toast: true,
        position: 'top-end',  // top-right corner
        showConfirmButton: false,
        timer: duration,
        timerProgressBar: true,
        icon: type,
        title: message,
        background: document.body.classList.contains('dark') ? '#333' : '#fff',
        color: document.body.classList.contains('dark') ? '#fff' : '#000',
       /*  showClass: {
            popup: 'swal2-noanimation',
            icon: 'swal2-noanimation'
        },
        hideClass: {
            popup: '',
            icon: ''
        } */
    });
}
// Sidebar toggle
function toggleMenu() {
  var sidebar = document.getElementById('sidebar');
  var menuBtn = document.querySelector(".menu-btn")
  sidebar.classList.toggle('active');
  menuBtn.textContent = sidebar.classList.contains("active") ? "close":"menu";
}

// Theme switch
function toggleTheme() {
  body.classList.toggle('dark');
  localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
  document.querySelector(".theme-toggle").textContent= body.classList.contains('dark') ? "light_mode":"dark_mode";
}

// Load saved theme
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') document.body.classList.add('dark');
   document.querySelector(".theme-toggle").textContent= body.classList.contains('dark') ? "light_mode":"dark_mode";
});

// Disable right click / long click
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('selectstart', e => e.preventDefault());
document.addEventListener('dragstart', e => e.preventDefault());
document.addEventListener('copy', e => e.preventDefault());
document.addEventListener('cut', e => e.preventDefault());

// Detect F12 or DevTools
document.addEventListener('keydown', e => {
  if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C' || e.key === 'J'))) {
    window.location.href = 'https://google.com';
  }
});

// Periodic DevTools detection
setInterval(() => {
  const start = performance.now();
  debugger;
  const end = performance.now();
  if (end - start > 100) {
    window.location.href = 'https://google.com';
  }
}, 2000);

// SweetAlert popup on theme change
function showThemeChange() {
  //showToast("dark theme now!","success")
}

// Optional: attach feedback to theme button
document.querySelectorAll('.material-icons').forEach(icon => {
  if (icon.textContent.includes('dark_mode')) {
    icon.addEventListener('click', showThemeChange);
  }
});

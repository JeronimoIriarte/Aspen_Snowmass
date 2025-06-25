import './components/navbar.js';
import './components/footer.js';

// Initialize common functionality
document.addEventListener('DOMContentLoaded', () => {
  // Handle navbar scroll effect
  const navbar = document.querySelector('.navbar');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  
  // Handle mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navbarLinks = document.querySelector('.navbar-links');
  
  if (mobileMenuBtn && navbarLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navbarLinks.classList.toggle('active');
    });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navbarLinks && navbarLinks.classList.contains('active')) {
      if (!e.target.closest('.navbar-links') && !e.target.closest('.mobile-menu-btn')) {
        navbarLinks.classList.remove('active');
      }
    }
  });
});
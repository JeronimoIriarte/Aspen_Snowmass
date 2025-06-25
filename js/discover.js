document.addEventListener('DOMContentLoaded', () => {
  // Fade-in animation for content sections
  const fadeInElements = document.querySelectorAll('.about-content, .mission-content, .sustainability-card, .team-card, .award');
  
  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        fadeInObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  fadeInElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    fadeInObserver.observe(element);
  });
  
  // Add CSS class when element is in view
  document.addEventListener('scroll', () => {
    fadeInElements.forEach(element => {
      const position = element.getBoundingClientRect();
      
      // Check if element is in viewport
      if (position.top < window.innerHeight && position.bottom >= 0) {
        element.classList.add('fade-in');
      }
    });
  });
  
  // Add fade-in class to make elements visible with animation
  document.addEventListener('scroll', () => {
    fadeInElements.forEach(element => {
      if (element.classList.contains('fade-in')) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  });
  
  // Trigger initial check
  setTimeout(() => {
    window.dispatchEvent(new Event('scroll'));
  }, 100);
});
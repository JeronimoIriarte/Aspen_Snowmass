document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll to mountain sections when clicking on links
  const mountainLinks = document.querySelectorAll('a[href^="#"]');
  
  mountainLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      
      if (targetId.startsWith('#')) {
        e.preventDefault();
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Animate mountain images and content when scrolling into view
  const animateElements = document.querySelectorAll('.mountain-image, .mountain-content, .trail-map-card');
  
  const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        animateObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animateElements.forEach(element => {
    // Set initial state
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    
    // Add element to the observer
    animateObserver.observe(element);
  });
  
  // Add a class when animated in
  document.addEventListener('scroll', () => {
    animateElements.forEach(element => {
      if (element.classList.contains('animate-in')) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  });
  
  // Trigger initial animation check
  setTimeout(() => {
    window.dispatchEvent(new Event('scroll'));
  }, 100);
  
  // Trail map modal functionality (simplified for this example)
  const trailMapButtons = document.querySelectorAll('.trail-map-card .btn');
  
  trailMapButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Trail map would open in a modal window or new tab in a full implementation.');
    });
  });
});
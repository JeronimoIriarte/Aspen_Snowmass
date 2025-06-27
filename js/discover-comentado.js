// ARCHIVO: discover.js - Funcionalidades de la página "Discover" (Acerca de nosotros)
// Este archivo maneja:
// - Animaciones de aparición (fade-in) para elementos
// - Efectos visuales basados en scroll
// - Mejora de la experiencia de usuario con animaciones suaves

document.addEventListener('DOMContentLoaded', () => {
  
  // ELEMENTOS PARA ANIMACIÓN FADE-IN
  // Selecciona todos los elementos que tendrán animación de aparición
  const fadeInElements = document.querySelectorAll(
    '.about-content, .mission-content, .sustainability-card, .team-card, .award'
  );
  
  // INTERSECTION OBSERVER
  // API moderna para detectar cuando elementos entran en el viewport
  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Si el elemento está visible en la pantalla
      if (entry.isIntersecting) {
        // Agrega la clase para activar la animación
        entry.target.classList.add('fade-in');
        // Deja de observar este elemento (optimización)
        fadeInObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1, // Se activa cuando el 10% del elemento es visible
    rootMargin: '0px 0px -50px 0px' // Margen negativo inferior para activar antes
  });
  
  // CONFIGURACIÓN INICIAL DE ELEMENTOS
  // Prepara cada elemento para la animación
  fadeInElements.forEach(element => {
    // Estado inicial: invisible y desplazado hacia abajo
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    
    // Comienza a observar el elemento
    fadeInObserver.observe(element);
  });
  
  // MANEJO DE SCROLL ALTERNATIVO
  // Método adicional para navegadores que no soporten Intersection Observer
  document.addEventListener('scroll', () => {
    fadeInElements.forEach(element => {
      const position = element.getBoundingClientRect();
      
      // Verifica si el elemento está en el viewport
      if (position.top < window.innerHeight && position.bottom >= 0) {
        element.classList.add('fade-in');
      }
    });
  });
  
  // APLICACIÓN DE ANIMACIONES
  // Escucha cambios de scroll para aplicar las animaciones
  document.addEventListener('scroll', () => {
    fadeInElements.forEach(element => {
      // Si el elemento tiene la clase 'fade-in', aplica la animación
      if (element.classList.contains('fade-in')) {
        element.style.opacity = '1';           // Hace visible el elemento
        element.style.transform = 'translateY(0)'; // Lo mueve a su posición final
      }
    });
  });
  
  // TRIGGER INICIAL
  // Ejecuta una verificación inicial después de un breve delay
  // Esto asegura que elementos ya visibles se animen al cargar la página
  setTimeout(() => {
    window.dispatchEvent(new Event('scroll'));
  }, 100);
});

// NOTAS TÉCNICAS:
// 1. Intersection Observer es más eficiente que escuchar scroll constantemente
// 2. El fallback con scroll asegura compatibilidad con navegadores antiguos
// 3. Las animaciones CSS son más performantes que las animaciones JavaScript
// 4. El timeout inicial maneja elementos que ya están visibles al cargar

// POSIBLES MEJORAS:
// - Diferentes tipos de animaciones (slide-in desde los lados, scale, etc.)
// - Animaciones escalonadas para múltiples elementos
// - Integración con librerías como AOS (Animate On Scroll)
// - Respeto por las preferencias de movimiento reducido del usuario
// - Animaciones más complejas con keyframes CSS
// ARCHIVO: discover.js - Funcionalidades de la página "Discover"(about us)
// Este archivo maneja:
// - Animaciones de aparición (fade-in) para elementos
// - Efectos visuales basados en scroll
// - Mejora de la experiencia de usuario con animaciones suaves

document.addEventListener("DOMContentLoaded", () => {
  // Selecciona todos los elementos que tendrán animación de aparición
  const fadeInElements = document.querySelectorAll(
    ".about-content, .mission-content, .sustainability-card, .team-card, .award"
  );

  // INTERSECTION OBSERVER
  // API moderna para detectar cuando elementos entran en el viewport
  const fadeInObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Si el elemento está visible en la pantalla
        if (entry.isIntersecting) {
          // Agrega la clase para activar la animación
          entry.target.classList.add("fade-in");
          // Deja de observar este elemento
          fadeInObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1, // Se activa cuando el 10% del elemento es visible
      rootMargin: "0px 0px -50px 0px", // Margen negativo inferior para activar antes
    }
  );

  // CONFIGURACIÓN INICIAL DE ELEMENTOS
  // Prepara cada elemento para la animación
  fadeInElements.forEach((element) => {
    // Estado inicial: invisible y desplazado hacia abajo
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";

    // Comienza a observar el elemento
    fadeInObserver.observe(element);
  });

  // MANEJO DE SCROLL ALTERNATIVO
  // Método adicional para navegadores que no soporten Intersection Observer
  document.addEventListener("scroll", () => {
    fadeInElements.forEach((element) => {
      const position = element.getBoundingClientRect();

      // Verifica si el elemento está en el viewport
      if (position.top < window.innerHeight && position.bottom >= 0) {
        element.classList.add("fade-in");
      }
    });
  });

  // APLICACIÓN DE ANIMACIONES
  // Escucha cambios de scroll para aplicar las animaciones
  document.addEventListener("scroll", () => {
    fadeInElements.forEach((element) => {
      // Si el elemento tiene la clase 'fade-in', aplica la animación
      if (element.classList.contains("fade-in")) {
        element.style.opacity = "1"; // Hace visible el elemento
        element.style.transform = "translateY(0)"; // Lo mueve a su posición final
      }
    });
  });

  // TRIGGER INICIAL
  // Ejecuta una verificación inicial después de un breve delay
  // Esto asegura que elementos ya visibles se animen al cargar la página
  setTimeout(() => {
    window.dispatchEvent(new Event("scroll"));
  }, 100);
});

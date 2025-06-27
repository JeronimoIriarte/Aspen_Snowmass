// ARCHIVO: mountains.js - Funcionalidades de la página de montañas
// Este archivo maneja:
// - Navegación suave entre secciones de montañas
// - Animaciones de aparición para contenido
// - Funcionalidad de mapas de senderos (placeholder)
// - Efectos visuales mejorados para la experiencia de usuario

document.addEventListener("DOMContentLoaded", () => {
  
  // NAVEGACIÓN SUAVE ENTRE SECCIONES
  // Maneja los enlaces internos que apuntan a secciones específicas de montañas
  const mountainLinks = document.querySelectorAll('a[href^="#"]');

  mountainLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");

      // Solo procesa enlaces que empiecen con #
      if (targetId.startsWith("#")) {
        e.preventDefault(); // Previene el comportamiento por defecto del navegador

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          // CÁLCULO DE POSICIÓN PARA SCROLL SUAVE
          const headerOffset = 80; // Altura del navbar fijo
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          // Scroll suave a la posición calculada
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth", // Animación suave nativa del navegador
          });
        }
      }
    });
  });

  // ANIMACIONES DE APARICIÓN
  // Elementos que tendrán animación cuando entren en el viewport
  const animateElements = document.querySelectorAll(
    ".mountain-image, .mountain-content, .trail-map-card"
  );

  // INTERSECTION OBSERVER PARA ANIMACIONES
  // Detecta cuando los elementos entran en la vista del usuario
  const animateObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Agrega clase de animación cuando el elemento es visible
          entry.target.classList.add("animate-in");
          // Deja de observar para optimizar rendimiento
          animateObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1, // Se activa cuando 10% del elemento es visible
      rootMargin: "0px 0px -50px 0px", // Margen para activar antes de ser completamente visible
    }
  );

  // CONFIGURACIÓN INICIAL DE ANIMACIONES
  animateElements.forEach((element) => {
    // Establece el estado inicial de cada elemento
    element.style.opacity = "0";                    // Invisible
    element.style.transform = "translateY(30px)";   // Desplazado hacia abajo
    element.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out"; // Transición suave

    // Comienza a observar el elemento
    animateObserver.observe(element);
  });

  // APLICACIÓN DE ANIMACIONES EN SCROLL
  // Maneja la aplicación visual de las animaciones
  document.addEventListener("scroll", () => {
    animateElements.forEach((element) => {
      // Si el elemento tiene la clase 'animate-in', aplica la animación
      if (element.classList.contains("animate-in")) {
        element.style.opacity = "1";              // Hace visible
        element.style.transform = "translateY(0)"; // Mueve a posición final
      }
    });
  });

  // TRIGGER INICIAL DE ANIMACIONES
  // Verifica elementos ya visibles al cargar la página
  setTimeout(() => {
    window.dispatchEvent(new Event("scroll"));
  }, 100);

  // FUNCIONALIDAD DE MAPAS DE SENDEROS (PLACEHOLDER)
  // En una implementación completa, esto abriría mapas interactivos
  const trailMapButtons = document.querySelectorAll(".trail-map-card .btn");

  trailMapButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault(); // Previene navegación
      
      // PLACEHOLDER - En una app real esto haría:
      // 1. Abrir un modal con mapa interactivo
      // 2. Cargar PDF del mapa en nueva ventana
      // 3. Integrar con servicios como Google Maps
      // 4. Mostrar mapa SVG interactivo
      alert(
        "El mapa debería abrirse en una ventana modal o nueva pestaña en una implementación completa."
      );
    });
  });
});

// NOTAS PARA IMPLEMENTACIÓN COMPLETA:

// MAPAS DE SENDEROS:
// - Integración con mapas interactivos (Leaflet, Google Maps)
// - Carga de archivos PDF de mapas oficiales
// - Mapas SVG con zonas clickeables
// - Información en tiempo real de condiciones de senderos

// ANIMACIONES AVANZADAS:
// - Diferentes efectos para cada tipo de elemento
// - Animaciones escalonadas (staggered)
// - Parallax scrolling para imágenes de fondo
// - Animaciones basadas en la velocidad de scroll

// OPTIMIZACIONES:
// - Lazy loading de imágenes
// - Preload de contenido crítico
// - Debounce en eventos de scroll
// - Reducción de animaciones en dispositivos de bajo rendimiento
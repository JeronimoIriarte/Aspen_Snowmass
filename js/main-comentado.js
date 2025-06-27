// ARCHIVO: main.js - Funcionalidad principal y común a todas las páginas
// Este archivo se encarga de:
// - Importar componentes comunes (navbar y footer)
// - Manejar efectos de scroll en la navegación
// - Gestionar el menú móvil
// - Funcionalidades que se comparten entre todas las páginas

// IMPORTACIÓN DE COMPONENTES
// Importa los archivos que crean la navegación y el pie de página
// Estos se ejecutan automáticamente al importarse
import './components/navbar.js';
import './components/footer.js';

// INICIALIZACIÓN DE FUNCIONALIDADES COMUNES
// Se ejecuta cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  
  // EFECTO DE SCROLL EN LA NAVEGACIÓN
  // Cambia la apariencia del navbar cuando el usuario hace scroll
  const navbar = document.querySelector('.navbar');
  
  // Función que maneja el cambio de estilo del navbar
  const handleScroll = () => {
    // Si el usuario ha hecho scroll más de 50px desde el top
    if (window.scrollY > 50) {
      // Agrega la clase 'scrolled' que hace el navbar más opaco
      navbar.classList.add('scrolled');
    } else {
      // Remueve la clase cuando está en el top de la página
      navbar.classList.remove('scrolled');
    }
  };
  
  // Escucha el evento de scroll en la ventana
  window.addEventListener('scroll', handleScroll);
  
  // MENÚ MÓVIL (HAMBURGER MENU)
  // Maneja la funcionalidad del menú desplegable en dispositivos móviles
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn'); // Botón hamburguesa
  const navbarLinks = document.querySelector('.navbar-links'); // Contenedor de enlaces
  
  // Verifica que ambos elementos existan antes de agregar funcionalidad
  if (mobileMenuBtn && navbarLinks) {
    // Toggle del menú móvil al hacer click en el botón hamburguesa
    mobileMenuBtn.addEventListener('click', () => {
      // Alterna la clase 'active' que muestra/oculta el menú
      navbarLinks.classList.toggle('active');
    });
  }
  
  // CERRAR MENÚ MÓVIL AL HACER CLICK FUERA
  // Mejora la experiencia de usuario cerrando el menú automáticamente
  document.addEventListener('click', (e) => {
    // Solo actúa si el menú móvil está abierto
    if (navbarLinks && navbarLinks.classList.contains('active')) {
      // Si el click no fue en los enlaces del navbar ni en el botón hamburguesa
      if (!e.target.closest('.navbar-links') && !e.target.closest('.mobile-menu-btn')) {
        // Cierra el menú móvil
        navbarLinks.classList.remove('active');
      }
    }
  });
});

// NOTAS TÉCNICAS:
// 1. Este archivo actúa como el "controlador principal" de la aplicación
// 2. Se importa en todas las páginas HTML para mantener consistencia
// 3. Los componentes navbar.js y footer.js se ejecutan automáticamente al importarse
// 4. El efecto de scroll mejora la legibilidad del navbar sobre contenido claro
// 5. La funcionalidad del menú móvil es esencial para la experiencia en dispositivos pequeños
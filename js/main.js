// ARCHIVO: main.js - Funcionalidad principal y común a todas las páginas
// Este archivo se encarga de:
// - Importar componentes comunes (navbar y footer)
// - Manejar efectos de scroll en la navegación
// - Gestionar el menú móvil

// IMPORTACIÓN DE COMPONENTES
// Importa los archivos que crean la navegación y el pie de página
// Estos se ejecutan automáticamente al importarse
import "./components/navbar.js";
import "./components/footer.js";

// INICIALIZACIÓN DE FUNCIONALIDADES COMUNES
// Se ejecuta cuando el DOM está completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  // EFECTO DE SCROLL EN LA NAVEGACIÓN
  // Cambia la apariencia del navbar cuando el usuario hace scroll
  const navbar = document.querySelector(".navbar");

  // Función que maneja el cambio de estilo del navbar
  const handleScroll = () => {
    // Si el usuario ha hecho scroll más de 50px desde el top
    if (window.scrollY > 50) {
      // Agrega la clase 'scrolled' que hace el navbar más opaco
      navbar.classList.add("scrolled");
    } else {
      // Remueve la clase cuando está en el top de la página
      navbar.classList.remove("scrolled");
    }
  };

  // Escucha el evento de scroll en la ventana
  window.addEventListener("scroll", handleScroll);
});

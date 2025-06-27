// ARCHIVO: navbar.js - Componente de navegación reutilizable
// Este archivo crea la barra de navegación en todas las páginas
// Funcionalidades:
// - Creación del HTML del navbar
// - Detección de página activa para highlighting
// - Sincronización con el carrito de compras

// FUNCIÓN PRINCIPAL: Crear y insertar navbar
// DETECCIÓN DE PÁGINA ACTIVA
// Obtiene el nombre del archivo actual para resaltar el enlace correspondiente
const createNavbar = () => {
  // obtener el navbar-container
  const navbarContainer = document.getElementById("navbar-container");

  // Si no existe el navbar, termina la ejecución
  if (!navbarContainer) return;

  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  // TEMPLATE HTML DEL NAVBAR
  const navbarHTML = `
    <nav class="navbar">
      <div class="container navbar-container">
        <a href="./index.html" class="navbar-logo">
          <img src="/images/AspenLogoWhite.webp" alt="Aspen Snowmass Logo">
        </a>
        
        <button class="mobile-menu-btn">☰</button>
        
        <div class="navbar-links">
          <!-- Cada enlace verifica si es la página actual para agregar clase 'active' -->
          <a href="./index.html" class="${
            currentPage === "index.html" ? "active" : ""
          }">Home</a>
          <a href="./mountains.html" class="${
            currentPage === "mountains.html" ? "active" : ""
          }">Mountains</a>
          <a href="./book-rent.html" class="${
            currentPage === "book-rent.html" ? "active" : ""
          }">Book & Rent</a>
          <a href="./discover.html" class="${
            currentPage === "discover.html" ? "active" : ""
          }">About Us</a>
          
          <a href="./book-rent.html" class="cart-icon">
            🛒 <span class="cart-count" style="display: none;">0</span>
          </a>
        </div>
      </div>
    </nav>
  `;

  // agrega el navbar al contenedor
  navbarContainer.innerHTML = navbarHTML;

  // Actualiza el contador del carrito desde localStorage
  const cartData = JSON.parse(localStorage.getItem("aspenCart")) || [];

  // Calcula el total de items en el carrito
  const cartCount = cartData.reduce((total, item) => total + item.quantity, 0);

  // Obtiene referencia al elemento contador
  const cartCountElement = document.querySelector(".cart-count");

  // Si hay items en el carrito, muestra el contador
  if (cartCountElement && cartCount > 0) {
    cartCountElement.textContent = cartCount;
    cartCountElement.style.display = "flex"; // Hace visible el badge
  }
};

// Llama a la función inmediatamente cuando se carga el script
createNavbar();

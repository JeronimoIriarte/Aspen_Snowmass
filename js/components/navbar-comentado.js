// ARCHIVO: navbar.js - Componente de navegación reutilizable
// Este archivo crea dinámicamente la barra de navegación en todas las páginas
// Funcionalidades:
// - Creación dinámica del HTML del navbar
// - Detección de página activa para highlighting
// - Sincronización con el carrito de compras
// - Responsive design con menú móvil

// FUNCIÓN PRINCIPAL: Crear y insertar navbar
const createNavbar = () => {
  // Busca el contenedor donde se insertará el navbar
  const navbarContainer = document.getElementById("navbar-container");

  // Si no existe el contenedor, termina la ejecución
  if (!navbarContainer) return;

  // DETECCIÓN DE PÁGINA ACTIVA
  // Obtiene el nombre del archivo actual para resaltar el enlace correspondiente
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  // TEMPLATE HTML DEL NAVBAR
  // Crea la estructura completa de la navegación
  const navbarHTML = `
    <nav class="navbar">
      <div class="container navbar-container">
        <!-- LOGO -->
        <a href="./index.html" class="navbar-logo">
          <img src="/images/AspenLogoWhite.webp" alt="Aspen Snowmass Logo">
        </a>
        
        <!-- BOTÓN MENÚ MÓVIL -->
        <button class="mobile-menu-btn">☰</button>
        
        <!-- ENLACES DE NAVEGACIÓN -->
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
          
          <!-- ÍCONO DEL CARRITO -->
          <a href="./book-rent.html" class="cart-icon">
            🛒 <span class="cart-count" style="display: none;">0</span>
          </a>
        </div>
      </div>
    </nav>
  `;

  // INSERCIÓN DEL HTML
  // Inyecta el navbar en el contenedor
  navbarContainer.innerHTML = navbarHTML;

  // SINCRONIZACIÓN CON EL CARRITO
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

// EJECUCIÓN AUTOMÁTICA
// Llama a la función inmediatamente cuando se carga el script
createNavbar();

// NOTAS TÉCNICAS:

// VENTAJAS DE ESTE ENFOQUE:
// 1. Consistencia: El mismo navbar en todas las páginas
// 2. Mantenibilidad: Un solo lugar para cambios
// 3. Sincronización: Contador de carrito siempre actualizado
// 4. Flexibilidad: Fácil agregar/quitar enlaces

// DETECCIÓN DE PÁGINA ACTIVA:
// - Usa window.location.pathname para obtener la URL actual
// - Extrae solo el nombre del archivo (ej: "mountains.html")
// - Aplica clase CSS 'active' al enlace correspondiente

// INTEGRACIÓN CON CARRITO:
// - Lee datos del localStorage al crear el navbar
// - Calcula total de items automáticamente
// - Muestra/oculta el badge según la cantidad

// RESPONSIVE DESIGN:
// - Incluye botón hamburguesa para móviles
// - Los estilos CSS manejan la visibilidad según el viewport
// - JavaScript en main.js maneja la funcionalidad del menú móvil
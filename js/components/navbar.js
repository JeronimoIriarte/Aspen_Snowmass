// Create and insert navbar into the page
const createNavbar = () => {
  const navbarContainer = document.getElementById("navbar-container");

  if (!navbarContainer) return;

  // Get current page for active link highlighting
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  // Crea el HTML del navbar
  const navbarHTML = `
    <nav class="navbar">
      <div class="container navbar-container">
        <a href="./index.html" class="navbar-logo">
          <img src="/images/AspenLogoWhite.webp" alt="Aspen Snowmass Logo">
        </a>
        <button class="mobile-menu-btn">☰</button>
        <div class="navbar-links">
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

  // Insertar navbar
  navbarContainer.innerHTML = navbarHTML;

  // actualiza el contador del carrito del localstorage si esta disponible
  const cartData = JSON.parse(localStorage.getItem("aspenCart")) || [];
  const cartCount = cartData.reduce((total, item) => total + item.quantity, 0);
  const cartCountElement = document.querySelector(".cart-count");

  if (cartCountElement && cartCount > 0) {
    cartCountElement.textContent = cartCount;
    cartCountElement.style.display = "flex";
  }
};

// llamar a la funcion cuando carga el script
createNavbar();

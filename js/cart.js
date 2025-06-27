// ARCHIVO: cart.js - Sistema de carrito de compras con localStorage
// Este archivo maneja toda la funcionalidad del carrito de compras, incluyendo:
// - Gestión de pestañas de productos
// - Agregar/eliminar productos del carrito
// - Persistencia de datos con localStorage
// - sidebar del carrito y modal del checkout

document.addEventListener("DOMContentLoaded", () => {
  // ESTADO DEL CARRITO
  // Recupera el carrito desde localStorage o inicializa un array vacío
  let cart = JSON.parse(localStorage.getItem("aspenCart")) || [];

  // Referencias a elementos HTML que necesitamos manipular
  const cartCountElement = document.querySelector(".cart-count");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");
  const checkoutItemsContainer = document.getElementById("checkout-items");
  const checkoutTotalElement = document.getElementById("checkout-total");

  // Maneja el cambio entre diferentes categorías de productos (Lift Tickets, Rentals, etc.)
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanes = document.querySelectorAll(".tab-pane");

  // Agrega event listeners a cada botón de pestaña
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remueve la clase 'active' de todos los botones y paneles
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabPanes.forEach((pane) => pane.classList.remove("active"));

      // Activa el botón clickeado y su panel correspondiente
      button.classList.add("active");
      const tabId = button.getAttribute("data-tab"); // Obtiene el ID del panel a mostrar
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Maneja los botones "Add to Cart" de todos los productos
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Obtiene información del producto desde el HTML
      const productCard = button.closest(".product-card"); // Encuentra la tarjeta del producto
      const productId = productCard.getAttribute("data-id"); // ID único del producto
      const productName = productCard.querySelector("h3").textContent; // Nombre del producto
      const productPrice = parseFloat(productCard.getAttribute("data-price")); // Precio como número
      const productImage = productCard.querySelector("img").getAttribute("src"); // URL de la imagen

      // Verifica si el producto ya existe en el carrito
      // Si el producto ya existe, incrementa la cantidad
      // Si es un producto nuevo, lo agrega al carrito
      const existingItemIndex = cart.findIndex((item) => item.id === productId);
      if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
      } else {
        cart.push({
          id: productId,
          name: productName,
          price: productPrice,
          image: productImage,
          quantity: 1,
        });
      }

      // Guarda el carrito actualizado en localStorage
      saveCart();

      // Actualiza el contador del carrito
      updateCartCount();

      // Muestra el modal del carrito automáticamente
    });
  });

  // Calcula el total de items y actualiza el badge del ícono del carrito
  function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCountElement) {
      cartCountElement.textContent = totalItems;

      // Muestra u oculta el badge según si hay items
      if (totalItems > 0) {
        cartCountElement.style.display = "flex";
      } else {
        cartCountElement.style.display = "none";
      }
    }
  }

  // Convierte el array del carrito a JSON y lo guarda en localStorage
  function saveCart() {
    localStorage.setItem("aspenCart", JSON.stringify(cart));
  }

  // Suma el precio de todos los items multiplicado por su cantidad
  function calculateTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // Crea el HTML para mostrar todos los items en el modal del carrito
  function renderCartItems() {
    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = ""; // Limpia el contenedor

    // Si el carrito está vacío, muestra un mensaje
    if (cart.length === 0) {
      cartItemsContainer.innerHTML =
        '<p class="empty-cart">Your cart is empty</p>';
      return;
    }

    // Crea un elemento HTML para cada item del carrito
    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");

      // Template HTML para cada item
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-price">
          $${item.price.toFixed(2)} x ${item.quantity}
          </div>
          <button class="cart-item-remove" data-id="${item.id}">Remove</button>
        </div>
      `;
      cartItemsContainer.appendChild(cartItem);
    });

    // Actualiza el total mostrado
    cartTotalElement.textContent = `$${calculateTotal().toFixed(2)}`;

    // Agrega event listeners a los botones de eliminar
    const removeButtons = document.querySelectorAll(".cart-item-remove");
    removeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const itemId = button.getAttribute("data-id");
        removeFromCart(itemId);
      });
    });
  }

  // FUNCIÓN: Renderizar items en checkout
  // Similar a renderCartItems pero para el modal de checkout
  function renderCheckoutItems() {
    if (!checkoutItemsContainer || !checkoutTotalElement) return;

    checkoutItemsContainer.innerHTML = "";

    // Crea elementos más simples para el checkout (solo nombre, cantidad y precio)
    cart.forEach((item) => {
      const checkoutItem = document.createElement("div");
      checkoutItem.classList.add("checkout-item");

      checkoutItem.innerHTML = `
        <div>${item.name} x ${item.quantity}</div>
        <div>$${(item.price * item.quantity).toFixed(2)}</div>
      `;

      checkoutItemsContainer.appendChild(checkoutItem);
    });

    // Actualiza el total del checkout
    checkoutTotalElement.textContent = `$${calculateTotal().toFixed(2)}`;
  }

  // Reduce la cantidad o elimina completamente el item
  function removeFromCart(itemId) {
    const itemIndex = cart.findIndex((item) => item.id === itemId);

    if (itemIndex !== -1) {
      if (cart[itemIndex].quantity > 1) {
        // Si hay más de 1, solo reduce la cantidad
        cart[itemIndex].quantity -= 1;
      } else {
        // Si solo hay 1, elimina el item completamente
        cart.splice(itemIndex, 1);
      }

      saveCart();
      updateCartCount();
      renderCartItems();
    }
  }

  // Abre el panel lateral del carrito desde la derecha
  function showCartModal() {
    const cartModal = document.getElementById("cart-modal");
    if (cartModal) {
      renderCartItems(); // Actualiza el contenido antes de mostrar
      cartModal.classList.add("active"); // Activa la animación CSS
      document.body.style.overflow = "hidden"; // Previene scroll del body
    }
  }

  // FUNCIÓN: Ocultar modal del carrito
  function hideCartModal() {
    const cartModal = document.getElementById("cart-modal");
    if (cartModal) {
      cartModal.classList.remove("active");
      document.body.style.overflow = ""; // Restaura el scroll
    }
  }

  // Modal centrado para el proceso de pago
  function showCheckoutModal() {
    const checkoutModal = document.getElementById("checkout-modal");
    if (checkoutModal) {
      renderCheckoutItems(); // Actualiza los items antes de mostrar
      checkoutModal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  // FUNCIÓN: Ocultar modal de checkout
  function hideCheckoutModal() {
    const checkoutModal = document.getElementById("checkout-modal");
    if (checkoutModal) {
      checkoutModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  // EVENT LISTENERS PARA MODALES
  // Click en el ícono del carrito - abre el sidebar
  const cartIcon = document.querySelector(".cart-icon");
  if (cartIcon) {
    cartIcon.addEventListener("click", (e) => {
      e.preventDefault(); // Previene navegación del enlace
      showCartModal();
    });
  }

  // Botón cerrar carrito
  const closeCartBtn = document.querySelector(".close-cart");
  if (closeCartBtn) {
    closeCartBtn.addEventListener("click", hideCartModal);
  }

  // Botón proceder al checkout
  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      hideCartModal(); // Cierra el carrito
      showCheckoutModal(); // Abre el checkout
    });
  }

  // Botón cerrar checkout
  const closeCheckoutBtn = document.querySelector(".close-checkout");
  if (closeCheckoutBtn) {
    closeCheckoutBtn.addEventListener("click", hideCheckoutModal);
  }

  // Actualiza el contador del carrito al cargar la página
  updateCartCount();
});

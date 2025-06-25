document.addEventListener('DOMContentLoaded', () => {
  // Cart state
  let cart = JSON.parse(localStorage.getItem('aspenCart')) || [];
  
  // DOM elements
  const cartCountElement = document.querySelector('.cart-count');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  const checkoutItemsContainer = document.getElementById('checkout-items');
  const checkoutTotalElement = document.getElementById('checkout-total');
  
  // Tab functionality
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all tabs
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));
      
      // Add active class to clicked tab
      button.classList.add('active');
      const tabId = button.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });
  
  // Cart functionality
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productCard = button.closest('.product-card');
      const productId = productCard.getAttribute('data-id');
      const productName = productCard.querySelector('h3').textContent;
      const productPrice = parseFloat(productCard.getAttribute('data-price'));
      const productImage = productCard.querySelector('img').getAttribute('src');
      
      // Check if product is already in cart
      const existingItemIndex = cart.findIndex(item => item.id === productId);
      
      if (existingItemIndex !== -1) {
        // Update quantity if item exists
        cart[existingItemIndex].quantity += 1;
      } else {
        // Add new item
        cart.push({
          id: productId,
          name: productName,
          price: productPrice,
          image: productImage,
          quantity: 1
        });
      }
      
      // Save cart to localStorage
      saveCart();
      
      // Update UI
      updateCartCount();
      
      // Show cart modal
      showCartModal();
    });
  });
  
  // Update cart count
  function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCountElement) {
      cartCountElement.textContent = totalItems;
      
      if (totalItems > 0) {
        cartCountElement.style.display = 'flex';
      } else {
        cartCountElement.style.display = 'none';
      }
    }
  }
  
  // Save cart to localStorage
  function saveCart() {
    localStorage.setItem('aspenCart', JSON.stringify(cart));
  }
  
  // Calculate cart total
  function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
  
  // Render cart items
  function renderCartItems() {
    if (!cartItemsContainer) return;
    
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
      return;
    }
    
    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</div>
          <button class="cart-item-remove" data-id="${item.id}">Remove</button>
        </div>
      `;
      
      cartItemsContainer.appendChild(cartItem);
    });
    
    // Update total
    cartTotalElement.textContent = `$${calculateTotal().toFixed(2)}`;
    
    // Add event listeners to remove buttons
    const removeButtons = document.querySelectorAll('.cart-item-remove');
    removeButtons.forEach(button => {
      button.addEventListener('click', () => {
        const itemId = button.getAttribute('data-id');
        removeFromCart(itemId);
      });
    });
  }
  
  // Render checkout items
  function renderCheckoutItems() {
    if (!checkoutItemsContainer || !checkoutTotalElement) return;
    
    checkoutItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
      const checkoutItem = document.createElement('div');
      checkoutItem.classList.add('checkout-item');
      
      checkoutItem.innerHTML = `
        <div>${item.name} x ${item.quantity}</div>
        <div>$${(item.price * item.quantity).toFixed(2)}</div>
      `;
      
      checkoutItemsContainer.appendChild(checkoutItem);
    });
    
    // Update total
    checkoutTotalElement.textContent = `$${calculateTotal().toFixed(2)}`;
  }
  
  // Remove item from cart
  function removeFromCart(itemId) {
    const itemIndex = cart.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
      if (cart[itemIndex].quantity > 1) {
        // Decrease quantity
        cart[itemIndex].quantity -= 1;
      } else {
        // Remove item
        cart.splice(itemIndex, 1);
      }
      
      // Save cart
      saveCart();
      
      // Update UI
      updateCartCount();
      renderCartItems();
    }
  }
  
  // Show cart modal
  function showCartModal() {
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) {
      renderCartItems();
      cartModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }
  
  // Hide cart modal
  function hideCartModal() {
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) {
      cartModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
  
  // Show checkout modal
  function showCheckoutModal() {
    const checkoutModal = document.getElementById('checkout-modal');
    if (checkoutModal) {
      renderCheckoutItems();
      checkoutModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }
  
  // Hide checkout modal
  function hideCheckoutModal() {
    const checkoutModal = document.getElementById('checkout-modal');
    if (checkoutModal) {
      checkoutModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
  
  // Cart icon click
  const cartIcon = document.querySelector('.cart-icon');
  if (cartIcon) {
    cartIcon.addEventListener('click', (e) => {
      e.preventDefault();
      showCartModal();
    });
  }
  
  // Close cart button
  const closeCartBtn = document.querySelector('.close-cart');
  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', hideCartModal);
  }
  
  // Checkout button
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      hideCartModal();
      showCheckoutModal();
    });
  }
  
  // Close checkout button
  const closeCheckoutBtn = document.querySelector('.close-checkout');
  if (closeCheckoutBtn) {
    closeCheckoutBtn.addEventListener('click', hideCheckoutModal);
  }
  
  // Initialize cart
  updateCartCount();
});
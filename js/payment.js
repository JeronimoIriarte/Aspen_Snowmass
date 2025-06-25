document.addEventListener('DOMContentLoaded', () => {
  // DOM elements
  const paymentForm = document.getElementById('payment-form');
  const cardNumberInput = document.getElementById('card-number');
  const expiryInput = document.getElementById('expiry');
  const cvvInput = document.getElementById('cvv');
  const cardNumberError = document.getElementById('card-number-error');
  const expiryError = document.getElementById('expiry-error');
  const cvvError = document.getElementById('cvv-error');
  
  // Format card number input with spaces
  if (cardNumberInput) {
    cardNumberInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\s/g, '');
      value = value.replace(/\D/g, '');
      
      if (value.length > 0) {
        value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
      }
      
      e.target.value = value;
    });
  }
  
  // Format expiry date input (MM/YY)
  if (expiryInput) {
    expiryInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      
      if (value.length > 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
      }
      
      e.target.value = value;
    });
  }
  
  // Format CVV input (numbers only)
  if (cvvInput) {
    cvvInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '');
    });
  }
  
  // Validate card number
  function validateCardNumber(number) {
    number = number.replace(/\s/g, '');
    
    if (number.length < 13 || number.length > 19) {
      return { valid: false, message: 'Card number must be 13-19 digits' };
    }
    
    // Check if number has only digits
    if (!/^\d+$/.test(number)) {
      return { valid: false, message: 'Card number must contain only digits' };
    }
    
    // Luhn algorithm for card validation
    let sum = 0;
    let shouldDouble = false;
    
    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number.charAt(i));
      
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    
    if (sum % 10 !== 0) {
      return { valid: false, message: 'Invalid card number' };
    }
    
    return { valid: true, message: '' };
  }
  
  // Validate expiry date
  function validateExpiry(expiry) {
    const parts = expiry.split('/');
    
    if (parts.length !== 2) {
      return { valid: false, message: 'Enter date in MM/YY format' };
    }
    
    const month = parseInt(parts[0]);
    const year = parseInt('20' + parts[1]);
    
    if (isNaN(month) || isNaN(year)) {
      return { valid: false, message: 'Invalid date format' };
    }
    
    if (month < 1 || month > 12) {
      return { valid: false, message: 'Month must be between 1-12' };
    }
    
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return { valid: false, message: 'Card has expired' };
    }
    
    return { valid: true, message: '' };
  }
  
  // Validate CVV
  function validateCVV(cvv) {
    if (!/^\d{3,4}$/.test(cvv)) {
      return { valid: false, message: 'CVV must be 3-4 digits' };
    }
    
    return { valid: true, message: '' };
  }
  
  // Submit payment form
  if (paymentForm) {
    paymentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Reset error messages
      cardNumberError.textContent = '';
      expiryError.textContent = '';
      cvvError.textContent = '';
      
      // Get form values
      const cardNumber = cardNumberInput.value;
      const expiry = expiryInput.value;
      const cvv = cvvInput.value;
      const email = document.getElementById('email').value;
      
      // Validate card details
      const cardNumberValidation = validateCardNumber(cardNumber);
      const expiryValidation = validateExpiry(expiry);
      const cvvValidation = validateCVV(cvv);
      
      // Show validation errors if any
      if (!cardNumberValidation.valid) {
        cardNumberError.textContent = cardNumberValidation.message;
      }
      
      if (!expiryValidation.valid) {
        expiryError.textContent = expiryValidation.message;
      }
      
      if (!cvvValidation.valid) {
        cvvError.textContent = cvvValidation.message;
      }
      
      // Process payment if all validations pass
      if (cardNumberValidation.valid && expiryValidation.valid && cvvValidation.valid) {
        // In a real application, this would send the payment details to a payment processor
        // For this demo, we'll simulate a successful payment
        
        // Generate a random order number
        const orderNumber = 'ASP-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        
        // Show confirmation
        document.getElementById('confirmation-email').textContent = email;
        document.getElementById('order-number').textContent = orderNumber;
        
        // Hide checkout modal
        document.getElementById('checkout-modal').classList.remove('active');
        
        // Show confirmation modal
        document.getElementById('confirmation-modal').classList.add('active');
        
        // Clear cart
        localStorage.removeItem('aspenCart');
        
        // Update cart count (in a real app, you'd need to handle this more gracefully)
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
          cartCountElement.textContent = '0';
          cartCountElement.style.display = 'none';
        }
      }
    });
  }
  
  // Close confirmation modal
  const closeConfirmationBtn = document.querySelector('.close-confirmation');
  if (closeConfirmationBtn) {
    closeConfirmationBtn.addEventListener('click', () => {
      document.getElementById('confirmation-modal').classList.remove('active');
      document.body.style.overflow = '';
    });
  }
  
  // Continue shopping button
  const continueShoppingBtn = document.getElementById('continue-shopping');
  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener('click', () => {
      document.getElementById('confirmation-modal').classList.remove('active');
      document.body.style.overflow = '';
    });
  }
});
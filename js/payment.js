// ARCHIVO: payment.js - Sistema de procesamiento de pagos
// Este archivo maneja:
// - Validación de formularios de pago
// - Formateo de campos de tarjeta de crédito
// - Algoritmo de Luhn para validación de tarjetas
// - Procesamiento simulado de pagos
// - Gestión de modales de confirmación

document.addEventListener("DOMContentLoaded", () => {
  // ELEMENTOS DEL DOM
  // Referencias a todos los elementos del formulario de pago
  const paymentForm = document.getElementById("payment-form");
  const cardNumberInput = document.getElementById("card-number");
  const expiryInput = document.getElementById("expiry");
  const cvvInput = document.getElementById("cvv");
  const cardNumberError = document.getElementById("card-number-error");
  const expiryError = document.getElementById("expiry-error");
  const cvvError = document.getElementById("cvv-error");

  // FORMATEO DEL NÚMERO DE TARJETA
  // Agrega espacios automáticamente cada 4 dígitos (ej: 1234 5678 9012 3456)
  if (cardNumberInput) {
    cardNumberInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\s/g, ""); // Elimina espacios existentes
      value = value.replace(/\D/g, ""); // Elimina caracteres no numéricos

      // Agrupa los dígitos en bloques de 4
      if (value.length > 0) {
        value = value.match(new RegExp(".{1,4}", "g")).join(" ");
      }

      e.target.value = value;
    });
  }

  // FORMATEO DE FECHA DE EXPIRACIÓN
  // Formato automático MM/YY
  if (expiryInput) {
    expiryInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, ""); // Solo números

      // Agrega la barra después de 2 dígitos
      if (value.length > 2) {
        value = value.substring(0, 2) + "/" + value.substring(2, 4);
      }

      e.target.value = value;
    });
  }

  // FORMATEO DEL CVV
  // Solo permite números, máximo 3-4 dígitos
  if (cvvInput) {
    cvvInput.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/\D/g, ""); // Solo números
    });
  }

  // FUNCIÓN: Validar número de tarjeta de crédito
  // Implementa el algoritmo de Luhn para validar tarjetas reales
  function validateCardNumber(number) {
    // Elimina los espacios del número
    number = number.replace(/\s/g, "");

    // Verifica que la longitud sea entre 13 y 19 dígitos (estándar de la industria)
    if (number.length < 13 || number.length > 19) {
      return { valid: false, message: "Card number must be 13-19 digits" };
    }

    // Verifica que solo contenga dígitos
    if (!/^\d+$/.test(number)) {
      return { valid: false, message: "Card number must contain only digits" };
    }

    // ALGORITMO DE LUHN
    // Algoritmo estándar para validar números de tarjeta de crédito
    // numero que pasa la validacion: 4532 1482 1234 5678
    let sum = 0;
    let shouldDouble = false;

    // Recorre los dígitos de derecha a izquierda
    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number.charAt(i));

      // Si corresponde, duplica el dígito (cada segundo dígito desde la derecha)
      if (shouldDouble) {
        digit *= 2;
        // Si el resultado es mayor a 9, réstale 9 (equivale a sumar los dígitos)
        if (digit > 9) digit -= 9;
      }

      // Suma el dígito al total
      sum += digit;
      // Alterna entre duplicar y no duplicar
      shouldDouble = !shouldDouble;
    }

    // Si la suma no es múltiplo de 10, el número es inválido
    if (sum % 10 !== 0) {
      return { valid: false, message: "Invalid card number" };
    }

    // Si pasa todas las validaciones, el número es válido
    return { valid: true, message: "" };
  }

  // FUNCIÓN: Validar fecha de expiración
  // Verifica formato y que la tarjeta no haya expirado
  function validateExpiry(expiry) {
    const parts = expiry.split("/");

    // Debe tener formato MM/YY
    if (parts.length !== 2) {
      return { valid: false, message: "Enter date in MM/YY format" };
    }

    const month = parseInt(parts[0]);
    const year = parseInt("20" + parts[1]); // Convierte YY a 20YY

    // Verifica que sean números válidos
    if (isNaN(month) || isNaN(year)) {
      return { valid: false, message: "Invalid date format" };
    }

    // Verifica que el mes esté entre 1-12
    if (month < 1 || month > 12) {
      return { valid: false, message: "Month must be between 1-12" };
    }

    // Verifica que la tarjeta no haya expirado
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // getMonth() devuelve 0-11

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return { valid: false, message: "Card has expired" };
    }

    return { valid: true, message: "" };
  }

  // FUNCIÓN: Validar CVV
  // Verifica que sea un código de 3-4 dígitos
  function validateCVV(cvv) {
    if (!/^\d{3,4}$/.test(cvv)) {
      return { valid: false, message: "CVV must be 3-4 digits" };
    }

    return { valid: true, message: "" };
  }

  // PROCESAMIENTO DEL FORMULARIO DE PAGO
  // Maneja el envío del formulario y procesa el pago
  if (paymentForm) {
    paymentForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Previene el envío normal del formulario

      // Limpia mensajes de error previos
      cardNumberError.textContent = "";
      expiryError.textContent = "";
      cvvError.textContent = "";

      // Obtiene los valores del formulario
      const cardNumber = cardNumberInput.value;
      const expiry = expiryInput.value;
      const cvv = cvvInput.value;
      const email = document.getElementById("email").value;

      // Ejecuta todas las validaciones
      const cardNumberValidation = validateCardNumber(cardNumber);
      const expiryValidation = validateExpiry(expiry);
      const cvvValidation = validateCVV(cvv);

      // Muestra errores de validación si los hay
      if (!cardNumberValidation.valid) {
        cardNumberError.textContent = cardNumberValidation.message;
      }

      if (!expiryValidation.valid) {
        expiryError.textContent = expiryValidation.message;
      }

      if (!cvvValidation.valid) {
        cvvError.textContent = cvvValidation.message;
      }

      // PROCESAMIENTO DEL PAGO
      // Solo procede si todas las validaciones son exitosas
      if (
        cardNumberValidation.valid &&
        expiryValidation.valid &&
        cvvValidation.valid
      ) {
        // En una aplicación real, aquí se enviarían los datos a un procesador de pagos
        // como Stripe, PayPal, etc. Para esta demo, simulamos un pago exitoso

        // Genera un número de orden aleatorio
        const orderNumber =
          "ASP-" +
          Math.floor(Math.random() * 1000000)
            .toString()
            .padStart(6, "0");

        // Muestra la confirmación con los datos del pedido
        document.getElementById("confirmation-email").textContent = email;
        document.getElementById("order-number").textContent = orderNumber;

        // Oculta el modal de checkout
        document.getElementById("checkout-modal").classList.remove("active");

        // Muestra el modal de confirmación
        document.getElementById("confirmation-modal").classList.add("active");

        // LIMPIA EL CARRITO DESPUÉS DEL PAGO EXITOSO
        localStorage.removeItem("aspenCart");

        // Actualiza el contador del carrito a 0
        const cartCountElement = document.querySelector(".cart-count");
        if (cartCountElement) {
          cartCountElement.textContent = "0";
          cartCountElement.style.display = "none";
        }
      }
    });
  }

  // EVENT LISTENERS PARA MODALES DE CONFIRMACIÓN
  // Botón cerrar modal de confirmación
  const closeConfirmationBtn = document.querySelector(".close-confirmation");
  if (closeConfirmationBtn) {
    closeConfirmationBtn.addEventListener("click", () => {
      document.getElementById("confirmation-modal").classList.remove("active");
      document.body.style.overflow = ""; // Restaura el scroll
    });
  }

  // Botón "Continue Shopping"
  const continueShoppingBtn = document.getElementById("continue-shopping");
  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener("click", () => {
      document.getElementById("confirmation-modal").classList.remove("active");
      document.body.style.overflow = ""; // Restaura el scroll
      // El usuario puede continuar navegando en la página
    });
  }
});

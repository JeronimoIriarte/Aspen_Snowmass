// ARCHIVO: footer.js - Componente de pie de página reutilizable
// Este archivo crea dinámicamente el footer en todas las páginas
// Funcionalidades:
// - Creación dinámica del HTML del footer
// - Año automático en el copyright
// - Enlaces organizados por categorías
// - Información de contacto y redes sociales

// FUNCIÓN PRINCIPAL: Crear y insertar footer
const createFooter = () => {
  // Busca el contenedor donde se insertará el footer
  const footerContainer = document.getElementById("footer-container");

  // Si no existe el contenedor, termina la ejecución
  if (!footerContainer) return;

  // OBTENCIÓN DEL AÑO ACTUAL
  // Genera automáticamente el año para el copyright
  const currentYear = new Date().getFullYear();

  // TEMPLATE HTML DEL FOOTER
  const footerHTML = `
    <div class="footer">
      <div class="container">
        <div class="footer-container">
      
          <div class="footer-section">
            <div class="footer-logo">
              <img src="/images/AspenSkiingCompany.png" alt="Aspen Snowmass Logo">
            </div>
            <p>Experience the magic of Aspen Snowmass, Colorado's premier ski resort destination with four incredible mountains.</p>
            
            <div class="social-links">
              <a href="#" aria-label="Facebook">📱</a>
              <a href="#" aria-label="Twitter">📱</a>
              <a href="#" aria-label="Instagram">📱</a>
              <a href="#" aria-label="YouTube">📱</a>
            </div>
          </div>
          
          <div class="footer-section">
            <h3>Explore</h3>
            <ul class="footer-links">
              <li><a href="./mountains.html">Our Mountains</a></li>
              <li><a href="./book-rent.html">Book & Rent</a></li>
              <li><a href="./discover.html">Discover</a></li>
              <li><a href="#">Events</a></li>
              <li><a href="#">Dining</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h3>Information</h3>
            <ul class="footer-links">
              <li><a href="#">Resort Status</a></li>
              <li><a href="#">Snow Report</a></li>
              <li><a href="#">Trail Maps</a></li>
              <li><a href="#">Webcams</a></li>
              <li><a href="#">Getting Here</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h3>Contact Us</h3>
            <ul class="footer-links">
              <li>P.O. Box 1248</li>
              <li>Aspen, CO 81612</li>
              <li>Phone: (800) 525-6200</li>
              <li>Email: info@aspensnowmass.com</li>
            </ul>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; ${currentYear} Aspen Snowmass. All rights reserved. Esta es una pagina web beta para propositos educacionales.</p>
          <p>Desarrollado por Jeronimo Iriarte - Reference: <a href="https://www.aspensnowmass.com" target="_blank">aspensnowmass.com</a></p>
        </div>
      </div>
    </div>
  `;

  // Inyecta el footer en el contenedor
  footerContainer.innerHTML = footerHTML;
};

// Llama a la función inmediatamente cuando se carga el script
createFooter();

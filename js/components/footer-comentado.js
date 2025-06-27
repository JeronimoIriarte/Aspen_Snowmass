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
  // Crea la estructura completa del pie de página
  const footerHTML = `
    <div class="footer">
      <div class="container">
        <div class="footer-container">
          
          <!-- SECCIÓN: LOGO Y DESCRIPCIÓN -->
          <div class="footer-section">
            <div class="footer-logo">
              <img src="/images/AspenSkiingCompany.png" alt="Aspen Snowmass Logo">
            </div>
            <p>Experience the magic of Aspen Snowmass, Colorado's premier ski resort destination with four incredible mountains.</p>
            
            <!-- ENLACES DE REDES SOCIALES -->
            <div class="social-links">
              <a href="#" aria-label="Facebook">📱</a>
              <a href="#" aria-label="Twitter">📱</a>
              <a href="#" aria-label="Instagram">📱</a>
              <a href="#" aria-label="YouTube">📱</a>
            </div>
          </div>
          
          <!-- SECCIÓN: EXPLORAR -->
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
          
          <!-- SECCIÓN: INFORMACIÓN -->
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
          
          <!-- SECCIÓN: CONTACTO -->
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
        
        <!-- PIE DE PÁGINA INFERIOR -->
        <div class="footer-bottom">
          <p>&copy; ${currentYear} Aspen Snowmass. All rights reserved. Esta es una pagina web demo para propositos educacionales.</p>
          <p>Desarrollado por Jeronimo Iriarte - Reference: <a href="https://www.aspensnowmass.com" target="_blank">aspensnowmass.com</a></p>
        </div>
      </div>
    </div>
  `;

  // INSERCIÓN DEL HTML
  // Inyecta el footer en el contenedor
  footerContainer.innerHTML = footerHTML;
};

// EJECUCIÓN AUTOMÁTICA
// Llama a la función inmediatamente cuando se carga el script
createFooter();

// NOTAS TÉCNICAS:

// VENTAJAS DE ESTE ENFOQUE:
// 1. Consistencia: El mismo footer en todas las páginas
// 2. Mantenibilidad: Cambios centralizados en un solo archivo
// 3. Automatización: Año del copyright se actualiza automáticamente
// 4. Organización: Enlaces categorizados para mejor UX

// ESTRUCTURA DEL FOOTER:
// - Grid de 4 columnas en desktop
// - Responsive: Se adapta a diferentes tamaños de pantalla
// - Secciones claramente definidas: Logo, Explorar, Información, Contacto

// CARACTERÍSTICAS ESPECIALES:
// - Año dinámico en copyright usando new Date().getFullYear()
// - Enlaces de redes sociales con aria-labels para accesibilidad
// - Información de contacto real del resort
// - Créditos del desarrollador y referencia al sitio original

// ACCESIBILIDAD:
// - aria-labels en enlaces de redes sociales
// - Estructura semántica con headings apropiados
// - Enlaces con texto descriptivo

// RESPONSIVE DESIGN:
// - CSS Grid se adapta automáticamente
// - En móviles: columnas se apilan verticalmente
// - Espaciado apropiado para diferentes dispositivos
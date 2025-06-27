// ARCHIVO: home.js - Funcionalidades específicas de la página de inicio
// Este archivo maneja:
// - Actualización de datos meteorológicos simulados
// - Generación de condiciones aleatorias para demostración
// - Funcionalidades específicas de la página principal

document.addEventListener('DOMContentLoaded', () => {
  
  // ACTUALIZACIÓN DE DATOS METEOROLÓGICOS
  // Simula la actualización de información del clima en las 4 montañas
  const updateWeatherData = () => {
    // En una aplicación real, esto haría una petición a una API meteorológica
    // como OpenWeatherMap, WeatherAPI, etc.
    const weatherCards = document.querySelectorAll('.weather-card');
    
    // DATOS METEOROLÓGICOS SIMULADOS
    // Array con información para cada montaña
    const weatherData = [
      { 
        mountain: 'Aspen Mountain', 
        temp: getRandomTemp(20, 35), // Temperatura entre 20-35°F
        snow: getRandomSnow(0, 5),   // Nieve fresca entre 0-5 pulgadas
        conditions: getRandomCondition() // Condición aleatoria
      },
      { 
        mountain: 'Snowmass', 
        temp: getRandomTemp(18, 32), // Ligeramente más frío
        snow: getRandomSnow(0, 6),   // Más nieve potencial
        conditions: getRandomCondition() 
      },
      { 
        mountain: 'Aspen Highlands', 
        temp: getRandomTemp(15, 30), // El más frío (mayor altitud)
        snow: getRandomSnow(0, 4), 
        conditions: getRandomCondition() 
      },
      { 
        mountain: 'Buttermilk', 
        temp: getRandomTemp(22, 36), // El más cálido (menor altitud)
        snow: getRandomSnow(0, 3),   // Menos nieve
        conditions: getRandomCondition() 
      }
    ];
    
    // ACTUALIZACIÓN DEL DOM
    // Recorre cada tarjeta meteorológica y actualiza su contenido
    weatherCards.forEach((card, index) => {
      if (weatherData[index]) {
        const data = weatherData[index];
        // Actualiza los elementos de texto dentro de cada tarjeta
        card.querySelector('.temp').textContent = `${data.temp}°F`;
        card.querySelector('.snow').textContent = `Fresh Snow: ${data.snow}"`;
        card.querySelector('.conditions').textContent = data.conditions;
      }
    });
  };
  
  // FUNCIONES AUXILIARES PARA DATOS SIMULADOS
  
  // Genera temperatura aleatoria dentro de un rango
  function getRandomTemp(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // Genera cantidad de nieve fresca aleatoria
  function getRandomSnow(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // Selecciona una condición meteorológica aleatoria
  function getRandomCondition() {
    const conditions = [
      'Sunny',        // Soleado
      'Partly Cloudy', // Parcialmente nublado
      'Cloudy',       // Nublado
      'Light Snow',   // Nieve ligera
      'Snow Flurries', // Ráfagas de nieve
      'Clear'         // Despejado
    ];
    // Retorna una condición aleatoria del array
    return conditions[Math.floor(Math.random() * conditions.length)];
  }
  
  // INICIALIZACIÓN
  // Actualiza los datos meteorológicos al cargar la página
  updateWeatherData();
  
  // ACTUALIZACIÓN AUTOMÁTICA (COMENTADA)
  // En una aplicación real, podrías actualizar cada 5 minutos
  // setInterval(updateWeatherData, 300000); // 300000ms = 5 minutos
  
  // NOTAS PARA IMPLEMENTACIÓN REAL:
  // 1. Reemplazar datos simulados con llamadas a API real
  // 2. Manejar errores de red y estados de carga
  // 3. Implementar caché para reducir llamadas a la API
  // 4. Considerar mostrar timestamp de última actualización
  // 5. Agregar iconos meteorológicos basados en las condiciones
});

// POSIBLES MEJORAS FUTURAS:
// - Integración con API meteorológica real (OpenWeatherMap, etc.)
// - Geolocalización para condiciones más precisas
// - Gráficos de tendencias meteorológicas
// - Alertas meteorológicas para condiciones extremas
// - Predicción extendida (7 días)
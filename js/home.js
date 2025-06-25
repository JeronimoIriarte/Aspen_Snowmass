document.addEventListener('DOMContentLoaded', () => {
  // Weather data update (simulated for demonstration)
  const updateWeatherData = () => {
    // In a real application, this would fetch data from a weather API
    const weatherCards = document.querySelectorAll('.weather-card');
    
    // Simulated weather data for demonstration
    const weatherData = [
      { mountain: 'Aspen Mountain', temp: getRandomTemp(20, 35), snow: getRandomSnow(0, 5), conditions: getRandomCondition() },
      { mountain: 'Snowmass', temp: getRandomTemp(18, 32), snow: getRandomSnow(0, 6), conditions: getRandomCondition() },
      { mountain: 'Aspen Highlands', temp: getRandomTemp(15, 30), snow: getRandomSnow(0, 4), conditions: getRandomCondition() },
      { mountain: 'Buttermilk', temp: getRandomTemp(22, 36), snow: getRandomSnow(0, 3), conditions: getRandomCondition() }
    ];
    
    weatherCards.forEach((card, index) => {
      if (weatherData[index]) {
        const data = weatherData[index];
        card.querySelector('.temp').textContent = `${data.temp}°F`;
        card.querySelector('.snow').textContent = `Fresh Snow: ${data.snow}"`;
        card.querySelector('.conditions').textContent = data.conditions;
      }
    });
  };
  
  // Helper functions for simulated weather data
  function getRandomTemp(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function getRandomSnow(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function getRandomCondition() {
    const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Snow', 'Snow Flurries', 'Clear'];
    return conditions[Math.floor(Math.random() * conditions.length)];
  }
  
  // Initialize weather data
  updateWeatherData();
  
  // Update weather every 5 minutes (simulated for demonstration)
  // setInterval(updateWeatherData, 300000);
});
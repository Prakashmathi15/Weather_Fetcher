async function getWeather() {
  const city = document.getElementById('cityInput').value;
  const resultDiv = document.getElementById('weatherResult');
  
  if (!city) {
    resultDiv.innerHTML = '<p>Please enter a city name.</p>';
    return;
  }

  const apiKey = '5c90715be5954158a5295453251107'; 
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`;

  try {
    resultDiv.innerHTML = 'Loading...';

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`City not found (${response.status})`);
    }

    const data = await response.json();

    const { location, current } = data;

    resultDiv.innerHTML = `
      <h3>${location.name}, ${location.country}</h3>
      <p><strong>Temperature:</strong> ${current.temp_c}°C</p>
      <p><strong>Condition:</strong> ${current.condition.text}</p>
     
    `;
  } catch (error) {
    resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

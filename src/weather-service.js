export class WeatherService {
  async getWeatherByLoc(lat, lon) {
    try {
      let response = await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.OPNW_API_KEY}`);
      console.log(response);
      if (response.status === 200 && response.ok) {
        let jsonifiedResponse = await response.json();
        return jsonifiedResponse;
      } else {
        return false;
      }
    } catch(error) {
      return false;
    }
  }
}
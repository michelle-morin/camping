export class GeoService {
  async getGeoByInput() {
    try {
      let response = await fetch (`https://api.opencagedata.com/geocode/v1/json?q=Bend%2C%20Oregon&key=${process.env.GEO_API_KEY}&language=en&pretty=1`);
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



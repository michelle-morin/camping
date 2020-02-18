export class TrailService {
  async getTrailInfoByLoc(lat, lng, radius) {
    try {
      let response = await fetch (`https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lng}&maxDistance=${radius}&maxResults=20&key=${process.env.API_KEY}`);
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

  async getTrailByID(id) {
    try {
      let idResponse = await fetch (`
      https://www.hikingproject.com/data/get-trails-by-id?ids=${id}&key=${process.env.API_KEY}`);
      if (idResponse.status === 200 && idResponse.ok) {
        let idJsonifiedResponse = await idResponse.json();
        return idJsonifiedResponse;
      } else {
        return false;
      }
    } catch(error) {
      return false;
    }
  }
}
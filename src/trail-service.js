export class TrailService {
  async getTrailInfoByLoc() {
    try {
      let response = await fetch (`https://www.hikingproject.com/data/get-campgrounds?lat=40.0274&lon=-105.2519&maxDistance=10&key=${process.env.API_KEY}`);
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
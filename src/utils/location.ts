import axios from 'axios';

const API_KEY = process.env.OPEN_WEATHER_MAP_API_key;

export const getCoordinates = async (city: string) => {
  try {
    const data = (await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`)).data;
    if (!data || !data[0].lat || !data[0].lon) {
      return
    }
    return {
      lat: data[0].lat as number,
      lng: data[0].lon as number
    } 
  } catch (err) {;
    return
  }
}

export const getCityName = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
      params: {
        lat: lat,
        lon: lon,
        format: 'json'
      }
    });
    const data = response.data;
    if (!data.address || !data.address.city) {
      return
    }
    const city = data.address.city;
    return city ;
  } catch (err) {
    console.log(err);
  }
}

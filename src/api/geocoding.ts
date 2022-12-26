import type { GeolocationData } from "@/types";

/**
 * Geocoding based on address done in Promise-based fashion
 * 
 * @param address Address used for geolocation
 * @return Geolocation data (of GeolocationData type) or null (if no data found)
 * @throws Object if error was returned by API or null if response of invalid
 * format was received or fetch API threw an error
*/
async function geocodeFromAddress(address: string): Promise<GeolocationData | null> {
  return fetch(`${import.meta.env.DEV ? "http://api.positionstack.com/v1/forward" : "/positionstack/forward" }?access_key=${import.meta.env.VITE_GEO_API_KEY}&query=${address}&limit=1`)
    .then(res => res.json()
      .catch(() => Promise.reject(null))
    )
    .then(res => {
      if(res.data !== undefined) {
        if(res.data.length > 0) {
          return (res.data[0] as GeolocationData);
        } else {
          return null;
        }
      } else if(res.error !== undefined) {
        return Promise.reject(res.error);
      } else {
        return Promise.reject(null);
      }
    });
}


/**
 * Geocoding based on geographical coordinates done in Promise-based fashion
 *  
 * @param lat Latitude
 * @param lon Longitude
 * @return Geolocation data (of GeolocationData type) or null (if no data found)
 * @throws Object if error was returned by API or null if response of invalid
 * format was received or fetch API threw an error
*/
async function geocodeFromCoords(lat: number, lon: number): Promise<GeolocationData | null> {
  return fetch(`${import.meta.env.DEV ? "http://api.positionstack.com/v1/reverse" : "/positionstack/reverse" }?access_key=${import.meta.env.VITE_GEO_API_KEY}&query=${lat},${lon}&limit=1`)
    .then(res => res.json()
      .catch(() => Promise.reject(null))
    )
    .then(res => {
      console.log(JSON.stringify(res, null, 4));

      if(res.data !== undefined) {
        if(res.data.results.length > 0) {
          return (res.data.results[0] as GeolocationData);
        } else {
          return null;
        }
      } else if(res.error !== undefined) {
        return Promise.reject(res.error);
      } else {
        return Promise.reject(null);
      }
    });
}

export {
  geocodeFromAddress,
  geocodeFromCoords
};

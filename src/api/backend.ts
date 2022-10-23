import type { 
  Marker, 
  NewMarker,
  SomsiadStatus, 
} from '@/types';

/**
 * Get all markers
 * 
 * @returns list of markers on success
 * @throws SomsiadStatus on API error, null on fetch error
 */
async function getMarkers(): Promise<Marker[]> {
  return fetch(`${import.meta.env.VITE_BACKEND_URL}/markers`, {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  })
    .catch(() => Promise.reject(null))
    .then(res => res.json()
      .catch(() => Promise.reject(null))
    )
    .then((data: SomsiadStatus) => {
      if(data.status === 'ok') {
        return (data.res as Marker[]);
      } else return Promise.reject(data);
    });
}

/**
 * Get markers by city
 * 
 * @returns list of markers on success
 * @throws SomsiadStatus on API error, null on fetch error
 */
 async function getMarkersByCity(city: string): Promise<Marker[]> {
  return fetch(`${import.meta.env.VITE_BACKEND_URL}/markers/${city}`, {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  })
    .catch(() => Promise.reject(null))
    .then(res => res.json()
      .catch(() => Promise.reject(null))
    )
    .then((data: SomsiadStatus) => {
      if(data.status === 'ok') {
        return (data.res as Marker[]);
      } else return Promise.reject(data);
    });
}

/**
 * Get markers within given distance of given coordinates
 * 
 * @returns list of markers on success
 * @throws SomsiadStatus on API error, null on fetch error
 */
 async function getMarkersWithinDistance(lat: number, long: number, dist: string): Promise<Marker[]> {
  return fetch(`${import.meta.env.VITE_BACKEND_URL}/markers?lat=${lat}&long=${long}&dist=${dist}`, {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  })
    .catch(() => Promise.reject(null))
    .then(res => res.json()
      .catch(() => Promise.reject(null))
    )
    .then((data: SomsiadStatus) => {
      if(data.status === 'ok') {
        return (data.res as Marker[]);
      } else return Promise.reject(data);
    });
}

/**
 * Get all markers of currently logged in user
 *
 * @returns list of markers' details
 * @throws SomsiadStatus on API error, null on fetch error
 */
async function getUserMarkers(): Promise<Marker[]> {
  return fetch(`${import.meta.env.VITE_BACKEND_URL}/user_markers`, {
    method: "GET",
    headers: {
      Accept: "application/json"
    },
    credentials: "include"
  })
    .catch(() => Promise.reject(null))
    .then(res => res.json()
      .catch(() => Promise.reject(null))
    )
    .then((data: SomsiadStatus) => {
      if(data.status === 'ok') {
        return data.res as Marker[];
      } else {
        return Promise.reject(data);
      }
    });
}

/**
 * Get details of marker
 * 
 * @param id Marker id
 * @returns Marker
 * @throws SomsiadStatus on API error, null on fetch
 * error
 */
async function getMarkerById(id: number): Promise<Marker> {
  return fetch(`${import.meta.env.VITE_BACKEND_URL}/markers/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  })
    .catch(() => Promise.reject(null))
    .then(res => res.json()
      .catch(() => Promise.reject(null))
    )
    .then((data: SomsiadStatus) => {
      if(data.status === 'ok')
        return (data.res as Marker);
      else
        return Promise.reject(data);
    });
}

/**
 * Adds marker to database
 * 
 * @param markerData {NewMarker} New marker data
 * @throws SomsiadStatus on API error, null on fetch error 
 */
async function addMarker(markerData: NewMarker): Promise<void> {
  return fetch(`${import.meta.env.VITE_BACKEND_URL}/markers`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(markerData),
    credentials: "include"
  })
    .catch(() => Promise.reject(null))
    .then(res => res.json()
      .catch(() => Promise.reject(null))
    )
    .then((data: SomsiadStatus) => {
      if(data.status === 'error')
        return Promise.reject(data.res);
    });
}

/**
 * Deletes marker from database if current user has added it
 *
 * @param id {number} ID of marker that's being deleted
 * @returns {Marker} Details of marker that has been deleted
 * @throws SomsiadStatus on API error, null on fetch error
 */
async function deleteMarker(id: number): Promise<Marker> {
  return fetch(`${import.meta.env.VITE_BACKEND_URL}/markers/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json"
    },
    credentials: "include"
  })
    .catch(() => Promise.reject(null))
    .then(res => res.json()
      .catch(() => Promise.reject(null))
    )
    .then((data: SomsiadStatus) => {
      if(data.status === 'ok')
        return Promise.resolve(data.res as Marker);
      else
        return Promise.reject(data);
    });
}

export {
  getMarkers,
  getUserMarkers,
  getMarkerById,
  getMarkersByCity,
  getMarkersWithinDistance,
  addMarker,
  deleteMarker
};

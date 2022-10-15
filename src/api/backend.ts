import type { 
  Marker, 
  MarkerDetails, 
  NewAccount, 
  SomsiadStatus, 
  LoginData 
} from '@/types';

/**
 * Get all markers
 * 
 * @return list of markers on success
 * @throws SomsiadStatus on API error, null on fetch error
 */
async function getMarkers(): Promise<Marker[]> {
  return fetch(`${import.meta.env.BACKEND_URL}/markers`, {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  })
    .then(res => res.json()
      .catch(() => Promise.reject(null))
    )
    .then((res: Marker[] | SomsiadStatus) => {
      if((res as SomsiadStatus).status === undefined) {
        return (res as Marker[]);
      } else {
        return Promise.reject(res as SomsiadStatus);
      }
    });
}

/**
 * Get details of marker
 * 
 * @param id Marker id
 * @return MarkerDetails 
 * @throws SomsiadStatus on API error, null on fetch
 * error
 */
async function getMarkerDetails(id: number) {
  return fetch(`${import.meta.env.BACKEND_URL}/markers/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  })
    .then(res => res.json()
      .catch(() => Promise.reject(null))
    )
    .then((res: MarkerDetails | SomsiadStatus) => {
      if((res as SomsiadStatus).status !== undefined) {
        const resData = res as MarkerDetails;

        return resData;
      } else {
        return Promise.reject(res as SomsiadStatus);
      }
    });
}

/**
 * Adds marker to database
 * 
 * @param markerData New marker data (type: MarkerDetails)
 * @returns SomsiadStatus
 * @throws SomsiadStatus on API error, null on fetch error 
 */
async function addMarker(markerData: MarkerDetails): Promise<SomsiadStatus> {
  return fetch(`${import.meta.env.BACKEND_URL}/add_marker`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(markerData)
  })
    .then(res => res.json()
      .catch(() => Promise.reject(null))
    )
    .then((res: SomsiadStatus) => {
      if(res.status === 'ok')
        return res;
      else
        return Promise.reject(res);
    });
}

/**
 * Add new account to database
 * 
 * @param newAccount New account's data (type: NewAccount)
 * @returns SomsiadStatus
 * @throws SomsiadStatus on API error, null on fetch error
 */
async function register(newAccount: NewAccount): Promise<SomsiadStatus> {
  return fetch(`${import.meta.env.BACKEND_URL}/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newAccount)
  })
    .then(res => res.json()
      .catch(() => Promise.reject(null))
    )
    .then((res: SomsiadStatus) => {
      if(res.status === 'ok')
        return res;
      else
        return Promise.reject(res);
    });
}

/**
 * Logs user in
 * 
 * @param data Login data
 * @return SomsiadStatus
 * @throws SomsiadStatus on API error, null on fetch error
 */
async function login(data: LoginData): Promise<SomsiadStatus> {
  return fetch(`${import.meta.env.BACKEND_URL}/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json()
      .catch(() => Promise.reject(null))
    )
    .then((res: SomsiadStatus) => {
      if(res.status === 'ok')
        return res;
      else
        return Promise.reject(res);
    });
}

export {
  getMarkers,
  getMarkerDetails,
  addMarker,
  register,
  login
};
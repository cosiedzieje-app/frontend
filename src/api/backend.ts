import type { 
  Marker, 
  MarkerDetails, 
  NewMarker,
  NewAccount, 
  SomsiadStatus, 
  LoginData,
  UserData
} from '@/types';

/**
 * Get all markers
 * 
 * @returns list of markers on success
 * @throws SomsiadStatus on API error, null on fetch error
 */
async function getMarkers(): Promise<Marker[]> {
  return fetch(`${import.meta.env.BACKEND_URL}/markers`, {
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
async function getUserMarkers(): Promise<MarkerDetails[]> {
  return fetch(`${import.meta.env.BACKEND_URL}/user_markers`, {
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
        return data.res as MarkerDetails[];
      } else {
        return Promise.reject(data);
      }
    });
}

/**
 * Get details of marker
 * 
 * @param id Marker id
 * @returns MarkerDetails 
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
    .catch(() => Promise.reject(null))
    .then(res => res.json()
      .catch(() => Promise.reject(null))
    )
    .then((data: SomsiadStatus) => {
      if(data.status === 'ok')
        return (data.res as MarkerDetails);
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
  return fetch(`${import.meta.env.BACKEND_URL}/add_marker`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(markerData)
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
 * @returns {MarkerDetails} Details of marker that has been deleted
 * @throws SomsiadStatus on API error, null on fetch error
 */
async function deleteMarker(id: number): Promise<MarkerDetails> {
  return fetch(`${import.meta.env.BACKEND_URL}/markers/${id}`, {
    method: "DELETE",
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
        return (data.res as MarkerDetails);
      else
        return Promise.reject(data);
    });
}

/**
 * Add new account to database
 * 
 * @param newAccount New account's data (type: NewAccount)
 * @throws SomsiadStatus on API error, null on fetch error
 */
async function register(newAccount: NewAccount): Promise<void> {
  return fetch(`${import.meta.env.BACKEND_URL}/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newAccount)
  })
    .catch(() => Promise.reject(null))
    .then(res => res.json()
      .catch(() => Promise.reject(null))
    )
    .then((res: SomsiadStatus) => {
      if(res.status === 'error')
        return Promise.reject(res);
    });
}

/**
 * Logs user in
 * 
 * @param data Login data
 * @throws SomsiadStatus on API error, null on fetch error
 */
async function login(data: LoginData): Promise<void> {
  return fetch(`${import.meta.env.BACKEND_URL}/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .catch(() => Promise.reject(null))
    .then(res => res.json()
      .catch(() => Promise.reject(null))
    )
    .then((res: SomsiadStatus) => {
      if(res.status === 'error')
        return Promise.reject(res);
    });
}

/**
 * Logs user out
 *
 * @throws SomsiadStatus on API error, null on fetch error
 */
async function logout(): Promise<void> {
  return fetch(`${import.meta.env.BACKEND_URL}/logout`, {
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
      if(data.status === 'error')
        return Promise.reject(data);
    });
}

/**
 * Gets data of currently logged in user
 *
 * @returns {UserData} Data of currently logged in user
 * @throws SomsiadError on API error, null on fetch error
 */
async function getUserData(): Promise<UserData> {
  return fetch(`${import.meta.env.BACKEND_URL}/user_data`, {
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
        const d = data.res as Record<string, any>;

        return {
          loginName: d["login_name"],
          name: d["name"],
          surname: d["surname"],
          email: d["email"],
          sex: d["sex"],
          address: d["address"],
          reputation: d["reputation"]
        } as UserData;
      } else
        return Promise.reject(data);
    });
}

export {
  getMarkers,
  getUserMarkers,
  getMarkerDetails,
  addMarker,
  register,
  login,
  logout,
  getUserData
};

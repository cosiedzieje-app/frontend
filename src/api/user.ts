import type { 
  NewAccount, 
  SomsiadStatus, 
  LoginData,
  UserData
} from '@/types';

/**
 * Add new account to database
 * 
 * @param newAccount New account's data (type: NewAccount)
 * @throws SomsiadStatus on API error, null on fetch error
 */
async function register(newAccount: NewAccount): Promise<void> {
  return fetch(`${import.meta.env.DEV ? `${import.meta.env.VITE_BACKEND_URL}/api` : "/api"}/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newAccount),
    credentials: "include"
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
  return fetch(`${import.meta.env.DEV ? `${import.meta.env.VITE_BACKEND_URL}/api` : "/api"}/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
    credentials: "include",
    mode: "cors"
  })
    .catch(err => { 
      console.error(err);
      return Promise.reject(null);
    })
    .then(res => res.json()
      .catch(err => { 
        console.log(err);
        return Promise.reject(null);
      })
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
  return fetch(`${import.meta.env.DEV ? `${import.meta.env.VITE_BACKEND_URL}/api` : "/api"}/logout`, {
    method: "GET",
    headers: {
      Accept: "application/json"
    },
    credentials: "include"
  })
    .catch(err => {
      console.error(err);
      return Promise.reject(null);
    })
    .then(res => res.json()
      .catch(err => {
        console.error(err);
        return Promise.reject(null);
      })
    )
    .then((data: SomsiadStatus) => {
      if(data.status === 'error')
        return Promise.reject(data);
      else
        return Promise.resolve();
    });
}

/**
 * Gets data of currently logged in user
 *
 * @returns {UserData} Data of currently logged in user
 * @throws SomsiadError on API error, null on fetch error
 */
async function getUserData(): Promise<UserData> {
  return fetch(`${import.meta.env.DEV ? `${import.meta.env.VITE_BACKEND_URL}/api` : "/api"}/user_data`, {
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
        const d = data.res as Record<string, any>;

        return {
          loginName: d["username"],
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

/**
 * Checks if user is logged in
 *  
 * @throws SosmiadStatus if user is not logged in or on API error, 
 * null on fetch error
 */
async function isLoggedIn(): Promise<void> {
  return fetch(`${import.meta.env.DEV ? `${import.meta.env.VITE_BACKEND_URL}/api` : "/api"}/is_logged`, {
    method: "GET",
    headers: {
      Accept: "application/json"
    },
    credentials: "include"
  })
    .catch(err => {
      console.error(err);
      return Promise.reject(null);
    })
    .then(res => res.json()
      .catch(err => {
        console.error(err);
        return Promise.reject(null);
      })
    )
    .then((res: SomsiadStatus) => {
      if(res.status === "error")
        return Promise.reject(res);
    });
}

export {
  login,
  logout,
  register,
  getUserData,
  isLoggedIn
};

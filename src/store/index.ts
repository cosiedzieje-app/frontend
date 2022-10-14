import type { Store, GeoData } from "@/types";
import { defineStore } from 'pinia';

const useStore = defineStore("main", {
  state: () => {
    return {
      authenticated: false,
      accountName: "",
      userGeoData: null
    } as Store;
  },
  getters: {
    isAuthenticated: (state) => state.authenticated,
    getAccountName: (state) => state.accountName,
    getUserGeoData: (state) => state.userGeoData,
    isUserGeoDataSet: (state) => state.userGeoData !== null
  },
  actions: {
    setAuthenticated(toggle: boolean) {
      this.authenticated = toggle;
    },
    setUserGeoData(geoData: GeoData) {
      this.userGeoData = geoData;
    },
    clearUserGeoData() {
      this.userGeoData = null;
    }
  }
});

export default useStore;

export type {
  Store
};
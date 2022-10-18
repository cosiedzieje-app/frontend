import type { Store, GeoData, AddressGeocodingState } from "@/types";
import { defineStore } from 'pinia';

const useStore = defineStore("main", {
  state: () => {
    return {
      authenticated: true,
      accountName: "",
      userGeoData: null,
      addressBarEnabled: true,
      addressGeocodingState: "idle"
    } as Store;
  },
  getters: {
    isAuthenticated: (state) => state.authenticated,
    getAccountName: (state) => state.accountName,
    getUserGeoData: (state) => state.userGeoData,
    isUserGeoDataSet: (state) => state.userGeoData !== null,
    isAddressBarEnabled: (state) => state.addressBarEnabled,
    getAddressGeocodingState: (state) => state.addressGeocodingState
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
    },
    toggleAddressBar(newState?: boolean) {
      if(newState !== undefined)
        this.addressBarEnabled = newState;
      else
        this.addressBarEnabled = !this.addressBarEnabled;
    },
    setAddressGeocodingState(newState: AddressGeocodingState) {
      this.addressGeocodingState = newState;
    }
  }
});

export default useStore;

export type {
  Store
};

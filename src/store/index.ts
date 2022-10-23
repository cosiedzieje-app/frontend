import type { Store, GeoData, AddressGeocodingState, LoginData, UserData, Marker } from "@/types";
import { defineStore } from 'pinia';

const useStore = defineStore("main", {
  state: () => {
    return {
      authenticated: false,
      userGeoData: null,
      addressBarEnabled: true,
      addressGeocodingState: "idle",
      userLocalization: null,
      userData: null,
      exploredMarkers: []
    } as Store;
  },
  getters: {
    isAuthenticated: (state) => state.authenticated,
    getUserGeoData: (state) => state.userGeoData,
    isUserGeoDataSet: (state) => state.userGeoData !== null,
    isAddressBarEnabled: (state) => state.addressBarEnabled,
    getAddressGeocodingState: (state) => state.addressGeocodingState,
    getUserLocalizaton: (state) => state.userLocalization,
    getUserData: (state) => state.userData,
    getExploredMarkers: (state) => state.exploredMarkers
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
    },
    setUserData(data: UserData) {
      this.userData = data;
    },
    clearUserData() {
      this.userData = null;
    },
    setExploredMarkers(newMarkers: Marker[]) {
      this.exploredMarkers = newMarkers;
    }
  }
});

export default useStore;

export type {
  Store
};

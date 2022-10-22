import type { Store, GeoData, AddressGeocodingState, LoginData, UserData, NewMarker } from "@/types";
import { defineStore } from 'pinia';

const useStore = defineStore("main", {
  state: () => {
    return {
      authenticated: false,
      userGeoData: null,
      pointres: null,
      addressBarEnabled: true,
      addressGeocodingState: "idle",
      userLocalization: null,
      userData: null
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
    getPointres: (state) => state.pointres
  },
  actions: {
    setPointres(marker: NewMarker) {
      this.pointres = marker;
    },

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
    }
  }
});

export default useStore;

export type {
  Store
};

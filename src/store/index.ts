import type { Store } from "@/types";
import { defineStore } from 'pinia';

const useStore = defineStore("main", {
  state: () => {
    return {
      authenticated: false,
      accountName: ""
    } as Store;
  },
  getters: {
    isAuthenticated: (state) => state.authenticated,
    getAccountName: (state) => state.accountName
  },
  actions: {
    setAuthenticated(toggle: boolean) {
      this.authenticated = toggle;
    }
  }
});

export default useStore;

export type {
  Store
};
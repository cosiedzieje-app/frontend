type AddressGeocodingState = "idle" | "pending" | "error" | "success";
type ListingCategory = "NeighborHelp" | "Happening" | "Charity";

// Store format
interface Store {
  authenticated: boolean;
  accountName: string;
  userGeoData: GeoData | null;
  addressBarEnabled: boolean;
  addressGeocodingState: AddressGeocodingState;
}

// CustomButton props format
interface ButtonProps {
  caption: string;
  action: () => void;
  icon: string;
}

// Login data format
interface LoginData {
  email: string;
  password: string;
}

// Sex format
enum Sex {
  Male = "M",
  Female = "F",
  Other = "O" 
}

// General account data format
interface UserAccountData {
  username: string;
  email: string;
  password: string;
}

// Address format
interface Address {
  street: string;
  number: string;
  postalCode: string;
  country: string;
}

// User personal data format
interface UserPersonalData {
  name: string;
  surname: string;
  sex: Sex;
}

// Registration form format
interface NewAccount {
  login: {
    email: string;
    password: string;
  };
  username: string;
  name: string;
  surname: string;
  sex: Sex;
  reputation: number;
  address: Address;
}

// Contact info format
interface ContactInfo {
  name: string;
  surname: string;
  address: Address;
  phoneNumber: string;
  email: string;
}

// Marker format
interface Marker {
  id: number;
  latitude: number;
  longitude: number;
  title: string;
  type: ListingCategory;
}

// Marker details format
interface MarkerDetails {
  id?: number;
  userId: number;
  latitude: number;
  longitude: number;
  title: string;
  description: string;
  addTime: string;
  endTime?: string;
  address: Address;
  contactInfo: ContactInfo;
  type: ListingCategory;
}

// Geolocation data retrieved from PositionStack format
interface GeolocationData {
  latitude: number;
  longitude: number;
  label: string;
  name: string;
  type: "venue" | "address" | "street" | "neighbourhood" | "borough" |
    "localadmin" | "locality" | "county" | "macrocounty" | "region" | 
    "macroregion" | "country" | "coarse" | "postalcode";
  distance?: number;
  number: string;
  street: string;
  postal_code: string;
  confidence: number;
  region: string;
  region_code: string;
  administrative_area: string | null;
  neighbourhood: string;
  country: string;
  country_code: string;
  map_url: string;
}

// Geographical data format (for use with users and such)
interface GeoData {
  latitude: number;
  longitude: number;
  street: string;
  postalCode: string;
  country: string;
  neighbourhood?: string;
}

interface Pointer {
  id: number;
  props: PointerProps;
}
interface PointerProps{
  caption: string;
  position: [string, string];
}

// SomsiadStatus format (https://github.com/somsiad-app/api#somsiadstatus-type)
interface SomsiadStatus {
  status: "ok" | "error";
  errors: string[]; 
}

export type {
  ButtonProps,
  Store,
  AddressGeocodingState,
  UserAccountData,
  UserPersonalData,
  Address,
  NewAccount,
  ContactInfo,
  Marker,
  MarkerDetails,
  GeolocationData,
  GeoData,
  Pointer,
  PointerProps,
  ListingCategory,
  SomsiadStatus,
  LoginData
};
export {
  Sex
};
type AddressGeocodingState = "idle" | "pending" | "error" | "success";
type ListingCategory = "NeighborHelp" | "Happening" | "Charity";

// Contact method format
enum ContactMethod {
  Email = "Email",
  PhoneNumber = "PhoneNumber"
}

// Store format
interface Store {
  authenticated: boolean;
  userGeoData: GeoData | null;
  addressBarEnabled: boolean;
  addressGeocodingState: AddressGeocodingState;
  userLocalization: Localization | null;
  userData: null | UserData;
}

// CustomButton props format
interface ButtonProps {
  caption: string;
  action: () => void;
  icon: string;
  enabled?: boolean;
}

// Form radio format
interface FormRadioProps {
  name: string;
  label: string;
  selected: boolean;
}

// Login data format
interface LoginData {
  email: string;
  password: string;
}

// Sex format
enum Sex {
  Male = "Male",
  Female = "Female",
  Other = "Other" 
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
  city: string;
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
  address: Address;
}

// Contact info format
interface ContactInfo {
  name: string;
  surname: string;
  address: Address;
  method: {
    type: ContactMethod;
    val: string;
  }
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
  id: number;
  userID: number;
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

// New marker format
interface NewMarker {
  userID: number;
  latitude: number;
  longitude: number;
  title: string;
  description: string;
  type: ListingCategory;
  endTime?: number;
  address: Address;
  contactInfo: ContactInfo;
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

interface Localization {
  latitude: string;
  longitude: string;
}

// Geographical data format (for use with users and such)
interface GeoData {
  latitude: string;
  longitude: string;
  // street: string;
  // postalCode: string;
  // city: string;
}

interface Pointer {
  id: number;
  props: PointerProps;
}
interface PointerProps{
  category: ListingCategory;
  caption: string;
  position: [string, string];
}

// SomsiadStatus format (https://github.com/somsiad-app/api#somsiadstatus-type)
interface SomsiadStatus {
  status: "ok" | "error";
  res: any;
}

// User data format
interface UserData {
  loginName: string;
  name: string;
  surname: string;
  sex: Sex;
  address: Address;
  reputation: number;
}

export type {
  ButtonProps,
  FormRadioProps,
  Store,
  AddressGeocodingState,
  UserAccountData,
  UserPersonalData,
  Address,
  NewAccount,
  ContactInfo,
  Marker,
  MarkerDetails,
  NewMarker,
  GeolocationData,
  GeoData,
  Pointer,
  PointerProps,
  ListingCategory,
  SomsiadStatus,
  LoginData,
  UserData,
  Localization
};
export {
  Sex,
  ContactMethod
};

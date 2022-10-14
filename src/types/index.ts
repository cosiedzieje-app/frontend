// Store format
interface Store {
  authenticated: boolean;
  accountName: string;
}

// CustomButton props format
interface ButtonProps {
  caption: string;
  action: () => void;
  icon: string;
}

// Login Request format
interface LoginRequest {
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
  accountData: UserAccountData;
  personalData: UserPersonalData;
  address: Address;
  reputation: number;
}

// Contact info format
interface ContactInfo {
  name: string;
  surname: string;
  address: Address;
  phoneNumber: string
}

// Marker format
interface Marker {
  id: number;
  createdBy: number;
  lat: number;
  lon: number;
  title: string;
  description: string;
  addedAt: string;
  endsAt?: string;
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

interface PointerProps{
  caption: string;
  position: [string, string];
}

export type {
  ButtonProps,
  Store,
  LoginRequest,
  UserAccountData,
  UserPersonalData,
  Address,
  NewAccount,
  ContactInfo,
  Marker,
  GeolocationData,
  PointerProps
};
export {
  Sex
};
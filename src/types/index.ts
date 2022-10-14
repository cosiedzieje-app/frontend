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

export type {
  ButtonProps,
  Store,
  LoginRequest,
  UserAccountData,
  UserPersonalData,
  Address,
  NewAccount
};
export {
  Sex
};
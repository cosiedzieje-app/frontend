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

export type {
  ButtonProps,
  Store,
  LoginRequest
};
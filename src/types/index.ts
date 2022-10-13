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

export type {
  ButtonProps,
  Store
};
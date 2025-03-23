export {};

declare global {
  interface Window {
    ethereum?: any;  // OR provide more specific typing if desired
  }
}
